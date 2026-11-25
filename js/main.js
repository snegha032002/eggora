/* =========================================================
   WEBSITE 1 — shared script
   Edit SITE + PRODUCTS below; header, footer and cart are
   rendered from here on every page.
   ========================================================= */
const SITE = {
  brand: "Eggora",                       // ← placeholder brand name
  tagline: "Freshness in Every Egg",
  footerLine: "Goodness. Delivered.",
  email: "hello@example.com",
  phone: "+91 00000 00000",
  hours: "Mon – Sun, 6:00 am – 9:00 pm",
  address: "Your farm / store address here",
  whatsapp: "910000000000",              // ← your WhatsApp number with country code, digits only
  socials: { instagram: "#", facebook: "#", youtube: "#", whatsapp: "https://wa.me/910000000000" },
  freeDeliveryAbove: 299,
  deliveryFee: 30,
};

const PRODUCTS = [
  { id: "p6",   name: "6 Eggs Pack",     price: 60,  img: "images/pack-6.png",     cat: "packs",  note: "Classic farm fresh" },
  { id: "p12",  name: "12 Eggs Pack",    price: 110, img: "images/pack-12.png",    cat: "packs",  note: "The family dozen", badge: "Popular" },
  { id: "p30",  name: "30 Eggs Pack",    price: 260, img: "images/pack-30.png",    cat: "packs",  note: "Best value tray" },
  { id: "loose",name: "Farm Fresh Eggs", price: 8,   img: "images/pack-loose.png", cat: "loose",  note: "(Loose – per piece)", unit: "piece" },
  { id: "brown12", name: "Brown Eggs · 12",  price: 140, img: "images/pack-12.png",    cat: "special", note: "Free-range brown", badge: "Best Seller", rating: 5 },
  { id: "desi6",   name: "Country (Desi) · 6", price: 96, img: "images/pack-6.png",   cat: "special", note: "Rich & traditional", rating: 5 },
  { id: "omega6",  name: "Omega-3 Eggs · 6", price: 90,  img: "images/pack-loose.png", cat: "special", note: "Flax-fed hens", rating: 4 },
  { id: "tray30w", name: "White Tray · 30",  price: 250, img: "images/pack-30.png",    cat: "special", note: "For bakers", rating: 5 },
];
const BEST_SELLERS = ["brown12", "p12", "desi6", "omega6"];

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const inr = n => "₹" + n.toLocaleString("en-IN");
const byId = id => PRODUCTS.find(p => p.id === id);
const page = document.body.dataset.page || "home";

/* ---------- icons ---------- */
const ICON = {
  search: '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="8" r="6"/><path d="M12.5 12.5L17 17"/></svg>',
  user: '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4.2"/><path d="M3.5 21c1.3-4.3 4.6-6.4 8.5-6.4s7.2 2.1 8.5 6.4"/></svg>',
  cart: '<svg width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 3.5h3l2.4 12h11l2.1-8.5H6.6"/><circle cx="9.5" cy="20.5" r="1.4"/><circle cx="17.5" cy="20.5" r="1.4"/></svg>',
  menu: '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  arrow: '<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7h10M8 3l4 4-4 4"/></svg>',
  ig: '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="2" width="14" height="14" rx="4"/><circle cx="9" cy="9" r="3.3"/><circle cx="13.2" cy="4.8" r=".6" fill="currentColor"/></svg>',
  fb: '<svg width="18" height="18" fill="currentColor"><path d="M10 17v-6.5h2.2l.4-2.6H10V6.3c0-.8.3-1.3 1.4-1.3h1.3V2.7c-.6-.1-1.4-.2-2.1-.2-2 0-3.3 1.2-3.3 3.4v2H5.2v2.6h2.1V17z"/></svg>',
  yt: '<svg width="20" height="18" fill="currentColor"><path d="M19 5.3c-.2-.9-.9-1.6-1.8-1.8C15.6 3 10 3 10 3s-5.6 0-7.2.5C1.9 3.7 1.2 4.4 1 5.3.6 6.9.6 9 .6 9s0 2.1.4 3.7c.2.9.9 1.6 1.8 1.8C4.4 15 10 15 10 15s5.6 0 7.2-.5c.9-.2 1.6-.9 1.8-1.8.4-1.6.4-3.7.4-3.7s0-2.1-.4-3.7zM8 11.6V6.4L12.6 9z"/></svg>',
  wa: '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M2 16.5l1.1-3.7A7.3 7.3 0 1 1 5.7 15.3z"/><path d="M6.6 6.2c.2-.4.5-.4.7-.4h.4c.2 0 .3.1.4.3l.6 1.4c0 .2 0 .3-.1.4l-.4.5c-.1.1-.1.3 0 .4.5.9 1.3 1.6 2.2 2 .2.1.3 0 .4-.1l.5-.6c.1-.1.3-.2.4-.1l1.4.7c.2.1.3.2.3.4 0 .5-.2 1-.6 1.2-.5.3-1.2.4-2 .1a7.4 7.4 0 0 1-4.2-4.1c-.3-.8-.2-1.6 0-2.1z" fill="currentColor" stroke="none"/></svg>',
};
const LOGO_MARK = `<svg class="logo-mark" viewBox="0 0 48 48" aria-hidden="true">
  <defs><radialGradient id="lm" cx="40%" cy="30%" r="75%"><stop offset="0" stop-color="#FFE7A6"/><stop offset=".6" stop-color="#F6C944"/><stop offset="1" stop-color="#E0A21C"/></radialGradient></defs>
  <path d="M24 4c-7 0-12 10-12 17 0 7 5.4 11 12 11s12-4 12-11c0-7-5-17-12-17z" fill="url(#lm)"/>
  <path d="M24 44C17 44 7 38 5 26c7 0 14 4 19 12 5-8 12-12 19-12-2 12-12 18-19 18z" fill="#2A2824"/>
  <path d="M24 44c-3-6-9-11-17-14M24 44c3-6 9-11 17-14" stroke="#FFC414" stroke-width="1.4" fill="none"/></svg>`;

/* ---------- header & footer ---------- */
function renderChrome() {
  const links = [["index.html","Home","home"],["shop.html","Shop","shop"],["about.html","About","about"],["faq.html","FAQs","faq"],["contact.html","Contact","contact"]];
  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `<div class="topline"><div class="wrap"><span>Free delivery above ${inr(SITE.freeDeliveryAbove)}</span><span class="dot"></span><span>Order in one tap on WhatsApp</span><span class="dot"></span><span>Laid today, at your door tomorrow</span></div></div>
    <div class="wrap nav">
    <a href="index.html" class="logo">${LOGO_MARK}<span><span class="logo-name">${SITE.brand}</span><span class="logo-tag">${SITE.tagline}</span></span></a>
    <ul class="menu" id="menu">${links.map(([h,t,k]) => `<li><a href="${h}" class="${k===page?"active":""}">${t}</a></li>`).join("")}</ul>
    <div class="nav-tools">
      <form class="search" action="shop.html">${ICON.search}<input name="q" placeholder="Search eggs..." aria-label="Search eggs"></form>
      <a href="contact.html" class="icon-btn" aria-label="Account">${ICON.user}</a>
      <a href="order.html" class="icon-btn" id="cartBtn" aria-label="Your bag">${ICON.cart}<span class="cart-count" id="cartCount" hidden>0</span></a>
      <button class="icon-btn burger" id="burger" aria-label="Menu">${ICON.menu}</button>
    </div></div>`;
  document.body.prepend(header);

  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `<div class="wrap">
    <div class="foot-main">
      <a href="index.html" class="logo">${LOGO_MARK}<span class="logo-name">${SITE.brand}</span></a>
      <span class="divider"></span>
      <ul class="foot-links">${links.map(([h,t]) => `<li><a href="${h}">${t.replace("FAQs","FAQs")}</a></li>`).join("")}</ul>
      <div class="socials">
        <a href="${SITE.socials.instagram}" aria-label="Instagram">${ICON.ig}</a><a href="${SITE.socials.facebook}" aria-label="Facebook">${ICON.fb}</a>
        <a href="${SITE.socials.youtube}" aria-label="YouTube">${ICON.yt}</a><a href="${SITE.socials.whatsapp}" aria-label="WhatsApp">${ICON.wa}</a>
      </div>
      <div class="subscribe"><span>Subscribe for updates</span>
        <form id="subForm"><input type="email" placeholder="Your email address" required aria-label="Email"><button>Subscribe</button></form></div>
    </div>
    <div class="foot-word" aria-hidden="true">${SITE.brand}</div>
    <div class="foot-bottom"><span>© ${new Date().getFullYear()} ${SITE.brand}. All rights reserved.</span><em>${SITE.footerLine}</em></div></div>`;
  document.body.append(footer);

  // toast (bottom pill with "View bag")
  document.body.insertAdjacentHTML("beforeend", `<div class="toast" id="toast" role="status" aria-live="polite"></div>`);

  document.title = document.title.replace("Eggora", SITE.brand);
  $$("[data-brand]").forEach(el => el.textContent = SITE.brand);

  addEventListener("scroll", () => header.classList.toggle("scrolled", scrollY > 10), { passive: true });
  $("#burger").onclick = () => $("#menu").classList.toggle("open");
  $("#subForm").onsubmit = e => { e.preventDefault(); e.target.reset(); toast("Thanks for subscribing! 🥚"); };
}

/* ---------- bag (saved in this browser) ----------
   Ordering works like a WhatsApp checkout: products go into a bag,
   the bag icon opens order.html, and the order is sent on WhatsApp. */
let cart = {};
try { cart = JSON.parse(localStorage.getItem("w1-cart")) || {}; } catch { cart = {}; }
const saveCart = () => { try { localStorage.setItem("w1-cart", JSON.stringify(cart)); } catch {} };
const listeners = [];

function setQty(id, q) {
  q = Math.max(0, Math.min(99, q | 0));
  if (q) cart[id] = q; else delete cart[id];
  saveCart(); renderCart(); listeners.forEach(f => f());
}
function addToCart(id, qty = 1) {
  setQty(id, (cart[id] || 0) + qty);
  const c = $("#cartCount"); c.classList.remove("bump"); void c.offsetWidth; c.classList.add("bump");
  const p = byId(id);
  toast(`<span class="t-ic">✓</span><span>${qty} × ${p.name} added to your bag</span><a href="order.html">View bag →</a>`, true);
}
function renderCart() {
  const n = Object.keys(cart).filter(byId).reduce((a, id) => a + cart[id], 0);
  const c = $("#cartCount"); c.textContent = n; c.hidden = !n;
  $("#cartBtn").setAttribute("aria-label", n ? `Your bag, ${n} items` : "Your bag");
  $$("[data-buy]").forEach(paintBuy);
}
// On product cards the "Add +" button turns into a − n + counter once the pack is in the bag
function paintBuy(el) {
  const id = el.dataset.buy, q = cart[id] || 0;
  el.classList.toggle("has", !!q);
  el.innerHTML = q
    ? `<button data-dec="${id}" aria-label="One less">−</button><span>${q}</span><button data-inc="${id}" aria-label="One more">+</button>`
    : `<button class="add-btn" data-add="${id}">Add <span>+</span></button>`;
}
function bindCart() {
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-add],[data-inc],[data-dec]"); if (!b || b.closest("#order")) return;
    e.preventDefault();
    if (b.dataset.add) addToCart(b.dataset.add);
    if (b.dataset.inc) addToCart(b.dataset.inc);
    if (b.dataset.dec) setQty(b.dataset.dec, (cart[b.dataset.dec] || 0) - 1);
  });
  renderCart();
}
window.STORE = { site: SITE, products: PRODUCTS, inr, get: () => cart, set: setQty, clear: () => { cart = {}; saveCart(); renderCart(); listeners.forEach(f => f()); }, on: f => listeners.push(f) };

let toastT;
function toast(msg, html) {
  const t = $("#toast"); if (html) t.innerHTML = msg; else t.textContent = msg;
  t.classList.remove("show"); void t.offsetWidth; t.classList.add("show");
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 2800);
}

/* ---------- product cards ---------- */
const productCard = p => `<article class="product reveal">${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
  <div class="pimg"><img src="${p.img}" alt="${p.name}" loading="lazy"></div>
  <div class="row"><div><h3>${p.name}</h3>${p.unit ? `<div class="note">${p.note}</div>` : ""}<div class="price">${inr(p.price)}${p.unit ? ` <small>/ ${p.unit}</small>` : ""}</div></div>
  <div class="buy" data-buy="${p.id}"></div></div></article>`;

// Best sellers read like a chart: rank, photo, name, rating, price, add
const bestCard = (p, i = 0) => `<article class="best reveal"><span class="rank">${String(i + 1).padStart(2, "0")}</span>
  <img src="${p.img}" alt="${p.name}" loading="lazy">
  <div class="b-info"><h3>${p.name}</h3><span class="note">${p.note}</span></div>
  <div class="stars" aria-label="${p.rating || 5} out of 5">${"★".repeat(p.rating || 5)}${"☆".repeat(5 - (p.rating || 5))}</div>
  <strong class="b-price">${inr(p.price)}</strong><button class="mini-add" data-add="${p.id}" aria-label="Add ${p.name}">Add +</button></article>`;

function renderProducts() {
  const home = $("#homeProducts");
  if (home) home.innerHTML = ["p6", "p12", "p30", "loose"].map(id => productCard(byId(id))).join("");
  const best = $("#bestSellers");
  if (best) best.innerHTML = BEST_SELLERS.map((id, i) => bestCard(byId(id), i)).join("");
  const shop = $("#shopGrid");
  if (shop) {
    const q = new URLSearchParams(location.search).get("q") || "";
    if (q) $("#shopSearch").value = q;
    let cat = "all";
    const draw = () => {
      const term = $("#shopSearch").value.trim().toLowerCase();
      const list = PRODUCTS.filter(p => (cat === "all" || p.cat === cat) && (!term || (p.name + " " + p.note).toLowerCase().includes(term)));
      shop.innerHTML = list.length ? list.map(productCard).join("") : `<p class="empty">No eggs match “${term}”. Try another search.</p>`;
      $$("[data-buy]", shop).forEach(paintBuy);
      observeReveals();
    };
    $$(".chip").forEach(c => c.onclick = () => { $(".chip.active").classList.remove("active"); c.classList.add("active"); cat = c.dataset.cat; draw(); });
    $("#shopSearch").oninput = draw;
    draw();
  }
}

/* ---------- reviews slider ---------- */
function bindSlider() {
  const slides = $$(".slide"); if (!slides.length) return;
  const dots = $$(".dots button"); let i = 0, timer;
  const show = n => { slides[i].classList.remove("active"); dots[i].classList.remove("active"); i = (n + slides.length) % slides.length; slides[i].classList.add("active"); dots[i].classList.add("active"); clearInterval(timer); timer = setInterval(() => show(i + 1), 5000); };
  $("#prevReview").onclick = () => show(i - 1);
  $("#nextReview").onclick = () => show(i + 1);
  dots.forEach((d, n) => d.onclick = () => show(n));
  timer = setInterval(() => show(i + 1), 5000);
}

/* ---------- FAQ accordion ---------- */
function bindFaq() {
  $$(".faq-item").forEach(item => $(".faq-q", item).onclick = () => {
    const open = item.classList.contains("open");
    $$(".faq-item", item.parentElement).forEach(x => x.classList.remove("open"));
    if (!open) item.classList.add("open");
  });
}

/* ---------- forms (demo only — connect to email/WhatsApp/CRM later) ---------- */
function bindForms() {
  $$("form.form").forEach(f => f.onsubmit = e => { e.preventDefault(); f.classList.add("sent"); f.reset(); toast("Thank you! We'll get back to you soon."); });
}

/* ---------- counters & reveal ---------- */
function countUp(el) {
  const to = +el.dataset.count, suf = el.dataset.suffix || "", t0 = performance.now();
  (function step(t) { const k = Math.min(1, (t - t0) / 1600); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))).toLocaleString("en-IN") + suf; if (k < 1) requestAnimationFrame(step); })(t0);
}
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add("in"); $$("[data-count]", e.target).forEach(countUp); io.unobserve(e.target);
}), { threshold: .12 });
function observeReveals() {
  $$(".reveal:not(.in)").forEach((el, n) => {
    if (el.getBoundingClientRect().top < innerHeight) { el.classList.add("in"); $$("[data-count]", el).forEach(countUp); return; } // on screen at load: show right away
    el.classList.add("pre"); el.style.transitionDelay = (n % 4) * 80 + "ms"; io.observe(el);
  });
}

/* ---------- boot ---------- */
renderChrome();
renderProducts();
bindCart();
bindSlider();
bindFaq();
bindForms();
observeReveals();

/* ---------- cinematic extras ---------- */
// statement text lights up word by word as it scrolls through the screen
(function words() {
  const el = $("[data-words]"); if (!el) return;
  const walk = node => [...node.childNodes].forEach(c => {
    if (c.nodeType === 3) { const f = document.createDocumentFragment(); c.textContent.split(/(\s+)/).forEach(w => { if (!w.trim()) return f.append(w); const s = document.createElement("span"); s.className = "w"; s.textContent = w; f.append(s); }); c.replaceWith(f); }
    else walk(c);
  });
  walk(el);
  const ws = $$(".w", el);
  const paint = () => { const r = el.getBoundingClientRect(), p = Math.min(1, Math.max(0, (innerHeight * .85 - r.top) / (r.height + innerHeight * .35))); const n = Math.round(p * ws.length); ws.forEach((w, i) => w.classList.toggle("lit", i < n)); };
  addEventListener("scroll", paint, { passive: true }); paint();
})();
// best sellers: hovering a row shows its photo in the side frame
(function preview() {
  const box = $("#bestPreview"), list = $("#bestSellers"); if (!box || !list) return;
  const show = row => { const img = $("img", row); if (img) { box.style.backgroundImage = `url(${img.getAttribute("src")})`; box.classList.add("on"); } };
  list.addEventListener("mouseover", e => { const row = e.target.closest(".best"); if (row) show(row); });
  const first = $(".best", list); if (first) show(first);
})();
// best sellers ride a wave: each card bobs on a sine curve as the section scrolls past
(function waveCards() {
  const grid = $("#bestSellers"); if (!grid || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const band = grid.closest("section");
  const run = () => {
    const r = band.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;
    const p = (innerHeight - r.top) / (innerHeight + r.height);
    $$(".best", grid).forEach((c, i) => {
      const s = Math.sin(p * Math.PI * 3 + i * 0.95);
      c.style.translate = `0 ${(s * 26).toFixed(1)}px`;
      c.style.rotate = `${(s * 1.6).toFixed(2)}deg`;
    });
  };
  addEventListener("scroll", run, { passive: true }); addEventListener("resize", run); run();
})();
