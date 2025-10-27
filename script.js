// ----------------------------
// WONEUVWONE — Final Script.js
// ----------------------------

// Base price
let originalPrice = 14272.58;
let currentPrice = originalPrice;

// --- DISCOUNT CODES ---
const discounts = {
  "WONE90": 0.90, // 90% off
  "8164ARY678": 0.95 // 95% off
};

// --- APPLY DISCOUNT ---
document.addEventListener("DOMContentLoaded", () => {
  const discountInput = document.getElementById("discountCode");
  const applyButton = document.getElementById("applyDiscountBtn");
  const priceDisplay = document.getElementById("priceDisplay");
  const hiddenPrice = document.getElementById("hiddenPrice");

  applyButton.addEventListener("click", () => {
    const enteredCode = discountInput.value.trim().toUpperCase();
    if (discounts[enteredCode]) {
      const discountPercent = discounts[enteredCode];
      const discountedPrice = originalPrice * (1 - discountPercent);
      currentPrice = discountedPrice.toFixed(2);
      priceDisplay.textContent = `Price: $${currentPrice}`;
      hiddenPrice.value = currentPrice;
      alert(`Discount applied! You saved ${discountPercent * 100}%`);
    } else {
      alert("Invalid code.");
      currentPrice = originalPrice;
      priceDisplay.textContent = `Price: $${originalPrice.toFixed(2)}`;
      hiddenPrice.value = originalPrice;
    }
  });

  // Initialize PayPal
  if (window.paypal) {
    paypal.Buttons({
      style: {
        color: "gold",
        shape: "rect",
        label: "pay",
        layout: "vertical"
      },
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: { value: currentPrice.toString() }
          }]
        });
      },
      onApprove: (data, actions) => {
        return actions.order.capture().then((details) => {
          alert(`✅ Transaction completed by ${details.payer.name.given_name}!`);
          document.getElementById("orderForm").submit();
        });
      }
    }).render('#paypal-button-container');
  }

  // Draw graph
  drawInvestmentChart();

});

// ----------------------------
// GRAPH (2022–2025 Investment Growth)
// ----------------------------
function drawInvestmentChart() {
  const ctx = document.getElementById("investmentChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["2022", "2023", "2024", "2025"],
      datasets: [{
        label: "Total Collection Value ($)",
        data: [54000000, 250000000, 475000000, 623140843],
        borderWidth: 3,
        borderColor: "gold",
        pointBackgroundColor: "white",
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: false }
      }
    }
  });
}

// ----------------------------
// CODE LOOKUP SYSTEM
// ----------------------------
function lookupCode() {
  const input = document.getElementById("codeInput").value.trim();
  const resultBox = document.getElementById("codeResult");
  if (input === "") {
    resultBox.textContent = "Please enter a code.";
    return;
  }

  // Example fake database
  const validCodes = ["WONE-0451", "WONE-0078", "WONE-2391", "WONE-1111"];
  if (validCodes.includes(input.toUpperCase())) {
    resultBox.innerHTML = `✅ Code ${input} verified. Authentic coin registered under WONEUVWONE.`;
  } else {
    resultBox.innerHTML = `⚠️ Code ${input} not found. Verify with official WONEUVWONE Instagram.`;
  }
}
