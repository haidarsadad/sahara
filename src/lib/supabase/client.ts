import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseEnv } from "./env";

/**
 * Supabase client untuk dipakai di dalam Client Component ("use client"),
 * misalnya form login admin atau form tambah/edit konten.
 *
 * Panggil ini di dalam event handler / useEffect, jangan simpan hasilnya
 * sebagai module-level singleton, mengikuti rekomendasi resmi @supabase/ssr.
 *
 * Sengaja tidak pakai generic `<Database>` di sini - versi @supabase/ssr /
 * postgrest-js tertentu bikin hasil query ke-infer jadi `never` kalau bentuk
 * Database generic-nya tidak persis sama seperti yang mereka harapkan
 * (butuh field `Relationships`, dst). Type safety tetap terjaga karena tiap
 * pemanggil sudah memberi tipe eksplisit sendiri (mis. `NewsRow | null`).
 */
export function createClient() {
  const env = getSupabaseEnv();

  if (!env) {
    throw new Error(
      "Supabase belum dikonfigurasi. Salin .env.example menjadi .env.local lalu isi " +
        "NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.",
    );
  }

  return createBrowserClient(env.url, env.publishableKey);
}
