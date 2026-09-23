import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseEnv } from "./env";

/**
 * Supabase client untuk dipakai di Server Component, Server Action, atau
 * Route Handler (app/api/**). Membaca & (jika memungkinkan) menulis cookie
 * sesi lewat next/headers.
 *
 * Mengembalikan `null` jika env var Supabase belum diisi, supaya pemanggil
 * (halaman/route) bisa menampilkan pesan konfigurasi alih-alih 500 error.
 *
 * Sengaja tidak pakai generic `<Database>` di sini - versi @supabase/ssr /
 * postgrest-js tertentu bikin hasil query ke-infer jadi `never` kalau bentuk
 * Database generic-nya tidak persis sama seperti yang mereka harapkan
 * (butuh field `Relationships`, dst). Type safety tetap terjaga karena tiap
 * pemanggil sudah memberi tipe eksplisit sendiri (mis. `ProductRow | null`).
 */
export async function createClient() {
  const env = getSupabaseEnv();
  if (!env) return null;

  const cookieStore = await cookies();

  return createServerClient(env.url, env.publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Dipanggil dari Server Component (bukan Server Action/Route Handler).
          // Ini aman diabaikan selama proxy.ts menyegarkan sesi user.
        }
      },
    },
  });
}
