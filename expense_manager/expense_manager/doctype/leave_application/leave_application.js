// Copyright (c) 2024, Parwati Bai and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Leave Application", {
// 	refresh(frm) {

// 	},
// });
frappe.ui.form.on('Leave Application', {
    before_submit: function(frm) {
        if (!frm.doc.status) {
            frm.set_value('status', 'Pending');  // Set default status to 'Pending'
        }
    },
    start_date: function(frm) {
        calculate_total_days(frm);
    },
    end_date: function(frm) {
        calculate_total_days(frm);
    }
});

function calculate_total_days(frm) {
    if (frm.doc.start_date && frm.doc.end_date) {
        let start = new Date(frm.doc.start_date);
        let end = new Date(frm.doc.end_date);
        
        if (start > end) {
            frm.set_value('total_days', 0);
            frappe.msgprint('Start date cannot be after end date.');
            return;
        }
        
        let total_days = 0;

        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            if (d.getDay() !== 0) {
                total_days++;
            }
        }
        
        frm.set_value('total_days', total_days);
    }
}
