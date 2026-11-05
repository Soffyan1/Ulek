/**
 * ULEK Archipelago Reserve Sambal Checkout & Payment Engine
 * Production Ready Indonesian DTC Checkout Flow
 */

(function () {
  "use strict";

  // State
  let cart = [];
  let selectedCourier = "instant"; // 'instant' | 'paxel' | 'express'
  let selectedPayment = "qris"; // 'qris' | 'bank-transfer'
  let selectedBank = {
    code: "bca",
    name: "BCA Virtual Account",
    va: "8801 2893 4719 0021",
    logo: "./payment/bca.webp",
  };
  let appliedDiscount = 0; // in IDR
  let promoCodeApplied = "";
  let countdownInterval = null;

  function formatRupiah(num) {
    return "Rp" + Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  // Load cart from localStorage or fallback
  function loadCart() {
    try {
      const saved = localStorage.getItem("ulek_pantry_cart_v2");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          cart = parsed;
          return;
        }
      }
    } catch (e) {
      console.warn("Could not load cart from localStorage", e);
    }

    // Default item if cart is empty
    cart = [
      {
        id: "gift-box-matah-roa-bajak-andaliman",
        title: "4 Jar Archipelago Linen Gift Box",
        subtitle: "Jars: Matah, Roa, Bajak, Andaliman · + Dietary Guide Card",
        price: 380000,
        qty: 1,
        image: "./assets/kora-pantry-table.png"
      }
    ];
  }

  function saveCart() {
    try {
      localStorage.setItem("ulek_pantry_cart_v2", JSON.stringify(cart));
    } catch (e) {
      console.warn("Could not save cart", e);
    }
  }

  function getSubtotal() {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  function getShippingFee() {
    const subtotal = getSubtotal();
    if (selectedCourier === "instant") {
      return 25000;
    } else if (selectedCourier === "paxel") {
      return 20000;
    } else if (selectedCourier === "express") {
      return subtotal >= 300000 ? 0 : 15000;
    }
    return 25000;
  }

  function calculateTotals() {
    const subtotal = getSubtotal();
    const shipping = getShippingFee();
    const total = Math.max(0, subtotal + shipping - appliedDiscount);

    const subtotalEl = document.getElementById("calc-subtotal");
    const shippingEl = document.getElementById("calc-shipping");
    const totalEl = document.getElementById("calc-total");
    const payBtn = document.getElementById("pay-now-btn");
    const discountRow = document.getElementById("calc-discount-row");
    const discountEl = document.getElementById("calc-discount");
    const expressPriceEl = document.getElementById("courier-express-price");

    if (subtotalEl) subtotalEl.textContent = formatRupiah(subtotal);
    if (shippingEl) {
      shippingEl.textContent = shipping === 0 ? "GRATIS (Rp0)" : formatRupiah(shipping);
      shippingEl.style.color = shipping === 0 ? "#2E7D32" : "var(--kora-ink)";
    }

    if (expressPriceEl) {
      if (subtotal >= 300000) {
        expressPriceEl.innerHTML = '<span class="courier-price-free">GRATIS</span>';
      } else {
        expressPriceEl.innerHTML = "<span>Rp15.000</span>";
      }
    }

    if (discountRow && discountEl) {
      if (appliedDiscount > 0) {
        discountRow.style.display = "flex";
        discountEl.textContent = "-" + formatRupiah(appliedDiscount);
      } else {
        discountRow.style.display = "none";
      }
    }

    if (totalEl) totalEl.textContent = formatRupiah(total);
    if (payBtn) {
      payBtn.innerHTML = `<span>Bayar Sekarang · ${formatRupiah(total)}</span>`;
    }
  }

  function renderOrderItems() {
    const container = document.getElementById("checkout-items-list");
    if (!container) return;

    if (cart.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:30px 10px; color:var(--kora-muted); font-size:0.86rem;">
          Pantry Bag Anda kosong. <a href="index.html" style="color:var(--ulek-red-orange); font-weight:700;">Kembali berbelanja</a>
        </div>
      `;
      calculateTotals();
      return;
    }

    container.innerHTML = cart
      .map(
        (item, idx) => `
      <div class="checkout-item-row">
        <img src="${item.image}" alt="${item.title}" class="checkout-item-thumb" width="52" height="52">
        <div>
          <h4 class="checkout-item-name">${item.title}</h4>
          <div class="checkout-item-sub">${item.subtitle || ""}</div>
          <div style="display:flex; align-items:center; gap:8px; margin-top:6px;">
            <div class="qty-control-pill" style="transform:scale(0.88); transform-origin:left center; margin:0;">
              <button type="button" data-item-dec="${idx}" aria-label="Kurangi kuantitas">−</button>
              <span class="tabular-nums">${item.qty}</span>
              <button type="button" data-item-inc="${idx}" aria-label="Tambah kuantitas">+</button>
            </div>
            <button type="button" data-item-del="${idx}" style="background:none; border:none; color:var(--kora-muted); font-size:0.72rem; cursor:pointer; text-decoration:underline;">
              Hapus
            </button>
          </div>
        </div>
        <div class="checkout-item-price tabular-nums">
          ${formatRupiah(item.price * item.qty)}
        </div>
      </div>
    `
      )
      .join("");

    // Attach dec / inc / del listeners
    container.querySelectorAll("[data-item-dec]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.getAttribute("data-item-dec"));
        if (cart[idx]) {
          cart[idx].qty -= 1;
          if (cart[idx].qty <= 0) cart.splice(idx, 1);
          saveCart();
          renderOrderItems();
        }
      });
    });

    container.querySelectorAll("[data-item-inc]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.getAttribute("data-item-inc"));
        if (cart[idx]) {
          cart[idx].qty += 1;
          saveCart();
          renderOrderItems();
        }
      });
    });

    container.querySelectorAll("[data-item-del]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.getAttribute("data-item-del"));
        cart.splice(idx, 1);
        saveCart();
        renderOrderItems();
      });
    });

    calculateTotals();
  }

  function initCourierSelection() {
    document.querySelectorAll(".courier-card[data-courier]").forEach((card) => {
      card.addEventListener("click", () => {
        document.querySelectorAll(".courier-card[data-courier]").forEach((c) => {
          c.classList.remove("is-active");
        });
        card.classList.add("is-active");
        selectedCourier = card.getAttribute("data-courier");
        calculateTotals();
      });
    });
  }

  function initPaymentSelection() {
    // Payment cards toggle
    document.querySelectorAll(".payment-method-card[data-payment]").forEach((card) => {
      card.addEventListener("click", (e) => {
        // If clicking directly on a bank item or copy button, let their handlers process
        if (e.target.closest(".bank-item") || e.target.closest(".bank-copy-btn")) {
          return;
        }
        document.querySelectorAll(".payment-method-card[data-payment]").forEach((c) => {
          c.classList.remove("is-active");
        });
        card.classList.add("is-active");
        selectedPayment = card.getAttribute("data-payment");
      });
    });

    // Bank item selection inside Transfer Bank accordion
    document.querySelectorAll(".bank-item[data-bank-code]").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        const parentCard = item.closest(".payment-method-card");
        if (parentCard) {
          document.querySelectorAll(".payment-method-card[data-payment]").forEach((c) => {
            c.classList.remove("is-active");
          });
          parentCard.classList.add("is-active");
          selectedPayment = "bank-transfer";
        }

        document.querySelectorAll(".bank-item[data-bank-code]").forEach((b) => {
          b.classList.remove("is-selected");
        });
        item.classList.add("is-selected");

        const code = item.getAttribute("data-bank-code");
        const name = item.getAttribute("data-bank-name");
        const va = item.getAttribute("data-bank-va");
        const logo = item.getAttribute("data-bank-logo") || `./payment/${code}.webp`;

        selectedBank = { code, name, va, logo };

        const titleEl = document.getElementById("active-bank-title");
        const vaEl = document.getElementById("active-bank-va-num");
        const logoEl = document.getElementById("active-bank-logo");
        if (titleEl) titleEl.textContent = name;
        if (vaEl) vaEl.textContent = va;
        if (logoEl) {
          logoEl.src = logo;
          logoEl.alt = name;
        }
      });
    });

    // Copy bank VA inside accordion
    const copyBankVaBtn = document.getElementById("copy-bank-va-num-btn");
    if (copyBankVaBtn) {
      copyBankVaBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const vaEl = document.getElementById("active-bank-va-num");
        if (vaEl) {
          navigator.clipboard.writeText(vaEl.textContent.replace(/\s+/g, ""));
          copyBankVaBtn.textContent = "Tersalin!";
          setTimeout(() => {
            copyBankVaBtn.textContent = "Salin";
          }, 2000);
        }
      });
    }
  }

  function initGiftingToggle() {
    const check = document.getElementById("gift-toggle-check");
    const wrapper = document.getElementById("gift-fields-wrapper");
    if (check && wrapper) {
      check.addEventListener("change", () => {
        wrapper.style.display = check.checked ? "flex" : "none";
      });
    }
  }

  function initPromoCode() {
    const input = document.getElementById("checkout-promo-input");
    const btn = document.getElementById("checkout-promo-btn");
    const msg = document.getElementById("promo-message");
    if (!input || !btn || !msg) return;

    btn.addEventListener("click", () => {
      const code = input.value.trim().toUpperCase();
      if (!code) return;

      if (code === "ULEK2026" || code === "ANTIKODE") {
        const subtotal = getSubtotal();
        appliedDiscount = Math.round(subtotal * 0.1); // 10% discount
        promoCodeApplied = code;
        msg.textContent = `✓ Kode ${code} aktif! Diskon 10% (${formatRupiah(appliedDiscount)}) diterapkan.`;
        msg.style.color = "#2E7D32";
        msg.style.display = "block";
      } else {
        appliedDiscount = 0;
        promoCodeApplied = "";
        msg.textContent = "Kode promo tidak ditemukan atau telah kedaluwarsa.";
        msg.style.color = "var(--ulek-red-orange)";
        msg.style.display = "block";
      }
      calculateTotals();
    });
  }

  function startCountdownTimer(seconds) {
    const el = document.getElementById("success-countdown");
    if (!el) return;

    let remaining = seconds;
    if (countdownInterval) clearInterval(countdownInterval);

    countdownInterval = setInterval(() => {
      remaining -= 1;
      if (remaining <= 0) {
        clearInterval(countdownInterval);
        el.textContent = "00:00 (Kedaluwarsa)";
        return;
      }
      const mins = Math.floor(remaining / 60);
      const secs = remaining % 60;
      el.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }, 1000);
  }

  function initPayNowAction() {
    const btn = document.getElementById("pay-now-btn");
    const modal = document.getElementById("checkout-success-modal");
    if (!btn || !modal) return;

    btn.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("Pantry Bag Anda masih kosong. Silakan pilih produk terlebih dahulu.");
        return;
      }

      // Validate inputs
      const nameInput = document.getElementById("contact-name");
      const phoneInput = document.getElementById("contact-phone");
      const addressInput = document.getElementById("shipping-address");

      if (nameInput && !nameInput.value.trim()) {
        nameInput.focus();
        nameInput.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
      if (phoneInput && !phoneInput.value.trim()) {
        phoneInput.focus();
        phoneInput.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
      if (addressInput && !addressInput.value.trim()) {
        addressInput.focus();
        addressInput.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }

      // Show loading text on button
      btn.disabled = true;
      btn.innerHTML = `<span>Memproses Pembayaran...</span>`;

      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = `<span>Bayar Sekarang</span>`;
        calculateTotals();

        // Generate unique order ID without hyphens
        const orderId = "#ULK 2026 " + Math.floor(1000 + Math.random() * 9000);
        const orderIdEl = document.getElementById("success-order-id");
        if (orderIdEl) orderIdEl.textContent = orderId;

        const subtotal = getSubtotal();
        const shipping = getShippingFee();
        const finalTotal = Math.max(0, subtotal + shipping - appliedDiscount);
        const finalTotalEl = document.getElementById("success-final-total");
        if (finalTotalEl) finalTotalEl.textContent = formatRupiah(finalTotal);

        const recipientName =
          (document.getElementById("gift-toggle-check")?.checked &&
            document.getElementById("gift-recipient-name")?.value.trim()) ||
          nameInput.value.trim();
        const recipEl = document.getElementById("success-recipient-name");
        if (recipEl) recipEl.textContent = recipientName;

        // Toggle QRIS vs VA display in modal
        const qrisContainer = document.getElementById("success-qris-container");
        const vaContainer = document.getElementById("success-va-container");
        if (selectedPayment === "bank-transfer") {
          if (qrisContainer) qrisContainer.style.display = "none";
          if (vaContainer) vaContainer.style.display = "block";
          const vaNum = document.getElementById("success-va-number");
          const vaTitle = document.getElementById("success-va-title");
          const vaLogo = document.getElementById("success-va-logo");
          if (vaTitle) {
            vaTitle.textContent = selectedBank.name;
          }
          if (vaNum) {
            vaNum.textContent = selectedBank.va;
          }
          if (vaLogo) {
            vaLogo.src = selectedBank.logo;
            vaLogo.alt = selectedBank.name;
          }
        } else {
          if (qrisContainer) qrisContainer.style.display = "block";
          if (vaContainer) vaContainer.style.display = "none";
          startCountdownTimer(900); // 15 mins
        }

        // WhatsApp link prefilled
        const waLink = document.getElementById("whatsapp-confirm-link");
        if (waLink) {
          const itemsText = cart.map((i) => `${i.qty}x ${i.title}`).join(", ");
          const msgText = encodeURIComponent(
            `Halo Admin ULEK! Saya ingin konfirmasi pesanan ${orderId} senilai ${formatRupiah(
              finalTotal
            )} (${itemsText}) atas nama ${recipientName}. Mohon verifikasi pengirimannya. Terima kasih!`
          );
          waLink.href = `https://wa.me/6281289347192?text=${msgText}`;
        }

        // Show success modal
        modal.style.display = "flex";
      }, 900);
    });

    // Copy VA Button
    const copyVaBtn = document.getElementById("copy-va-btn");
    if (copyVaBtn) {
      copyVaBtn.addEventListener("click", () => {
        const vaNum = document.getElementById("success-va-number")?.textContent.trim();
        if (vaNum) {
          navigator.clipboard.writeText(vaNum.replace(/\s+/g, ""));
          copyVaBtn.textContent = "Tersalin!";
          setTimeout(() => {
            copyVaBtn.textContent = "Salin";
          }, 2000);
        }
      });
    }
  }

  // Initialize
  document.addEventListener("DOMContentLoaded", () => {
    loadCart();
    renderOrderItems();
    initCourierSelection();
    initPaymentSelection();
    initGiftingToggle();
    initPromoCode();
    initPayNowAction();
  });
})();
