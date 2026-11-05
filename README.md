# ULEK — Artisanal Archipelago Sambal (Antikode Designer Skill Test — Brief C)

Repository ini berisi **Interactive Launch Website (HTML/CSS/JS)**, **Product Requirements Document (PRD)**, **Design System (`UI/UX Pro Max`)**, dan **Built-in Case Study Deck** untuk **Antikode Designer Skill Test — Brief C: ULEK**.

---

## Cara Menjalankan & Mempresentasikan Saat Interview Antikode

Website ini dibangun tanpa ketergantungan *build tool* berat sehingga **100% bebas risiko error saat live demo interview**:

1. **Cara Paling Cepat:** Buka langsung file [`index.html`](./index.html) di browser modern (Chrome, Arc, Safari, Edge).
2. **Via Local Dev Server (Direkomendasikan):**
   ```bash
   cd /Users/ibnusoffyantsauri/Documents/GitHub/Ulek
   python3 -m http.server 8080
   ```
   Lalu buka `http://localhost:8080` di browser.

---

## Struktur Proyek & Deliverables

```text
Ulek/
├── index.html                                     # Deliverable Utama: Homepage + PDP + Case Study Deck
├── css/
│   └── styles.css                                 # Design Tokens, Skot. Bento Cutouts, Stodio® Rhythm & Motion
├── js/
│   ├── data.js                                    # Canonical Data Store (4 Reserve Jars + 1987 Classic + Case Study)
│   └── app.js                                     # Interactive State, Variant Switcher, Sommelier, Gift Box, PDP & Spotlight
├── assets/                                        # Bespoke High-Craft Product & Culinary Studio Photography
│   ├── jar-matah.png                              # 01 · Matah (Bali · Heat 2/5 · With grilled fish)
│   ├── jar-roa.png                                # 02 · Roa (Manado · Heat 3/5 · With rice and eggs)
│   ├── jar-bajak.png                              # 03 · Bajak (Jawa · Heat 2/5 · With tempe, fried chicken)
│   ├── jar-andaliman.png                          # 04 · Andaliman (Batak · Heat 4/5 · With grilled pork, noodles)
│   ├── jar-classic-1987.png                       # 87 · Warung 1987 Original (Sidoarjo · Rp25.000)
│   └── hero-cobek-craft.png                       # Dark-mode volcanic stone cobek editorial photography
├── AGENTS.md                                      # Guardrails & Anti-AI-Slop Manifesto
└── plan/                                          # Master Plan, PRD, Design System & Copywriting Suite
    ├── 00_MASTER_EXECUTION_PLAN.md
    ├── 01_PRD_ULEK_LAUNCH_WEBSITE.md
    ├── 02_DESIGN_SYSTEM_AND_ANTI_SLOP_GUIDE.md
    ├── 03_INTERACTION_AND_MOTION_SPEC.md
    ├── 04_COPYWRITING_AND_CONTENT_DECK.md
    └── references/
```
