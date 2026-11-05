# AGENTS.md — AI Coding Agent Guardrails & Design Directives (ULEK Project)

> **CRITICAL DIRECTIVE FOR ALL AI AGENTS:**
> Before writing, editing, or generating a single line of HTML, CSS, or JavaScript in this repository, you **MUST** read the complete specification suite inside `./plan/`:
> 1. [`./plan/00_MASTER_EXECUTION_PLAN.md`](./plan/00_MASTER_EXECUTION_PLAN.md) — End-to-End Roadmap, Architecture, & Verification Gates.
> 2. [`./plan/01_PRD_ULEK_LAUNCH_WEBSITE.md`](./plan/01_PRD_ULEK_LAUNCH_WEBSITE.md) — Product Requirements Document (PRD), Brief C Sense-Making, & Scope Guardrails.
> 3. [`./plan/02_DESIGN_SYSTEM_AND_ANTI_SLOP_GUIDE.md`](./plan/02_DESIGN_SYSTEM_AND_ANTI_SLOP_GUIDE.md) — UI/UX Pro Max Design System, Visual Reference Synthesis (`Skot.` + `Stodio®` + Antikode Brief C), & Strict Anti-AI-Slop Rules.
> 4. [`./plan/03_INTERACTION_AND_MOTION_SPEC.md`](./plan/03_INTERACTION_AND_MOTION_SPEC.md) — Scroll Choreography, Micro-Interactions, Variant State Machine, & SPA View Transitions.
> 5. [`./plan/04_COPYWRITING_AND_CONTENT_DECK.md`](./plan/04_COPYWRITING_AND_CONTENT_DECK.md) — Canonical Product Data, Authentic Indonesian Culinary Copywriting, & Antikode Interview Presentation Deck Content.

---

## 1. Project Mission

This repository contains the official submission for the **Antikode Designer Skill Test — Brief C: ULEK**.
* **Brand Background:** ULEK started as a warung in Sidoarjo (East Java) in **1987** and is now run by the **third generation**. Its original sambal sells well in local markets and online at **Rp25.000 a jar**.
* **Client's Ask:** *"We're launching a premium line (Rp100.000 a jar). Design the launch website."*
* **Key Deliverables:**
  1. **Homepage**
  2. **Product Detail Page (PDP)**
  3. **Built-in Case Study / Visual Exploration Drawer (Interview Presentation Mode)** — explicitly demonstrating how our design solves Antikode's 3 evaluation pillars: **01 Sense-making**, **02 Problem solving**, and **03 Craft & taste** (including the 3 visual directions explored before settling on the final direction).

---

## 2. Canonical Product Data (NEVER Hallucinate or Alter)

Every product card, filter, comparison table, and PDP state **must** strictly use the exact facts from Brief C:

| ID | Variant Name | Origin | Heat Level | Price | Canonical Pairing (from Brief) | Heritage / Line |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `matah` | **Matah** | Bali | `2/5` | Rp100.000 | *With grilled fish* | The Reserve Line (New) |
| `roa` | **Roa** | Manado | `3/5` | Rp100.000 | *With rice and eggs* | The Reserve Line (New) |
| `bajak` | **Bajak** | Jawa | `2/5` | Rp100.000 | *With tempe, fried chicken* | The Reserve Line (New) |
| `andaliman` | **Andaliman** | Batak | `4/5` | Rp100.000 | *With grilled pork, noodles* | The Reserve Line (New) |
| `classic-1987` | **Warung 1987 Original** | Sidoarjo | `3/5` | Rp25.000 | *Everyday warung table staple* | 1987 Heritage Line (Existing) |

---

## 3. Non-Negotiable Anti-AI-Slop Rules (`UI/UX Pro Max`)

To ensure this project looks 100% crafted by a Senior Human Art Director & Product Designer at an award-winning agency (like Antikode) and **never** looks like AI-generated boilerplate:

1. **NO Emoji Icons Anywhere:** Never use `🌶️`, `🔥`, `🛒`, `✨`, `⭐`, `🎁`, or any Unicode emoji in the UI. Use custom, razor-sharp inline SVGs (1.5px stroke or geometric bespoke icons like the `Stodio®` `[■]` red square kicker and `Skot.` circular arrow badge).
2. **NO Generic SaaS Gradients or Neon Colors:** Ban all purple/indigo/blue/cyan gradients. Strictly adhere to the **Warm Stone + Obsidian Cobek + Terracotta Chili** palette extracted from the `Skot.` (`03_mood_ref_skot_bento_hero.png`) and `Stodio®` (`04_mood_ref_stodio_editorial_rhythm.png`) references.
3. **NO Generic 3-Column "Why Choose Us" Icon Cards:** Use **asymmetric sculpted Bento cutouts** (`Skot.` reference) and **Swiss editorial dotted metric grids & 4-column tall portrait galleries** (`Stodio®` reference).
4. **NO Fake E-Commerce Gimmicks:** Never add countdown timers, fake "Someone in Jakarta just bought this!" toasts, strikethrough discount prices (`Rp150.000 -> Rp100.000`), or fake star ratings (`4.9 ★★★★★ (10,000+ reviews)`). Notice how `Skot.` uses a subtle social proof cluster—in ULEK, translate that into an authentic **"Trusted in Sidoarjo since 1987 · Now in 18+ Specialty Grocers"** badge, not fake review spam.
5. **NO Placeholder Text:** Never write `Lorem ipsum` or generic AI marketing fluff ("Elevate your culinary journey with our revolutionary sambal"). Use the exact editorial copy defined in [`./plan/04_COPYWRITING_AND_CONTENT_DECK.md`](./plan/04_COPYWRITING_AND_CONTENT_DECK.md).
6. **Respect Layout & Contrast Standards:**
   * Minimum `4.5:1` text contrast in both Light Stone sections and Dark Obsidian sections.
   * All interactive elements must have `cursor: pointer`, minimum `44x44px` touch target on mobile, visible `:focus-visible` rings, and smooth transitions (`180ms–350ms cubic-bezier(0.22, 1, 0.36, 1)`).
   * Zero horizontal overflow (`overflow-x: hidden` on body/main containers) across `375px`, `768px`, `1024px`, and `1440px` viewports.
   * Respect `@media (prefers-reduced-motion: reduce)` for all scroll and transition animations.
