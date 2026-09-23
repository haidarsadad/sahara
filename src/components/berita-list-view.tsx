"use client";

import Link from "next/link";
import { Calendar, User, Tag, ArrowRight, Newspaper } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { formatDate } from "@/lib/format";
import type { NewsRow } from "@/lib/types";
import { motion } from "motion/react";

export function BeritaListView({ news }: { news: NewsRow[] }) {
  return (
    <div className="py-12 bg-gradient-to-br from-background to-muted/30 min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-muted/30 via-background/50 to-muted/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6 bg-white/50 dark:bg-card/50 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-white/20 shadow-xl">
            <div className="inline-block mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 backdrop-blur-md text-secondary text-sm font-medium border border-white/20">
                <Tag className="w-4 h-4" />
                Berita SAHARA
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Berita & Update
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Ikuti perkembangan terbaru dari SAHARA, mulai dari peluncuran produk baru hingga kegiatan komunitas kami.
            </p>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {news.length === 0 ? (
            <div className="text-center py-16">
              <Newspaper className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">
                Belum ada berita. Tambahkan lewat panel admin.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/berita/${item.id}`}>
                    <div className="bg-white/50 dark:bg-card/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] h-full flex flex-col">
                      <div className="relative h-56 overflow-hidden">
                        <ImageWithFallback
                          src={item.image_url ?? ""}
                          alt={item.title}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                        {item.category && (
                          <div className="absolute top-4 left-4">
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/90 backdrop-blur-md text-primary-foreground text-xs font-medium">
                              <Tag className="w-3 h-3" />
                              {item.category}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(item.published_date)}
                          </span>
                          {item.author && (
                            <span className="inline-flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {item.author}
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-1">
                          {item.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-primary font-medium group">
                          <span>Baca Selengkapnya</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6 bg-white/50 dark:bg-card/50 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-white/20 shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Ingin Tahu Lebih Banyak?
            </h2>
            <p className="text-lg text-muted-foreground">
              Ikuti media sosial kami untuk update terbaru dan konten eksklusif tentang produk herbal alami.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium">
                Follow Instagram
              </button>
              <button className="px-6 py-3 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors font-medium">
                Subscribe Newsletter
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
