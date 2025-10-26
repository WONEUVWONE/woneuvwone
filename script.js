document.addEventListener('DOMContentLoaded', () => {
  const remainingEl = document.getElementById('remaining');
  const totalValueEl = document.getElementById('total-value');
  const priceDisplay = document.getElementById('priceDisplay');
  const hiddenPrice = document.getElementById('hiddenPrice');

  let sold = 43660;
  const totalSupply = 111111;
  let remaining = totalSupply - sold;
  let originalPrice = 14272.58;
  let currentPrice = originalPrice;
  let totalValue = sold * originalPrice;

  remainingEl.textContent = remaining;
  totalValueEl.textContent = `$${totalValue.toLocaleString()}`;
  priceDisplay.textContent = `Price: $${originalPrice.toFixed(2)}`;

  // Discount
  document.getElementById('applyDiscountBtn').addEventListener('click', () => {
    const code = (document.getElementById('discountCode').value || '').trim().toUpperCase();
    if (code === '8164ARY678') {
      currentPrice = originalPrice * 0.05; // 95% off
      priceDisplay.textContent = `Discount Applied ✅ Price: $${currentPrice.toFixed(2)}`;
    } else if (code === 'WONE90') {
      currentPrice = originalPrice * 0.1;
      priceDisplay.textContent = `Discount Applied ✅ Price: $${currentPrice.toFixed(2)}`;
    } else {
      currentPrice = originalPrice;
      priceDisplay.textContent = `Invalid Code ❌ Price: $${originalPrice.toFixed(2)}`;
    }
    hiddenPrice.value = currentPrice.toFixed(2);
    renderPaypalButtons();
  });

  // PayPal button
  function renderPaypalButtons() {
    const container = document.getElementById('paypal-button-container');
    if (!container || !window.paypal) return;
    container.innerHTML = '';
    paypal.Buttons({
      style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'pay' },
      createOrder: (data, actions) => actions.order.create({
        purchase_units: [{ amount: { value: currentPrice.toFixed(2) }, description: "WONEUVWONE — One-of-one code" }]
      }),
      onApprove: (data, actions) => actions.order.capture().then(details => {
        hiddenPrice.value = currentPrice.toFixed(2);
        document.getElementById('orderForm').submit();
        alert('Payment complete! Order info sent via email.');
        remaining--;
        totalValue += currentPrice;
        remainingEl.textContent = remaining;
        totalValueEl.textContent = `$${totalValue.toLocaleString()}`;
      }),
      onError: (err) => { console.error(err); alert('Payment error.'); }
    }).render('#paypal-button-container');
  }
  renderPaypalButtons();

  // Code lookup demo
  window.lookupCode = function() {
    const code = (document.getElementById('codeInput').value
