/**
 * ULEK Interactive Application Engine (Kora Framer Redesign Edition)
 * Powers Deliverable 01 (Homepage), Deliverable 02 (Product Detail Page),
 * Slide-Over Pantry Bag Drawer, and Antikode Brief C Case Study Modal.
 */

(function () {
  "use strict";

  const DATA = window.ULEK_DATA;
  if (!DATA) {
    console.error("ULEK_DATA is missing.");
    return;
  }

  const RESERVE_PRODUCTS = DATA.products.filter((p) => p.isReserve);
  const CLASSIC_PRODUCT = DATA.products.find((p) => p.id === "classic-1987");

  /* ==========================================================================
     1. Application State
     ========================================================================== */
  const state = {
    activeView: "homepage", // 'homepage' | 'pdp'
    heroSpotlightId: "matah",
    activeFilter: "all", // 'all' | 'plant-based' | 'halal-friendly' | 'high-heat'
    cardPillStyle: "capsule", // 'capsule' | 'terracotta' | 'minimal'
    activeCraftPhaseIndex: 0,
    openPairingIds: ["grilled-fish"], // First pairing row open by default
    giftBoxSlots: ["matah", "roa", "bajak", "andaliman"],
    activeGiftPreset: "all-islands",
    activeFaqCategoryIndex: 0,
    openFaqIndex: 0,
    pdpProductId: "matah",
    pdpMediaTab: "jar", // 'jar' | 'macro' | 'ingredients'
    pdpPurchaseMode: "single", // 'single' | 'trio' | 'giftbox'
    pdpQty: 1,
    activeCaseStudyTab: "sense-making", // 'sense-making' | 'problem-solving' | 'craft-taste'
    cart: (function() {
      try {
        const saved = localStorage.getItem("ulek_pantry_cart_v2");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {}
      return [
        {
          id: "matah",
          title: "ULEK Matah Bali Reserve",
          subtitle: "185g UV Glass · Heat 2/5 · With grilled fish",
          price: 100000,
          qty: 1,
          image: "./assets/jar-matah.png"
        },
        {
          id: "classic-1987",
          title: "Warung 1987 Original Sidoarjo",
          subtitle: "150g Classic Red Lid Jar · Heat 3/5",
          price: 25000,
          qty: 1,
          image: "./assets/jar-classic-1987.png"
        }
      ];
    })()
  };

  /* ==========================================================================
     2. Utility Formatters
     ========================================================================== */
  function formatRupiah(amount) {
    return "Rp" + Number(amount).toLocaleString("id-ID");
  }

  function renderHeatBarsHTML(heat, max = 5) {
    let bars = "";
    for (let i = 1; i <= max; i++) {
      bars += `<span class="heat-bar-seg ${i <= heat ? "is-filled" : ""}"></span>`;
    }
    return `
      <span class="heat-meter-inline" aria-label="Heat level ${heat} out of ${max}">
        <span class="heat-label-mono tabular-nums">HEAT ${heat}/${max}</span>
        <span class="heat-bars" aria-hidden="true">${bars}</span>
      </span>
    `;
  }

  let toastTimer = null;
  function showToast(message) {
    const banner = document.getElementById("toast-banner");
    const msgEl = document.getElementById("toast-message");
    if (!banner || !msgEl) return;
    msgEl.textContent = message;
    banner.classList.add("is-visible");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      banner.classList.remove("is-visible");
    }, 3200);
  }

  /* ==========================================================================
     3. Section 1: Kora Hero Floating Spotlight Card (01 to 04 Switcher)
     ========================================================================== */
  function renderHeroSpotlight() {
    const product =
      RESERVE_PRODUCTS.find((p) => p.id === state.heroSpotlightId) ||
      RESERVE_PRODUCTS[0];

    const imgEl = document.getElementById("hero-spotlight-img");
    const originEl = document.getElementById("hero-spotlight-origin");
    const badgeEl = document.getElementById("hero-spotlight-badge");
    const dotsContainer = document.getElementById("hero-spotlight-dots");
    const headlineEl = document.getElementById("hero-spotlight-headline");
    const heatEl = document.getElementById("hero-spotlight-heat");
    const statSubEl = document.getElementById("hero-spotlight-stat-sub");
    const bagBtn = document.getElementById("hero-spotlight-bag-btn");
    const pdpBtn = document.getElementById("hero-spotlight-pdp-btn");

    if (!imgEl || !dotsContainer) return;

    imgEl.src = product.image;
    imgEl.alt = `ULEK ${product.name} (${product.origin}) Reserve Jar`;
    originEl.textContent = `ulek™ · ${product.origin}`;
    badgeEl.textContent = `Reserve ${product.serial} · ${product.priceFormatted}`;
    headlineEl.textContent = `${product.name} (${product.origin}) ${product.koraHeading}`;
    heatEl.textContent = `${product.heat}/${product.heatMax}`;
    statSubEl.innerHTML = `Heat Index<br>${product.canonicalPairing}`;

    dotsContainer.innerHTML = RESERVE_PRODUCTS.map((p) => {
      const isActive = p.id === product.id;
      return `
        <button
          type="button"
          class="kora-mini-switch-btn ${isActive ? "is-active" : ""}"
          data-spotlight-id="${p.id}"
          role="tab"
          aria-selected="${isActive}"
          title="${p.name} (${p.origin})"
        >${p.serial}</button>
      `;
    }).join("");

    dotsContainer.querySelectorAll("[data-spotlight-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.heroSpotlightId = btn.getAttribute("data-spotlight-id");
        renderHeroSpotlight();
      });
    });

    if (bagBtn) {
      bagBtn.onclick = () => {
        addProductToCart(product.id, 1, bagBtn);
      };
    }
  }

  /* ==========================================================================
     4. Section 1 & 2: Hero Scroll Stage (Sticky Background, Padding Collapse,
        and Word-by-Word Manifesto Scrollytelling)
     ========================================================================== */
  function initHeroScrollStage() {
    const stageEl = document.getElementById("hero-scroll-stage");
    const heroFrameEl = document.getElementById("hero-section");
    const manifestoStageEl = document.getElementById("hero-manifesto-stage");
    if (!stageEl || !heroFrameEl || !manifestoStageEl) return;

    const wordSpans = Array.from(manifestoStageEl.querySelectorAll(".manifesto-word"));
    let heroScrollRaf = null;

    function onHeroScroll() {
      heroScrollRaf = null;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) {
        heroFrameEl.classList.add("is-full-bleed");
        heroFrameEl.style.removeProperty("--hero-gap");
        heroFrameEl.style.removeProperty("--hero-radius");
        heroFrameEl.style.removeProperty("--hero-content-opacity");
        heroFrameEl.style.removeProperty("--hero-content-y");
        heroFrameEl.style.removeProperty("--manifesto-opacity");
        heroFrameEl.style.removeProperty("--manifesto-y");
        wordSpans.forEach((span) => span.classList.add("is-revealed"));
        return;
      }

      const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      const rect = stageEl.getBoundingClientRect();
      const scrollDistance = stageEl.offsetHeight - window.innerHeight;

      if (scrollDistance <= 0) return;

      // When at top of page, preserve the initial load animation & 24px inset
      if (scrollY <= 2) {
        heroFrameEl.classList.remove("is-scrolled", "is-full-bleed", "is-content-hidden");
        heroFrameEl.style.removeProperty("--hero-gap");
        heroFrameEl.style.removeProperty("--hero-radius");
        heroFrameEl.style.removeProperty("--hero-content-opacity");
        heroFrameEl.style.removeProperty("--hero-content-y");
        heroFrameEl.style.setProperty("--manifesto-opacity", "0");
        heroFrameEl.style.setProperty("--manifesto-y", "0px");
        wordSpans.forEach((span) => span.classList.remove("is-revealed"));
        return;
      }

      // User has scrolled: apply dynamic scrollytelling transforms
      heroFrameEl.classList.add("is-scrolled");

      const progress = Math.max(0, Math.min(1, -rect.top / scrollDistance));

      // Phase 1: Hero Content Exit (Progress 0.00 -> 0.22)
      // Background stays firmly stuck while text/buttons/cards scroll upwards and fade
      const contentExitP = Math.min(1, Math.max(0, progress / 0.22));
      const contentOpacity = 1 - contentExitP;
      const contentY = -contentExitP * 85;

      heroFrameEl.style.setProperty("--hero-content-opacity", contentOpacity.toFixed(3));
      heroFrameEl.style.setProperty("--hero-content-y", `${contentY.toFixed(1)}px`);

      if (contentExitP >= 0.96) {
        heroFrameEl.classList.add("is-content-hidden");
      } else {
        heroFrameEl.classList.remove("is-content-hidden");
      }

      // Phase 2: Padding & Border Radius Collapse to Full Bleed (Progress 0.18 -> 0.42)
      // Once content has scrolled away, padding smoothly shrinks from 24px to 0
      const expandP = Math.min(1, Math.max(0, (progress - 0.18) / 0.24));
      const baseGap = window.innerWidth <= 768 ? 16 : 24;
      const baseRadius = 30;
      const currentGap = (1 - expandP) * baseGap;
      const currentRadius = (1 - expandP) * baseRadius;

      heroFrameEl.style.setProperty("--hero-gap", `${currentGap.toFixed(1)}px`);
      heroFrameEl.style.setProperty("--hero-radius", `${currentRadius.toFixed(1)}px`);

      if (expandP >= 0.98) {
        heroFrameEl.classList.add("is-full-bleed");
      } else {
        heroFrameEl.classList.remove("is-full-bleed");
      }

      // Phase 3: Manifesto Word-by-Word Scrollytelling (Progress 0.40 -> 0.88)
      // Words illuminate one by one on scroll down, and un-illuminate on scroll up
      let manifestoOpacity = 0;
      let manifestoY = 0;

      if (progress < 0.38) {
        manifestoOpacity = 0;
      } else if (progress < 0.44) {
        manifestoOpacity = (progress - 0.38) / 0.06;
      } else if (progress <= 0.88) {
        manifestoOpacity = 1;
      } else {
        manifestoOpacity = Math.max(0, 1 - (progress - 0.88) / 0.10);
        manifestoY = -(progress - 0.88) * 160;
      }

      heroFrameEl.style.setProperty("--manifesto-opacity", manifestoOpacity.toFixed(3));
      heroFrameEl.style.setProperty("--manifesto-y", `${manifestoY.toFixed(1)}px`);

      const wordProgress = Math.min(1, Math.max(0, (progress - 0.42) / 0.42));
      const activeWordCount = Math.floor(wordProgress * (wordSpans.length + 1));

      wordSpans.forEach((span, idx) => {
        span.classList.toggle("is-revealed", idx < activeWordCount);
      });
    }

    window.addEventListener(
      "scroll",
      () => {
        if (!heroScrollRaf) {
          heroScrollRaf = window.requestAnimationFrame(onHeroScroll);
        }
      },
      { passive: true }
    );

    window.addEventListener(
      "resize",
      () => {
        if (!heroScrollRaf) {
          heroScrollRaf = window.requestAnimationFrame(onHeroScroll);
        }
      },
      { passive: true }
    );

    onHeroScroll();
  }

  function renderComparisonSection() {
    const grid = document.getElementById("kora-comparison-grid");
    if (!grid || !DATA.comparison) return;

    const c = DATA.comparison;
    grid.innerHTML = `
      <!-- Left: Kora Dark Charcoal "Before" Card (#242424) -->
      <article class="kora-compare-card kora-compare-card--before">
        <div>
          <span class="kora-compare-pill">${c.beforeTitle}</span>
          <p style="font-size:0.9rem; color:rgba(255,255,250,0.7); margin-top:12px;">
            ${c.beforeSub}
          </p>
        </div>
        <ul class="kora-compare-list">
          ${c.beforeItems
            .map(
              (item) => `
            <li class="kora-compare-item">
              <span class="kora-check-icon kora-check-icon--negative" aria-hidden="true">✕</span>
              <span>${item}</span>
            </li>
          `
            )
            .join("")}
        </ul>
      </article>

      <!-- Right: Kora Warm Cream "After" Card (#F5F5E9) -->
      <article class="kora-compare-card kora-compare-card--after">
        <div>
          <span class="kora-compare-pill">${c.afterTitle}</span>
          <p style="font-size:0.9rem; color:var(--kora-muted); margin-top:12px;">
            ${c.afterSub}
          </p>
        </div>
        <ul class="kora-compare-list">
          ${c.afterItems
            .map(
              (item) => `
            <li class="kora-compare-item">
              <span class="kora-check-icon kora-check-icon--positive" aria-hidden="true">✓</span>
              <span>${item}</span>
            </li>
          `
            )
            .join("")}
        </ul>
      </article>
    `;
  }

  /* ==========================================================================
     5. Section 3: Kora Sticky Stacking Service/Product Cards
        (Matches User Screen Recording 00:00 to 00:07 & kora.framer.media 1:1)
     ========================================================================== */
  function getFilteredReserveProducts() {
    if (state.activeFilter === "all-five") {
      return DATA.products;
    }
    if (state.activeFilter === "plant-based") {
      return RESERVE_PRODUCTS.filter((p) => p.dietary.isPlantBased);
    }
    if (state.activeFilter === "halal-friendly") {
      return RESERVE_PRODUCTS;
    }
    if (state.activeFilter === "high-heat") {
      return RESERVE_PRODUCTS.filter((p) => p.heat >= 3);
    }
    return RESERVE_PRODUCTS;
  }

  let stickyScrollRaf = null;
  function updateStickyStackOnScroll() {
    stickyScrollRaf = null;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const introEl = document.getElementById("kora-services-sticky-intro");
    const slots = Array.from(
      document.querySelectorAll("#kora-service-cards-stack .kora-sticky-card-slot")
    );
    if (!slots.length) return;

    const vh = window.innerHeight || 800;

    // 1. Fade & subtly scale the sticky "Reserve Line." intro + 2-bar graph as Card 01 slides over it
    if (introEl && slots[0]) {
      const firstCardRect = slots[0].getBoundingClientRect();
      const startCoverY = vh * 0.78;
      const endCoverY = 120;
      const coverProgress = Math.max(
        0,
        Math.min(1, (startCoverY - firstCardRect.top) / (startCoverY - endCoverY))
      );
      const introScale = 1 - coverProgress * 0.035;
      const introOpacity = 1 - coverProgress * 0.85;
      introEl.style.transform = `scale3d(${introScale}, ${introScale}, 1)`;
      introEl.style.opacity = String(introOpacity);
    }

    // 2. For each card in the stack, subtly scale it down as the NEXT card slides up over it
    slots.forEach((slot, idx) => {
      const card = slot.querySelector(".kora-service-split-card");
      if (!card) return;

      const nextSlot = slots[idx + 1];
      if (!nextSlot) {
        card.style.transform = "scale3d(1, 1, 1)";
        return;
      }

      const nextRect = nextSlot.getBoundingClientRect();
      const startOverlapY = vh * 0.88;
      const lockedTopY = 90 + (idx + 1) * 12;
      const overlapProgress = Math.max(
        0,
        Math.min(1, (startOverlapY - nextRect.top) / (startOverlapY - lockedTopY))
      );

      // Check if an even later card is also overlapping to compound a subtle stack depth
      let extraDepth = 0;
      const afterNextSlot = slots[idx + 2];
      if (afterNextSlot) {
        const afterRect = afterNextSlot.getBoundingClientRect();
        const p2 = Math.max(
          0,
          Math.min(1, (startOverlapY - afterRect.top) / (startOverlapY - lockedTopY))
        );
        extraDepth = p2 * 0.018;
      }

      const scaleVal = 1 - overlapProgress * 0.032 - extraDepth;
      card.style.transform = `scale3d(${scaleVal.toFixed(4)}, ${scaleVal.toFixed(4)}, 1)`;
    });
  }

  function initReserveIntroObserver() {
    const introEl = document.getElementById("kora-services-sticky-intro");
    if (!introEl) return;

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              introEl.classList.add("is-visible");
            } else if (entry.boundingClientRect.top > (window.innerHeight || 800) * 0.85) {
              // Smoothly reset only when user has scrolled back up into the hero section
              introEl.classList.remove("is-visible");
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
      );
      observer.observe(introEl);
    } else {
      introEl.classList.add("is-visible");
    }
  }

  function initStickyStackScrollAnimation() {
    window.addEventListener(
      "scroll",
      () => {
        if (!stickyScrollRaf) {
          stickyScrollRaf = window.requestAnimationFrame(updateStickyStackOnScroll);
        }
      },
      { passive: true }
    );
    updateStickyStackOnScroll();
  }

  function renderReserveSplitCards() {
    const stack = document.getElementById("kora-service-cards-stack");
    if (!stack) return;

    const list = getFilteredReserveProducts();

    stack.innerHTML = list
      .map(
        (p, idx) => `
      <div class="kora-sticky-card-slot" style="--slot-index:${idx};" data-sticky-slot="${idx}">
        <article class="kora-service-split-card" data-product-card="${p.id}">
          <!-- Left Column: White Inner Panel (#FFFFFA) + Bottom Full-Width Green CTA Bar -->
          <div class="kora-service-left">
            <div class="kora-service-white-panel">
              <!-- Top Header & Heading -->
              <div class="kora-card-top-cluster">
                <div class="kora-service-label-row">
                  <div class="kora-badge-group">
                    <span class="kora-service-pill">
                      <span class="kora-service-pill-icon" aria-hidden="true">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M7 17L17 7"></path>
                          <path d="M7 7h10v10"></path>
                        </svg>
                      </span>
                      <span>${p.name} · ${p.origin}</span>
                    </span>
                    <span class="kora-heat-pill">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 2c-.3 2.5-2 4.5-3.5 6.5C7 10.5 6 12.5 6 15a6 6 0 0 0 12 0c0-2-.8-3.8-2.2-5.2C14.5 8 13.5 5 12 2z"/>
                      </svg>
                      <span>${p.heat}/5 Heat</span>
                    </span>
                    <span class="kora-dietary-pill">
                      ${p.dietary.badge}
                    </span>
                  </div>
                  <span class="kora-service-count tabular-nums">${p.serial}</span>
                </div>

                <h3 class="kora-service-heading">${p.koraHeading}</h3>
                <p class="kora-service-desc">${p.shortHeroCopy || p.tastingNotes}</p>
              </div>

              <!-- Interactive Product Inspector Tabs (Terracotta Signature Edition) -->
              <div class="kora-card-inspector" data-card-inspector="${p.id}">
                <div class="inspector-header-row">
                  <span class="inspector-section-label">Sommelier Tasting &amp; Formulation</span>
                  <span class="inspector-edition-tag">Reserve Line · ${p.origin}</span>
                </div>

                <div class="card-tab-nav" role="tablist" aria-label="Inspect ${p.name} Details">
                  <button type="button" class="card-tab-btn is-active" data-tab-target="pairing" role="tab" aria-selected="true">Pairing</button>
                  <button type="button" class="card-tab-btn" data-tab-target="ingredients" role="tab" aria-selected="false">Ingredients</button>
                  <button type="button" class="card-tab-btn" data-tab-target="sensory" role="tab" aria-selected="false">Sensory Profile</button>
                </div>

                <div class="card-tab-body">
                  <!-- Tab 1: Pairing (Clean Editorial List, Zero Card Wrapping) -->
                  <div class="card-tab-panel is-active" data-tab-panel="pairing" role="tabpanel">
                    <div class="editorial-panel-content">
                      <ul class="editorial-plain-list">
                        ${(p.extendedPairings || [p.canonicalPairing])
                          .slice(0, 3)
                          .map(
                            (dish, idx) => `
                            <li class="editorial-plain-item">
                              <span class="editorial-item-idx tabular-nums">0${idx + 1}</span>
                              <span class="editorial-item-text">${dish}</span>
                            </li>
                          `
                          )
                          .join("")}
                      </ul>
                      <div class="editorial-panel-footer">
                        <span class="editorial-footer-icon" aria-hidden="true">✦</span>
                        <span class="editorial-footer-text">${p.canonicalPairing ? `Calibrated for <strong>${p.canonicalPairing}</strong> and warm dining.` : "Crafted for Indonesian table pairing."}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Tab 2: Ingredients (Clean Editorial List, Zero Card Wrapping) -->
                  <div class="card-tab-panel" data-tab-panel="ingredients" role="tabpanel">
                    <div class="editorial-panel-content">
                      <ul class="editorial-plain-list">
                        ${p.ingredients
                          .slice(0, 4)
                          .map(
                            (ing) => `
                            <li class="editorial-plain-item">
                              <span class="editorial-item-bullet" aria-hidden="true">•</span>
                              <span class="editorial-item-text">${ing}</span>
                            </li>
                          `
                          )
                          .join("")}
                      </ul>
                      <div class="editorial-panel-footer">
                        <span class="editorial-guarantee-tag">Volcanic Basalt Stone-Ground</span>
                        <span class="editorial-footer-sep" aria-hidden="true">·</span>
                        <span class="editorial-guarantee-tag">Zero Starch Fillers</span>
                      </div>
                    </div>
                  </div>

                  <!-- Tab 3: Sensory Profile (Clean Terracotta Sliders, Zero Card Wrapping) -->
                  <div class="card-tab-panel" data-tab-panel="sensory" role="tabpanel">
                    <div class="editorial-panel-content">
                      <div class="sensory-meter-grid-clean">
                        <div class="sensory-meter-clean-item">
                          <div class="sensory-clean-meta">
                            <span>Heat Intensity</span>
                            <strong class="tabular-nums">${p.sensory.heatIntensity}% (${p.heat}/5)</strong>
                          </div>
                          <div class="sensory-clean-track">
                            <div class="sensory-clean-fill" style="width:${p.sensory.heatIntensity}%;"></div>
                          </div>
                        </div>
                        <div class="sensory-meter-clean-item">
                          <div class="sensory-clean-meta">
                            <span>Savory Umami</span>
                            <strong class="tabular-nums">${p.sensory.savoryUmami}%</strong>
                          </div>
                          <div class="sensory-clean-track">
                            <div class="sensory-clean-fill" style="width:${p.sensory.savoryUmami}%;"></div>
                          </div>
                        </div>
                        <div class="sensory-meter-clean-item">
                          <div class="sensory-clean-meta">
                            <span>Aromatic Freshness</span>
                            <strong class="tabular-nums">${p.sensory.aromaticFreshness}%</strong>
                          </div>
                          <div class="sensory-clean-track">
                            <div class="sensory-clean-fill" style="width:${p.sensory.aromaticFreshness}%;"></div>
                          </div>
                        </div>
                        <div class="sensory-meter-clean-item">
                          <div class="sensory-clean-meta">
                            <span>Grind Coarseness</span>
                            <strong class="tabular-nums">${p.sensory.grindCoarseness}%</strong>
                          </div>
                          <div class="sensory-clean-track">
                            <div class="sensory-clean-fill" style="width:${p.sensory.grindCoarseness}%;"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Full-Width Green CTA Bar Beneath White Panel (Matches Kora "Get Started" Bar) -->
            <div class="kora-service-bottom-cta-row">
              <button type="button" class="kora-service-green-bar-btn" data-quick-add="${p.id}">
                <span>Add ${p.name} to Pantry Bag · ${p.priceFormatted}</span>
              </button>
            </div>
          </div>

          <!-- Right Column: Full-Height Rounded Jar Image -->
          <div class="kora-service-right">
            <img
              src="${p.image}"
              alt="ULEK ${p.name} ${p.origin} (${p.heatTag}, ${p.canonicalPairing})"
              class="kora-service-media-img"
              width="640"
              height="680"
              loading="lazy"
              decoding="async"
            >
          </div>
        </article>
      </div>
    `
      )
      .join("");

    // Bind Interactive Inspector Tabs (UI/UX Pro Max)
    stack.querySelectorAll(".card-tab-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const tabTarget = btn.getAttribute("data-tab-target");
        const cardBox = btn.closest(".kora-card-inspector");
        if (!cardBox) return;

        cardBox.querySelectorAll(".card-tab-btn").forEach((b) => {
          const isActive = b === btn;
          b.classList.toggle("is-active", isActive);
          b.setAttribute("aria-selected", isActive ? "true" : "false");
        });

        cardBox.querySelectorAll(".card-tab-panel").forEach((panel) => {
          const isTarget = panel.getAttribute("data-tab-panel") === tabTarget;
          panel.classList.toggle("is-active", isTarget);
        });
      });
    });

    // Tactile Quick-Add feedback
    stack.querySelectorAll("[data-quick-add]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-quick-add");
        addProductToCart(id, 1, btn);
        const origText = btn.innerHTML;
        btn.innerHTML = `<span>✓ Added</span>`;
        btn.classList.add("is-added");
        setTimeout(() => {
          btn.innerHTML = origText;
          btn.classList.remove("is-added");
        }, 1500);
      });
    });

    updateStickyStackOnScroll();
  }

  function initFilterChips() {
    const bar = document.getElementById("collection-filter-bar");
    if (!bar) return;
    bar.querySelectorAll("[data-filter]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.activeFilter = btn.getAttribute("data-filter");
        bar.querySelectorAll("[data-filter]").forEach((b) => {
          b.classList.toggle("is-active", b === btn);
        });
        renderReserveSplitCards();
      });
    });
  }

  /* ==========================================================================
     6. Section 4: Kora 4-Phase Horizontal Expanding Accordion (Hover-Triggered)
        + Title Entrance Animation on 40% Scroll Depth Reach
     ========================================================================== */
  function initCraftHeaderObserver() {
    const section = document.getElementById("craft-section");
    const headerWrap = document.getElementById("craft-header-wrap");
    if (!section || !headerWrap) return;

    function evaluateScroll() {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight || 800;
      const enteredPx = windowHeight - rect.top;
      const sectionProgress = enteredPx / (rect.height || 1);

      // Trigger animation when user reaches ~40% of the craft section
      // (or when section top has traveled 40% into the viewport)
      if (sectionProgress >= 0.38 || rect.top <= windowHeight * 0.6) {
        headerWrap.classList.add("is-in-view");
      } else if (rect.top > windowHeight * 0.95) {
        // Reset smoothly when user scrolls back up above the section
        headerWrap.classList.remove("is-in-view");
      }
    }

    let craftScrollRaf = null;
    function onScroll() {
      if (!craftScrollRaf) {
        craftScrollRaf = window.requestAnimationFrame(() => {
          evaluateScroll();
          craftScrollRaf = null;
        });
      }
    }

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              onScroll();
            }
          });
        },
        {
          threshold: [0.1, 0.2, 0.3, 0.4, 0.5],
        }
      );
      observer.observe(section);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    // Initial evaluation in case page is refreshed or deep-linked to #craft-section
    evaluateScroll();
  }

  function renderCraftAccordion() {
    const container = document.getElementById("kora-process-accordion");
    if (!container || !DATA.craftPhases) return;

    container.innerHTML = DATA.craftPhases
      .map((phase, idx) => {
        const isActive = idx === state.activeCraftPhaseIndex;
        const dotsHTML = [0, 1, 2, 3]
          .map(
            (d) =>
              `<span class="kora-process-dot ${d <= idx ? "is-lit" : ""}"></span>`
          )
          .join("");

        return `
          <div
            class="kora-process-card ${isActive ? "is-active" : ""}"
            data-phase-idx="${idx}"
            role="tab"
            tabindex="0"
            aria-selected="${isActive}"
            aria-label="Phase ${phase.number}: ${phase.title}"
          >
            <!-- Background Image & Atmospheric Editorial Scrim -->
            <div class="kora-process-media">
              <img
                src="${phase.image}"
                alt="${phase.title}"
                class="kora-process-bg-img"
                loading="lazy"
                decoding="async"
              >
              <div class="kora-process-scrim"></div>
            </div>

            <!-- Foreground Content Layer -->
            <div class="kora-process-inner">
              <!-- Top Row: Glass Phase Badge + Progress Dots -->
              <div class="kora-process-top">
                <span class="kora-phase-glass-badge">
                  <span class="badge-prefix">PHASE</span>
                  <span class="badge-num tabular-nums">${phase.number}</span>
                </span>
                <span class="kora-process-dots" aria-hidden="true">${dotsHTML}</span>
              </div>

              <!-- Collapsed Spine: Clean Vertical Marker for Narrow Inactive Cards -->
              <div class="kora-process-spine" aria-hidden="${isActive}">
                <div class="spine-vertical-title">${phase.title}</div>
              </div>

              <!-- Expanded Editorial Content: Appears Smoothly on Hover -->
              <div class="kora-process-body" aria-hidden="${!isActive}">
                <h3 class="kora-process-title">
                  ${phase.title}
                </h3>
                <p class="kora-process-desc">
                  ${phase.body}
                </p>
                <div class="kora-process-meta-footer">
                  <span class="kora-craft-tagline">${phase.tagline || "Authentic 1987 Sidoarjo Recipe"}</span>
                  <span class="kora-craft-step-counter">0${idx + 1} / 04</span>
                </div>
              </div>
            </div>
          </div>
        `;
      })
      .join("");

    // Activate phase function with zero-flicker RAF class toggle
    let pendingRaf = null;
    function activatePhase(targetIdx) {
      if (state.activeCraftPhaseIndex === targetIdx) return;
      state.activeCraftPhaseIndex = targetIdx;

      if (pendingRaf) cancelAnimationFrame(pendingRaf);
      pendingRaf = requestAnimationFrame(() => {
        const cards = container.querySelectorAll(".kora-process-card");
        cards.forEach((card, idx) => {
          const isAct = idx === targetIdx;
          card.classList.toggle("is-active", isAct);
          card.setAttribute("aria-selected", isAct ? "true" : "false");

          const spine = card.querySelector(".kora-process-spine");
          if (spine) spine.setAttribute("aria-hidden", isAct ? "true" : "false");

          const body = card.querySelector(".kora-process-body");
          if (body) body.setAttribute("aria-hidden", isAct ? "false" : "true");

          card.querySelectorAll(".kora-process-dot").forEach((dot, dIdx) => {
            dot.classList.toggle("is-lit", dIdx <= targetIdx);
          });
        });
      });
    }

    // Attach hover, touch & keyboard events
    container.querySelectorAll(".kora-process-card").forEach((card) => {
      const idx = Number(card.getAttribute("data-phase-idx"));

      // Smooth hover trigger with native mouseenter
      card.addEventListener("mouseenter", () => {
        activatePhase(idx);
      });

      // Click fallback for mobile touchscreens
      card.addEventListener("click", () => {
        activatePhase(idx);
      });

      // Keyboard navigation
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          activatePhase(idx);
        }
      });
    });
  }

  /* ==========================================================================
     7. Section 5: Signature Kora Green Pairing Accordion & 1987 Classic
     ========================================================================== */
  function renderGreenPairingRows() {
    const grid = document.getElementById("kora-green-rows-grid");
    if (!grid || !DATA.pairings) return;

    grid.innerHTML = DATA.pairings
      .map((pair) => {
        const product =
          DATA.products.find((p) => p.id === pair.recommendedProductId) ||
          RESERVE_PRODUCTS[0];
        const isOpen = state.openPairingIds.includes(pair.id);

        return `
          <div class="kora-green-interactive-row ${isOpen ? "is-open" : ""}" data-pairing-row="${pair.id}">
            <button
              type="button"
              class="kora-green-row-trigger"
              data-pairing-toggle="${pair.id}"
              aria-expanded="${isOpen}"
            >
              <div class="kora-green-row-left">
                <span class="kora-green-num-plus">
                  <span>${pair.number}</span>
                  <span class="kora-plus-circle" aria-hidden="true">+</span>
                </span>
                <div>
                  <div style="font-family:var(--font-display); font-size:1.12rem; font-weight:600; color:#FFFFFA;">
                    ${pair.plateLabel}
                  </div>
                  <div style="font-size:0.78rem; color:rgba(255,255,255,0.82);">
                    Recommended Jar: <strong>ULEK ${product.name} (${product.origin} · ${product.heatTag})</strong>
                  </div>
                </div>
              </div>

              <img
                src="${product.image}"
                alt="${product.name}"
                class="kora-green-avatar"
                width="48"
                height="48"
                loading="lazy"
              >
            </button>

            <div class="kora-green-drawer">
              <div style="font-family:var(--font-display); font-weight:600; font-size:0.95rem; margin-bottom:6px;">
                ${pair.chemistryHeadline}
              </div>
              <p style="color:rgba(255,255,250,0.9); margin-bottom:10px;">
                ${pair.chemistryBody}
              </p>
              <p style="font-size:0.78rem; color:rgba(255,255,250,0.82); padding:8px 10px; border-radius:10px; background:rgba(255,255,255,0.1); margin-bottom:12px;">
                <strong>Serving Ritual:</strong> ${pair.servingRitual}
              </p>
              <div style="display:flex; gap:8px; flex-wrap:wrap;">
                <button type="button" class="kora-btn-cream" style="padding:8px 14px; font-size:0.78rem;" data-green-add="${product.id}">
                  <span>Add ${product.name} (${product.priceFormatted})</span>
                </button>
              </div>
            </div>
          </div>
        `;
      })
      .join("");

    grid.querySelectorAll("[data-pairing-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-pairing-toggle");
        if (state.openPairingIds.includes(id)) {
          state.openPairingIds = state.openPairingIds.filter((item) => item !== id);
        } else {
          state.openPairingIds.push(id);
        }
        renderGreenPairingRows();
      });
    });

    grid.querySelectorAll("[data-green-add]").forEach((btn) => {
      btn.addEventListener("click", () => {
        addProductToCart(btn.getAttribute("data-green-add"), 1, btn);
      });
    });
  }

  /* ==========================================================================
     8A. Section 6: Pantry Lifestyle Vertical Auto-Scrolling Testimonials (5 Cards)
     ========================================================================== */
  function renderPantryTestimonials() {
    const track = document.getElementById("pantry-testimonials-track");
    if (!track || !DATA.testimonials) return;

    function createCardHTML(t) {
      return `
        <article class="pantry-testi-card" data-testi-id="${t.id}" tabindex="0">
          <div class="testi-card-header">
            <img
              src="${t.avatar}"
              alt="${t.name}"
              class="testi-avatar-img"
              width="44"
              height="44"
              loading="lazy"
              decoding="async"
            >
            <div class="testi-author-meta">
              <strong class="testi-author-name">${t.name}</strong>
              <div class="testi-author-sub">
                <span class="testi-author-role">${t.role}</span>
                <span class="testi-author-dot" aria-hidden="true">·</span>
                <span class="testi-author-location">${t.location}</span>
              </div>
            </div>
          </div>

          <p class="testi-quote-body">
            “${t.quote}”
          </p>
        </article>
      `;
    }

    // Render 2 sets (5 + 5 = 10 cards) for a perfectly seamless infinite vertical marquee loop
    const set1 = DATA.testimonials.map(createCardHTML).join("");
    const set2 = DATA.testimonials.map((t) => createCardHTML({ ...t, id: `${t.id}-clone` })).join("");

    track.innerHTML = set1 + set2;
  }

  /* ==========================================================================
     8. Section 6: Kora Tier Tabs & 4-Slot Linen Gift Box Customizer
     ========================================================================== */
  /* ==========================================================================
     8. Section 6: Redesigned Gift Box & Pantry Order Builder
     ========================================================================== */
  function renderGiftBoxBuilder() {
    const slotsGrid = document.getElementById("gift-slots-grid");
    const summaryEl = document.getElementById("gift-box-dietary-summary");
    const jarsListEl = document.getElementById("gift-summary-jars-list");
    if (!slotsGrid) return;

    const slotProducts = state.giftBoxSlots.map(
      (id) => RESERVE_PRODUCTS.find((p) => p.id === id) || RESERVE_PRODUCTS[0]
    );

    // 1. Populate the 4 interactive jar slot cards
    slotsGrid.innerHTML = slotProducts
      .map(
        (p, idx) => `
      <div
        class="gift-slot-item"
        data-slot-index="${idx}"
        title="Klik untuk mengganti varian sambal di Slot 0${idx + 1}"
      >
        <span class="gift-slot-badge">SLOT 0${idx + 1}</span>
        <img src="${p.image}" alt="${p.name}" class="gift-slot-thumb" width="68" height="68">
        <div>
          <h4 class="gift-slot-name">${p.name}</h4>
          <div class="gift-slot-meta">${p.origin} · ${p.heat}/5 Heat</div>
        </div>
        <span class="gift-slot-dietary ${p.dietary.isPlantBased ? "is-plant" : "is-seafood"}">
          ${p.dietary.isPlantBased ? "Plant Based" : "Contains Seafood"}
        </span>
        <button type="button" class="gift-slot-swap-btn" data-slot-swap="${idx}" aria-label="Ganti varian Slot 0${idx + 1}">
          <span>Ganti Varian</span>
        </button>
      </div>
    `
      )
      .join("");

    // 2. Populate the right-hand summary checklist
    if (jarsListEl) {
      jarsListEl.innerHTML = slotProducts
        .map(
          (p, idx) => `
        <div class="gift-summary-jar-row">
          <div class="gift-summary-jar-left">
            <img src="${p.image}" alt="" class="gift-summary-jar-thumb">
            <span style="font-weight:600; color:var(--kora-ink);">Slot 0${idx + 1}: ULEK ${p.name} (${p.origin})</span>
          </div>
          <span style="font-size:0.72rem; color:var(--kora-muted); font-weight:600;">
            ${p.dietary.isPlantBased ? "Plant Based" : "Smoked Fish / Terasi"}
          </span>
        </div>
      `
        )
        .join("");
    }

    // 3. Update dietary summary breakdown
    const plantCount = slotProducts.filter((p) => p.dietary.isPlantBased).length;
    const seafoodCount = slotProducts.length - plantCount;
    if (summaryEl) {
      if (seafoodCount === 0) {
        summaryEl.textContent =
          "Includes: 100% Plant Based & Seafood Free Box (4 of 4 vegan & halal friendly jars)";
      } else {
        summaryEl.textContent = `Includes: ${plantCount} Plant Based jar(s) · ${seafoodCount} Smoked Fish / Terasi jar(s) · All 4 Halal friendly`;
      }
    }

    // 4. Clicking anywhere on the slot card or swap button cycles to the next Reserve jar
    slotsGrid.querySelectorAll(".gift-slot-item").forEach((card) => {
      card.addEventListener("click", () => {
        const idx = Number(card.getAttribute("data-slot-index"));
        const currentId = state.giftBoxSlots[idx];
        const currentOrderIdx = RESERVE_PRODUCTS.findIndex((p) => p.id === currentId);
        const nextProduct =
          RESERVE_PRODUCTS[(currentOrderIdx + 1) % RESERVE_PRODUCTS.length];
        state.giftBoxSlots[idx] = nextProduct.id;
        renderGiftBoxBuilder();
      });
    });
  }

  function renderSingleJarsStage() {
    const container = document.getElementById("gifting-stage-single");
    if (!container) return;

    container.innerHTML = `
      <div class="kora-giftbox-white-panel" style="margin-bottom:0;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:18px;">
          <div>
            <div class="kora-badge-group" style="margin-bottom:6px;">
              <span class="kora-service-pill">Single Reserve Jars</span>
              <span class="kora-dietary-pill">Rp100.000 / Jar · 185g Heavyweight UV Glass</span>
            </div>
            <h3 style="font-family:var(--font-display); font-size:1.45rem; font-weight:700; color:var(--kora-ink); margin:0;">
              Pilih Varian Pulau Favorit Anda
            </h3>
            <p style="font-size:0.84rem; color:var(--kora-muted); margin:4px 0 0;">
              Pesan satuan botol 185g dengan proteksi kaca UV pelindung minyak atsiri cabai.
            </p>
          </div>
        </div>

        <div class="gift-single-grid">
          ${RESERVE_PRODUCTS.map(
            (p) => `
            <div class="gift-single-card">
              <span class="kora-service-pill" style="align-self:flex-start;">
                ${p.origin} · ${p.heat}/5 Heat
              </span>
              <img src="${p.image}" alt="${p.name}" class="gift-single-thumb" width="90" height="90">
              <div>
                <h4 style="font-family:var(--font-display); font-size:1.05rem; font-weight:700; color:var(--kora-ink); margin:0 0 4px;">
                  ULEK ${p.name}
                </h4>
                <p style="font-size:0.75rem; color:var(--kora-muted); margin:0 0 8px; line-height:1.4;">
                  ${p.tastingNotes ? p.tastingNotes.slice(0, 80) + "..." : ""}
                </p>
                <span class="gift-slot-dietary ${p.dietary.isPlantBased ? "is-plant" : "is-seafood"}">
                  ${p.dietary.isPlantBased ? "Plant Based" : "Contains Seafood"}
                </span>
              </div>
              <div class="tabular-nums" style="font-family:var(--font-display); font-size:1.25rem; font-weight:800; color:var(--kora-ink);">
                Rp100.000
              </div>
              <div style="display:flex; flex-direction:column; gap:6px;">
                <button type="button" class="kora-btn-dark" data-single-add="${p.id}" style="width:100%; justify-content:center; padding-block:10px; font-size:0.8rem;">
                  Tambah ke Bag
                </button>
                <button type="button" class="kora-btn-green" data-single-checkout="${p.id}" style="width:100%; justify-content:center; padding-block:10px; font-size:0.8rem;">
                  Beli &amp; Checkout
                </button>
              </div>
            </div>
          `
          ).join("")}
        </div>
      </div>
    `;

    container.querySelectorAll("[data-single-add]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-single-add");
        addProductToCart(id, 1, btn);
      });
    });

    container.querySelectorAll("[data-single-checkout]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-single-checkout");
        const prod = DATA.products.find((p) => p.id === id);
        if (prod) {
          const existing = state.cart.find((i) => i.id === prod.id);
          if (existing) existing.qty += 1;
          else {
            state.cart.push({
              id: prod.id,
              title: `ULEK ${prod.name} ${prod.origin}`,
              subtitle: `${prod.jarSize} · ${prod.heatTag}`,
              price: prod.price,
              qty: 1,
              image: prod.image
            });
          }
          localStorage.setItem("ulek_pantry_cart_v2", JSON.stringify(state.cart));
          window.location.href = "checkout.html";
        }
      });
    });
  }

  function renderClassicStage() {
    const container = document.getElementById("gifting-stage-classic");
    if (!container) return;

    container.innerHTML = `
      <div class="gift-classic-inner">
        <div style="text-align:center;">
          <img src="./assets/jar-classic-1987.png" alt="1987 Sidoarjo Original" class="gift-classic-thumb" width="240" height="240">
        </div>
        <div style="display:flex; flex-direction:column; gap:16px;">
          <div class="kora-badge-group">
            <span class="format-badge-heritage">Warung Sidoarjo Sejak 1987</span>
            <span class="kora-dietary-pill">150g Red Lid Classic Jar</span>
          </div>
          <div>
            <h3 style="font-family:var(--font-display); font-size:1.6rem; font-weight:800; color:var(--kora-ink); margin:0 0 6px;">
              1987 Sidoarjo Original Warung Sambal
            </h3>
            <p style="font-size:0.88rem; color:var(--kora-body); line-height:1.55; margin:0;">
              Resep cobek batu andesit asli yang menjadi fondasi rasa ULEK sejak 1987. Dibuat dari cabai rawit merah pilihan, terasi Sidoarjo terfermentasi alami, dan bawang merah segar tanpa modifikasi tepung pengental atau pengawet kimia.
            </p>
          </div>
          <div style="display:flex; align-items:baseline; gap:8px;">
            <span class="tabular-nums" style="font-family:var(--font-display); font-size:1.7rem; font-weight:800; color:var(--kora-ink);">
              Rp25.000
            </span>
            <span style="font-size:0.82rem; color:var(--kora-muted);">/ jar (150g)</span>
          </div>
          <div style="display:flex; gap:10px; flex-wrap:wrap; padding-top:6px;">
            <button type="button" class="kora-btn-dark" id="classic-stage-add-btn" style="flex:1; justify-content:center; padding-block:13px; font-size:0.88rem;">
              Tambah ke Pantry Bag
            </button>
            <button type="button" class="kora-btn-green" id="classic-stage-checkout-btn" style="flex:1; justify-content:center; padding-block:13px; font-size:0.88rem;">
              Beli &amp; Checkout Sekarang
            </button>
          </div>
        </div>
      </div>
    `;

    const addBtn = document.getElementById("classic-stage-add-btn");
    if (addBtn) {
      addBtn.addEventListener("click", () => {
        addProductToCart("classic-1987", 1, addBtn);
      });
    }

    const checkoutBtn = document.getElementById("classic-stage-checkout-btn");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        const prod = DATA.products.find((p) => p.id === "classic-1987");
        if (prod) {
          const existing = state.cart.find((i) => i.id === prod.id);
          if (existing) existing.qty += 1;
          else {
            state.cart.push({
              id: prod.id,
              title: `ULEK ${prod.name} ${prod.origin}`,
              subtitle: `${prod.jarSize} · ${prod.heatTag}`,
              price: prod.price,
              qty: 1,
              image: prod.image
            });
          }
          localStorage.setItem("ulek_pantry_cart_v2", JSON.stringify(state.cart));
          window.location.href = "checkout.html";
        }
      });
    }
  }

  function initGiftBoxControls() {
    // Preset buttons
    document.querySelectorAll("[data-box-preset]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const preset = btn.getAttribute("data-box-preset");
        state.activeGiftPreset = preset;
        document.querySelectorAll("[data-box-preset]").forEach((b) => {
          b.classList.toggle("is-active", b === btn);
        });

        if (preset === "all-islands") {
          state.giftBoxSlots = ["matah", "roa", "bajak", "andaliman"];
        } else if (preset === "plant-based") {
          state.giftBoxSlots = ["matah", "matah", "andaliman", "andaliman"];
        } else if (preset === "mild-host") {
          state.giftBoxSlots = ["matah", "bajak", "matah", "bajak"];
        } else if (preset === "high-heat") {
          state.giftBoxSlots = ["roa", "andaliman", "roa", "andaliman"];
        }
        renderGiftBoxBuilder();
      });
    });

    // 3 Format Selector Cards
    const tierBar = document.getElementById("kora-tier-tabs");
    const stageBox = document.getElementById("gifting-stage-box");
    const stageSingle = document.getElementById("gifting-stage-single");
    const stageClassic = document.getElementById("gifting-stage-classic");

    if (tierBar) {
      tierBar.querySelectorAll("[data-tier]").forEach((tab) => {
        tab.addEventListener("click", () => {
          const tier = tab.getAttribute("data-tier");
          tierBar.querySelectorAll("[data-tier]").forEach((t) => {
            t.classList.toggle("is-active", t === tab);
            t.setAttribute("aria-selected", String(t === tab));
          });

          if (tier === "box") {
            if (stageBox) stageBox.style.display = "grid";
            if (stageSingle) stageSingle.style.display = "none";
            if (stageClassic) stageClassic.style.display = "none";
            renderGiftBoxBuilder();
          } else if (tier === "single") {
            if (stageBox) stageBox.style.display = "none";
            if (stageSingle) stageSingle.style.display = "block";
            if (stageClassic) stageClassic.style.display = "none";
            renderSingleJarsStage();
          } else if (tier === "classic") {
            if (stageBox) stageBox.style.display = "none";
            if (stageSingle) stageSingle.style.display = "none";
            if (stageClassic) stageClassic.style.display = "block";
            renderClassicStage();
          }
        });
      });
    }

    // Add Gift Box CTA -> Save to cart & Direct Checkout!
    const addBoxBtn = document.getElementById("add-gift-box-btn");
    if (addBoxBtn) {
      addBoxBtn.addEventListener("click", () => {
        const noteInput = document.getElementById("gift-note-input");
        const dietaryCardCheck = document.getElementById("gift-dietary-card-check");
        const names = state.giftBoxSlots
          .map((id) => {
            const p = RESERVE_PRODUCTS.find((item) => item.id === id);
            return p ? p.name : id;
          })
          .join(", ");
        const noteText =
          noteInput && noteInput.value.trim()
            ? ` · Note: "${noteInput.value.trim()}"`
            : "";
        const cardText =
          dietaryCardCheck && dietaryCardCheck.checked
            ? " · + Dietary Guide Card"
            : "";

        const giftBoxItem = {
          id: "gift-box-" + state.giftBoxSlots.join("-"),
          title: "4 Jar Archipelago Linen Gift Box",
          subtitle: `Jars: ${names}${cardText}${noteText}`,
          price: DATA.brand.giftBoxPrice,
          qty: 1,
          image: "./assets/kora-pantry-table.png"
        };

        const existing = state.cart.find((item) => item.id === giftBoxItem.id);
        if (existing) {
          existing.qty += 1;
        } else {
          state.cart.push(giftBoxItem);
        }

        // Persist cart to localStorage
        localStorage.setItem("ulek_pantry_cart_v2", JSON.stringify(state.cart));

        // Immediately navigate to Checkout and Payment page
        window.location.href = "checkout.html";
      });
    }
  }

  /* ==========================================================================
     9. Section 7: Categorized FAQ, Stockists & Footer Copy Email
     ========================================================================== */
  function renderCategorizedFaq() {
    const catsContainer = document.getElementById("kora-faq-cats");
    const listContainer = document.getElementById("kora-faq-list");
    if (!catsContainer || !listContainer || !DATA.faqs) return;

    // 1. Render Category Pills at Top of Card (General, Pricing, Process, Results)
    catsContainer.innerHTML = DATA.faqs
      .map(
        (group, idx) => `
      <button
        type="button"
        class="kora-faq-pill-btn ${idx === state.activeFaqCategoryIndex ? "is-active" : ""}"
        data-faq-cat="${idx}"
        role="tab"
        aria-selected="${idx === state.activeFaqCategoryIndex}"
      >
        ${group.category}
      </button>
    `
      )
      .join("");

    const activeGroup =
      DATA.faqs[state.activeFaqCategoryIndex] || DATA.faqs[0];

    // 2. Render White Accordion Cards Stack with + / − Minimalist Toggles
    listContainer.innerHTML = activeGroup.items
      .map((item, itemIdx) => {
        const isOpen = state.openFaqIndex === itemIdx;
        return `
        <article class="kora-faq-accordion-item ${isOpen ? "is-open" : ""}" data-faq-idx="${itemIdx}">
          <button
            type="button"
            class="kora-faq-accordion-header"
            aria-expanded="${isOpen}"
            aria-controls="faq-body-${itemIdx}"
          >
            <h3 class="kora-faq-accordion-q">${item.q}</h3>
            <span class="kora-faq-toggle-icon" aria-hidden="true">${isOpen ? "−" : "+"}</span>
          </button>
          ${
            isOpen
              ? `
            <div id="faq-body-${itemIdx}" class="kora-faq-accordion-body" role="region">
              ${item.a}
            </div>
          `
              : ""
          }
        </article>
      `;
      })
      .join("");

    // Category button click handlers
    catsContainer.querySelectorAll("[data-faq-cat]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.activeFaqCategoryIndex = Number(btn.getAttribute("data-faq-cat"));
        state.openFaqIndex = 0; // Open first item in the new category by default (matches reference image)
        renderCategorizedFaq();
      });
    });

    // Accordion toggle click handlers
    listContainer.querySelectorAll(".kora-faq-accordion-header").forEach((btn) => {
      btn.addEventListener("click", () => {
        const itemEl = btn.closest("[data-faq-idx]");
        const idx = Number(itemEl.getAttribute("data-faq-idx"));
        state.openFaqIndex = state.openFaqIndex === idx ? -1 : idx;
        renderCategorizedFaq();
      });
    });
  }

  function renderStockistsGrid() {
    const grid = document.getElementById("stockists-grid");
    if (!grid || !DATA.stockists) return;

    grid.innerHTML = DATA.stockists
      .map((s, idx) => {
        const cityMapUrl =
          s.mapUrl ||
          `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Specialty Grocers " + s.city)}`;

        const locationsHTML = s.locations
          .map((loc) => {
            const locMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              loc + " " + s.city
            )}`;
            return `
              <li>
                <a href="${locMapUrl}" target="_blank" rel="noopener noreferrer" class="stockist-loc-row" title="Buka ${loc} di Google Maps">
                  <span class="stockist-loc-name">${loc}</span>
                  <span class="stockist-loc-action" aria-label="Buka di Google Maps">
                    <span class="stockist-loc-badge">Buka Maps</span>
                    <span class="stockist-loc-dot">●</span>
                  </span>
                </a>
              </li>
            `;
          })
          .join("");

        return `
          <article class="stockist-card" data-city="${s.city}" data-map-url="${cityMapUrl}">
            <!-- Background Image & Cinematic Scrim (Matches Never Blended Craft Section) -->
            <div class="stockist-card-media">
              <img
                src="${s.image}"
                alt="${s.city} Specialty Grocers"
                class="stockist-card-bg-img"
                loading="lazy"
                decoding="async"
              >
              <div class="stockist-card-scrim"></div>
            </div>

            <!-- Foreground Content Layer -->
            <div class="stockist-card-inner">
              <!-- Header: City & Category -->
              <div class="stockist-card-head">
                <h3 class="stockist-city-title">${s.city}</h3>
                <p class="stockist-city-type">${s.type}</p>
              </div>

              <!-- Locations List with Direct Google Maps Deep Links -->
              <div class="stockist-locations-wrap">
                <div class="stockist-locations-label">Partner Grocer Locations (Tap for Maps):</div>
                <ul class="stockist-locations-list">
                  ${locationsHTML}
                </ul>
              </div>

              <!-- Card Footer -->
              <div class="stockist-card-footer">
                <span class="stockist-carries-text">Carries: <strong>${s.carries}</strong></span>
              </div>
            </div>
          </article>
        `;
      })
      .join("");

    // Fallback card click: if user clicks on the card itself (outside an anchor), open city map
    grid.querySelectorAll(".stockist-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        if (!e.target.closest("a")) {
          const mapUrl = card.getAttribute("data-map-url");
          if (mapUrl) {
            window.open(mapUrl, "_blank", "noopener,noreferrer");
          }
        }
      });
    });

    initStockistsScrollAnimation();
  }

  function initStockistsScrollAnimation() {
    const section = document.getElementById("stockists-section");
    if (!section) return;

    function evaluateScroll() {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight || 800;
      const enteredPx = windowHeight - rect.top;
      const sectionProgress = enteredPx / (rect.height || 1);

      // Trigger animation when user reaches ~60% of the section or when section is well into viewport
      if (sectionProgress >= 0.4 || rect.top <= windowHeight * 0.58) {
        section.classList.add("is-in-view");
      } else if (rect.top > windowHeight * 0.95) {
        section.classList.remove("is-in-view");
      }
    }

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              section.classList.add("is-in-view");
            }
          });
        },
        { threshold: [0.15, 0.35, 0.6] }
      );
      observer.observe(section);
    }

    let stockistRaf = null;
    window.addEventListener(
      "scroll",
      () => {
        if (!stockistRaf) {
          stockistRaf = window.requestAnimationFrame(() => {
            evaluateScroll();
            stockistRaf = null;
          });
        }
      },
      { passive: true }
    );

    evaluateScroll();
  }

  function initFooterInteractions() {
    const copyBtn = document.getElementById("copy-email-btn");
    const labelEl = document.getElementById("copy-email-label");
    if (copyBtn && labelEl) {
      copyBtn.addEventListener("click", () => {
        const email = copyBtn.getAttribute("data-email") || "hello@uleksidoarjo.id";
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(email).catch(() => {});
        }
        labelEl.textContent = "Copied: hello@uleksidoarjo.id ✓";
        showToast("Copied hello@uleksidoarjo.id to clipboard");
        setTimeout(() => {
          labelEl.textContent = "Copy Email: hello@uleksidoarjo.id";
        }, 2600);
      });
    }
  }

  /* ==========================================================================
     10. Product Navigation & Return Home Helpers (PDP View Removed)
     ========================================================================== */
  function openPdpView(productId) {
    const target = productId === "classic-1987" ? "#gifting-section" : "#collection-section";
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  function closePdpViewAndReturnHome(targetSelector) {
    state.activeView = "homepage";
    const homeEl = document.getElementById("view-homepage");
    if (homeEl) homeEl.classList.remove("is-hidden");
    if (targetSelector) {
      const target = document.querySelector(targetSelector);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 60);
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }


  /* ==========================================================================
     11a. Flying Pantry Bag Animation (Parabolic Arc Flight to Top-Right Dock)
     ========================================================================== */
  function playFlyToPantryBagAnimation(triggerEl) {
    const targetBtn = document.getElementById("open-cart-btn");
    if (!targetBtn) return;

    const targetRect = targetBtn.getBoundingClientRect();
    const endX = targetRect.left + targetRect.width / 2;
    const endY = targetRect.top + targetRect.height / 2;

    let startX = window.innerWidth / 2;
    let startY = window.innerHeight / 2;

    if (triggerEl && typeof triggerEl.getBoundingClientRect === "function") {
      const rect = triggerEl.getBoundingClientRect();
      startX = rect.left + rect.width / 2;
      startY = rect.top + rect.height / 2;
    }

    // Create flying pantry bag element
    const flyer = document.createElement("div");
    flyer.className = "flying-pantry-bag";
    flyer.innerHTML = `
      <div class="flying-bag-card">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M9 7V5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5V7" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round"/>
          <path d="M4.5 7H19.5L18.2 21.5C18.1 22.3 17.4 23 16.6 23H7.4C6.6 23 5.9 22.3 5.8 21.5L4.5 7Z" fill="#B8422A" stroke="#FFFFFF" stroke-width="2" stroke-linejoin="round"/>
          <path d="M8.5 12.5H15.5" stroke="rgba(255,255,255,0.75)" stroke-width="1.8" stroke-linecap="round" stroke-dasharray="2 2"/>
        </svg>
        <span class="flying-bag-tag">+1</span>
      </div>
    `;
    document.body.appendChild(flyer);

    // Compute 24-step parabolic arc keyframes
    const steps = 24;
    const keyframes = [];
    const arcHeight = Math.min(220, Math.max(70, Math.abs(endX - startX) * 0.28));

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      // Eased progress (cubic ease-in-out)
      const easeT = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const x = startX + (endX - startX) * t;
      const lift = Math.sin(t * Math.PI) * arcHeight;
      const y = startY + (endY - startY) * easeT - lift;

      let scale = 1.0;
      if (t < 0.15) {
        scale = 0.35 + (t / 0.15) * 0.85; // Pop in 0.35 -> 1.2
      } else if (t > 0.8) {
        scale = 1.0 - ((t - 0.8) / 0.2) * 0.72; // Shrink into bag: 1.0 -> 0.28
      }

      const rot = Math.sin(t * Math.PI) * 18;
      const opacity = t > 0.88 ? 1 - (t - 0.88) / 0.12 : 1;

      keyframes.push({
        transform: `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale}) rotate(${rot}deg)`,
        opacity: opacity
      });
    }

    try {
      const anim = flyer.animate(keyframes, {
        duration: 720,
        easing: "linear",
        fill: "forwards"
      });

      anim.onfinish = () => {
        flyer.remove();
        // Bounce target Pantry Bag dock button
        targetBtn.classList.remove("pantry-bag-bounce");
        void targetBtn.offsetWidth; // Reflow to restart animation
        targetBtn.classList.add("pantry-bag-bounce");
        setTimeout(() => {
          targetBtn.classList.remove("pantry-bag-bounce");
        }, 550);
      };
    } catch {
      flyer.remove();
    }
  }

  /* ==========================================================================
     11. Slide-Over Pantry Bag Drawer (<dialog>)
     ========================================================================== */
  function addProductToCart(productId, qty = 1, triggerEl = null) {
    const product = DATA.products.find((p) => p.id === productId);
    if (!product) return;

    playFlyToPantryBagAnimation(triggerEl);

    const existing = state.cart.find((item) => item.id === product.id);
    if (existing) {
      existing.qty += qty;
    } else {
      state.cart.push({
        id: product.id,
        title: `ULEK ${product.name} ${product.origin}`,
        subtitle: `${product.jarSize} · ${product.heatTag}`,
        price: product.price,
        qty: qty,
        image: product.image
      });
    }

    localStorage.setItem("ulek_pantry_cart_v2", JSON.stringify(state.cart));
    renderCartDrawer();
    showToast(`Added ${qty}× ULEK ${product.name} (${product.priceFormatted}) to Pantry Bag`);
  }

  function addCustomItemToCart(customItem, triggerEl = null) {
    playFlyToPantryBagAnimation(triggerEl);

    const existing = state.cart.find((item) => item.id === customItem.id);
    if (existing) {
      existing.qty += customItem.qty;
    } else {
      state.cart.push(customItem);
    }
    localStorage.setItem("ulek_pantry_cart_v2", JSON.stringify(state.cart));
    renderCartDrawer();
    showToast(`Added ${customItem.title} to Pantry Bag`);
    setTimeout(openCartDrawer, 600);
  }

  function renderCartDrawer() {
    const badgeEl = document.getElementById("cart-count-badge");
    const listEl = document.getElementById("cart-items-container");
    const subtotalEl = document.getElementById("cart-subtotal-val");
    const shipMsgEl = document.getElementById("cart-shipping-msg");
    const shipPctEl = document.getElementById("cart-shipping-pct");
    const shipBarEl = document.getElementById("cart-shipping-bar");
    const classicUpsellEl = document.getElementById("cart-classic-upsell");

    const totalCount = state.cart.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = state.cart.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    if (badgeEl) badgeEl.textContent = String(totalCount);
    if (subtotalEl) subtotalEl.textContent = formatRupiah(subtotal);

    const freeThreshold = 300000;
    const pct = Math.min(100, Math.round((subtotal / freeThreshold) * 100));
    if (shipPctEl) shipPctEl.textContent = `${pct}%`;
    if (shipBarEl) shipBarEl.style.width = `${pct}%`;
    if (shipMsgEl) {
      shipMsgEl.textContent =
        subtotal >= freeThreshold
          ? "✓ Unlocked complimentary chilled courier delivery!"
          : `Add ${formatRupiah(freeThreshold - subtotal)} more for complimentary delivery`;
    }

    if (classicUpsellEl) {
      const hasClassic = state.cart.some((i) => i.id === "classic-1987");
      classicUpsellEl.style.display = hasClassic ? "none" : "flex";
    }

    if (!listEl) return;

    if (state.cart.length === 0) {
      listEl.innerHTML = `
        <div style="text-align:center; padding:40px 16px; color:var(--kora-muted); font-size:0.9rem;">
          Your Pantry Bag is currently empty. Explore our Rp100.000 Reserve Line or Rp25.000 1987 Original.
        </div>
      `;
      return;
    }

    listEl.innerHTML = state.cart
      .map(
        (item, idx) => `
      <div class="cart-item-card">
        <img src="${item.image}" alt="${item.title}" class="cart-item-thumb" width="58" height="58">
        <div>
          <div style="font-family:var(--font-display); font-size:0.88rem; font-weight:600;">${item.title}</div>
          <div style="font-size:0.74rem; color:var(--kora-muted); margin-bottom:4px;">${item.subtitle}</div>
          <div class="tabular-nums" style="font-family:var(--font-mono); font-size:0.78rem; font-weight:700;">
            ${formatRupiah(item.price * item.qty)}
          </div>
        </div>
        <div class="qty-control-pill">
          <button type="button" data-cart-dec="${idx}" aria-label="Decrease quantity">−</button>
          <span class="tabular-nums">${item.qty}</span>
          <button type="button" data-cart-inc="${idx}" aria-label="Increase quantity">+</button>
        </div>
      </div>
    `
      )
      .join("");

    listEl.querySelectorAll("[data-cart-dec]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.getAttribute("data-cart-dec"));
        if (state.cart[idx]) {
          state.cart[idx].qty -= 1;
          if (state.cart[idx].qty <= 0) state.cart.splice(idx, 1);
          localStorage.setItem("ulek_pantry_cart_v2", JSON.stringify(state.cart));
          renderCartDrawer();
        }
      });
    });

    listEl.querySelectorAll("[data-cart-inc]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.getAttribute("data-cart-inc"));
        if (state.cart[idx]) {
          state.cart[idx].qty += 1;
          localStorage.setItem("ulek_pantry_cart_v2", JSON.stringify(state.cart));
          renderCartDrawer();
        }
      });
    });
  }

  function openCartDrawer() {
    const dialog = document.getElementById("cart-drawer");
    if (dialog && typeof dialog.showModal === "function" && !dialog.open) {
      dialog.showModal();
    }
  }

  /* ==========================================================================
     12. Antikode Designer Skill Test Brief C Case Study Modal (<dialog>)
     ========================================================================== */
  function renderCaseStudyModal() {
    const container = document.getElementById("case-study-content");
    if (!container || !DATA.caseStudy) return;

    let bodyHTML = "";

    if (state.activeCaseStudyTab === "sense-making") {
      bodyHTML = `
        <div class="case-grid-2">
          ${DATA.caseStudy.senseMaking
            .map(
              (item) => `
            <article class="case-insight-card">
              <div>
                <span style="font-family:var(--font-mono); font-size:0.7rem; font-weight:700; color:var(--kora-chili);">
                  BRIEF C OBSERVATION ${item.number}
                </span>
                <h3 style="font-family:var(--font-display); font-size:1.15rem; font-weight:600; margin-block:6px 10px;">
                  ${item.title}
                </h3>
                <p style="font-size:0.84rem; color:var(--kora-muted); margin-bottom:10px;">
                  <strong>What we noticed in the brief:</strong> ${item.observation}
                </p>
              </div>
              <div style="background:var(--kora-ivory-bg); border-left:3px solid var(--kora-green); padding:10px 12px; border-radius:0 10px 10px 0; font-size:0.84rem;">
                <strong>How we framed the real problem:</strong> ${item.framing}
              </div>
            </article>
          `
            )
            .join("")}
        </div>
      `;
    } else if (state.activeCaseStudyTab === "problem-solving") {
      const decisions = [
        {
          title: "1. Kora Inspired Dual Tier Architecture (Rp100k Reserve + Rp25k Classic)",
          desc: "Instead of hiding the Rp25.000 original jar, we placed it in the top navigation dock, in the Before/After comparison, in the signature Kora Botanical Green section, and inside the shared Pantry Bag.",
          target: "#heritage-1987-anchor",
          btnLabel: "Spotlight 1987 Classic Section →"
        },
        {
          title: "2. Solving the 'Andaliman With Grilled Pork, Noodles' Gifting Friction",
          desc: "To convert 25 40 urban food gifters in Indonesia, every Andaliman card & PDP features a transparent '100% Plant Based Jar · Zero Pork Inside' badge and a 1 click Plant Based Gift Box preset.",
          target: "#collection-section",
          btnLabel: "Spotlight Reserve Split Cards →"
        },
        {
          title: "3. Interactive Dish Pairing Sommelier (All 4 Canonical Pairings)",
          desc: "Turned the brief's 4 dish notes ('With grilled fish', 'With rice and eggs', 'With tempe, fried chicken', 'With grilled pork, noodles') into Kora's interactive 01 to 04 expandable green rows.",
          target: "#pairing-section",
          btnLabel: "Spotlight Pairing Sommelier →"
        },
        {
          title: "4. Deliverable 02: Full Multi SKU Product Detail Page (PDP)",
          desc: "Instant switcher across all 4 Reserve Jars + 1987 Original with 3 mode visual inspection (Studio Jar, Coarse Cobek Zoom, Single Origin Ingredients) and 5 jar comparison table.",
          target: "OPEN_PDP",
          btnLabel: "Jump to Product Detail Page →"
        }
      ];

      bodyHTML = `
        <div class="case-grid-2">
          ${decisions
            .map(
              (d) => `
            <article class="case-insight-card">
              <div>
                <h3 style="font-family:var(--font-display); font-size:1.12rem; font-weight:600; margin-bottom:8px;">
                  ${d.title}
                </h3>
                <p style="font-size:0.86rem; color:var(--kora-body); line-height:1.5;">
                  ${d.desc}
                </p>
              </div>
              <button type="button" class="kora-btn-dark" style="width:fit-content; padding:9px 16px; font-size:0.8rem;" data-case-jump="${d.target}">
                <span>${d.btnLabel}</span>
              </button>
            </article>
          `
            )
            .join("")}
        </div>
      `;
    } else {
      bodyHTML = `
        <div class="case-exploration-grid">
          ${DATA.caseStudy.visualExplorations
            .map(
              (exp) => `
            <article class="exploration-card ${exp.id === "dir-c" ? "is-selected-direction" : ""}">
              <div>
                <span style="font-family:var(--font-mono); font-size:0.68rem; font-weight:700; color:${exp.id === "dir-c" ? "var(--kora-green)" : "var(--kora-muted)"};">
                  ${exp.tag}
                </span>
                <h3 style="font-family:var(--font-display); font-size:1.08rem; font-weight:600; margin-block:6px 10px;">
                  ${exp.name}
                </h3>
                <div class="swatch-row" style="margin-bottom:12px;">
                  ${exp.swatchColors
                    .map(
                      (c) => `<span class="swatch-chip" style="background:${c};" title="${c}"></span>`
                    )
                    .join("")}
                </div>
                <p style="font-size:0.82rem; color:var(--kora-body); margin-bottom:8px;">
                  <strong>Visual Mood:</strong> ${exp.inspiration}
                </p>
              </div>
              <div style="font-size:0.8rem; padding-top:10px; border-top:1px solid var(--kora-border);">
                <strong>Verdict:</strong> ${exp.whyRejected}
              </div>
            </article>
          `
            )
            .join("")}
        </div>
      `;
    }

    container.innerHTML = `
      <div class="case-study-shell">
        <div class="case-study-top-bar">
          <div>
            <span style="font-family:var(--font-mono); font-size:0.72rem; text-transform:uppercase; color:var(--kora-muted);">
              ANTIKODE DESIGNER SKILL TEST · BRIEF C: ULEK (KORA REDESIGN EDITION)
            </span>
            <h2 id="case-study-modal-title" style="font-family:var(--font-display); font-size:clamp(1.45rem, 2.4vw, 2rem); font-weight:600;">
              How Our Reasoning Connects to Our Design
            </h2>
          </div>
          <button type="button" id="close-case-study-btn" class="kora-circle-arrow-btn" aria-label="Close Case Study Modal">✕</button>
        </div>

        <div class="case-study-tabs" role="tablist">
          <button type="button" class="case-tab-btn ${state.activeCaseStudyTab === "sense-making" ? "is-active" : ""}" data-case-tab="sense-making">
            <span class="case-tab-num">01 · ASSESSMENT PILLAR</span>
            <span class="case-tab-title">Sense making</span>
            <span class="case-tab-sub">How we read Brief C &amp; framed the real problem</span>
          </button>
          <button type="button" class="case-tab-btn ${state.activeCaseStudyTab === "problem-solving" ? "is-active" : ""}" data-case-tab="problem-solving">
            <span class="case-tab-num">02 · ASSESSMENT PILLAR</span>
            <span class="case-tab-title">Problem solving</span>
            <span class="case-tab-sub">Decisions that follow from what we were given</span>
          </button>
          <button type="button" class="case-tab-btn ${state.activeCaseStudyTab === "craft-taste" ? "is-active" : ""}" data-case-tab="craft-taste">
            <span class="case-tab-num">03 · ASSESSMENT PILLAR</span>
            <span class="case-tab-title">Craft &amp; taste</span>
            <span class="case-tab-sub">Range explored &amp; Kora Framer visual system</span>
          </button>
        </div>

        <div>${bodyHTML}</div>
      </div>
    `;

    const closeBtn = document.getElementById("close-case-study-btn");
    const modal = document.getElementById("case-study-modal");
    if (closeBtn && modal) {
      closeBtn.addEventListener("click", () => modal.close());
    }

    container.querySelectorAll("[data-case-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.activeCaseStudyTab = btn.getAttribute("data-case-tab");
        renderCaseStudyModal();
      });
    });

    container.querySelectorAll("[data-case-jump]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-case-jump");
        if (modal) modal.close();
        if (target === "OPEN_PDP") {
          openPdpView("andaliman");
          return;
        }
        closePdpViewAndReturnHome(target);
        setTimeout(() => {
          const el = document.querySelector(target);
          if (el) {
            el.classList.add("is-spotlight-pulsing");
            setTimeout(() => el.classList.remove("is-spotlight-pulsing"), 3400);
          }
        }, 450);
      });
    });
  }

  function openCaseStudyModal(defaultTab) {
    if (defaultTab) state.activeCaseStudyTab = defaultTab;
    renderCaseStudyModal();
    const modal = document.getElementById("case-study-modal");
    if (modal && typeof modal.showModal === "function" && !modal.open) {
      modal.showModal();
    }
  }

  /* ==========================================================================
     13. Global Navigation & Event Listeners
     ========================================================================== */
  function initGlobalEvents() {
    // Logo & nav links return to homepage if currently in PDP
    const logo = document.getElementById("nav-logo-home");
    if (logo) {
      logo.addEventListener("click", (e) => {
        if (state.activeView === "pdp") {
          e.preventDefault();
          closePdpViewAndReturnHome("#top");
        }
      });
    }

    document.querySelectorAll("[data-home-scroll]").forEach((link) => {
      link.addEventListener("click", (e) => {
        const target = link.getAttribute("data-home-scroll");
        if (state.activeView === "pdp") {
          e.preventDefault();
          closePdpViewAndReturnHome(target);
        }
      });
    });

    // Heritage 1987 section buttons
    const addClassicBtn = document.getElementById("heritage-add-classic-btn");
    if (addClassicBtn) {
      addClassicBtn.addEventListener("click", () => {
        addProductToCart("classic-1987", 1, addClassicBtn);
      });
    }

    const inspectClassicBtn = document.getElementById("heritage-inspect-classic-btn");
    if (inspectClassicBtn) {
      inspectClassicBtn.addEventListener("click", () => {
        openPdpView("classic-1987");
      });
    }

    // Cart Drawer triggers
    const openCartBtn = document.getElementById("open-cart-btn");
    const closeCartBtn = document.getElementById("close-cart-btn");
    const cartDialog = document.getElementById("cart-drawer");
    if (openCartBtn) {
      openCartBtn.addEventListener("click", openCartDrawer);
    }
    if (closeCartBtn && cartDialog) {
      closeCartBtn.addEventListener("click", () => cartDialog.close());
    }

    const upsellClassicBtn = document.getElementById("drawer-upsell-classic-btn");
    if (upsellClassicBtn) {
      upsellClassicBtn.addEventListener("click", () => {
        addProductToCart("classic-1987", 1, upsellClassicBtn);
      });
    }

    const checkoutBtn = document.getElementById("checkout-sim-btn");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        if (cartDialog) cartDialog.close();
        localStorage.setItem("ulek_pantry_cart_v2", JSON.stringify(state.cart));
        window.location.href = "checkout.html";
      });
    }

    // Case Study Modal triggers
    ["open-case-study-btn", "footer-case-study-btn", "footer-case-study-link"].forEach(
      (id) => {
        const btn = document.getElementById(id);
        if (btn) {
          btn.addEventListener("click", () => openCaseStudyModal("sense-making"));
        }
      }
    );
  }

  /* ==========================================================================
     11b. Documentary YouTube Inline Player (Direct in Card, Zero Pop-up)
     ========================================================================== */
  function initInlineVideoPlayer() {
    const banner = document.getElementById("kora-video-banner");
    const playBtn = document.getElementById("workshop-reel-btn");
    const inlineIframe = document.getElementById("video-banner-inline-iframe");
    const closeBtn = document.getElementById("video-banner-close-inline-btn");
    const inlineContainer = document.getElementById("video-banner-inline-player");
    if (!banner || !playBtn || !inlineIframe) return;

    // Autoplay, inline playback, modest branding, related videos off
    const YOUTUBE_EMBED_URL =
      "https://www.youtube-nocookie.com/embed/8kGv0iVNlQg?autoplay=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1";

    function startInlineVideo() {
      if (banner.classList.contains("is-playing")) return;
      inlineIframe.src = YOUTUBE_EMBED_URL;
      banner.classList.add("is-playing");
      if (inlineContainer) inlineContainer.setAttribute("aria-hidden", "false");
    }

    function stopInlineVideo(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      inlineIframe.src = ""; // Instantly halts video and sound
      banner.classList.remove("is-playing");
      if (inlineContainer) inlineContainer.setAttribute("aria-hidden", "true");
    }

    playBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      startInlineVideo();
    });

    banner.addEventListener("click", (e) => {
      // Start video when clicking card if not already playing
      if (!banner.classList.contains("is-playing")) {
        startInlineVideo();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", stopInlineVideo);
    }
  }

  /* ==========================================================================
     13c. Section Title Interactive Word Hover Animation
     Enables smooth color transitions to fiery red-orange on each individual word
     ========================================================================== */
  function initSectionTitleWordHover() {
    const titleSelectors = [
      ".kora-services-big-title",
      ".kora-two-tone-heading",
      ".kora-hero-title",
      ".video-banner-title",
      ".hero-manifesto-statement",
      ".kora-green-bottom-split h3",
      ".kora-giftbox-builder h3",
      ".stockists-big-title",
      "#stockists-heading"
    ];

    function wrapTextNodesWithHoverWords(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        if (!text.trim()) return;

        const fragment = document.createDocumentFragment();
        const tokens = text.split(/(\s+)/);
        tokens.forEach((token) => {
          if (!token) return;
          if (/^\s+$/.test(token)) {
            fragment.appendChild(document.createTextNode(token));
          } else {
            const span = document.createElement("span");
            span.className = "kora-hover-word";
            span.textContent = token;
            fragment.appendChild(span);
          }
        });
        node.parentNode.replaceChild(fragment, node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.classList.contains("kora-hover-word") || node.tagName === "BUTTON") return;
        Array.from(node.childNodes).forEach(wrapTextNodesWithHoverWords);
      }
    }

    document.querySelectorAll(titleSelectors.join(", ")).forEach((heading) => {
      if (heading.classList.contains("kora-services-big-title")) {
        heading.querySelectorAll(".split-word").forEach((w) => {
          w.classList.add("kora-hover-word");
        });
        return;
      }
      wrapTextNodesWithHoverWords(heading);
    });
  }

  /* ==========================================================================
     14. Boot Application
     ========================================================================== */
  function init() {
    renderHeroSpotlight();
    initHeroScrollStage();
    initReserveIntroObserver();
    renderReserveSplitCards();
    initStickyStackScrollAnimation();
    initFilterChips();
    initCraftHeaderObserver();
    renderCraftAccordion();
    initInlineVideoPlayer();
    renderGreenPairingRows();
    renderPantryTestimonials();
    renderGiftBoxBuilder();
    initGiftBoxControls();
    renderCategorizedFaq();
    renderStockistsGrid();
    initFooterInteractions();
    renderCartDrawer();
    initSectionTitleWordHover();
    initGlobalEvents();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
