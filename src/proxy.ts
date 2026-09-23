import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Proxy (pengganti `middleware.ts` sejak Next.js 16) yang melindungi semua
 * halaman di bawah /admin kecuali /admin/login.
 *
 * Ini adalah lapisan pertama proteksi. Lapisan kedua ada di
 * `src/app/admin/(dashboard)/layout.tsx` yang mengecek ulang sesi user
 * secara langsung ke Supabase (defense in depth) - jadi kalaupun proxy ini
 * ter-skip karena suatu hal, halaman admin tetap tidak bisa diakses tanpa login.
 */
export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  // Supabase belum dikonfigurasi: biarkan request lewat apa adanya.
  // Layout admin sendiri yang akan menampilkan pesan "belum dikonfigurasi".
  if (!supabaseUrl || !supabaseKey) {
    return supabaseResponse;
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
      },
    },
  });

  // PENTING: jangan hapus panggilan ini. getUser() memvalidasi token ke server
  // Supabase (bukan hanya baca cookie) sekaligus menyegarkan sesi yang mau kedaluwarsa.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/admin/login";

  if (!user && !isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(url);
  }

  if (user && isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/admin/:path*"],
};
