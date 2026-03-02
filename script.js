/* ============================================================
   KENYATECH — SAFE TEST SCRIPT (FULL REWRITE)
   Goal: No crashes, products load, orders save to Google Sheets
============================================================ */

/* ========== 1. PRODUCTS (TEST DATA) ========== */
var products = [
  { id: 1, name: "Power Bank 20,000mAh", category: "accessories", emoji: "🔋", price: 3999, soldOut: false, desc: "Fast charging power bank" },
  { id: 2, name: "Wireless Earbuds", category: "electronics", emoji: "🎧", price: 4500, soldOut: false, desc: "Noise cancelling earbuds" }
];

/* ========== 2. STATE ========== */
var cart = [];

/* ========== 3. SAFE HELPERS ========== */
function $(id) {
  return document.getElementById(id);
}

/* ========== 4. RENDER PRODUCTS ========== */
function renderProducts() {
  var grid = $("productsGrid");
  if (!grid) return;

  var html = "";
  products.forEach(function(p) {
    html +=
      "<div style='border:1px solid #333;padding:12px;margin:8px;border-radius:8px'>" +
        "<h3>" + p.emoji + " " + p.name + "</h3>" +
        "<p>" + p.desc + "</p>" +
        "<strong>KES " + p.price.toLocaleString() + "</strong><br>" +
        (p.soldOut
          ? "<button disabled>Sold Out</button>"
          : "<button onclick='addToCart(" + p.id + ")'>Add to Cart</button>") +
      "</div>";
  });

  grid.innerHTML = html;
}

/* ========== 5. CART ========== */
function addToCart(id) {
  var p = products.find(function(x) { return x.id === id; });
  if (!p) return;
  cart.push(p);
  if ($("cartCount")) $("cartCount").textContent = cart.length;
  alert(p.name + " added to cart");
}

/* ========== 6. PLACE ORDER ========== */
function placeOrder() {
  var name     = $("custName") ? $("custName").value.trim() : "";
  var phone    = $("custPhone") ? $("custPhone").value.trim() : "";
  var location = $("custLocation") ? $("custLocation").value.trim() : "";

  if (!name || !phone || !location) {
    alert("Fill all fields");
    return;
  }

  var itemsStr = cart.map(function(c) { return c.name; }).join(", ");
  var total    = cart.reduce(function(s, c) { return s + c.price; }, 0);

  fetch("https://api.sheetbest.com/sheets/c7c9236a-8519-4a4c-8487-2aa23a68d4de", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      Name: name,
      Phone: phone,
      Location: location,
      Items: itemsStr,
      Total: "KES " + total.toLocaleString()
    })
  })
  .then(function(r) { return r.json(); })
  .then(function() {
    alert("Order sent!");
    cart = [];
    if ($("cartCount")) $("cartCount").textContent = "0";
  })
  .catch(function(e) {
    console.error(e);
    alert("Failed to send order");
  });
}

/* ========== 7. INIT ========== */
document.addEventListener("DOMContentLoaded", function() {
  renderProducts();
});
