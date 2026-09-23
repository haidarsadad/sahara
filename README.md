# SAHARA — Full-Stack (Next.js + Supabase)

Hasil migrasi landing page `saharasite26june.zip` (Vite + React Router + TSX) menjadi
aplikasi full-stack **Next.js 16 (App Router) + TypeScript + Supabase**, dengan panel
admin untuk mengelola **seluruh konten**: Beranda (hero/tentang/misi/CTA), Produk,
Berita, Panduan, FAQ, dan info kontak. Semua tampilan mengikuti desain asli (warna,
komponen, animasi) — tidak ada style baru yang ditambahkan.

## Tech Stack

- **Next.js 16** (App Router, TypeScript)
- **Supabase** — PostgreSQL, Auth, `@supabase/ssr`
- **Tailwind CSS v4** (+ `@tailwindcss/typography` untuk styling konten HTML), shadcn/ui, Radix UI, Motion (Framer Motion)
- **TipTap** — rich text editor untuk isi berita di panel admin

## 1. Install dependency

```bash
npm install
```

`.npmrc` sudah diset `legacy-peer-deps=true` karena beberapa paket UI belum
memperbarui peer-dependency range React 19 — aman diabaikan.

## 2. Buat project Supabase

1. Buat project baru di [supabase.com](https://supabase.com/dashboard).
2. Buka **SQL Editor** → **New query**, tempel isi file `supabase/schema.sql`,
   lalu **Run**. Ini membuat 6 tabel (`content`, `products`, `news`, `guides`,
   `faqs`, `site_settings`) beserta Row Level Security-nya (publik boleh baca,
   hanya user login yang boleh tulis).
3. Buka **New query** lagi, tempel isi file `supabase/storage.sql`, lalu
   **Run**. Ini membuat bucket Storage publik bernama `images` (dipakai untuk
   semua gambar yang diupload dari panel admin — produk, berita, panduan,
   promo, hero) beserta policy-nya. **Wajib dijalankan** sebelum upload gambar
   pertama kali, kalau belum akan muncul error "Bucket not found".
4. **(Opsional tapi disarankan)** Buka **New query** lagi, tempel isi file
   `supabase/seed.sql`, lalu **Run**. Ini mengisi tabel dengan konten asli
   (6 produk, 6 berita, 6 panduan, 4 FAQ, teks Beranda & kontak) supaya situs
   tidak kosong saat pertama dibuka. **Jalankan seed.sql cuma sekali** — kalau
   dijalankan ulang, produk/berita/panduan/FAQ akan terduplikasi (`site_settings`
   aman diulang, sudah pakai `ON CONFLICT DO NOTHING`).
5. Buka **Project Settings → API Keys**, salin:
   - **Project URL**
   - **Publishable key** (kalau dashboard kamu masih versi lama, namanya
     "anon" / "anon public" key — nilainya tetap cocok dipakai di sini)

## 3. Environment variables

```bash
cp .env.example .env.local
```

Isi `.env.local` dengan **Project URL** dan **Publishable key** dari langkah 2.

> Proyek ini sengaja **tidak** memakai secret/service_role key di kode
> mana pun. Semua akses tulis dijaga lewat Row Level Security + sesi login
> Supabase Auth — lebih simpel dan lebih aman.

## 4. Buat akun admin pertama

Tidak ada halaman "Daftar" untuk admin (disengaja, supaya orang lain tidak
bisa mendaftar sendiri jadi admin). Buat akun lewat Supabase Dashboard:

**Authentication → Users → Add user → Create new user**, isi email &
password, lalu centang **Auto Confirm User**.

Login dengan akun ini di `/admin/login`.

## 5. Jalankan

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) untuk situs publik, dan
[http://localhost:3000/admin](http://localhost:3000/admin) untuk panel admin.

Situs publik tetap tampil normal (dengan teks default) walau Supabase/seed.sql
belum diisi — tiap section yang butuh data dari Supabase akan menampilkan
pesan "belum ada data" yang rapi alih-alih error atau tampilan kosong.

## Panel Admin

| Menu | URL | Mengelola |
|---|---|---|
| Promo Beranda | `/admin` | Tabel `content` — kartu promo di homepage |
| Produk | `/admin/products` | Katalog produk (`/products`) |
| Berita | `/admin/news` | Berita (`/berita`) |
| Panduan | `/admin/guides` | Panduan (`/panduan`), termasuk langkah-langkah |
| FAQ | `/admin/faqs` | Pertanyaan umum di Layanan Informasi |
| Pengaturan Situs | `/admin/settings` | Teks hero/tentang/misi/CTA Beranda + info kontak |

## Struktur Folder

```
src/
├── app/
│   ├── (site)/                  # Halaman publik (Navbar + Footer + transisi halaman)
│   │   ├── page.tsx               → "/" (fetch promo+produk unggulan+berita+settings)
│   │   ├── products/              → "/products", "/products/[id]"
│   │   ├── berita/                → "/berita", "/berita/[id]"
│   │   ├── panduan/               → "/panduan"
│   │   └── layanan-informasi/     → "/layanan-informasi" (settings + faqs)
│   ├── admin/
│   │   ├── (auth)/login/          → "/admin/login" (tidak diproteksi)
│   │   └── (dashboard)/           → semua halaman admin (diproteksi, lihat tabel di atas)
│   ├── api/                       → REST API CRUD: content, products, news, guides, faqs, settings
│   └── globals.css
├── components/                  # Navbar, Footer, ProductCard, ContentCard, dst + ui/ (shadcn)
├── components/admin/            # *Table, *Form, DeleteButton, TagListEditor, StepsEditor, dst
├── lib/
│   ├── supabase/                # client.ts (browser), server.ts (server), env.ts
│   ├── actions/auth.ts           # Server Action login & logout
│   └── types.ts                  # Semua tipe data + skema Database
├── proxy.ts                      # Pengganti middleware.ts (Next.js 16) - proteksi /admin
supabase/
├── schema.sql                    # 1. Jalankan pertama di SQL Editor Supabase
├── storage.sql                   # 2. Jalankan kedua (bucket + policy upload gambar)
└── seed.sql                      # 3. Jalankan terakhir (opsional, sekali saja)
```

## Keputusan & Penyesuaian Penting

- **Upload gambar, bukan tempel URL**: semua field gambar (produk, berita,
  panduan, promo, hero) pakai tombol upload file yang langsung mengirim ke
  **Supabase Storage** (bucket `images`, lihat `supabase/storage.sql`), bukan
  input teks URL. Nilai yang tersimpan di kolom `image_url` adalah URL publik
  ke file di storage milikmu sendiri, dibuat otomatis saat upload — bukan
  gambar tempelan dari internet. Upload langsung dari browser ke Supabase
  (bukan lewat API route sendiri) supaya lebih sederhana; dijaga oleh Storage
  policy yang sama (baca publik, tulis harus login) seperti tabel database.
  Batas ukuran file 5MB, format JPG/PNG/WebP/GIF (dicek di browser & di level
  bucket Storage). Catatan: gambar lama yang diganti/dihapus tidak otomatis
  terhapus dari Storage (biar sederhana) — kalau mau housekeeping otomatis,
  itu pengembangan lanjutan.
- **Kartu ikon statis, sengaja**: 4 kartu "Mengapa Memilih SAHARA" dan 4 kartu
  "Nilai-Nilai Kami" di Beranda **tidak** dipindah ke database — itu elemen
  branding yang jarang berubah, dan bikin editornya (pilih ikon dari admin)
  menambah kompleksitas signifikan tanpa banyak manfaat. Semua teks lain
  (hero, cerita tentang kami, misi, 3 statistik, CTA, kontak) sudah bisa
  diedit lewat `/admin/settings`.
- **`guides.steps` disimpan sebagai `jsonb`** (bukan tabel terpisah) supaya
  satu panduan = satu baris, lebih sederhana untuk di-CRUD. Diedit lewat
  editor langkah dinamis (tambah/hapus/urutkan) di form admin.
- **ID produk/berita/panduan sekarang UUID**, bukan lagi slug seperti
  `"peluncuran-sabuya"` — URL-nya jadi `/berita/<uuid>` bukan
  `/berita/nama-slug`. Ini pertukaran demi kesederhanaan (bikin slug unik
  otomatis dari judul itu sendiri nambah kompleksitas); tambahkan kolom
  `slug` sendiri nanti kalau butuh URL yang lebih rapi.
- **CRUD ganda, sengaja**: form admin memanggil Route Handler REST asli di
  `app/api/**` (sesuai permintaan awal), sedangkan login/logout admin pakai
  **Server Action** (`src/lib/actions/auth.ts`) — pola yang lebih disarankan
  Next.js untuk form auth.
- **Proteksi dua lapis**: `src/proxy.ts` (setara middleware, menjaga di level
  request) **dan** `src/app/admin/(dashboard)/layout.tsx` (cek ulang sesi
  langsung ke Supabase) — supaya panel admin tidak bisa "kebobolan" hanya
  lewat satu lapis proteksi.
- **`proxy.ts` bukan `middleware.ts`**: sejak Next.js 16, `middleware.ts`
  digantikan `proxy.ts` (fungsinya sama).
- Perbaikan kecil dari project asli: link `/about` & `/contact` di Footer
  yang sebelumnya tidak mengarah ke mana pun sekarang mengarah ke
  `/#about` dan `/layanan-informasi`; filter kategori produk di halaman
  `/products` sekarang benar-benar terhubung dengan link kategori di Footer.
- Form di halaman **Layanan Informasi** (nama/email/pesan) belum tersambung
  ke backend (di luar cakupan yang diminta) — sudah `preventDefault()` supaya
  tidak reload halaman, tinggal disambungkan ke Route Handler / Server Action
  sendiri kalau dibutuhkan.

## Catatan

Kode ini ditulis dan direview dengan teliti (termasuk seed data yang di-generate
otomatis dari data asli, bukan diketik ulang manual, supaya tidak ada typo), tapi
**belum bisa dijalankan `npm install` / `npm run build` di lingkungan pembuatan
project ini** (tidak ada akses jaringan ke registry npm). Kalau ada error saat
pertama kali `npm install`, `npm run dev`, atau menjalankan `schema.sql`/`seed.sql`,
beri tahu saya errornya.
