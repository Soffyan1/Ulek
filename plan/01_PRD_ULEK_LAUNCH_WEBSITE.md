# 01 — Product Requirements Document (PRD): ULEK Launch Website

| Metadata | Detail |
| :--- | :--- |
| **Project Name** | **ULEK — The Archipelago Reserve Line Launch Website** |
| **Context** | Antikode Designer Skill Test — Brief C |
| **Submission Format** | Interactive HTML/CSS/JS Application + Built-in Interview Case Study Deck |
| **Core Deliverables** | **1. Homepage** · **2. Product Detail Page (PDP)** · **3. Case Study / Visual Exploration Inspector** |
| **Target Evaluation** | `01 Sense-making` · `02 Problem solving` · `03 Craft & taste` |

---

## 1. Executive Summary & Problem Framing (`01. Sense-Making`)

### 1.1 Fakta Dasar dari Brief C
* **Sejarah Brand:** ULEK berawal dari sebuah warung di **Sidoarjo pada tahun 1987** dan kini dikelola oleh **generasi ketiga**.
* **Produk Eksisting:** Sambal orisinalnya laris di pasar lokal dan online dengan harga **Rp25.000 per toples**.
* **Permintaan Klien (*The Client's Ask*):** *"We're launching a premium line. Design the launch website."*
* **Lini Premium Baru (Rp100.000 per toples):**
  1. **Matah** — Bali · `heat 2/5` · *With grilled fish*
  2. **Roa** — Manado · `heat 3/5` · *With rice and eggs*
  3. **Bajak** — Jawa · `heat 2/5` · *With tempe, fried chicken*
  4. **Andaliman** — Batak · `heat 4/5` · *With grilled pork, noodles*
* **Target Audiens (Dual-Audience Tension):**
  * **Audiens Baru (*New*):** Pembeli urban usia **25–40 tahun** yang gemar memberikan hadiah berupa makanan (*gift food*) dan menata dapur/rak makanan yang estetis (*keep a "nice" pantry*). Dijual secara *online* dan di *specialty grocers*.
  * **Audiens Lama (*Existing*):** Pelanggan setia toples orisinal Rp25.000, yang **tidak boleh merasa ditinggalkan oleh brand** (*"who mustn't feel the brand left them behind"*).

### 1.2 Lima Masalah Tersembunyi (*The Real Problems*) yang Harus Diselesaikan Website Ini

| # | Ketegangan di Brief (*Brief Tension*) | Risiko Jika Salah Desain | Solusi Produk & UX (*Our Problem Solving*) |
| :--- | :--- | :--- | :--- |
| **1** | **Lonjakan Harga 4x Lipat (Rp25.000 $\rightarrow$ Rp100.000)** | Pembeli lama mengira harga ULEK naik 4x lipat dan merasa dikhianati; pembeli baru ragu kenapa sambal warung harganya Rp100.000. | **Dual-Tier Brand Architecture:** Memisahkan secara terhormat antara **"The Archipelago Reserve (Rp100.000)"** (bahan *single-origin* lintas pulau, *small-batch*, toples kaca *heavyweight pantry*) dan **"The 1987 Sidoarjo Original (Rp25.000)"** (resep warung harian yang tetap dijual dengan harga Rp25.000). |
| **2** | **Detail *"With grilled pork, noodles"* pada Varian Andaliman vs. Konteks *Food Gifting*** | Di Indonesia, tulisan *"with grilled pork"* pada produk makanan menimbulkan keraguan instan bagi pembeli Muslim atau pemberi *hampers/gift*: *"Apakah sambalnya mengandung babi, atau hanya saran penyajian khas Batak?"* | **Dietary & Pairing Clarity System:** Memberikan badge transparansi bahan baku di PDP & Gifting (*"100% Plant-Based Rempah / No Pork or Lard in the Jar — Traditional Batak Pairing vs. Versatile Halal Pairing"*), serta memberi kebebasan penuh memilih varian di dalam **Gift Box Builder**. |
| **3** | **Jembatan Cerita: Warung Sidoarjo (Jawa Timur) $\rightarrow$ 4 Pulau Nusantara** | Mengapa warung asal Sidoarjo tiba-tiba menjual sambal Bali, Manado, dan Batak? | **Narasi "Satu Cobek Sejak 1987, Empat Terroir Nusantara":** Generasi ke-3 membawa teknik ulek batu (*stone-grinding craft*) warisan kakek-neneknya di Sidoarjo untuk mengolah bahan *heirloom* terbaik dari Bali, Manado, Jawa, dan Toba/Batak. |
| **4** | **Skala Pedas Tidak Ada yang `5/5` (`2/5`, `3/5`, `2/5`, `4/5`)** | Jika didesain seperti sambal pasaran dengan grafis api membara, nilai premium Rp100.000 dan nuansa *nice pantry* akan hancur. | **Sommelier-Style Tasting & Pairing Architecture:** Menempatkan **Food Pairing** (*Grilled fish, Rice & eggs, Tempe & fried chicken, Grilled pork & noodles*) dan **Aroma/Tekstur** sebagai navigasi utama, bukan lomba pedas. |
| **5** | **Distribusi Hibrida (*Online + Specialty Grocers*)** | Website yang hanya berisi tombol "Beli" terasa seperti toko online biasa, bukan peluncuran *brand pantry* kurasi. | **Stockist & Specialty Grocer Directory:** Menampilkan lokasi *specialty grocers* (Jakarta, Surabaya/Sidoarjo, Bali) di Homepage & PDP untuk memperkuat *positioning* *"nice pantry"*. |

---

## 2. User Personas & User Journeys

### Persona A: Nadia (31, Creative Director di Jakarta — *The Urban Pantry Curator & Gift Giver*)
* **Perilaku:** Suka memasak praktis namun estetis di apartemen, belanja di *specialty grocers* (Kem Chicks, Grand Lucky, Como Park), dan sering mengirim *curated food gift* ke klien atau sahabat.
* **Kebutuhan di Website:**
  1. Visual toples dan tata letak website yang langsung memancarkan kualitas **Rp100.000** (*"Ini pantas dipajang di meja makan dan dikirim sebagai hadiah"*).
  2. Panduan cepat memilih varian berdasarkan makanan favorit (**Pairing Guide** & **Heat Index**).
  3. Kepastian komposisi bahan (*apakah mengandung ikan/udang/babi?*) sebelum mengirim hadiah ke kolega.
  4. Kemudahan merangkai **Gift Box** dengan kartu ucapan personal.

### Persona B: Pak Hendra / Bu Rini (48, Pelanggan Setia ULEK sejak Era Sidoarjo — *The Loyal Fan*)
* **Perilaku:** Sudah bertahun-tahun membeli sambal ULEK Rp25.000 untuk stok meja makan keluarga. Membuka website baru ULEK karena penasaran.
* **Kebutuhan di Website:**
  1. Merasa bangga melihat warung kebanggaan Sidoarjo 1987 kini tampil berkelas di tangan generasi ke-3, **tanpa kehilangan kehangatan aslinya**.
  2. Menemukan dengan mudah bahwa **Toples Klasik 1987 (Rp25.000)** tetap ada, tetap dihargai sebagai "akar keluarga", dan tetap bisa dibeli di website yang sama (dan mungkin tertarik mencoba varian **Bajak — Jawa** dari lini Rp100.000 untuk acara spesial).

---

## 3. Functional Requirements — Deliverable 1: Homepage

| ID | Nama Seksi / Fitur | Deskripsi Fungsional & Aturan Konten | Referensi Visual |
| :--- | :--- | :--- | :--- |
| **FR-HP-01** | **Floating Tactile Navbar** | - Kiri: Tombol *Quick Search / Pairing Finder* berbentuk lingkaran hitam + link navigasi (`The Reserve`, `Pairing Guide`, `Gifting`, `1987 Original`).<br>- Tengah: Identitas brand **`ULEK.`** dengan emblem cobek/cabai terakota.<br>- Kanan: Toggle **`Case Study Mode`** (untuk interview Antikode), pill **`Stockists`**, dan tombol **`Pantry Bag (N)`** dengan badge lingkaran hitam. | Mengadaptasi penuh anatomi navbar **Ref 1 (`Skot.`)**. |
| **FR-HP-02** | **Sculpted Bento Cutout Hero** | - Stage utama berbentuk *rounded container* besar dengan **potongan sudut (*bento cutout*)** di kiri bawah dan kartu *floating switcher* di kanan bawah.<br>- **Headline Utama:** Tipografi tegas dengan *inline tactile badges* di tengah teks.<br>- **Centerpiece:** Visual toples ULEK Reserve yang tajam dan keluar dari batas *frame* (*out-of-bounds*).<br>- **Bottom-Left Cutout:** Menampilkan nomor seri (`01 / 04`), nama varian aktif (mis. `MATAH — BALI`), `Heat 2/5`, dan catatan *pairing* (`With grilled fish`) + tombol bulat terakota untuk langsung membuka PDP.<br>- **Bottom-Right Switcher Card:** Memungkinkan user mengklik/mengganti varian yang tampil di Hero (`Matah`, `Roa`, `Bajak`, `Andaliman`) secara *real-time* tanpa reload! | Mengadaptasi penuh komposisi Hero **Ref 1 (`Skot.`)**. |
| **FR-HP-03** | **Editorial Manifesto & Two-Tone Statement** | - Kicker dengan kotak merah khas `[■] SIDOARJO, 1987 — GENERATION III`.<br>- Kalimat manifesto ukuran besar dengan kontras warna teks hitam pekat dan abu-abu batu hangat (*two-tone editorial typography*) yang ter-highlight saat di-*scroll*, diakhiri tautan `→ EXPLORE OUR 1987 HERITAGE`. | Mengadaptasi seksi *"Who we are"* dari **Ref 2 (`Stodio®`)**. |
| **FR-HP-04** | **4-Column Reserve Line Portrait Showcase** | - Grid 4 kolom kartu vertikal ber-radius halus (`rounded-2xl`) untuk ke-4 varian **Rp100.000**: **Matah (Bali · 2/5)**, **Roa (Manado · 3/5)**, **Bajak (Jawa · 2/5)**, **Andaliman (Batak · 4/5)**.<br>- Setiap kartu menampilkan: Origin tag, Heat bar (`2/5`–`4/5`), Pairing badge (*With grilled fish*, dll.), harga `Rp100.000`, tombol **Inspect Jar (buka PDP)**, dan tombol **+ Quick Add**. | Mengadaptasi 4-column portrait gallery dari **Ref 2 (`Stodio®`)**. |
| **FR-HP-05** | **"By The Numbers" Heritage & Craft Grid** | - Baris metrik 4 kolom dengan garis pembatas titik-titik horizontal (*dotted rule*):<br>  1. **`1987`** — *Sidoarjo Warung Origin*<br>  2. **`3rd Gen`** — *Family Stone-Grinding Craft*<br>  3. **`4 Islands`** — *Bali, Manado, Jawa, Batak*<br>  4. **`Rp25k / Rp100k`** — *Everyday Classic & Artisanal Reserve* | Mengadaptasi seksi *"BY THE NUMBERS"* dari **Ref 2 (`Stodio®`)**. |
| **FR-HP-06** | **Interactive Pairing Sommelier ("What's On Your Plate?")** | - Seksi interaktif berlatar gelap (*Obsidian Cobek* `#11100E`) di mana user bisa memilih hidangan di piring mereka:<br>  • *Fresh Grilled Fish* $\rightarrow$ **Matah (Bali · Heat 2/5)**<br>  • *Warm Rice & Eggs* $\rightarrow$ **Roa (Manado · Heat 3/5)**<br>  • *Tempe & Fried Chicken* $\rightarrow$ **Bajak (Jawa · Heat 2/5)**<br>  • *Grilled Pork, Roasted Meat & Noodles* $\rightarrow$ **Andaliman (Batak · Heat 4/5)**<br>- Saat dipilih, sistem menampilkan alasan kecocokan rasa (*tasting chemistry*), tingkat kepedasan, dan tombol langsung ke PDP atau tambah ke keranjang. | Mengadaptasi blok gelap *Services / Interactive Showcase* dari **Ref 2 (`Stodio®`)**. |
| **FR-HP-07** | **The "Nice Pantry" & Custom Gift Box Builder** | - Dirancang khusus untuk **Audiens Baru (25–40 tahun, *food gifting* & *nice pantry*)**.<br>- User dapat merakit **The Pantry Gift Box (Rp380.000 — Pilih 4 Toples + Linen Gift Wrap + Custom Printed Note)**.<br>- Dilengkapi filter/info **"Halal & Dietary Guide for Gift Givers"** yang menjelaskan komposisi tiap toples secara jujur dan menenangkan hati pembeli hadiah. | Kombinasi Bento Card (`Skot.`) + Editorial Grid (`Stodio®`). |
| **FR-HP-08** | **The 1987 Sidoarjo Original Bridge ("Never Left Behind")** | - Dirancang khusus untuk **Audiens Lama (*Loyal fans of the original jar*)**.<br>- Menampilkan kisah warung Sidoarjo 1987 beserta **Toples Klasik ULEK — Rp25.000** yang **tetap dapat dibeli langsung** (`Add 1987 Classic Jar — Rp25.000`).<br>- Menjelaskan secara jujur apa bedanya toples harian Rp25.000 dengan lini ekspedisi Nusantara Rp100.000 tanpa merendahkan salah satunya. | Editorial Heritage Card dengan kehangatan autentik. |

---

## 4. Functional Requirements — Deliverable 2: Product Detail Page (PDP)

PDP dirancang sebagai tampilan penuh (*full-page view* dengan *smooth view transition* dan URL hash routing `#/product/matah`, `#/product/roa`, `#/product/bajak`, `#/product/andaliman`, serta `#/product/classic-1987`) sehingga penguji Antikode dapat menjelajahi detail setiap varian secara utuh.

| ID | Komponen PDP | Deskripsi Fungsional |
| :--- | :--- | :--- |
| **FR-PDP-01** | **Top Breadcrumb & Live Variant Switcher Pill** | Memungkinkan user berpindah instan antar varian (`Matah · Bali`, `Roa · Manado`, `Bajak · Jawa`, `Andaliman · Batak`, dan `1987 Original · Sidoarjo`) langsung dari atas PDP. |
| **FR-PDP-02** | **Sculpted Product Stage & View Mode Toggle** | - Menampilkan visual utama toples dengan sudut *bento cutout* khas `Skot.`.<br>- Dilengkapi 3 tab visual interaktif: **`01. The Pantry Jar`** (tampilan kemasan meja makan), **`02. Spoon & Texture Macro`** (detail tekstur ulekan kasar & warna minyak cabai), dan **`03. Origin & Ingredients`** (komposisi rempah mentah). |
| **FR-PDP-03** | **Core Buy Box & Price Justification** | - Judul Serif besar (`Matah`, `Roa`, `Bajak`, `Andaliman`), Origin Kicker (`[■] BALI · SINGLE-ORIGIN ARCHIPELAGO LINE`), Harga (`Rp100.000` · `185g Heavyweight Glass Jar`).<br>- Pilihan pembelian: **Single Jar (Rp100.000)**, **Gift-Ready Jar (+ Kartu Ucapan & Kemasan Linen)**, atau **Bundle Quartet (4 Toples)**. |
| **FR-PDP-04** | **Calibrated Heat & Sensory Matrix** | - Menampilkan indikator **`Heat X/5`** sesuai brief (`2/5`, `3/5`, `2/5`, `4/5`) bersama 4 bar profil rasa: *Heat Intensity*, *Aromatic Freshness*, *Savory Umami*, dan *Grind Coarseness*. |
| **FR-PDP-05** | **Canonical Food Pairing & Serving Ritual** | - Menonjolkan rekomendasi hidangan persis dari brief (*With grilled fish*, *With rice and eggs*, *With tempe, fried chicken*, *With grilled pork, noodles*) lengkap dengan saran takaran penyajian di meja makan. |
| **FR-PDP-06** | **Dietary, Allergen & Gifting Transparency Box** | - Kotak informasi transparan yang sangat krusial:<br>  • **Matah:** *100% Plant-Based / Vegan-Friendly* (bawang merah, serai, daun jeruk, cabai rawit, minyak kelapa Bali).<br>  • **Roa:** *Contains Smoked Fish (Ikan Roa Asap Manado)*.<br>  • **Bajak:** *Contains Artisanal Shrimp Paste (Terasi Udang Sidoarjo)*.<br>  • **Andaliman:** *100% Plant-Based Jar (Andaliman pepper, green chili, kemiri, garlic — 0% pork/lard inside the jar)*. Menjelaskan bahwa *"With grilled pork, noodles"* adalah warisan *pairing* autentik kuliner Toba/Batak, serta memberikan rekomendasi *pairing* alternatif (bebek panggang, mie karet, brisket asap) bagi penikmat kuliner halal. |
| **FR-PDP-07** | **"Why Rp100.000 vs. Rp25.000?" Honest Breakdown** | - Tabel perbandingan transparan yang menjelaskan mengapa lini Reserve berharga Rp100.000 (rempah *single-origin* kiriman langsung dari petani daerah, waktu masak lambat/tanpa ekstrak, toples kaca kedap udara untuk *pantry*) sambil tetap menyertakan tautan ramah ke **Toples Klasik 1987 (Rp25.000)**. |
| **FR-PDP-08** | **Cross-Sell / Compare Other Reserve Jars** | - Memudahkan user berpindah ke 3 varian lainnya di bagian bawah PDP. |

---

## 5. Functional Requirements — Deliverable 3: Built-in "Antikode Interview & Case Study Mode"

Karena di Slide 2/8 tertulis: ***"Submit in Figma, PDF or HTML. You will present it in your interview"*** dan menuntut ***"the range you explore before you settle on one"***, website ini menyediakan panel/halaman interaktif khusus (**`[■] Design Reasoning & Explorations`**):

1. **Tab 01 — Sense-Making (How We Read the Brief):** Visualisasi interaktif dari 5 petunjuk tersembunyi di Brief C dan bagaimana kita merumuskan masalah utamanya.
2. **Tab 02 — Problem Solving (Design Decisions):** Peta hubungan langsung antara masalah di brief dengan fitur di Homepage & PDP (lengkap dengan tombol *"Jump to Feature"* yang langsung mengarahkan layar ke seksi terkait).
3. **Tab 03 — Craft & Taste (The Range Explored Before Settling):**
   * Menampilkan *interactive preview switcher* dari **3 Eksplorasi Arah Visual** yang sempat dieksplorasi:
     * **Exploration 01: "Clinical Apothecary" (Ditolak)** — Terlalu dingin dan mengasingkan pelanggan lama 1987.
     * **Exploration 02: "Nostalgic Warung Pasar" (Ditolak)** — Gagal meyakinkan audiens urban 25–40 tahun untuk membayar Rp100.000 dan memajangnya di *nice pantry*.
     * **Exploration 03: "Sculpted Archipelago Terroir" (Dipilih)** — Sintesis bentuk Bento modern (`Skot.`), ritme editorial kontras (`Stodio®`), dan kehangatan warisan Sidoarjo 1987.

---

## 6. Strict Scope Boundaries (Agar AI Coding Agent Tidak Out of Scope)

### ✅ IN SCOPE (Wajib Dibuat dengan Sempurna):
* Single-Page Application (SPA) dengan Vanilla HTML5, CSS3 (atau Tailwind + Custom CSS Variables), dan Vanilla JavaScript yang cepat, ringan, dan bebas *build error*.
* **Homepage** lengkap (8 seksi terstruktur).
* **Product Detail Page (PDP)** dinamis untuk seluruh varian (**Matah, Roa, Bajak, Andaliman**, plus **1987 Sidoarjo Original**).
* **Interactive Slide-Over Pantry Bag (Cart) & Gift Box Drawer** yang berfungsi penuh (tambah/kurang item, pilih 4 toples untuk Gift Box, tulis pesan kartu hadiah, kalkulasi subtotal Rp25.000 / Rp100.000).
* **Antikode Case Study & Visual Exploration Drawer/View** untuk presentasi interview.
* **Scroll-driven animations**, *bento cutout hover effects*, *interactive pairing filter*, dan *variant morphing*.

### ❌ OUT OF SCOPE (Dilarang Dibuat oleh AI Agent):
* ❌ Halaman Login / Register / User Profile / Riwayat Pesanan yang tidak diminta di brief.
* ❌ Backend database eksternal, integrasi payment gateway sungguhan (Midtrans/Stripe), atau ketergantungan API berbayar yang bisa gagal saat *demo interview*.
* ❌ Blog / Artikel resep panjang yang keluar dari fokus peluncuran produk.
* ❌ Pop-up diskon murahan, *chatbot widget* mengambang yang menutupi desain, atau *cookie banner* yang mengganggu estetika.
* ❌ Mengubah data harga, tingkat kepedasan (`heat X/5`), asal daerah, atau rekomendasi makanan yang sudah ditetapkan di Brief C.
