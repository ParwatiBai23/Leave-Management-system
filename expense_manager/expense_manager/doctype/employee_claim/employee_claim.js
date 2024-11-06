// Copyright (c) 2024, Parwati Bai and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Employee Claim", {
// 	refresh(frm) {

// 	},
// });

frappe.ui.form.on('Employee Claim', {
    // Run this when the form is loaded or refreshed
    refresh: function(frm) {
        update_total_amount(frm);
    },

    // Run this when you add or remove rows in the child table
    expense_type_add: function(frm) {
        update_total_amount(frm);
    },
    expense_type_remove: function(frm) {
        update_total_amount(frm);
    },

    // Run this when the 'amount' field in any row of the 'expense_type' child table changes
    expense_type_amount: function(frm, cdt, cdn) {
        update_total_amount(frm);
    },

    // Run this when the 'expense_type' field in any row of the child table changes
    expense_type_expense_type: function(frm, cdt, cdn) {
        update_total_amount(frm);
    }
});

// Function to calculate and update the total amount
function update_total_amount(frm) {
    let total = 0;

    // Loop through each row in the "Expense Type" child table
    (frm.doc.expense_type || []).forEach(row => {
        total += row.amount || 0;  // Add the 'amount' from each row, defaulting to 0 if empty
    });

    // Set the total amount field with the calculated value
    frm.set_value('total_amount', total);
}

