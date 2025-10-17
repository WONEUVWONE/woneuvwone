// Stats
let remainingCodes = 111111 - 43150; // Already sold
let totalValue = 43150 * 12.58;

document.getElementById('remaining').textContent = remainingCodes;
document.getElementById('total-value').textContent = `$${totalValue.toLocaleString()}`;

// PayPal Button
paypal.Buttons({
  createOrder: (data, actions) => actions.order.create({
    purchase_units: [{ amount: { value: '12.58' } }]
  }),
  onApprove: (data, actions) => actions.order.capture().then(details => {
    alert('Purchase complete! We will send your code via our WONEUVWONE Instagram account.');
    remainingCodes--;
    totalValue += 12.58;
    document.getElementById('remaining').textContent = remainingCodes;
    document.getElementById('total-value').textContent = `$${totalValue.toLocaleString()}`;
  })
}).render('#paypal-button-container');

// Code Lookup
function lookupCode() {
  const code = document.getElementById('codeInput').value.trim().toUpperCase();
  const codeResult = document.getElementById('codeResult');
  if(!code) return alert('Enter a code.');
  
  // No verses shown, just error if invalid
  codeResult.innerHTML = `<p style="color:#ff4d4d;">Error: This code is invalid or has not been verified yet.</p>`;
}

// Investment Graph
const ctx = document.getElementById('investmentChart').getContext('2d');
const years = ['2022', '2023', '2024', '2025'];
const codesSold = [0, 15000, 30000, 43150];
const totalValueData = codesSold.map(s => s * 12.58);

new Chart(ctx, {
  type: 'line',
  data: {
    labels: years,
    datasets: [{
      label: 'Codes Sold',
      data: codesSold,
      borderColor: '#9ee7e1',
      backgroundColor: 'rgba(158,231,225,0.2)',
      fill: true,
      tension: 0.3
    },{
      label: 'Total Value ($)',
      data: totalValueData,
      borderColor: '#ffcc00',
      backgroundColor: 'rgba(255,204,0,0.2)',
      fill: true,
      tension: 0.3,
      yAxisID: 'y1'
    }]
  },
  options: {
    responsive: true,
    interaction: { mode: 'index', intersect: false },
    stacked: false,
    scales: {
      y: { type: 'linear', position: 'left', title: { display: true, text: 'Codes Sold' }},
      y1: { type: 'linear', position: 'right', title: { display: true, text: 'Total Value ($)' }, grid: { drawOnChartArea: false }}
    }
  }
});

// --- DISCOUNT CODE LOGIC ---
let originalPrice = 12.58; // Base price
let currentPrice = originalPrice;

function applyDiscount() {
  const enteredCode = document.getElementById("discountCode").value.trim().toUpperCase();
  const priceDisplay = document.getElementById("priceDisplay");

  if (enteredCode === "WONE90") {
    currentPrice = originalPrice * 0.1; // 90% off
    priceDisplay.textContent = `Discount Applied ✅ Price: $${currentPrice.toFixed(2)}`;
  } else {
    currentPrice = originalPrice;
    priceDisplay.textContent = `Invalid Code ❌ Price: $${originalPrice.toFixed(2)}`;
  }
}
