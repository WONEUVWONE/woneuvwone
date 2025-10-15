let remaining = 4;
let price = 12.50;

function updateStats() {
  document.getElementById('remaining').textContent = remaining;
  document.getElementById('total-value').textContent = `$${((4 - remaining) * price).toFixed(2)}`;
}

// Initialize PayPal buttons
for (let i = 1; i <= 4; i++) {
  paypal.Buttons({
    createOrder: (data, actions) => actions.order.create({
      purchase_units: [{ amount: { value: price.toFixed(2) } }]
    }),
    onApprove: (data, actions) => actions.order.capture().then(details => {
      alert('Payment complete. Your unique code will be sent via Instagram.');
      remaining--;
      updateStats();
      document.getElementById(`paypal-button-container-${i}`).innerHTML = 'SOLD';
    })
  }).render(`#paypal-button-container-${i}`);
}

updateStats();
