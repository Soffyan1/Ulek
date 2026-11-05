# 04 — Canonical Copywriting, Product Data & Interview Presentation Script

> **INSTRUKSI UNTUK AI CODING AGENT:**
> Gunakan **persis** teks, angka, dan struktur data di dokumen ini saat membangun Homepage, Product Detail Page (PDP), Gift Box Builder, dan Case Study Drawer. Dilarang mengarang teks *Lorem Ipsum* atau mengubah fakta dari Brief C.

---

## 1. Canonical Product Catalog Data (JSON / JS Data Store Spec)

```json
[
  {
    "id": "matah",
    "serial": "01",
    "name": "Matah",
    "line": "The Archipelago Reserve",
    "origin": "Bali",
    "regionDetail": "Karangasem & Gianyar, Bali",
    "coordinates": "8.4095° S, 115.1889° E",
    "heat": 2,
    "heatMax": 5,
    "heatLabel": "Heat 2/5 · Bright & Aromatic",
    "price": 100000,
    "priceFormatted": "Rp100.000",
    "jarWeight": "185g Heavyweight Glass Jar",
    "canonicalPairing": "With grilled fish",
    "extendedPairing": ["Charcoal-grilled sea bass (Ikan Bakar Jimbaran)", "Seared tuna tataki", "Crispy roast duck", "Warm jasmine rice"],
    "sensoryProfile": {
      "heatIntensity": 40,
      "aromaticFreshness": 96,
      "savoryUmami": 65,
      "grindCoarseness": 85
    },
    "tastingNotes": "Crisp raw Karangasem shallots, bruised lemongrass stalks, kaffir lime leaf ribbons, and bird's eye chili flash-cured in cold-pressed Balinese coconut oil.",
    "why100k": "Harvested at dawn in East Bali and hand-sliced (never machine-blended) so every shallot ring stays crisp inside virgin coconut oil.",
    "dietaryBadge": "100% Plant-Based · No Shrimp Paste Option Available",
    "dietaryNote": "Prepared with pure virgin coconut oil, fresh aromatics, and artisanal sea salt—safe for vegetarian and halal gift boxes."
  },
  {
    "id": "roa",
    "serial": "02",
    "name": "Roa",
    "line": "The Archipelago Reserve",
    "origin": "Manado",
    "regionDetail": "Bitung & Manado Bay, North Sulawesi",
    "coordinates": "1.4748° N, 124.8421° E",
    "heat": 3,
    "heatMax": 5,
    "heatLabel": "Heat 3/5 · Smoky & Deep Umami",
    "price": 100000,
    "priceFormatted": "Rp100.000",
    "jarWeight": "185g Heavyweight Glass Jar",
    "canonicalPairing": "With rice and eggs",
    "extendedPairing": ["Steaming white rice & jammy fried eggs", "Bubur Manado (Tinutuan)", "Fried plantains (Pisang Goroho)", "Scallion noodles"],
    "sensoryProfile": {
      "heatIntensity": 60,
      "aromaticFreshness": 62,
      "savoryUmami": 98,
      "grindCoarseness": 75
    },
    "tastingNotes": "Wild-caught Manado flying fish (Ikan Roa) wood-smoked for 3 days, stone-pounded into floss, and slow-simmered with volcanic red chilies and shallots.",
    "why100k": "Over 60% of every jar by weight is pure hand-flaked smoked Roa fish from North Sulawesi—never bulked up with breadcrumbs or fillers.",
    "dietaryBadge": "Halal Ingredients · Contains Smoked Marine Fish",
    "dietaryNote": "Contains wild-caught smoked Roa fish (seafood allergen). Free from pork, lard, or artificial MSG."
  },
  {
    "id": "bajak",
    "serial": "03",
    "name": "Bajak",
    "line": "The Archipelago Reserve",
    "origin": "Jawa",
    "regionDetail": "Sidoarjo & East Java Heartland",
    "coordinates": "7.4478° S, 112.7183° E",
    "heat": 2,
    "heatMax": 5,
    "heatLabel": "Heat 2/5 · Caramelized & Savory-Sweet",
    "price": 100000,
    "priceFormatted": "Rp100.000",
    "jarWeight": "185g Heavyweight Glass Jar",
    "canonicalPairing": "With tempe, fried chicken",
    "extendedPairing": ["Crispy spiced tempe & tahu", "Ayam Goreng Lengkuas (fried chicken)", "Nasi Pecel & Empal", "Warm sourdough toast with cheese"],
    "sensoryProfile": {
      "heatIntensity": 40,
      "aromaticFreshness": 70,
      "savoryUmami": 92,
      "grindCoarseness": 65
    },
    "tastingNotes": "Our third-generation tribute to East Java: fire-roasted curly red chilies, aged Sidoarjo shrimp paste (terasi), tamarind pulp, and dark palm sugar simmered for 4 hours.",
    "why100k": "Upgraded from our 1987 family technique using first-press coconut oil, barrel-aged Sidoarjo terasi, and organic tree-ripened Javanese chilies.",
    "dietaryBadge": "Halal Ingredients · Contains Aged Shrimp Paste (Terasi)",
    "dietaryNote": "Contains traditional East Javanese fermented shrimp paste (crustacean allergen). 100% halal-friendly kitchen preparation."
  },
  {
    "id": "andaliman",
    "serial": "04",
    "name": "Andaliman",
    "line": "The Archipelago Reserve",
    "origin": "Batak",
    "regionDetail": "Lake Toba Highlands, North Sumatra",
    "coordinates": "2.6845° N, 98.8756° E",
    "heat": 4,
    "heatMax": 5,
    "heatLabel": "Heat 4/5 · Citrus-Tingle & Fiery",
    "price": 100000,
    "priceFormatted": "Rp100.000",
    "jarWeight": "185g Heavyweight Glass Jar",
    "canonicalPairing": "With grilled pork, noodles",
    "extendedPairing": ["Traditional Batak grilled pork (Babi Panggang Karo)", "Artisanal chewy noodles (Mie Gomak / Bakmi)", "Smoked duck breast & roasted brisket", "Charred cabbage & skewers"],
    "sensoryProfile": {
      "heatIntensity": 80,
      "aromaticFreshness": 94,
      "savoryUmami": 78,
      "grindCoarseness": 80
    },
    "tastingNotes": "Wild-foraged Toba green Andaliman pepper ('Batak Sichuan pepper') stone-crushed with green cayenne, roasted candlenut (kemiri), and garlic for an electric citrus-numbing kick.",
    "why100k": "Wild Andaliman berries cannot be farmed commercially and lose their electric citrus aroma within days—we air-freight harvests directly from Toba highland foragers.",
    "dietaryBadge": "100% Plant-Based Jar · Zero Pork/Lard in Ingredients",
    "dietaryNote": "IMPORTANT FOR GIFT GIVERS: While traditionally paired in Batak culture with grilled pork and noodles, the sambal inside this jar is 100% plant-based (Andaliman pepper, green chili, candlenut, garlic, vegetable oil). It pairs equally well with Mie Gomak, smoked duck, or beef noodles."
  },
  {
    "id": "classic-1987",
    "serial": "87",
    "name": "Warung 1987 Original",
    "line": "The Sidoarjo Heritage Line",
    "origin": "Sidoarjo",
    "regionDetail": "Pasar Larangan Warung, Sidoarjo (Est. 1987)",
    "coordinates": "7.4539° S, 112.7159° E",
    "heat": 3,
    "heatMax": 5,
    "heatLabel": "Heat 3/5 · Classic Everyday Warung",
    "price": 25000,
    "priceFormatted": "Rp25.000",
    "jarWeight": "150g Classic Everyday Jar",
    "canonicalPairing": "With everyday warm rice, penyetan, and family dinners",
    "extendedPairing": ["Tempe & Tahu Penyet", "Telur Dadar Krispi", "Ikan Mujair Goreng", "Sayur Asem"],
    "sensoryProfile": {
      "heatIntensity": 65,
      "aromaticFreshness": 75,
      "savoryUmami": 88,
      "grindCoarseness": 70
    },
    "tastingNotes": "The exact recipe that built our family warung in Sidoarjo in 1987. Unchanged for three generations, still stone-ground daily, and still Rp25.000.",
    "why100k": "Why is this Rp25.000 while The Reserve Line is Rp100.000? Because our daily Sidoarjo chili & tomato harvest is local and abundant—and our promise to our loyal regulars is that our original table jar will always remain accessible.",
    "dietaryBadge": "Halal Everyday Classic · Unchanged Since 1987",
    "dietaryNote": "Made in Sidoarjo for our loyal family of regulars across Indonesia."
  }
]
```

---

## 2. Copywriting Kata-per-Kata untuk Homepage

### 2.1 Top Navigation Bar (`Skot.` Style)
* **Left Links:** `Reserve Line` · `Pairing Sommelier` · `Gifting & Pantry` · `1987 Original (Rp25k)`
* **Center Brand Mark:** `ULEK.` *(Sub-label: `SIDOARJO · EST. 1987`)*
* **Right Actions:**
  * `[■] Case Study / Reasoning` *(Tombol khusus pembuka penjelasan 01 Sense-making, 02 Problem solving, 03 Craft & taste)*
  * `Stockists`
  * `Pantry Bag (0)`

### 2.2 Hero Section (`Skot.` Sculpted Bento Cutout)
* **Headline (dengan Inline Tactile Badges):**
  `Stone-ground` `[1987 — GEN III]` `Archipelago Sambal for the Modern Pantry.`
* **Top-Right Social Proof Cluster (`Skot.` Position):**
  * **Headline Kecil:** `From a Sidoarjo warung in 1987 to 18+ specialty grocers.`
  * **Subtext:** `Rp100.000 / Reserve Jar · Rp25.000 / 1987 Original`
* **Bottom-Left Cutout Card (Dynamic per Active Hero Variant — Default `Matah`):**
  * **Title:** `Matah` *(Serif)* — `Bali · Heat 2/5`
  * **Pairing Tag:** `With grilled fish`
  * **Micro-Copy:** `Hand-sliced Karangasem shallots, bruised lemongrass, and kaffir lime cured in cold-pressed coconut oil. Crafted for the nice pantry and effortless food gifting.`
* **Bottom-Right Floating Switcher Card:**
  * Menampilkan kartu *interactive switcher* untuk berpindah ke `Roa (Manado · 3/5)`, `Bajak (Jawa · 2/5)`, dan `Andaliman (Batak · 4/5)`.

### 2.3 Section 2: Editorial Manifesto (`Stodio®` Two-Tone Statement)
* **Kicker:** `[■] WHO WE ARE — SIDOARJO, 1987 TO TODAY`
* **Two-Tone Statement:**
  **`We spent thirty-nine years mastering a single volcanic stone mortar in Sidoarjo —`** `now the third generation brings four single-origin archipelago harvests to tables that treat condiments like craft.`
* **Action Link:** `→ OUR PROMISE TO 1987 REGULARS & NEW TABLES`

### 2.4 Section 3: The Reserve Line — 4-Column Portrait Showcase (`Stodio®` Grid)
* **Kicker:** `[■] THE PREMIUM LINE · RP100.000 A JAR`
* **Headline:** `Four Islands. Calibrated Heat. Built for the Plate.`
* **4 Kartu Produk (Wajib memuat teks persis dari Brief C):**
  1. **`Matah`** · `Bali · heat 2/5` · **`With grilled fish`** · `Rp100.000`
  2. **`Roa`** · `Manado · heat 3/5` · **`With rice and eggs`** · `Rp100.000`
  3. **`Bajak`** · `Jawa · heat 2/5` · **`With tempe, fried chicken`** · `Rp100.000`
  4. **`Andaliman`** · `Batak · heat 4/5` · **`With grilled pork, noodles`** · `Rp100.000` *(Dilengkapi tag kecil: `100% Plant-Based Jar · See Pairing Note`)*

### 2.5 Section 4: By The Numbers (`Stodio®` Swiss Dotted Grid)
* **Kicker:** `[■] BY THE NUMBERS`
* **4 Kolom Metrik:**
  1. **`1987`** — **Born in Sidoarjo** · *Started as a humble family warung in East Java, stone-grinding sambal every morning.*
  2. **`3rd Gen`** — **Third-Generation Craft** · *Honoring our grandparents' cobek technique while sourcing rare regional chilies across Indonesia.*
  3. **`4 / 5 Max`** — **Flavor Before Fire** · *Calibrated heat from 2/5 to 4/5 so you taste smoky Roa, citrus Andaliman, and crisp lemongrass.*
  4. **`Rp25k & 100k`** — **No Fan Left Behind** · *Our new Rp100k Reserve Line sits proudly beside our original Rp25k warung jar—never replacing it.*

### 2.6 Section 5: Interactive Pairing Sommelier ("What's On Your Plate Tonight?")
* **Kicker:** `[■] CULINARY PAIRING GUIDE`
* **Headline:** `Match the Jar to Your Plate.`
* **Subtext:** `Great sambal shouldn't drown your dinner in blind heat. Select what you're cooking or ordering tonight to find its regional counterpart.`

### 2.7 Section 6: Built for Gifting & The "Nice" Pantry (Audiens Baru 25–40 Tahun)
* **Kicker:** `[■] FOR THE MODERN PANTRY & FOOD GIFTING`
* **Headline:** `A Jar You Don't Hide in the Fridge Door.`
* **Subtext:** `Heavyweight UV-protected glass, embossed linen labels, and zero artificial preservatives. Designed for urban hosts (25–40) who gift food instead of flowers—and keep a pantry worth showing off.`
* **Interactive Feature:** **Build Your 4-Jar Gift Box (`Rp380.000`)** + Toggle **"Include Halal & Allergen Pairing Card for Recipient"**.

### 2.8 Section 7: The 1987 Sidoarjo Original Bridge (Audiens Lama — "Never Left Behind")
* **Kicker:** `[■] TO OUR REGULARS SINCE 1987`
* **Headline:** `Same Warung. Same Recipe. Still Rp25.000.`
* **Editorial Copy:**
  `"When we announced a Rp100.000 Reserve Line for specialty grocers and gift boxes, our first rule as the third generation was simple: never leave our Sidoarjo family behind. The original jar that has sat on your dining table since 1987 hasn't changed a single ingredient—and its price remains Rp25.000, online and at our local markets."`
* **CTA:** `+ Add 1987 Original Jar (Rp25.000)` & `Compare Reserve (Rp100k) vs. Original (Rp25k)`.

---

## 3. Panduan Presentasi Interview Antikode (Cheat Sheet untuk Kamu)

Saat kamu mempresentasikan website ini di depan *interviewer* Antikode, gunakan alur 3 menit ini (atau buka langsung fitur **`[■] Case Study / Reasoning`** di dalam website):

1. **Menit 1 — Sense-Making ("Apa yang Saya Perhatikan di Brief C"):**
   * *"Saat membaca Brief C (ULEK), saya melihat ini bukan sekadar tugas mendesain halaman e-commerce sambal mahal. Ada 3 ketegangan bisnis yang tajam: Pertama, lonjakan harga 4x lipat dari Rp25.000 ke Rp100.000 di tangan generasi ketiga. Kedua, syarat mutlak bahwa pelanggan setia toples Rp25.000 tidak boleh merasa ditinggalkan. Ketiga, detail kecil namun krusial pada varian Andaliman yang bertuliskan 'With grilled pork, noodles'—sedangkan target audiens barunya adalah pembeli urban 25–40 tahun di Indonesia yang suka membeli makanan untuk hadiah (food gifting)."*
2. **Menit 2 — Problem Solving ("Keputusan Desain yang Mengikuti Temuan Tersebut"):**
   * *"Karena itu, di Homepage dan PDP saya mengambil 3 keputusan produk utama: (1) Saya membuat arsitektur dua lini yang jujur—menempatkan Lini Reserve Rp100.000 sebagai kurasi bahan single-origin Nusantara, sekaligus menghadirkan seksi khusus untuk Toples Klasik 1987 seharga Rp25.000 yang tetap bisa dibeli langsung. (2) Alih-alih menonjolkan lomba pedas karena level tertinggi di brief hanya 4/5, saya membangun Interactive Pairing Sommelier berdasarkan 4 hidangan di brief. (3) Untuk menjawab keraguan pembeli hadiah pada varian Andaliman, di PDP dan Gift Box Builder saya menambahkan Dietary & Pairing Transparency Badge yang menjelaskan bahwa isi toplesnya 100% rempah nabati tanpa kandungan babi, sementara 'grilled pork & noodles' adalah penghormatan pada tradisi kuliner Batak."*
3. **Menit 3 — Craft & Taste ("Eksplorasi Visual Sebelum Memilih Satu Arah"):**
   * *"Untuk visual, sebelum tiba di desain akhir ini, saya mengeksplorasi 3 arah: Arah pertama terlalu minimalis-klinis seperti apotek Barat sehingga menghilangkan selera makan dan mengasingkan pelanggan warung 1987. Arah kedua terlalu retro-pasar sehingga gagal menjustifikasi harga Rp100.000 di specialty grocers. Akhirnya saya memilih Arah Ketiga—memadukan panggung Bento Cutout modern dengan ritme editorial kontras batu cobek (Obsidian) dan krem pantry (Warm Stone), serta mempertahankan tipografi Serif berkarakter untuk ke-4 nama sambal Nusantara."*
