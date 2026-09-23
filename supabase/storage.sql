-- =============================================================================
-- SAHARA - Setup Supabase Storage untuk upload gambar
-- Jalankan file ini di SQL Editor Supabase (setelah schema.sql).
-- =============================================================================

-- Bucket publik "images" - semua gambar yang diupload dari panel admin
-- (produk, berita, panduan, promo, hero) masuk ke sini, dipisah per folder.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'images',
  'images',
  true,
  5242880, -- 5MB
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Siapa saja boleh MELIHAT gambar (supaya tampil di halaman publik tanpa login).
drop policy if exists "Public read access for images bucket" on storage.objects;
create policy "Public read access for images bucket"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'images');

-- Hanya user yang login (admin) yang boleh upload/ganti/hapus gambar.
drop policy if exists "Authenticated users can upload images" on storage.objects;
create policy "Authenticated users can upload images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'images');

drop policy if exists "Authenticated users can update images" on storage.objects;
create policy "Authenticated users can update images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'images');

drop policy if exists "Authenticated users can delete images" on storage.objects;
create policy "Authenticated users can delete images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'images');
