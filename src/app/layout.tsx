import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "SAHARA - Produk Alami Handmade dari Kudus",
  description:
    "Produk alami handmade dari pengrajin lokal Desa Wates, Undaan, Kudus. Sabun, teh, sirup, dan camilan herbal alami untuk kesejahteraan Anda.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
