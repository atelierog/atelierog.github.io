document.addEventListener("DOMContentLoaded", function () {
  const PUBLIC_KEY = "tisfWARykoKp6CDyf";
  const SERVICE_ID = "service_i7vdsrr";
  const ADMIN_TEMPLATE = "template_itx7vmu";
  const CUSTOMER_TEMPLATE = "template_apr6ncq";

  if (typeof emailjs !== "undefined") emailjs.init({ publicKey: PUBLIC_KEY });

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const quoteItems = [];
  const quoteItemsEl = document.getElementById("quoteItems");
  const quoteTotalEl = document.getElementById("quoteTotal");
  const requestQuote = document.getElementById("requestQuote");
  const modal = document.getElementById("quoteModal");
  const form = document.getElementById("quoteForm");
  const selectedPackage = document.getElementById("selectedPackage");
  const status = document.getElementById("formStatus");

  function money(n) { return Number(n).toLocaleString("en-IN"); }
  function itemTotal(item) { return (item.price * item.qty) + item.addonTotal; }
  function total() { return quoteItems.reduce((sum, item) => sum + itemTotal(item), 0); }

  function renderQuote() {
    if (!quoteItems.length) {
      quoteItemsEl.innerHTML = '<p class="empty-quote">No services selected yet.</p>';
      requestQuote.disabled = true;
    } else {
      quoteItemsEl.innerHTML = quoteItems.map((item, index) => {
        const addonText = item.addons.length ? item.addons.map(a => `${a.name} +₹${money(a.price)}`).join(" · ") : "No extras";
        return `
        <div class="quote-line">
          <div>
            <strong>${item.name}</strong>
            <small>₹${money(item.price)} base × ${item.qty}</small>
            <small>${addonText}</small>
            <small class="quote-delivery">⏱ Delivery: ${item.delivery}</small>
          </div>
          <div class="quote-controls">
            <button type="button" data-minus="${index}">−</button>
            <span>${item.qty}</span>
            <button type="button" data-plus="${index}">+</button>
            <b>₹${money(itemTotal(item))}</b>
            <button class="remove-item" type="button" data-remove="${index}" aria-label="Remove">×</button>
          </div>
        </div>`;
      }).join("");
      requestQuote.disabled = false;
    }
    quoteTotalEl.textContent = money(total());
  }

  quoteItemsEl.addEventListener("click", function (e) {
    const plus = e.target.closest("[data-plus]");
    const minus = e.target.closest("[data-minus]");
    const remove = e.target.closest("[data-remove]");
    if (plus) quoteItems[+plus.dataset.plus].qty++;
    if (minus) { const i = +minus.dataset.minus; quoteItems[i].qty--; if (quoteItems[i].qty <= 0) quoteItems.splice(i, 1); }
    if (remove) quoteItems.splice(+remove.dataset.remove, 1);
    renderQuote();
  });

  document.querySelectorAll(".add-service").forEach(button => {
    button.addEventListener("click", function () {
      const itemBody = button.closest(".item-body");
      const qtyInput = itemBody ? itemBody.querySelector(".service-qty") : null;
      const qty = Math.max(1, Number(qtyInput?.value || 1));
      const name = button.dataset.service;
      const price = Number(button.dataset.price || 0);
      const addons = [...(itemBody?.querySelectorAll(".service-addon:checked") || [])].map(input => ({
        name: input.dataset.addon || "Extra",
        price: Number(input.dataset.price || 0)
      }));
      const addonTotal = addons.reduce((sum, addon) => sum + addon.price, 0);
      const delivery = button.dataset.delivery || "To be confirmed";
      const addonKey = addons.map(a => `${a.name}:${a.price}`).sort().join("|");
      const existing = quoteItems.find(item => item.name === name && item.price === price && item.addonKey === addonKey);
      if (existing) existing.qty += qty;
      else quoteItems.push({ name, price, qty, addons, addonTotal, addonKey, delivery });
      renderQuote();
      button.textContent = "Added ✓";
      setTimeout(() => button.textContent = "Add Service", 1000);
    });
  });

  function openModal() {
    if (!quoteItems.length) return;
    const itemText = quoteItems.map(i => {
      const extras = i.addons.length ? ` | ${i.addons.map(a => `${a.name} +₹${money(a.price)}`).join(", ")}` : "";
      return `${i.name} × ${i.qty} — ₹${money(itemTotal(i))} | Estimated delivery: ${i.delivery}${extras}`;
    }).join("\n");
    const grandTotal = total();
    document.getElementById("quoteService").value = "Multiple Services";
    document.getElementById("quotePackage").value = quoteItems.map(i => `${i.name} × ${i.qty}`).join(", ");
    document.getElementById("quotePrice").value = grandTotal;
    document.getElementById("quoteFormTotal").value = grandTotal;
    document.getElementById("quoteSelectedItems").value = itemText;
    document.getElementById("quoteConditions").value = "Estimate based on selected starting prices and extras. Final price confirmed after requirements are reviewed.";
    document.getElementById("quoteId").value = "AOG-" + new Date().getFullYear() + "-" + Math.floor(100000 + Math.random() * 900000);
    selectedPackage.innerHTML = `<strong>${quoteItems.length} service${quoteItems.length > 1 ? "s" : ""} selected</strong><div class="modal-items">${itemText.replace(/\n/g, "<br>")}</div><strong class="modal-total">Estimated total: ₹${money(grandTotal)}</strong>`;
    status.textContent = "";
    status.className = "form-status";
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  requestQuote.addEventListener("click", openModal);
  document.querySelectorAll("[data-close-quote]").forEach(el => el.addEventListener("click", closeModal));
  document.addEventListener("keydown", e => { if (e.key === "Escape" && modal.classList.contains("open")) closeModal(); });

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    if (typeof emailjs === "undefined") { status.textContent = "Email service is not loaded. Please refresh and try again."; status.className = "form-status error"; return; }
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true; button.textContent = "SENDING..."; status.textContent = "Sending your service request..."; status.className = "form-status";
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      await emailjs.send(SERVICE_ID, ADMIN_TEMPLATE, data);
      await emailjs.send(SERVICE_ID, CUSTOMER_TEMPLATE, data);
      status.textContent = "Service request sent successfully! Check your email.";
      status.className = "form-status success";
      form.reset();
      quoteItems.length = 0;
      renderQuote();
      setTimeout(closeModal, 2800);
    } catch (error) {
      console.error("EmailJS error:", error);
      status.textContent = "Service request could not be sent. Please try again.";
      status.className = "form-status error";
    } finally {
      button.disabled = false; button.textContent = "Request Service →";
    }
  });

  renderQuote();
  });
