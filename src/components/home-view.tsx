"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Leaf,
  Package,
  Shield,
  Newspaper,
  Users,
  Award,
  Calendar,
  Sparkles,
} from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { Button } from "./ui/button";
import { ProductCard } from "./ProductCard";
import { BenefitCard } from "./BenefitCard";
import { ContentCard } from "./ContentCard";
import { ImageWithFallback } from "./ImageWithFallback";
import { formatDate } from "@/lib/format";
import type { ContentItem, NewsRow, ProductRow, SiteSettingsRow } from "@/lib/types";

interface HomeViewProps {
  /** Data dari tabel `content` Supabase (section "Promo & Penawaran"). */
  promoItems: ContentItem[];
  /** Produk dengan featured = true, dari tabel `products`. */
  featuredProducts: ProductRow[];
  /** 3 berita terbaru, dari tabel `news`. */
  latestNews: NewsRow[];
  /** Teks hero/tentang/misi/CTA, dari tabel `site_settings` (bisa null sebelum seed.sql dijalankan). */
  settings: SiteSettingsRow | null;
}

export function HomeView({ promoItems, featuredProducts, latestNews, settings }: HomeViewProps) {
  const { scrollYProgress } = useScroll();

  // Refs for different sections
  const newsRef = useRef(null);
  const productsRef = useRef(null);
  const benefitsRef = useRef(null);
  const aboutRef = useRef(null);

  // Hero parallax transforms
  const imageY = useTransform(scrollYProgress, [0, 0.5], [0, 300]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // News section parallax - continuous
  const newsY = useTransform(scrollYProgress, [0.08, 0.35], [80, -50]);
  const newsTitleScale = useTransform(scrollYProgress, [0.08, 0.25], [0.95, 1]);

  // Products section parallax - continuous
  const productsY = useTransform(scrollYProgress, [0.3, 0.55], [100, -80]);
  const productsScale = useTransform(scrollYProgress, [0.3, 0.45], [0.96, 1]);

  return (
    <div>
      {/* 1. Hero Section - Title Pack / Full Page with Parallax */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div className="absolute inset-0 w-full h-full" style={{ y: imageY }}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/55 to-black/65 z-10"></div>
          <ImageWithFallback
            src={settings?.hero_image_url || "/images/hero.png"}
            alt="Natural herbal ingredients and essential oils"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Fixed Text Content */}
        <div className="relative z-20 h-full flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="max-w-3xl space-y-6 bg-black/20 backdrop-blur-sm p-8 md:p-10 rounded-3xl border border-white/10"
              style={{ opacity: textOpacity }}
            >
              <div className="inline-block">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-medium border border-white/30 shadow-lg">
                  <Leaf className="w-4 h-4" />
                  100% Alami & Handmade
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-2xl [text-shadow:_0_4px_12px_rgb(0_0_0_/_60%)]">
                {settings?.hero_title || "Temukan Kebaikan"}
                <span className="block text-accent">
                  {settings?.hero_title_accent || "Alami Murni"}
                </span>
              </h1>
              <p className="text-xl text-white/90 max-w-2xl drop-shadow-lg">
                {settings?.hero_subtitle ||
                  "Dibuat dengan cinta oleh pengrajin lokal. Rasakan produk alami terbaik yang dibuat dari bahan-bahan yang bersumber secara berkelanjutan."}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/products">
                  <motion.div
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl">
                      Lihat Koleksi
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </motion.div>
                </Link>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white/20"
                    onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Pelajari Lebih Lanjut
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20" style={{ opacity: textOpacity }}>
          <div className="flex flex-col items-center gap-2 text-white/80">
            <span className="text-sm">Scroll</span>
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
              <motion.div
                className="w-1.5 h-1.5 bg-white rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. Promo Section - dikelola lewat panel admin (tabel `content` Supabase) */}
      {promoItems.length > 0 && (
        <section className="py-20 bg-muted overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block mb-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 backdrop-blur-md text-accent text-sm font-medium border border-white/20">
                  <Sparkles className="w-4 h-4" />
                  Promo & Penawaran
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Sedang Berlangsung
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Penawaran dan sorotan terbaru dari SAHARA, diperbarui langsung oleh tim kami.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {promoItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ContentCard item={item} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. News Section - Berita & Kegiatan */}
      <section className="py-20 bg-background overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" style={{ y: newsY, scale: newsTitleScale }}>
            <div className="inline-block mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 backdrop-blur-md text-secondary text-sm font-medium border border-white/20">
                <Newspaper className="w-4 h-4" />
                Update Terbaru
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Berita & Kegiatan
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Update terbaru tentang produk dan kegiatan kami yang akan di-upload secara berkala.
            </p>
          </motion.div>
          {latestNews.length === 0 ? (
            <p className="text-center text-muted-foreground">
              Belum ada berita. Tambahkan lewat panel admin.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestNews.map((news, index) => {
                const cardY = useTransform(scrollYProgress, [0.1 + index * 0.05, 0.4 + index * 0.05], [60, -60]);
                return (
                  <motion.div key={news.id} style={{ y: cardY }}>
                    <Link href={`/berita/${news.id}`}>
                      <motion.div
                        className="bg-white/50 dark:bg-card/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 h-full"
                        whileHover={{ scale: 1.03, y: -10 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <div className="relative h-48 overflow-hidden">
                          <ImageWithFallback
                            src={news.image_url ?? ""}
                            alt={news.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-4 right-4">
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/90 backdrop-blur-md text-primary-foreground text-xs font-medium">
                              <Calendar className="w-3 h-3" />
                              {formatDate(news.published_date)}
                            </span>
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-foreground mb-3">
                            {news.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed line-clamp-3">
                            {news.excerpt}
                          </p>
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link href="/berita">
              <motion.div
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  Lihat Semua Berita
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 4. Featured Products Section - Produk Unggulan */}
      <section className="py-20 bg-muted overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" style={{ y: productsY, scale: productsScale }}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Produk Unggulan
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Temukan produk handmade favorit kami, dibuat dengan perhatian dan bahan-bahan alami.
            </p>
          </motion.div>
          {featuredProducts.length === 0 ? (
            <p className="text-center text-muted-foreground">
              Belum ada produk unggulan. Tandai produk sebagai &quot;featured&quot; lewat panel admin.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product, index) => {
                const cardY = useTransform(scrollYProgress, [0.32 + index * 0.03, 0.58 + index * 0.03], [70, -70]);
                const cardRotate = useTransform(
                  scrollYProgress,
                  [0.32 + index * 0.03, 0.5 + index * 0.03],
                  [index % 2 === 0 ? 2 : -2, 0],
                );
                return (
                  <motion.div key={product.id} style={{ y: cardY, rotate: cardRotate }}>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -15, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          )}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link href="/products">
              <motion.div
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  Lihat Semua Produk
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Mengapa Memilih SAHARA
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Kami berkomitmen untuk menyediakan produk alami terbaik dengan kualitas dan perhatian yang luar biasa.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Leaf, title: "100% Alami", description: "Dibuat dari bahan-bahan alami murni tanpa bahan kimia atau aditif berbahaya." },
              { icon: Heart, title: "Handmade", description: "Setiap produk dibuat dengan penuh cinta oleh pengrajin lokal terampil." },
              { icon: Shield, title: "Kualitas Terjamin", description: "Kontrol kualitas ketat memastikan setiap produk memenuhi standar tinggi kami." },
              { icon: Package, title: "Ramah Lingkungan", description: "Kemasan dan praktik berkelanjutan yang peduli terhadap planet kita." },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <BenefitCard icon={benefit.icon} title={benefit.title} description={benefit.description} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. About Us Section - Tentang Kami */}
      <section id="about" className="py-20 bg-muted overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Tentang Kami
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {settings?.about_intro ||
                "Perjalanan kami dimulai dengan hasrat sederhana: membawa produk alami berkualitas tinggi ke rumah-rumah Indonesia sambil mendukung komunitas lokal."}
            </p>
          </motion.div>

          {/* Story Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <motion.div
              className="space-y-6 bg-white/50 dark:bg-card/50 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                {settings?.about_heading || "Dari Hati, Untuk Anda"}
              </h3>
              {(
                settings?.about_body ||
                "SAHARA didirikan pada tahun 2026 dengan misi sederhana namun kuat: menyediakan produk alami berkualitas tinggi yang dibuat dengan cara tradisional dan bahan-bahan yang bersumber secara berkelanjutan.\n\nKami bekerja sama dengan pengrajin lokal berbakat di Desa Wates, Undaan, Kudus, memastikan setiap produk dibuat dengan perhatian dan keahlian yang luar biasa. Dari kebun dan sawah di sekitar desa, kami berkomitmen untuk mendukung komunitas lokal dengan memanfaatkan bahan-bahan herbal alami yang tumbuh di wilayah tersebut.\n\nSetiap pembelian tidak hanya membawa produk berkualitas ke rumah Anda, tetapi juga mendukung mata pencaharian ratusan petani dan pengrajin lokal di Desa Wates."
              )
                .split("\n\n")
                .map((paragraph, i) => (
                  <p key={i} className="text-lg text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
            </motion.div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <motion.h3
              className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Nilai-Nilai Kami
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Leaf, title: "Berkelanjutan", description: "Kami berkomitmen pada praktik yang ramah lingkungan dan berkelanjutan dalam setiap aspek bisnis kami." },
                { icon: Heart, title: "Kualitas", description: "Hanya bahan-bahan terbaik dan proses pembuatan yang teliti untuk menghasilkan produk berkualitas tinggi." },
                { icon: Users, title: "Komunitas", description: "Mendukung dan memberdayakan pengrajin serta petani lokal adalah inti dari misi kami." },
                { icon: Award, title: "Transparansi", description: "Kami percaya pada kejujuran penuh tentang asal-usul dan proses pembuatan produk kami." },
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <BenefitCard icon={value.icon} title={value.title} description={value.description} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Commitment Stats */}
          <div className="max-w-3xl mx-auto">
            <motion.div
              className="bg-gradient-to-br from-primary via-primary to-accent rounded-2xl p-8 md:p-12 text-center space-y-6 mb-12"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground">
                {settings?.mission_heading || "Misi Kami"}
              </h3>
              <p className="text-lg text-primary-foreground/90 leading-relaxed">
                {settings?.mission_text ||
                  "Menyediakan produk alami berkualitas tinggi yang dibuat secara etis, sambil memberdayakan komunitas lokal dan melestarikan tradisi pembuatan handmade Indonesia. Kami percaya bahwa produk yang baik untuk Anda juga harus baik untuk planet dan masyarakat."}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  value: settings?.stat1_value || "100%",
                  title: settings?.stat1_title || "Alami",
                  description: settings?.stat1_description || "Tanpa bahan kimia berbahaya atau aditif sintetis",
                },
                {
                  value: settings?.stat2_value || "500+",
                  title: settings?.stat2_title || "Pengrajin",
                  description:
                    settings?.stat2_description || "Mitra pengrajin dan petani lokal di Desa Wates, Undaan, Kudus",
                },
                {
                  value: settings?.stat3_value || "2026",
                  title: settings?.stat3_title || "Didirikan",
                  description: settings?.stat3_description || "Memulai perjalanan mendukung pengrajin lokal",
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.title + index}
                  className="text-center space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <div className="w-16 h-16 mx-auto rounded-full bg-secondary/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-secondary">{stat.value}</span>
                  </div>
                  <h4 className="font-semibold text-foreground">{stat.title}</h4>
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary to-accent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
              {settings?.cta_heading || "Siap Merasakan Hidup Alami?"}
            </h2>
            <p className="text-lg text-primary-foreground/90">
              {settings?.cta_body ||
                "Bergabunglah dengan ribuan pelanggan puas yang telah mengubah gaya hidup mereka dengan produk alami handmade kami."}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/products">
                <motion.div
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                    Mulai Belanja
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/layanan-informasi">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Hubungi Kami
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
