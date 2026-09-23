"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "motion/react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 border-b border-white/10 shadow-lg transition-all duration-300 ${
        scrolled
          ? "bg-[#8B7355]/80 dark:bg-[#7a6349]/85 backdrop-blur-md"
          : "bg-gradient-to-r from-[#8B7355] to-[#A0826D] dark:from-[#7a6349] dark:to-[#8d7259]"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B7355] to-[#A0826D] flex items-center justify-center shadow-md">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-lg text-white">SAHARA</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              Beranda
            </Link>
            <Link
              href="/products"
              className="text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              Produk
            </Link>
            <Link
              href="/berita"
              className="text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              Berita
            </Link>
            <Link
              href="/panduan"
              className="text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              Panduan
            </Link>
            <Link
              href="/layanan-informasi"
              className="text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              Layanan Informasi
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="/products">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button className="bg-[#8B7355] hover:bg-[#A0826D] text-white shadow-lg">
                  Belanja Sekarang
                </Button>
              </motion.div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 text-white"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors py-2"
              >
                Beranda
              </Link>
              <Link
                href="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors py-2"
              >
                Produk
              </Link>
              <Link
                href="/berita"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors py-2"
              >
                Berita
              </Link>
              <Link
                href="/panduan"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors py-2"
              >
                Panduan
              </Link>
              <Link
                href="/layanan-informasi"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors py-2"
              >
                Layanan Informasi
              </Link>
              <Link href="/products" onClick={() => setMobileMenuOpen(false)}>
                <Button className="bg-[#8B7355] hover:bg-[#A0826D] text-white shadow-lg mt-2 w-full">
                  Belanja Sekarang
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
