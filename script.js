paypal.Buttons({
    createOrder: (data, actions) => {
        return actions.order.create({
            purchase_units: [{
                amount: { value: '1.26' } // 90% off from 12.58
            }]
        });
    },
    onApprove: (data, actions) => {
        return actions.order.capture().then(details => {
            const email = document.getElementById('email').value.trim();
            if(!email) return alert('Enter your email to receive your code.');
            alert('Payment complete! Your code will be sent via our WONEUVWONE Instagram to: ' + email);
        });
    }
}).render('#paypal-button-container');
