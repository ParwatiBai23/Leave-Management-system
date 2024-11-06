# Copyright (c) 2024, Parwati Bai and contributors
# For license information, please see license.txt
# import frappe

from frappe.model.document import Document

class EmployeeClaim(Document):
  
    def validate(self):
        self.calculate_total_amount()

    def calculate_total_amount(self):
        total = 0
        for row in self.expense_type:
            total += row.amount or 0  
        self.total_amount = total


