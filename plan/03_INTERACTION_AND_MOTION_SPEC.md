# 03 — Interaction, Scroll Choreography & State Machine Specification

Dokumen ini mendefinisikan seluruh perilaku interaktif, efek *scroll*, transisi antar halaman (Homepage $\leftrightarrow$ PDP $\leftrightarrow$ Case Study Mode), serta *micro-interactions* agar website **ULEK** terasa hidup, responsif, dan sekelas karya studio digital pemenang Awwwards / Antikode.

---

## 1. Prinsip Utama Motion & Interaksi

1. **Purposeful Motion (Bukan Gimmick yang Mengganggu):** Setiap efek *scroll* dan klik punya fungsi naratif—membantu pengunjung merasakan kehangatan ulekan sambal, membandingkan 4 varian Nusantara, atau memahami alasan di balik desain.
2. **Kurva Easing Presisi:**
   * Primary UI Curve: `cubic-bezier(0.22, 1, 0.36, 1)` (Smooth Out-Quint untuk *reveal*, *drawer*, dan *card morph*).
   * Micro-Interaction Curve: `cubic-bezier(0.16, 1, 0.3, 1)` (`180ms–260ms` untuk tombol, pill, dan *hover*).
3. **Hardware-Accelerated & Accessible:**
   * Hanya menganimasikan `transform`, `opacity`, `clip-path`, dan variabel CSS yang aman untuk `60fps`.
   * Wajib menghormati `@media (prefers-reduced-motion: reduce)` (jika aktif, matikan *parallax* dan langsung tampilkan elemen tanpa *motion sickness*).

---

## 2. Daftar Lengkap Fitur Interaktif & Efek Scroll

### 2.1 Scroll Choreography (Efek Saat Halaman Di-Scroll)

| ID | Nama Efek Scroll | Cara Kerja Teknis & Visual | Lokasi Seksi |
| :--- | :--- | :--- | :--- |
| **SC-01** | **Floating Navbar Condense & Blur** | Saat user *scroll* melewati `80px`, navbar bergaya `Skot.` memadat secara halus (`padding-block` mengecil, `backdrop-filter: blur(16px)` dengan latar `rgba(243, 241, 236, 0.88)` aktif, serta menampilkan indikator *scroll progress bar* tipis `2px` berwarna merah cabai `#D93829` di bagian atas). | Global Top Bar |
| **SC-02** | **Hero Jar Subtle Scroll Parallax & Tilt** | Saat user *scroll* turun dari Hero, visual toples utama di tengah panggung *Bento Cutout* bergerak naik sedikit lebih lambat (`translateY(calc(var(--scroll-y) * -0.08))`) sementara lencana *inline pill* di headline bergeser lembut, menciptakan efek kedalaman 3D (*depth layering*) persis seperti skuter di referensi `Skot.`. | Hero Section |
| **SC-03** | **Two-Tone Manifesto Progressive Illumination (`Stodio®` Effect)** | Di seksi Manifesto (*"We stone-grind single-origin archipelago chilies..."*), teks awalnya tampil dalam dua warna (kata pembuka hitam `#121110`, sisanya abu-batu `#9A958C`). Saat seksi ini berada di tengah layar (*IntersectionObserver / Scroll Progress*), kata-kata abu-abu tersebut **menyala bertahap kata demi kata menjadi hitam pekat (`#121110`)** seiring gerakan *scroll*! | Seksi 2: Editorial Manifesto |
| **SC-04** | **Staggered 4-Column Portrait Reveal & Image Scale** | Ke-4 kartu potret varian (**Matah, Roa, Bajak, Andaliman**) muncul secara berurutan (*stagger delay `80ms` per kartu*) dari bawah (`translateY(28px) -> 0`, `opacity: 0 -> 1`). Saat di-*hover* atau di-*scroll*, gambar di dalam kartu melakukan *slow zoom-out* (`scale(1.06) -> scale(1.0)`) dan memunculkan *Quick Tasting Drawer* di bagian bawah kartu. | Seksi 3: The 4 Reserve Jars |
| **SC-05** | **"By The Numbers" Animated Counter & Dotted Line Draw** | Ketika user *scroll* mencapai seksi **`[■] BY THE NUMBERS`** (`1987`, `3rd Gen`, `4 Islands`, `Rp25k / Rp100k`), garis titik-titik horizontal (*dotted divider*) menggambar dirinya dari kiri ke kanan (`scaleX(0) -> scaleX(1)`), sementara angka `1987`, `3`, `4`, `25` / `100` berhitung naik dengan cepat selama `900ms`. | Seksi 4: By The Numbers |
| **SC-06** | **Dark-to-Light Theme Atmosphere Shift** | Saat memasuki seksi **Interactive Pairing Sommelier** dan **1987 Heritage Archive**, transisi kontras menuju blok gelap `#11100E` (*Volcanic Cobek*) diberi efek *rounded container scale* (`0.97 -> 1.0`) sehingga halaman terasa berlapis seperti majalah interaktif (`Stodio®` reference). | Seksi 5 & 7 |

---

### 2.2 Micro-Interactions & Interactive Widgets (Klik & Hover)

#### A. Hero Bento Variant Switcher (`Skot.` Bottom-Right Floating Card)
* Di pojok kanan bawah panggung Hero (persis posisi kartu `DB50QT Panther Moped` pada referensi `Skot.`), terdapat **Interactive Variant Switcher** untuk ke-4 varian:
  * `01 · Matah (Bali · Heat 2/5)`
  * `02 · Roa (Manado · Heat 3/5)`
  * `03 · Bajak (Jawa · Heat 2/5)`
  * `04 · Andaliman (Batak · Heat 4/5)`
* **Apa yang terjadi saat user mengklik salah satu varian di Hero Switcher?**
  1. Visual Toples di tengah Hero berganti dengan animasi *cross-fade + spring scale* (`320ms`).
  2. Warna panggung dalam *Bento Cutout* menyesuaikan aksen terroir varian tersebut secara halus.
  3. Kartu *Bottom-Left Cutout* (`Skot.` C45 position) memperbarui kode seri (`01`–`04`), judul serif (`Matah` / `Roa` / `Bajak` / `Andaliman`), indikator **`Heat X/5`**, serta teks *pairing* kanonik (*"With grilled fish"*, *"With rice and eggs"*, *"With tempe, fried chicken"*, *"With grilled pork, noodles"*).
  4. Tombol bulat merah terakota di sudut *cutout* langsung terhubung untuk membuka **Product Detail Page (PDP)** dari varian yang sedang aktif.

#### B. "What's On Your Plate Tonight?" — Interactive Pairing Sommelier
* Pengunjung disajikan 4 pilihan hidangan interaktif (*interactive plate pills / cards*):
  1. **`Grilled Fish & Seafood`** $\rightarrow$ Mengaktifkan **Matah (Bali · Heat 2/5)**
  2. **`Warm Rice & Sunny-Side Eggs`** $\rightarrow$ Mengaktifkan **Roa (Manado · Heat 3/5)**
  3. **`Crispy Tempe & Fried Chicken`** $\rightarrow$ Mengaktifkan **Bajak (Jawa · Heat 2/5)**
  4. **`Grilled Pork, Roasted Meat & Noodles`** $\rightarrow$ Mengaktifkan **Andaliman (Batak · Heat 4/5)**
* Saat salah satu hidangan diklik:
  * Panel kiri menampilkan visual toples yang direkomendasikan + ilustrasi piring hidangan.
  * Panel kanan menganimasikan **3 Bar Harmoni Rasa** (*Acidity Cut*, *Umami Depth*, *Aromatic Lift*), menampilkan catatan *sommelier* mengapa sambal tersebut cocok dengan lauk itu, serta menampilkan **Dietary Note** (khususnya pada *Andaliman*: menjelaskan bahwa sambalnya 100% rempah nabati tanpa kandungan babi, sehingga juga lezat dipadukan dengan mie gomak, bebek panggang, atau daging asap).
  * Tersedia 2 tombol aksi langsung: **`Inspect [Variant] Jar (PDP) ↗`** dan **`+ Add to Pantry Bag (Rp100.000)`**.

#### C. Interactive "Nice Pantry" Gift Box Builder (Untuk Audiens Baru 25–40 Tahun)
* Fitur interaktif di mana user bisa merakit kotak hadiah (**The ULEK Pantry Gift Box**):
  * **Slot 4 Toples Interaktif:** Default berisi 1x *Matah*, 1x *Roa*, 1x *Bajak*, 1x *Andaliman* (atau user bisa klik tombol **`"Make It 100% Seafood-Free / Vegan"`** maupun menukar isi slot sesuai selera penerima hadiah!).
  * **Live Gift Note Preview:** Input teks singkat (*"Untuk meja makan baru kalian — Selamat pindah rumah!"*) yang langsung ter-render secara *real-time* di atas kartu ucapan bertekstur kertas linen di layar.
  * **Add Complete Gift Box to Bag:** Memasukkan paket *Gift Box* beserta pesan kustom ke dalam *Pantry Bag Drawer*.

#### D. Seamless View Navigation: Homepage $\leftrightarrow$ Product Detail Page (PDP)
* Saat user mengklik kartu produk, tombol **"Inspect Jar"**, atau menu PDP:
  * Halaman berpindah dengan mulus ke **Product Detail Page (PDP)** (menggunakan View Transitions API `document.startViewTransition` jika didukung browser, dengan fallback *smooth fade-slide* + `window.scrollTo({ top: 0, behavior: 'smooth' })`).
  * Di dalam **PDP**, user dapat:
    1. Mengganti varian aktif (`Matah`, `Roa`, `Bajak`, `Andaliman`, dan `1987 Classic Rp25k`) melalui **Sticky Variant Bar** tanpa harus kembali ke Homepage.
    2. Mengklik 3 tab visual: **`01. Pantry Jar View`**, **`02. Coarse Spoon Texture`**, dan **`03. Raw Archipelago Spices`**.
    3. Mengatur jumlah toples (`-` / `+`), memilih opsi **Gift Wrap (+ Kartu Ucapan)**, dan menambahkannya ke **Pantry Bag**.

#### E. Built-in "Antikode Interview & Case Study Mode" (`[■] Case Study`)
* Tombol khusus di pojok kanan atas yang membuka **Interactive Presentation Drawer / Modal Fullscreen** untuk membantu kamu saat sesi wawancara dengan tim Antikode:
  * **Slide/Tab 1: 01. Sense-Making** — Menampilkan 5 temuan kritis dari Brief C.
  * **Slide/Tab 2: 02. Problem Solving** — Dilengkapi tombol interaktif **`"Highlight on Website ↗"`** yang ketika diklik akan menutup modal, men-*scroll* otomatis ke bagian website yang dimaksud (misalnya seksi *1987 Original Rp25k* atau *Andaliman Dietary Clarity*), dan memberikan *spotlight pulse* pada elemen tersebut!
  * **Slide/Tab 3: 03. Craft & Taste (Range of Visual Explorations)** — Menampilkan perbandingan visual interaktif antara **3 Arah Desain (Direction A, B, dan C)** sehingga penguji Antikode melihat langsung keluasan eksplorasi desainmu (*"the range you explore before you settle on one"*).
