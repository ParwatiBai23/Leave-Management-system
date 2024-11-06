# Copyright (c) 2024, Parwati Bai and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import date_diff

class LeaveApplication(Document):
    def before_submit(self):
        self.check_leave_quota()

    def check_leave_quota(self):
        leave_quota = frappe.get_doc('Leave Quota', {
            'employee': self.employee,
            'leave_type': self.leave_type
        })
        
        total_requested_days = date_diff(self.end_date, self.start_date) + 1
        
        if leave_quota.leave_balance < total_requested_days:
            frappe.throw(f"Not enough {self.leave_type} balance. You only have {leave_quota.leave_balance} days left.")
        
        leave_quota.leave_taken += total_requested_days
        leave_quota.leave_balance = leave_quota.maximum_allowed - leave_quota.leave_taken
        leave_quota.save()

    def on_submit(self):
        self.update_leave_quota()

    def update_leave_quota(self):
        leave_quota = frappe.get_doc('Leave Quota', {
            'employee': self.employee,
            'leave_type': self.leave_type
        })

        total_days = date_diff(self.end_date, self.start_date) + 1

        leave_quota.leave_taken += total_days
        leave_quota.leave_balance = leave_quota.maximum_allowed - leave_quota.leave_taken

        leave_quota.save()

