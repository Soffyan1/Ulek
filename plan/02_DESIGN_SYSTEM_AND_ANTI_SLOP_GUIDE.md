# 02 — Updated Design System & Mood Guide (`Kora Framer Architecture x ULEK Brief C`)

> **REVISI ARAH MOOD DESAIN (UTAMA):**
> Arah desain website ULEK kini mengadopsi penuh arsitektur visual, palet warna, tipografi *two-tone*, tata letak panggung Hero, *sticky service/product split cards*, *4-phase horizontal expanding accordion*, serta blok hijau botanikal dari referensi utama **[`https://kora.framer.media/`](https://kora.framer.media/)** (dokumentasi forensik lengkap tersedia di [`./05_KORA_REDESIGN_MASTER_GUIDE.md`](./05_KORA_REDESIGN_MASTER_GUIDE.md)).

---

## 1. DNA Visual `https://kora.framer.media/` yang Diterapkan ke ULEK

1. **Framed Full-Bleed Botanical Hero + Notched Top-Left White Navbar Dock:**
   * Kanvas halaman berwarna **Pure Pantry Ivory (`#FCFCFA`)** dengan *outer frame* `14px` mengelilingi Hero ber-radius besar (`border-radius: 28px`).
   * Di pojok kiri atas Hero, warna `#FCFCFA` membentuk **Sculpted Top-Left Navbar Dock (`border-radius: 0 0 26px 0`)** dengan lekukan sudut dalam yang mulus, memuat logo **`ulek™`** dan tautan navigasi bersih (`Reserve Line`, `Pairing Guide`, `How We Craft`, `1987 Classic`).
   * Di pojok kanan atas Hero, melayang **Dark Charcoal Pill (`#242424`)** dengan avatar lingkaran di sisi kanannya (mengadaptasi tombol `Book a call + Avatar` di Kora menjadi `Pantry Bag (N)` + `Case Study Deck`).
   * Di bagian tengah-kiri Hero, tipografi **`Manrope`** putih bersih berukuran besar tampil tenang di atas fotografi makro *backlit* cabai, bawang merah Karangasem, dan daun jeruk (`./assets/kora-hero-sambal-flora.png`), ditemani tombol kapsul hijau khas Kora (`#5DC39B` dengan titik putih `●`).
   * Di pojok kiri bawah Hero: *5 Stacked Circular Thumbnails* + `★★★★★` + `"Loved since 1987 · Stocked in 18+ specialty grocers"` + deretan nama *stockist* transparan.
   * Di pojok kanan bawah Hero: **Floating Ivory Spotlight Card (`#FCFCFA`, `border-radius: 22px`)** yang menampilkan *thumbnail* potret toples di kiri, badge hitam `Reserve 01/04 · Bali` (lengkap dengan switcher `01`–`04`), deskripsi *pairing* dari brief, angka metrik besar (`Heat 2/5 · Rp100k`), dan tombol bulat `→` menuju PDP!

2. **Two-Tone Display Typography (`#0D0D0D` + `#616161`):**
   * Semua judul seksi utama menggunakan font **`Manrope`** (`font-weight: 500`, `letter-spacing: -0.035em`) dengan pembagian dua warna khas Kora: kalimat pembuka berwarna hitam pekat `#0D0D0D` dan kalimat penutup berwarna abu-abu hangat `#616161`.

3. **Before vs. After Comparison Cards (`#242424` Dark Card vs. `#F5F5E9` Cream Card):**
   * Mengadaptasi seksi *Comparison* di Kora untuk membandingkan *"Before: The Usual Brand Upgrade Trap (Meninggalkan pelanggan lama & sekadar jual pedas ekstrem)"* vs. *"After: The ULEK Gen III Standard (Lini Reserve Rp100k untuk Gifting & Nice Pantry + Toples Klasik 1987 tetap Rp25k)"*.

4. **Calibrated Horizontal Bar Graph + 4 Full-Width Kora Split Cards (Matah, Roa, Bajak, Andaliman):**
   * Mengadaptasi seksi *Services* di Kora: dimulai dengan **2-Bar Horizontal Comparison Graph** (`#5DC39B` vs `#242424`), diikuti **4 Kartu Split Besar** untuk masing-masing varian **Matah (Bali · 2/5)**, **Roa (Manado · 3/5)**, **Bajak (Jawa · 2/5)**, dan **Andaliman (Batak · 4/5)**.
   * Setiap kartu memiliki kolom kiri berisi label, nomor seri (`01`–`04`), judul besar, deskripsi, 6 poin *"Inside the Jar & Pairing Ritual"*, dan tombol aksi; serta kolom kanan berisi foto toples besar + **Embedded Quote / Dietary Clarity Card** di bagian bawahnya.

5. **4-Phase Horizontal Expanding Accordion (`How We Craft`) + Full-Width Kitchen Video Banner:**
   * Mengadaptasi seksi *"How we work"* di Kora (`06_kora_framer_sections_reference.jpg`): 4 kartu horizontal di mana kartu yang aktif melebar menjadi gelap (`#242424`) dengan indikator 4 titik `••••`, sementara 3 kartu lainnya menjadi kolom vertikal krem (`#F5F5E9`) bernomor `02`, `03`, `04`.
   * Tepat di bawahnya terdapat banner foto sinematik lebar (`./assets/kora-sidoarjo-kitchen.png`) dengan tombol Play (`▶`) di tengah, durasi `1:25`, dan judul `"How we craft — From Sidoarjo 1987 to your pantry"`.

6. **Signature Kora Botanical Green Section (`#5DC39B`):**
   * Mengadaptasi seksi hijau *Team* di Kora menjadi **Interactive Plate Pairing Directory & 1987 Sidoarjo Original Showcase**: daftar baris interaktif (`01 +`, `02 +`, `03 +`, `04 +`) dengan foto lingkaran, nama hidangan dari brief (*With grilled fish*, *With rice and eggs*, *With tempe, fried chicken*, *With grilled pork, noodles*), diikuti kartu bawah yang menampilkan foto **Toples Klasik 1987 (Rp25.000)** dan komitmen *"Same Warung. Same Recipe. Still Rp25.000."*

7. **Full-Bleed Pantry Lifestyle Banner + Tier/Gift Box Selector + Categorized FAQ + Kora Footer:**
   * Mengadaptasi seksi *Featured Testimonial*, *Pricing Selector* (`Single Reserve Jar Rp100k` | `4-Jar Pantry Gift Box Rp380k · Popular` | `1987 Classic Jar Rp25k`), *Categorized FAQ* (`Reserve Line`, `Dietary & Halal Clarity`, `Gifting`, `1987 Classic`), dan *Footer* gelap dengan *watermark* raksasa `ulek`.

---

## 2. Token Warna CSS Baru (`Kora x ULEK Palette`)

| Token CSS | Hex Code | Sumber Token Kora | Penggunaan |
| :--- | :--- | :--- | :--- |
| `--kora-ivory-bg` | `#FCFCFA` | `--token-59304272` | Latar kanvas utama, *top-left navbar dock*, dan *floating spotlight card* di Hero. |
| `--kora-cream-card` | `#F5F5E9` | `--token-f38aea48` | Latar kartu *After*, *Product Split Cards*, *inactive accordion*, dan *FAQ cards*. |
| `--kora-charcoal` | `#242424` | `--token-22b7685d` | Latar kartu *Before*, *active phase accordion*, dan pill CTA gelap. |
| `--kora-ink` | `#0D0D0D` | `--token-d33926f3` | Teks utama di atas latar terang. |
| `--kora-muted` | `#616161` | `--token-4d926bee` | Teks paruh kedua pada *two-tone headlines* dan deskripsi sekunder. |
| `--kora-green` | `#5DC39B` | `--token-fecf4ba1` | Aksen utama khas Kora: tombol pill Hero, *bar graph* utama, dan latar seksi *Pairing & 1987 Heritage*. |
| `--kora-chili` | `#C25D5D` / `#E04F3E` | `--token-528c8d37` | Aksen indikator kepedasan (`Heat 2/5`–`4/5`) dan highlight kuliner. |
| `--kora-border` | `#E6E6E0` | `--token-e4766650` | Garis pembatas halus antar kartu dan baris akordion. |
