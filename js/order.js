/* =========================================================
   ORDER PAGE — WhatsApp checkout (shared by all three sites)
   Needs window.STORE from main.js:
     STORE.site, STORE.products, STORE.inr, STORE.get(), STORE.set(id, qty), STORE.clear(), STORE.on(fn)
   The look comes from each site's own CSS (.od-* classes).
   ========================================================= */
(function () {
  const S = window.STORE, root = document.getElementById("order");
  if (!S || !root) return;
  const inr = S.inr, site = S.site;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const minus = '<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M3 7h8"/></svg>';
  const plus = '<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M3 7h8M7 3v8"/></svg>';
  const wa = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.1.7a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .2-1.2c-.1-.1-.3-.2-.5-.3z"/></svg>';

  const fields = [
    ["name", "Full name", "text", "Your name", "name"],
    ["phone", "Mobile number", "tel", "10-digit mobile", "tel"],
    ["address", "Address", "textarea", "House no., street, area, landmark", "street-address", true],
    ["city", "City", "text", "City", "address-level2"],
    ["pincode", "Pincode", "text", "6-digit pincode", "postal-code"],
  ];
  const slots = ["Morning, 6 – 9 am", "Late morning, 9 am – 12 pm", "Evening, 5 – 8 pm"];

  root.innerHTML = `
  <form class="od-grid" id="odForm" novalidate>
    <div class="od-main">
      <section class="od-step" id="odStep1">
        <h2 class="od-title"><span>1</span> Choose your eggs</h2>
        <p class="od-err od-err--block" id="odEmpty" hidden>Add at least one pack to place an order.</p>
        <ul class="od-items" id="odItems"></ul>
      </section>
      <section class="od-step">
        <h2 class="od-title"><span>2</span> Delivery details</h2>
        <div class="od-fields">
          ${fields.map(([k, label, type, ph, ac, full]) => `<div class="od-field${full ? " od-field--full" : ""}">
            <label for="od-${k}">${label} *</label>
            ${type === "textarea" ? `<textarea id="od-${k}" name="${k}" rows="3" placeholder="${ph}" autocomplete="${ac}"></textarea>`
              : `<input id="od-${k}" name="${k}" type="${type}" placeholder="${ph}" autocomplete="${ac}"${k === "pincode" ? ' inputmode="numeric" maxlength="6"' : ""}${k === "phone" ? ' inputmode="tel"' : ""}>`}
            <p class="od-err" id="od-e-${k}" hidden></p></div>`).join("")}
          <div class="od-field"><label for="od-slot">Delivery slot</label><select id="od-slot" name="slot">${slots.map(s => `<option>${s}</option>`).join("")}</select></div>
          <div class="od-field od-field--full"><label for="od-notes">Note <span class="od-muted">(optional)</span></label><input id="od-notes" name="notes" placeholder="Gate code, call before delivery, etc."></div>
        </div>
      </section>
    </div>
    <aside class="od-sum" aria-label="Order summary">
      <h2>Order summary</h2>
      <div id="odLines"></div>
      <div class="od-row"><span>Subtotal</span><span id="odSub">₹0</span></div>
      <div class="od-row od-muted"><span>Delivery</span><span id="odDel">–</span></div>
      <div class="od-total"><span>Total</span><strong id="odTotal">₹0</strong></div>
      <button type="submit" class="od-wa">${wa} Place order on WhatsApp</button>
      <p class="od-note">WhatsApp opens with your order already typed. Just tap send and we'll confirm the delivery time and payment.</p>
      <details class="od-preview" id="odPrev" hidden><summary>Preview message</summary><pre id="odMsg"></pre></details>
      <a class="od-more" href="shop.html">Continue shopping →</a>
    </aside>
  </form>
  <div class="od-done" id="odDone" hidden>
    <span class="od-done__icon">✓</span>
    <h2>Almost done!</h2>
    <p>Your order has opened in WhatsApp. Just tap <strong>send</strong> and we'll confirm delivery and payment there.</p>
    <p class="od-muted">WhatsApp didn't open? <a id="odRetry" href="#" target="_blank" rel="noreferrer">Tap here to try again</a>.</p>
    <div class="od-done__actions"><button type="button" class="od-wa" id="odClear">I've sent it, clear my bag</button><a class="od-more" href="index.html">Back to home</a></div>
  </div>`;

  const form = document.getElementById("odForm");
  const val = k => (form.elements[k]?.value || "").trim();

  function lines() {
    const bag = S.get();
    return S.products.filter(p => bag[p.id] > 0).map(p => ({ p, q: bag[p.id] }));
  }
  function totals() {
    const sub = lines().reduce((a, l) => a + l.p.price * l.q, 0);
    const del = sub === 0 ? 0 : sub >= site.freeDeliveryAbove ? 0 : site.deliveryFee;
    return { sub, del, total: sub + del };
  }
  function message() {
    const t = totals();
    const out = [`Hi ${site.brand}! I'd like to place an order:`, ""];
    lines().forEach(({ p, q }) => out.push(`• ${q} × ${p.name}${p.unit ? " (per " + p.unit + ")" : ""} — ${inr(p.price * q)}`));
    out.push("", `Subtotal: ${inr(t.sub)}`, `Delivery: ${t.del ? inr(t.del) : "Free"}`, `Total: ${inr(t.total)}`, "");
    out.push(`Name: ${val("name")}`, `Mobile: ${val("phone")}`, `Address: ${val("address")}, ${val("city")} - ${val("pincode")}`, `Delivery slot: ${val("slot")}`);
    if (val("notes")) out.push(`Note: ${val("notes")}`);
    return out.join("\n");
  }
  const waLink = () => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message())}`;

  function draw() {
    const bag = S.get();
    document.getElementById("odItems").innerHTML = S.products.map(p => {
      const q = bag[p.id] || 0;
      return `<li class="od-item${q ? " is-in" : ""}">
        <img src="${p.img}" alt="${esc(p.name)}">
        <div class="od-item__info"><h3>${esc(p.name)}</h3><p>${inr(p.price)}${p.unit ? " / " + p.unit : ""}</p></div>
        <div class="od-item__ctrl">${q
          ? `<div class="od-qty" role="group" aria-label="${esc(p.name)} quantity"><button type="button" data-od-dec="${p.id}" aria-label="Decrease">${minus}</button><span>${q}</span><button type="button" data-od-inc="${p.id}" aria-label="Increase">${plus}</button></div><span class="od-line">${inr(p.price * q)}</span>`
          : `<button type="button" class="od-add" data-od-add="${p.id}">${plus} Add</button>`}</div></li>`;
    }).join("");
    const ls = lines(), t = totals();
    document.getElementById("odLines").innerHTML = ls.length
      ? `<ul class="od-lines">${ls.map(({ p, q }) => `<li><span>${esc(p.name)} <em>× ${q}</em></span><span>${inr(p.price * q)}</span></li>`).join("")}</ul>`
      : `<p class="od-empty">Your bag is empty. Add a pack to get started.</p>`;
    document.getElementById("odSub").textContent = inr(t.sub);
    document.getElementById("odDel").textContent = !t.sub ? "–" : t.del ? inr(t.del) + ` (free above ${inr(site.freeDeliveryAbove)})` : "Free";
    document.getElementById("odTotal").textContent = inr(t.total);
    document.getElementById("odPrev").hidden = !ls.length;
    document.getElementById("odMsg").textContent = message();
    if (ls.length) { document.getElementById("odEmpty").hidden = true; document.getElementById("odStep1").classList.remove("has-error"); }
  }

  root.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    const bag = S.get();
    if (b.dataset.odAdd) S.set(b.dataset.odAdd, 1);
    if (b.dataset.odInc) S.set(b.dataset.odInc, (bag[b.dataset.odInc] || 0) + 1);
    if (b.dataset.odDec) S.set(b.dataset.odDec, (bag[b.dataset.odDec] || 0) - 1);
  });
  form.addEventListener("input", () => { document.getElementById("odMsg").textContent = message(); });

  function check() {
    const err = {};
    if (!val("name")) err.name = "Please enter your name.";
    const phone = val("phone").replace(/[\s-]/g, "").replace(/^(\+?91)/, "");
    if (!/^[6-9]\d{9}$/.test(phone)) err.phone = "Enter a 10-digit mobile number.";
    if (!val("address")) err.address = "Please enter your address.";
    if (!val("city")) err.city = "Please enter your city.";
    if (!/^\d{6}$/.test(val("pincode"))) err.pincode = "Enter a 6-digit pincode.";
    fields.forEach(([k]) => { const p = document.getElementById("od-e-" + k); p.hidden = !err[k]; p.textContent = err[k] || ""; form.elements[k].classList.toggle("is-bad", !!err[k]); });
    return err;
  }
  form.addEventListener("submit", e => {
    e.preventDefault();
    const empty = !lines().length, err = check();
    document.getElementById("odEmpty").hidden = !empty;
    document.getElementById("odStep1").classList.toggle("has-error", empty);
    if (empty) { document.getElementById("odStep1").scrollIntoView({ behavior: "smooth", block: "center" }); return; }
    const first = Object.keys(err)[0]; if (first) { form.elements[first].focus(); return; }
    const link = waLink();
    try { window.open(link, "_blank", "noopener"); } catch {}
    document.getElementById("odRetry").href = link;
    form.hidden = true; document.getElementById("odDone").hidden = false;
    scrollTo({ top: root.offsetTop - 120, behavior: "smooth" });
  });
  document.getElementById("odClear").onclick = () => { S.clear(); form.reset(); form.hidden = false; document.getElementById("odDone").hidden = true; draw(); };

  S.on(draw);
  draw();
})();
