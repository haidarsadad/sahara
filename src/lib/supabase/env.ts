/**
 * Membaca kredensial Supabase dari environment variable.
 *
 * Mengembalikan `null` (bukan melempar error) jika belum dikonfigurasi, supaya
 * halaman publik & panel admin bisa menampilkan pesan yang ramah alih-alih
 * crash saat project baru pertama kali dijalankan sebelum `.env.local` diisi.
 */
export function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    return null;
  }

  return { url, publishableKey };
}

export const isSupabaseConfigured = () => getSupabaseEnv() !== null;
