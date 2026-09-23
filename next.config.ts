import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin root project ke folder ini secara eksplisit. Tanpa ini, Next.js bisa
  // salah tebak root kalau ada package-lock.json lain di folder induk (mis.
  // di home directory) - itu sebabnya muncul warning "multiple lockfiles".
  turbopack: {
    root: __dirname,
  },
  // Gambar produk/berita statis pakai <img> biasa (lewat ImageWithFallback),
  // bukan next/image, supaya perilakunya identik dengan versi Vite asli.
  // remotePatterns di bawah ini disiapkan untuk jaga-jaga kalau nanti mau
  // pindah ke next/image - image_url dari admin panel bisa domain apa saja,
  // makanya wildcard.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
