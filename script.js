let price = 12.58;
const priceElement = document.getElementById("price");
const discountButton = document.getElementById("applyDiscount");

discountButton.addEventListener("click", () => {
  price *= 0.1; // 90% discount
  priceElement.textContent = price.toFixed(2);
});

// PayPal button
paypal.Buttons({
  style:{layout:'vertical', color:'gold', shape:'rect', label:'pay'},
  createOrder: function(data, actions) {
    return actions.order.create({purchase_units:[{ amount:{ value: price.toFixed(2) } }]});
  },
  onApprove: function(data, actions) {
    return actions.order.capture().then(function(details){
      alert('Payment complete. Your art piece will be mailed with your unique code.');
    });
  },
  onError: function(err){ alert('Payment error, try again later.'); console.error(err); }
}).render('#paypal-button-container');

// Code lookup
function lookupCode(){
  const code = document.getElementById("codeInput").value.trim().toUpperCase();
  if(!code) return alert("Enter a code.");
  // Example: simulate lookup
  const exampleCode = "WONE-0451";
  if(code === exampleCode){
    document.getElementById("verseResult").innerHTML = "<strong>Luke 23:5</strong>";
  } else {
    document.getElementById("verseResult").innerHTML = "No verse found for this code.";
  }
}
