// Copyright (c) 2024, Parwati Bai and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Leave Quota", {
// 	refresh(frm) {

// 	},
// });

frappe.ui.form.on('Leave Quota', {
    refresh: function(frm) {

    },

    onload: function(frm) {
        if (frm.doc.employee && frm.doc.leave_type) {
            calculate_leave_quota(frm);
        }
    },

    employee: function(frm) {

        if (frm.doc.leave_type) {
            calculate_leave_quota(frm);
        }
    },

    leave_type: function(frm) {
        if (frm.doc.employee) {
            calculate_leave_quota(frm);
        }
    }
});

function calculate_leave_quota(frm) {
    frappe.db.get_list('Leave Application', {
        filters: {
            employee: frm.doc.employee,
            leave_type: frm.doc.leave_type,
        },
        fields: ['total_days']
    }).then((leave_apps) => {
        let total_days_taken = 0;

        leave_apps.forEach(leave => {
            total_days_taken += leave.total_days;
        });

        frm.set_value('leave_taken', total_days_taken);
        frm.set_value('leave_balance', frm.doc.maximum_allowed - total_days_taken);
    });
}

