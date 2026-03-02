/* =================================================================
   KENYATECH.CO.KE — script.js
   Clean rewrite — no nested template literals, no quote conflicts.

   SECTIONS:
   1.  Product Data       — Add / remove products here
   2.  State Variables
   3.  Image Helper       — productImg()
   4.  Render Products    — renderProducts()
   5.  Render Bestsellers — renderBestsellers()
   6.  Filter Products    — filterProducts()
   7.  Social Sharing     — shareProduct(), getProductURL()
   8.  Product Modal      — openProduct(), closeModal()
   9.  Cart               — addToCart(), removeFromCart()
   10. Wishlist           — toggleWishlist()
   11. Checkout           — openCheckout(), closeCheckout(), renderCheckout()
   12. Payment & Order    — selectPayment(), placeOrder()
   13. Toast              — showToast()
   14. Cursor             — custom gold cursor + ring
   15. Scroll Effects     — navbar shrink, scroll reveal
   16. Mobile Menu
   17. Init               — runs on page load
================================================================= */


/* =================================================================
   1. PRODUCT DATA
   -----------------------------------------------------------------
   TO ADD A PRODUCT:  Copy any block, give it a new unique id, fill fields.
   TO REMOVE:         Delete the whole { ... }, block.
   TO MARK IN STOCK:  Change  soldOut: true  to  soldOut: false
   TO ADD IMAGE:      Set image: "images/yourfile.jpeg"
   TO USE EMOJI ONLY: Set image: null
================================================================= */
const products = [

  // ── PHONE ACCESSORIES ──────────────────────────────────
  {
    id: 1,
    name: "MagSafe Wallet Case",
    category: "accessories",
    emoji: "📱",
    image: "images/1_jpg.jpeg",
    price: 2800,
    original: 3500,
    badge: "new",
    soldOut: true,
    desc: "Ultra-slim genuine leather wallet case with MagSafe compatibility. Holds 3 cards, premium feel.",
    rating: 4.9
  },
  {
    id: 2,
    name: "Pro Wireless Earbuds",
    category: "accessories",
    emoji: "🎧",
    image: "images/2_jpg.jpeg",
    price: 4500,
    original: 5800,
    badge: "hot",
    soldOut: true,
    desc: "Active noise cancellation, 40-hour battery, IPX5 waterproof. The last earbuds you'll ever need.",
    rating: 4.8
  },
  {
    id: 3,
    name: "65W GaN Fast Charger",
    category: "accessories",
    emoji: "⚡",
    image: "images/3_jpg.jpeg",
    price: 2200,
    original: null,
    badge: "new",
    soldOut: true,
    desc: "Gallium Nitride technology — charges your phone from 0 to 80% in 35 minutes. Supports PD 3.0.",
    rating: 4.9
  },
  {
    id: 4,
    name: "20,000mAh Power Bank",
    category: "accessories",
    emoji: "🔋",
    image: "images/4_jpg.jpg",
    price: 3999,
    original: 6000,
    badge: "sale",
    soldOut: false,
    desc: "Ultra-fast 65W charging, LED display, dual USB-C + USB-A. Slim enough for your bag.",
    rating: 4.7
  },
  {
    id: 5,
    name: "Braided USB-C Cable 2m",
    category: "accessories",
    emoji: "🔌",
    image: "images/5_jpg.jpeg",
    price: 850,
    original: null,
    badge: null,
    soldOut: true,
    desc: "Military-grade braided nylon, 100W power delivery, 10Gbps data transfer. Built to last.",
    rating: 4.8
  },
  {
    id: 6,
    name: "Tempered Glass Screen Guard",
    category: "accessories",
    emoji: "🛡️",
    image: "images/6_jpg.jpeg",
    price: 650,
    original: null,
    badge: null,
    soldOut: true,
    desc: "9H hardness, 0.3mm ultra-thin, oleophobic coating. Perfect clarity, zero bubbles.",
    rating: 4.6
  },
  {
    id: 7,
    name: "RGB Wireless Charger Pad",
    category: "accessories",
    emoji: "🌀",
    image: "images/7_jpg.jpeg",
    price: 1800,
    original: 2200,
    badge: "new",
    soldOut: true,
    desc: "15W wireless charging with ambient RGB lighting. Compatible with all Qi-enabled phones.",
    rating: 4.7
  },
  {
    id: 8,
    name: "PopSocket MagSafe Ring",
    category: "accessories",
    emoji: "💫",
    image: "images/8_jpg.jpeg",
    price: 950,
    original: null,
    badge: null,
    soldOut: true,
    desc: "Magnetic phone grip and stand. Works with MagSafe. Rotating 360 degree design in 12 colors.",
    rating: 4.5
  },
  {
    id: 13,
    name: "Phone Cooling Fan",
    category: "accessories",
    emoji: "❄️",
    image: "images/13_jpg.jpeg",
    price: 1200,
    original: null,
    badge: "new",
    soldOut: true,
    desc: "USB-C clip-on cooler. Reduces phone temperature by 20 degrees. Perfect for gaming sessions.",
    rating: 4.4
  },
  {
    id: 14,
    name: "Retractable Cable Reel",
    category: "accessories",
    emoji: "🔄",
    image: "images/14_jpg.jpeg",
    price: 1100,
    original: null,
    badge: null,
    soldOut: true,
    desc: "3-in-1 retractable: USB-C, Micro-USB, Lightning. Tangle-free automatic retract.",
    rating: 4.6
  },
  {
    id: 16,
    name: "Car Phone Holder",
    category: "accessories",
    emoji: "🚗",
    image: "images/16_jpg.jpeg",
    price: 1400,
    original: null,
    badge: null,
    soldOut: true,
    desc: "Dashboard magnetic mount. 360 degree rotation, universal fit. Strong N52 neodymium magnet.",
    rating: 4.8
  },
  {
    id: 19,
    name: "Premium Phone Stand",
    category: "accessories",
    emoji: "🎭",
    image: "images/19_jpg.jpeg",
    price: 1650,
    original: null,
    badge: null,
    soldOut: true,
    desc: "Aluminum alloy foldable stand. Adjustable angle 0 to 270 degrees. Supports all phones and tablets.",
    rating: 4.7
  },

  // ── ELECTRONICS ────────────────────────────────────────
  {
    id: 9,
    name: "Bluetooth Speaker Mini",
    category: "electronics",
    emoji: "🔊",
    image: "images/9_jpg.jpeg",
    price: 3200,
    original: 4000,
    badge: "hot",
    soldOut: true,
    desc: "360 degree immersive sound, IPX7 waterproof, 24-hour battery. Perfect for outdoor Kenya.",
    rating: 4.8
  },
  {
    id: 10,
    name: "Smart LED Desk Lamp",
    category: "electronics",
    emoji: "💡",
    image: "images/10_jpg.jpeg",
    price: 2800,
    original: null,
    badge: "new",
    soldOut: true,
    desc: "Touch dimming, 3 color modes, USB charging port built-in. Foldable, portable design.",
    rating: 4.6
  },
  {
    id: 11,
    name: "Wireless Phone Stand",
    category: "electronics",
    emoji: "📡",
    image: "images/11_jpg.jpeg",
    price: 2100,
    original: 2600,
    badge: "sale",
    soldOut: true,
    desc: "15W fast wireless charging stand with adjustable angle. Works while you watch videos.",
    rating: 4.7
  },
  {
    id: 12,
    name: "Smart Tracking Tag",
    category: "electronics",
    emoji: "🏷️",
    image: "images/12_jpg.jpeg",
    price: 1500,
    original: null,
    badge: null,
    soldOut: true,
    desc: "Never lose your keys, wallet, or bag. Works with iOS and Android. 1-year battery life.",
    rating: 4.5
  },
  {
    id: 15,
    name: "Portable Projector Mini",
    category: "electronics",
    emoji: "🎬",
    image: "images/15_jpg.jpeg",
    price: 12500,
    original: 15000,
    badge: "hot",
    soldOut: true,
    desc: "1080p support, HDMI+USB, built-in speaker. Project anything from your phone, anywhere.",
    rating: 4.7
  },
  {
    id: 17,
    name: "Smart IR Remote Blaster",
    category: "electronics",
    emoji: "📺",
    image: "images/17_jpg.jpeg",
    price: 1900,
    original: null,
    badge: "new",
    soldOut: true,
    desc: "Turn your phone into a universal remote. Controls TV, AC, DVD, fan. 360 degree infrared.",
    rating: 4.5
  },
  {
    id: 18,
    name: "Solar Power Charger",
    category: "electronics",
    emoji: "☀️",
    image: "images/18_jpg.jpeg",
    price: 4200,
    original: 5200,
    badge: "new",
    soldOut: true,
    desc: "Dual solar panels, 20,000mAh. Perfect for outdoor Kenya — charge from the sun.",
    rating: 4.6
  },
];


/* =================================================================
   2. STATE VARIABLES
================================================================= */
var cart                  = [];
var wishlist              = new Set();
var activeFilter          = "all";
var selectedPayment       = "cod";
var currentModalProductId = null;


/* =================================================================
   3. IMAGE HELPER
   -----------------------------------------------------------------
   Returns HTML string for a product image.
   Uses plain string concatenation — zero nested template literals.
   Falls back gracefully to emoji if image is missing or fails.

   size: "card" | "modal" | "feature" | "list"
================================================================= */
function productImg(p, size) {
  var S = {
    card:    "width:100%;height:100%;object-fit:cover;",
    modal:   "width:80%;height:80%;object-fit:contain;",
    feature: "width:55%;height:55%;object-fit:contain;margin-bottom:1.5rem;display:block;",
    list:    "width:40px;height:40px;object-fit:contain;border-radius:4px;"
  };
  var style = S[size] || S.card;
  var eSz   = (size === "modal") ? "7rem" : "5rem";

  if (!p.image) {
    if (size === "list")    return "<span style='font-size:2rem'>" + p.emoji + "</span>";
    if (size === "feature") return "<span class='bs-feature-emoji'>" + p.emoji + "</span>";
    return "<span style='font-size:" + eSz + "'>" + p.emoji + "</span>";
  }

  var eCls = (size === "feature") ? " class='bs-feature-emoji'" : "";

  if (size === "list") {
    return "<img src='" + p.image + "' alt='" + p.name + "' style='" + style + "' onerror='this.style.display=\"none\"'>";
  }

  return "<img src='" + p.image + "' alt='" + p.name + "' style='" + style + "' "
    + "onerror='this.style.display=\"none\";this.nextElementSibling.style.display=\"inline-block\"'>"
    + "<span" + eCls + " style='font-size:" + eSz + ";display:none'>" + p.emoji + "</span>";
}


/* =================================================================
   4. RENDER PRODUCTS
================================================================= */
function renderProducts(filter) {
  if (!filter) filter = "all";
  activeFilter = filter;

  var grid     = document.getElementById("productsGrid");
  var list     = (filter === "all") ? products : products.filter(function(p) { return p.category === filter; });
  var html     = "";

  list.forEach(function(p) {
    var badgeHtml = "";
    if (p.soldOut) {
      badgeHtml = "<div class='product-badge badge-soldout'>SOLD OUT</div>";
    } else if (p.badge) {
      badgeHtml = "<div class='product-badge badge-" + p.badge + "'>" + p.badge.toUpperCase() + "</div>";
    }

    var wlClass = wishlist.has(p.id) ? " active" : "";
    var wlIcon  = wishlist.has(p.id) ? "❤️" : "🤍";
    var wlBtn   = "<button class='product-wishlist" + wlClass + "' onclick='toggleWishlist(" + p.id + ", event)'>" + wlIcon + "</button>";

    var priceHtml = "";
    if (p.soldOut) {
      priceHtml = "<span style='color:var(--text-muted);font-size:1rem;'>Out of Stock</span>";
    } else {
      priceHtml = "<span class='price-main'>KES " + p.price.toLocaleString() + "</span>";
      if (p.original) {
        priceHtml += "<span class='price-original'>KES " + p.original.toLocaleString() + "</span>";
      }
    }

    var cartBtn = p.soldOut
      ? "<button class='add-to-cart' style='opacity:0.3;cursor:not-allowed;' disabled title='Sold Out'>✕</button>"
      : "<button class='add-to-cart' onclick='addToCart(" + p.id + ", event)' title='Add to Cart'>+</button>";

    var catLabel  = (p.category === "accessories") ? "Phone Accessories" : "Electronics";
    var cardClass = "product-card reveal" + (p.soldOut ? " sold-out" : "");

    html +=
      "<div class='" + cardClass + "' data-id='" + p.id + "'>"
      + "<div class='product-img'>"
        + badgeHtml + wlBtn + productImg(p, "card")
      + "</div>"
      + "<div class='product-info'>"
        + "<div class='product-category'>" + catLabel + "</div>"
        + "<div class='product-name'>" + p.name + "</div>"
        + "<p class='product-desc'>" + p.desc + "</p>"
        + "<div class='product-footer'>"
          + "<div class='product-price'>" + priceHtml + "</div>"
          + "<div style='display:flex;gap:0.5rem;'>"
            + "<button class='add-to-cart' onclick='openProduct(" + p.id + ")' title='View'>👁</button>"
            + cartBtn
          + "</div>"
        + "</div>"
      + "</div>"
    + "</div>";
  });

  grid.innerHTML = html;
  observeReveal();
}


/* =================================================================
   5. RENDER BESTSELLERS
   -----------------------------------------------------------------
   Edit the products.find lines below to change featured products.
================================================================= */
function renderBestsellers() {
  var top = [
    products.find(function(p) { return p.id === 4;  }),
    products.find(function(p) { return p.id === 2;  }),
    products.find(function(p) { return p.id === 1;  }),
    products.find(function(p) { return p.id === 9;  }),
    products.find(function(p) { return p.id === 15; }),
  ];

  var f = top[0];

  document.getElementById("bsFeature").innerHTML =
    productImg(f, "feature")
    + "<div class='bs-feature-tag'>// #1 Best Seller</div>"
    + "<div class='bs-feature-name'>" + f.name + "</div>"
    + "<p class='bs-feature-desc'>" + f.desc + "</p>"
    + "<div class='bs-feature-price'>KES " + f.price.toLocaleString() + "</div>"
    + "<div style='display:flex;gap:0.75rem;'>"
      + "<button class='btn-primary' onclick='openProduct(" + f.id + ")' style='font-size:0.85rem;padding:0.75rem 1.5rem;'>Buy Now</button>"
      + "<button class='btn-outline' onclick='addToCart(" + f.id + ",{stopPropagation:function(){}})' style='font-size:0.85rem;padding:0.75rem 1.5rem;'>Add to Cart</button>"
    + "</div>";

  var lHtml = "";
  top.slice(1).forEach(function(p, i) {
    lHtml +=
      "<div class='bs-item' onclick='openProduct(" + p.id + ")'>"
      + "<div class='bs-item-num'>0" + (i + 2) + "</div>"
      + "<div class='bs-item-emoji'>" + productImg(p, "list") + "</div>"
      + "<div class='bs-item-info'>"
        + "<div class='bs-item-name'>" + p.name + "</div>"
        + "<div class='bs-item-price'>KES " + p.price.toLocaleString() + "</div>"
      + "</div>"
      + "<button class='bs-item-btn' onclick='addToCart(" + p.id + ",event)'>+ Cart</button>"
    + "</div>";
  });
  document.getElementById("bsList").innerHTML = lHtml;
}


/* =================================================================
   6. FILTER PRODUCTS
================================================================= */
function filterProducts(filter, tabEl) {
  document.querySelectorAll(".filter-tab").forEach(function(t) { t.classList.remove("active"); });
  if (tabEl) tabEl.classList.add("active");
  renderProducts(filter);
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}


/* =================================================================
   7. SOCIAL SHARING
   -----------------------------------------------------------------
   After hosting, product URLs look like: https://kenyatech.co.ke/#product-4
   Use these as your Facebook and TikTok ad destination URLs.
   When someone clicks the ad, the page opens and the product
   modal pops open automatically.
================================================================= */
function getProductURL(id) {
  return window.location.origin + window.location.pathname + "#product-" + id;
}

function shareProduct(id, platform) {
  var p = products.find(function(x) { return x.id === id; });
  if (!p) return;

  var url     = getProductURL(id);
  var message = "Check out " + p.name + " on KenyaTech! KES " + p.price.toLocaleString() + " — " + url;

  if (platform === "facebook") {
    window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url), "_blank");
  } else if (platform === "whatsapp") {
    window.open("https://wa.me/?text=" + encodeURIComponent(message), "_blank");
  } else {
    navigator.clipboard.writeText(url).then(function() {
      showToast(platform === "tiktok"
        ? "Link copied! Paste into your TikTok bio or video."
        : "Product link copied! Paste into your ad.");
    });
  }
}

function checkURLProduct() {
  var hash  = window.location.hash;
  var parts = hash.replace("#product-", "");
  var id    = parseInt(parts, 10);
  if (hash.indexOf("#product-") === 0 && id) {
    setTimeout(function() { openProduct(id); }, 600);
  }
}


/* =================================================================
   8. PRODUCT MODAL
================================================================= */
function openProduct(id) {
  // Product 4 (Power Bank) has its own dedicated page
  if (id === 4) {
    window.location.href = "powerbank.html";
    return;
  }

  var p = products.find(function(x) { return x.id === id; });
  if (!p) return;

  currentModalProductId = id;

  document.getElementById("modalImg").innerHTML     = productImg(p, "modal");
  document.getElementById("modalCat").textContent   = (p.category === "accessories") ? "Phone Accessories" : "Electronics";
  document.getElementById("modalName").textContent  = p.name;
  document.getElementById("modalDesc").textContent  = p.desc;
  document.getElementById("modalPrice").textContent = "KES " + p.price.toLocaleString();

  var buyBtn = document.getElementById("modalBuyBtn");
  var codBtn = document.getElementById("modalCodBtn");

  if (p.soldOut) {
    buyBtn.textContent   = "Currently Out of Stock";
    buyBtn.disabled      = true;
    buyBtn.style.opacity = "0.4";
    codBtn.textContent   = "Notify Me When Available";
    codBtn.onclick       = function() { showToast("We will notify you when this is back in stock!"); };
  } else {
    buyBtn.textContent   = "Buy Now — Pay on Delivery";
    buyBtn.disabled      = false;
    buyBtn.style.opacity = "1";
    buyBtn.onclick       = function() { closeModal(); openCheckout(p, "cod"); };
    codBtn.textContent   = "Pay on Delivery";
    codBtn.onclick       = function() { closeModal(); openCheckout(p, "cod"); };
  }

  document.getElementById("modalOverlay").classList.add("open");
}

function closeModal() {
  document.getElementById("modalOverlay").classList.remove("open");
}


/* =================================================================
   9. CART
================================================================= */
function addToCart(id, e) {
  if (e && e.stopPropagation) e.stopPropagation();

  var p = products.find(function(x) { return x.id === id; });
  if (!p) return;

  if (p.soldOut) {
    showToast("This item is currently out of stock");
    return;
  }

  var existing = cart.find(function(c) { return c.id === id; });
  if (existing) {
    existing.qty++;
  } else {
    var item = Object.assign({}, p);
    item.qty = 1;
    cart.push(item);
  }

  updateCartCount();
  showToast(p.emoji + " " + p.name + " added to cart!");
}

function removeFromCart(id) {
  cart = cart.filter(function(c) { return c.id !== id; });
  updateCartCount();
  renderCheckout();
}

function updateCartCount() {
  var total = cart.reduce(function(s, c) { return s + c.qty; }, 0);
  document.getElementById("cartCount").textContent = total;
}


/* =================================================================
   10. WISHLIST
================================================================= */
function toggleWishlist(id, e) {
  e.stopPropagation();
  if (wishlist.has(id)) {
    wishlist.delete(id);
  } else {
    wishlist.add(id);
    showToast("Added to wishlist!");
  }
  renderProducts(activeFilter);
}


/* =================================================================
   11. CHECKOUT
================================================================= */
function openCheckout(product, defaultPay) {
  if (product) addToCart(product.id, { stopPropagation: function() {} });
  if (defaultPay) selectedPayment = defaultPay;
  document.getElementById("checkoutOverlay").classList.add("open");
  document.getElementById("orderSuccess").classList.remove("show");
  document.getElementById("checkoutContent").style.display = "";
  renderCheckout();
}

function closeCheckout() {
  document.getElementById("checkoutOverlay").classList.remove("open");
}

function renderCheckout() {
  var content  = document.getElementById("checkoutContent");
  var subtotal = cart.reduce(function(s, c) { return s + c.price * c.qty; }, 0);
  var shipping = (subtotal >= 10000) ? 0 : 300;
  var total    = subtotal + shipping;
  var shipTxt  = (shipping === 0) ? "FREE" : "KES " + shipping;

  if (cart.length === 0) {
    content.innerHTML =
      "<div class='cart-empty'>"
      + "<div style='font-size:3rem;margin-bottom:1rem;'>🛒</div>"
      + "<p>Your cart is empty.</p>"
      + "<p style='margin-top:0.5rem;font-size:0.8rem;color:var(--text-muted)'>Browse products and add them here.</p>"
      + "</div>";
    return;
  }

  var itemsHtml = "";
  cart.forEach(function(c) {
    itemsHtml +=
      "<div class='cart-item'>"
      + "<div class='cart-item-emoji'>" + c.emoji + "</div>"
      + "<div class='cart-item-info'>"
        + "<div class='cart-item-name'>" + c.name + "</div>"
        + "<div class='cart-item-price'>KES " + (c.price * c.qty).toLocaleString() + (c.qty > 1 ? " x " + c.qty : "") + "</div>"
      + "</div>"
      + "<button class='cart-item-remove' onclick='removeFromCart(" + c.id + ")'>x</button>"
      + "</div>";
  });

  var codSel = (selectedPayment === "cod") ? " selected" : "";

  content.innerHTML =
    "<div class='cart-section'>"
    + "<div class='cart-section-title'>Cart Items (" + cart.length + ")</div>"
    + itemsHtml
    + "</div>"

    + "<div class='form-divider'>Customer Details</div>"
    + "<div class='form-group'><label class='form-label'>Full Name</label>"
    + "<input class='form-input' id='custName' placeholder='John Kamau' type='text'></div>"
    + "<div class='form-group'><label class='form-label'>Phone Number</label>"
    + "<input class='form-input' id='custPhone' placeholder='0712 345 678' type='tel'></div>"
    + "<div class='form-group'><label class='form-label'>Delivery Location</label>"
    + "<input class='form-input' id='custLocation' placeholder='e.g. Westlands, Nairobi' type='text'></div>"
    + "<div class='form-group'><label class='form-label'>Notes for Us <span style='color:var(--text-muted);font-weight:400;font-size:0.7rem;'>(optional)</span></label>"
    + "<textarea class='form-input' id='custNotes' placeholder='e.g. Call before delivery, specific colour, gift wrapping...' rows='3' style='resize:vertical;min-height:80px;'></textarea></div>"

    + "<div style='font-size:0.78rem;color:var(--text-dim);background:var(--dark3);border:1px solid var(--border);border-radius:var(--r);padding:0.6rem 0.9rem;margin-bottom:1rem;'>🚚 <strong style='color:var(--green)'>Free delivery</strong> on orders above KES 10,000</div>"
    + "<div class='form-divider'>Payment Method</div>"
    + "<div class='payment-options'>"
      + "<div class='pay-option' style='opacity:0.5;cursor:not-allowed;pointer-events:none;'>"
        + "<div class='pay-radio'></div>"
        + "<div class='pay-info'>"
          + "<div class='pay-name'>📲 M-Pesa STK Push "
            + "<span style='font-size:0.7rem;background:var(--gold);color:var(--black);padding:0.15rem 0.5rem;border-radius:3px;font-weight:700;margin-left:0.4rem;'>COMING SOON</span>"
          + "</div>"
          + "<div class='pay-desc'>M-Pesa payments launching soon — use Pay on Delivery for now</div>"
        + "</div>"
      + "</div>"
      + "<div class='pay-option" + codSel + "' onclick='selectPayment(\"cod\")'>"
        + "<div class='pay-radio'><div class='pay-radio-dot'></div></div>"
        + "<div class='pay-info'>"
          + "<div class='pay-name'>💰 Pay on Delivery</div>"
          + "<div class='pay-desc'>Pay cash when your order arrives</div>"
        + "</div>"
      + "</div>"
    + "</div>"

    + "<div class='order-summary'>"
      + "<div class='summary-row'><span style='color:var(--text-dim)'>Subtotal</span><span>KES " + subtotal.toLocaleString() + "</span></div>"
      + "<div class='summary-row'><span style='color:var(--text-dim)'>Delivery</span><span style='color:var(--green)'>" + shipTxt + "</span></div>"
      + "<div class='summary-row total'><span>Total</span><span class='summary-total-price'>KES " + total.toLocaleString() + "</span></div>"
    + "</div>"

    + "<button class='btn-place-order' onclick='placeOrder()'>Place Order — Pay on Delivery</button>"
    + "<p style='text-align:center;font-size:0.72rem;color:var(--text-muted);margin-top:0.75rem;'>Secure · 7-Day Returns · Cash on Delivery</p>";
}


/* =================================================================
   12. PAYMENT & ORDER
================================================================= */
function selectPayment(method) {
  selectedPayment = method;
  renderCheckout();
}

function placeOrder() {
  var nameEl     = document.getElementById("custName");
  var phoneEl    = document.getElementById("custPhone");
  var locationEl = document.getElementById("custLocation");
  var notesEl    = document.getElementById("custNotes");

  var name     = nameEl     ? nameEl.value.trim()    : "";
  var phone    = phoneEl    ? phoneEl.value.trim()    : "";
  var location = locationEl ? locationEl.value.trim() : "";
  var notes    = notesEl    ? notesEl.value.trim()    : "";

  if (!name || !phone || !location) {
    showToast("Please fill in all required fields");
    return;
  }
  if (!/^0[17]\d{8}$/.test(phone.replace(/\s/g, ""))) {
    showToast("Please enter a valid Kenyan phone number (07xx or 01xx)");
    return;
  }

  // Build readable items string for the spreadsheet
  var subtotal = cart.reduce(function(s, c) { return s + c.price * c.qty; }, 0);
  var shipping = (subtotal >= 10000) ? 0 : 300;
  var total    = subtotal + shipping;
  var itemsStr = cart.map(function(c) { return c.name + " x" + c.qty; }).join(", ");

  // ── GOOGLE SHEETS INTEGRATION ──────────────────────────
  // STEP 1: Go to https://sheet.best and connect your Google Sheet
  // STEP 2: Replace the URL below with your Sheet.best API URL
  // STEP 3: Make sure your Google Sheet has these column headers in Row 1:
  //         Name | Phone | Location | Items | Subtotal | Shipping | Total | Notes | Date

  //
  // Once you paste your URL above, orders will appear in your
  // Google Sheet automatically every time someone places an order.
  // ────────────────────────────────────────────────────────

  // ===== SAVE ORDER TO GOOGLE SHEET (sheet.best) =====
var SHEET_URL = "https://api.sheetbest.com/sheets/c7c9236a-8519-4a4c-8487-2aa23a68d4de";

var payload = {
  Name: name,
  Phone: phone,
  Location: location,
  Items: itemsStr,
  Total: "KES " + total.toLocaleString()
};

fetch(SHEET_URL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload)
})
.then(function(res) {
  if (!res.ok) throw new Error("Sheet save failed");
  return res.json();
})
.then(function(data) {
  console.log("Order saved to sheet:", data);
})
.catch(function(err) {
  console.error("Sheet.best error:", err);
  alert("⚠️ Order received but failed to save. Please contact us on WhatsApp to confirm.");
});

/* =================================================================
   13. TOAST
================================================================= */
var toastTimeout;
function showToast(msg) {
  var t = document.getElementById("toast");
  document.getElementById("toastText").textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(function() { t.classList.remove("show"); }, 2800);
}


/* =================================================================
   14. CUSTOM CURSOR
   -----------------------------------------------------------------
   Gold dot tracks mouse exactly. Outer ring follows with smooth lag.
   Guarded by null check so removing the HTML divs won't crash the page.
================================================================= */
var cursor = document.getElementById("cursor");
var ring   = document.getElementById("cursorRing");

if (cursor && ring) {
  var mx = 0, my = 0, rx = 0, ry = 0;

  // Position dot exactly on mouse — centred using half of 14px dot = 7px
  document.addEventListener("mousemove", function(e) {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = (mx - 7) + "px";
    cursor.style.top  = (my - 7) + "px";
  });

  // Ring lags behind smoothly — centred using half of 40px ring = 20px
  (function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = (rx - 20) + "px";
    ring.style.top  = (ry - 20) + "px";
    requestAnimationFrame(animateRing);
  })();

  // Hover grow effect on interactive elements
  function attachCursorHover() {
    document.querySelectorAll("a,button,.cat-card,.product-card,.bs-item,.pay-option,.filter-tab").forEach(function(el) {
      el.addEventListener("mouseenter", function() { cursor.classList.add("hovering"); ring.classList.add("hovering"); });
      el.addEventListener("mouseleave", function() { cursor.classList.remove("hovering"); ring.classList.remove("hovering"); });
    });
  }
  setTimeout(attachCursorHover, 300);
  setTimeout(attachCursorHover, 1200);
}


/* =================================================================
   15. SCROLL EFFECTS
================================================================= */
window.addEventListener("scroll", function() {
  document.getElementById("navbar").classList.toggle("scrolled", window.scrollY > 80);
});

function observeReveal() {
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry, i) {
      if (entry.isIntersecting) {
        setTimeout(function() { entry.target.classList.add("visible"); }, i * 80);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".reveal:not(.visible)").forEach(function(el) { obs.observe(el); });
}


/* =================================================================
   16. MOBILE MENU
================================================================= */
document.getElementById("menuBtn").addEventListener("click", function() {
  document.getElementById("mobileMenu").classList.toggle("open");
});

function closeMobileMenu() {
  document.getElementById("mobileMenu").classList.remove("open");
}


/* =================================================================
   OVERLAY — close on backdrop click
================================================================= */
document.getElementById("modalOverlay").addEventListener("click", function(e) {
  if (e.target === e.currentTarget) closeModal();
});
document.getElementById("checkoutOverlay").addEventListener("click", function(e) {
  if (e.target === e.currentTarget) closeCheckout();
});


/* =================================================================
   17. INIT
================================================================= */
renderProducts();
renderBestsellers();
observeReveal();
checkURLProduct();
