document.addEventListener('DOMContentLoaded', () => {
    const cartTable = document.querySelector('#cart tbody');
    const subTotal = document.querySelector('#subtotal table');
    const button = document.querySelector('#coupon button');
    const couponInput = document.querySelector('#coupon input');

    function updateTotals() {
        let subtotal = 0;
        cartTable.querySelectorAll('tr').forEach(row => {
            const price = parseFloat(row.children[3].textContent.replace('$', ''));
            const qty = parseInt(row.querySelector('input').value);
            const itemTotal = price * qty;
            row.children[5].textContent = `$${itemTotal.toFixed(2)}`;
            subtotal += itemTotal;
        });

        // Update subtotal and total in the summary section
        subTotal.rows[0].cells[1].textContent = `$ ${subtotal.toFixed(2)}`;

        // Apply discount if any
        let discount = 0;
        if (couponInput.value === "SAVE10") {
            discount = subtotal * 0.10;
        }

        subTotal.rows[2].cells[1].textContent = `$ ${discount.toFixed(2)}`;
        subTotal.rows[3].cells[1].textContent = `$ ${(subtotal - discount).toFixed(2)}`;
    }

    // Update total when quantity changes
    cartTable.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', updateTotals);
    });

    // Remove item
    cartTable.querySelectorAll('.fa-times-circle').forEach((icon, index) => {
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            icon.closest('tr').remove();
            updateTotals();
        });
    });

    // Apply coupon
    button.addEventListener('click', updateTotals);

    // Initial totals
    updateTotals();
});
