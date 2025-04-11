document.addEventListener('DOMContentLoaded', () => {
    const cartTable = document.querySelector('#cart tbody');
    const subTotal = document.querySelector('#subtotal table');
    const couponInput = document.querySelector('#coupon input');
    const couponButton = document.querySelector('#coupon button');

    const updateTotals = () => {
        let subtotal = 0;

        const rows = cartTable.querySelectorAll('tr');
        subtotal = 0;
        
        rows.forEach(function(row) {
            // Get the price from the 4th cell (index 3) and remove the dollar sign
            const priceText = row.children[3].textContent;
            const priceWithoutDollar = priceText.replace('$', '');
            const price = parseFloat(priceWithoutDollar);
        
            // Get the quantity input value
            const qtyInput = row.querySelector('input');
            let quantity = parseInt(qtyInput.value);
        
            // If quantity is not a number, set it to 0
            if (isNaN(quantity)) {
                quantity = 0;
            }
        
            // Calculate total for the row
            const total = price * quantity;
        
            // Update the 6th cell (index 5) with the total, formatted as dollars
            row.children[5].textContent = '$' + total.toFixed(2);
        
            // Add the total to the subtotal
            subtotal += total;
        });
        

        let discount = 0;
        if (couponInput.value === 'SAVE10' || 'save10') {
            discount = subtotal * 0.10;
        }

        //calculate final total amount
        
        let finalTotal = subtotal - discount;
        
        //// Update the subtotal cell (respective row, second column)
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
