document.addEventListener('DOMContentLoaded', () => {
    const cartTable = document.querySelector('#cart tbody');
    const subTotal = document.querySelector('#subtotal table');
    const couponInput = document.querySelector('#coupon input');
    const couponButton = document.querySelector('#coupon button');

    const updateTotals = () => {
        let subtotal = 0;

        cartTable.querySelectorAll('tr').forEach(row => {
            const price = parseFloat(row.children[3].textContent.replace('$', ''));
            const qtyInput = row.querySelector('input');
            const qty = parseInt(qtyInput.value) || 0;
            const total = price * qty;

            row.children[5].textContent = `$${total.toFixed(2)}`;
            subtotal += total;
        });

        let discount = 0;
        if (couponInput.value === 'SAVE10') {
            discount = subtotal * 0.10;
        }
        
        let finalTotal = subtotal - discount;
        

        subTotal.rows[0].cells[1].textContent = `$ ${subtotal.toFixed(2)}`;
        subTotal.rows[2].cells[1].textContent = `$ ${discount.toFixed(2)}`;
        subTotal.rows[3].cells[1].textContent = `$ ${finalTotal.toFixed(2)}`;
    };

    // Event delegation for quantity inputs and remove buttons
    cartTable.addEventListener('input', e => {
        if (e.target.matches('input')) updateTotals();
    });

    cartTable.addEventListener('click', e => {
        if (e.target.classList.contains('fa-times-circle')) {
            e.target.closest('tr').remove();
            updateTotals();
        }
    });

    couponButton.addEventListener('click', updateTotals);

    updateTotals(); // Initial calculation
});
