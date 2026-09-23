-- =============================================================================
-- SAHARA - Schema tabel `content`
-- Jalankan file ini di Supabase Dashboard > SQL Editor (New Query > Run).
-- =============================================================================

create extension if not exists pgcrypto;

create table if not exists public.content (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_url text,
  cta_text text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.content is
  'Konten promo/penawaran yang dikelola lewat panel admin dan tampil di homepage.';

-- Auto-update kolom updated_at setiap kali baris diubah.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists content_set_updated_at on public.content;
create trigger content_set_updated_at
  before update on public.content
  for each row
  execute function public.set_updated_at();

-- Row Level Security -----------------------------------------------------
-- Publik boleh MEMBACA (dipakai homepage yang tidak login).
-- Hanya user yang login (admin) yang boleh menambah/mengubah/menghapus.
alter table public.content enable row level security;

drop policy if exists "Content is publicly readable" on public.content;
create policy "Content is publicly readable"
  on public.content
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Authenticated users can insert content" on public.content;
create policy "Authenticated users can insert content"
  on public.content
  for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated users can update content" on public.content;
create policy "Authenticated users can update content"
  on public.content
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated users can delete content" on public.content;
create policy "Authenticated users can delete content"
  on public.content
  for delete
  to authenticated
  using (true);

-- =============================================================================
-- Tabel `products` - katalog produk (dulu data/products.ts)
-- =============================================================================

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price integer not null default 0,
  image_url text,
  category text not null default 'Umum',
  featured boolean not null default false,
  ingredients text[] not null default '{}',
  benefits text[] not null default '{}',
  composition text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
  before update on public.products
  for each row
  execute function public.set_updated_at();

alter table public.products enable row level security;

drop policy if exists "Products are publicly readable" on public.products;
create policy "Products are publicly readable"
  on public.products for select to anon, authenticated using (true);

drop policy if exists "Authenticated users can insert products" on public.products;
create policy "Authenticated users can insert products"
  on public.products for insert to authenticated with check (true);

drop policy if exists "Authenticated users can update products" on public.products;
create policy "Authenticated users can update products"
  on public.products for update to authenticated using (true) with check (true);

drop policy if exists "Authenticated users can delete products" on public.products;
create policy "Authenticated users can delete products"
  on public.products for delete to authenticated using (true);

-- =============================================================================
-- Tabel `news` - berita & kegiatan (dulu data/news.ts)
-- =============================================================================

create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  published_date date not null default current_date,
  excerpt text,
  content text,
  image_url text,
  category text,
  author text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists news_set_updated_at on public.news;
create trigger news_set_updated_at
  before update on public.news
  for each row
  execute function public.set_updated_at();

alter table public.news enable row level security;

drop policy if exists "News is publicly readable" on public.news;
create policy "News is publicly readable"
  on public.news for select to anon, authenticated using (true);

drop policy if exists "Authenticated users can insert news" on public.news;
create policy "Authenticated users can insert news"
  on public.news for insert to authenticated with check (true);

drop policy if exists "Authenticated users can update news" on public.news;
create policy "Authenticated users can update news"
  on public.news for update to authenticated using (true) with check (true);

drop policy if exists "Authenticated users can delete news" on public.news;
create policy "Authenticated users can delete news"
  on public.news for delete to authenticated using (true);

-- =============================================================================
-- Tabel `guides` - panduan (dulu data/guides.ts)
-- `steps` disimpan sebagai jsonb: array of { title, description, tips: string[] }
-- =============================================================================

create table if not exists public.guides (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null default 'Menanam',
  difficulty text not null default 'Pemula',
  duration text,
  target_audience text,
  description text,
  image_url text,
  materials text[] not null default '{}',
  tools text[] not null default '{}',
  steps jsonb not null default '[]'::jsonb,
  warnings text[] not null default '{}',
  benefits text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists guides_set_updated_at on public.guides;
create trigger guides_set_updated_at
  before update on public.guides
  for each row
  execute function public.set_updated_at();

alter table public.guides enable row level security;

drop policy if exists "Guides are publicly readable" on public.guides;
create policy "Guides are publicly readable"
  on public.guides for select to anon, authenticated using (true);

drop policy if exists "Authenticated users can insert guides" on public.guides;
create policy "Authenticated users can insert guides"
  on public.guides for insert to authenticated with check (true);

drop policy if exists "Authenticated users can update guides" on public.guides;
create policy "Authenticated users can update guides"
  on public.guides for update to authenticated using (true) with check (true);

drop policy if exists "Authenticated users can delete guides" on public.guides;
create policy "Authenticated users can delete guides"
  on public.guides for delete to authenticated using (true);

-- =============================================================================
-- Tabel `faqs` - pertanyaan umum di halaman Layanan Informasi
-- =============================================================================

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists faqs_set_updated_at on public.faqs;
create trigger faqs_set_updated_at
  before update on public.faqs
  for each row
  execute function public.set_updated_at();

alter table public.faqs enable row level security;

drop policy if exists "FAQs are publicly readable" on public.faqs;
create policy "FAQs are publicly readable"
  on public.faqs for select to anon, authenticated using (true);

drop policy if exists "Authenticated users can insert faqs" on public.faqs;
create policy "Authenticated users can insert faqs"
  on public.faqs for insert to authenticated with check (true);

drop policy if exists "Authenticated users can update faqs" on public.faqs;
create policy "Authenticated users can update faqs"
  on public.faqs for update to authenticated using (true) with check (true);

drop policy if exists "Authenticated users can delete faqs" on public.faqs;
create policy "Authenticated users can delete faqs"
  on public.faqs for delete to authenticated using (true);

-- =============================================================================
-- Tabel `site_settings` - teks Beranda (hero/tentang/misi/CTA) & Layanan
-- Informasi (info kontak). SENGAJA hanya 1 baris (id selalu 1) - bukan daftar,
-- tapi "pengaturan situs" yang di-update, bukan ditambah/dihapus.
-- =============================================================================

create table if not exists public.site_settings (
  id smallint primary key default 1,
  hero_title text,
  hero_title_accent text,
  hero_subtitle text,
  hero_image_url text,
  about_intro text,
  about_heading text,
  about_body text,
  mission_heading text,
  mission_text text,
  stat1_value text,
  stat1_title text,
  stat1_description text,
  stat2_value text,
  stat2_title text,
  stat2_description text,
  stat3_value text,
  stat3_title text,
  stat3_description text,
  cta_heading text,
  cta_body text,
  contact_address text,
  contact_phone text,
  contact_email text,
  contact_hours text,
  updated_at timestamptz not null default now(),
  constraint site_settings_singleton check (id = 1)
);

drop trigger if exists site_settings_set_updated_at on public.site_settings;
create trigger site_settings_set_updated_at
  before update on public.site_settings
  for each row
  execute function public.set_updated_at();

alter table public.site_settings enable row level security;

drop policy if exists "Site settings are publicly readable" on public.site_settings;
create policy "Site settings are publicly readable"
  on public.site_settings for select to anon, authenticated using (true);

drop policy if exists "Authenticated users can insert site settings" on public.site_settings;
create policy "Authenticated users can insert site settings"
  on public.site_settings for insert to authenticated with check (true);

drop policy if exists "Authenticated users can update site settings" on public.site_settings;
create policy "Authenticated users can update site settings"
  on public.site_settings for update to authenticated using (true) with check (true);

-- Sengaja TIDAK ada policy DELETE untuk site_settings - baris pengaturan ini
-- tidak boleh terhapus dari admin panel.
