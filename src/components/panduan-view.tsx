"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Book,
  Sprout,
  HandHeart,
  Package,
  Clock,
  Users,
  ArrowRight,
} from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { GUIDE_CATEGORIES, GUIDE_DIFFICULTIES, type GuideRow } from "@/lib/types";
import { motion } from "motion/react";

export function PanduanView({ guides }: { guides: GuideRow[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("Semua");

  const filteredGuides = guides.filter((guide) => {
    const categoryMatch = selectedCategory === "Semua" || guide.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === "Semua" || guide.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Menanam":
        return Sprout;
      case "Merawat":
        return HandHeart;
      case "Membuat Produk":
        return Package;
      default:
        return Book;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Pemula":
        return "bg-green-500/10 text-green-700 border-green-500/20";
      case "Menengah":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-500/20";
      case "Lanjutan":
        return "bg-red-500/10 text-red-700 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-500/20";
    }
  };

  return (
    <div className="py-12 bg-gradient-to-br from-background to-muted/30 min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-muted/30 via-background/50 to-muted/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6 bg-white/50 dark:bg-card/50 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-white/20 shadow-xl">
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 backdrop-blur-md text-secondary text-sm font-medium border border-white/20">
                <Book className="w-4 h-4" />
                Panduan Lengkap
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Panduan Herbal SAHARA
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Pelajari cara menanam, merawat, dan membuat produk herbal sendiri. Panduan lengkap untuk petani, pengrajin, dan orang awam.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/50 dark:bg-card/50 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Kategori Panduan
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedCategory("Semua")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedCategory === "Semua"
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "bg-muted hover:bg-muted/80 text-muted-foreground"
                      }`}
                    >
                      Semua
                    </button>
                    {GUIDE_CATEGORIES.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                          selectedCategory === category
                            ? "bg-primary text-primary-foreground shadow-md"
                            : "bg-muted hover:bg-muted/80 text-muted-foreground"
                        }`}
                      >
                        {(() => {
                          const Icon = getCategoryIcon(category);
                          return <Icon className="w-4 h-4" />;
                        })()}
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Difficulty Filter */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Tingkat Kesulitan
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedDifficulty("Semua")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedDifficulty === "Semua"
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "bg-muted hover:bg-muted/80 text-muted-foreground"
                      }`}
                    >
                      Semua
                    </button>
                    {GUIDE_DIFFICULTIES.map((difficulty) => (
                      <button
                        key={difficulty}
                        onClick={() => setSelectedDifficulty(difficulty)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedDifficulty === difficulty
                            ? "bg-primary text-primary-foreground shadow-md"
                            : "bg-muted hover:bg-muted/80 text-muted-foreground"
                        }`}
                      >
                        {difficulty}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Menampilkan <span className="font-semibold text-foreground">{filteredGuides.length}</span> panduan
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guides List */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {filteredGuides.map((guide, index) => {
              const Icon = getCategoryIcon(guide.category);

              return (
                <motion.div
                  key={guide.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/50 dark:bg-card/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 shadow-xl"
                >
                  {/* Guide Header */}
                  <div className="p-6 md:p-8">
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Image */}
                      <div className="md:col-span-1">
                        <div className="aspect-square rounded-xl overflow-hidden shadow-lg">
                          <ImageWithFallback
                            src={guide.image_url ?? ""}
                            alt={guide.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </div>

                      {/* Info */}
                      <div className="md:col-span-2 space-y-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                            <Icon className="w-4 h-4" />
                            {guide.category}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(guide.difficulty)}`}>
                            {guide.difficulty}
                          </span>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                          {guide.title}
                        </h2>

                        <p className="text-muted-foreground leading-relaxed">
                          {guide.description}
                        </p>

                        <div className="grid grid-cols-2 gap-4 pt-2">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="w-5 h-5 text-primary" />
                            <div>
                              <div className="text-xs">Durasi</div>
                              <div className="text-sm font-medium text-foreground">{guide.duration}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="w-5 h-5 text-primary" />
                            <div>
                              <div className="text-xs">Target</div>
                              <div className="text-sm font-medium text-foreground">{guide.target_audience}</div>
                            </div>
                          </div>
                        </div>

                        <Link
                          href={`/panduan/${guide.id}`}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
                        >
                          Lihat Panduan Lengkap
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredGuides.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-block p-6 bg-white/50 dark:bg-card/50 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl">
                <Book className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Tidak Ada Panduan
                </h3>
                <p className="text-muted-foreground">
                  {guides.length === 0
                    ? "Belum ada panduan. Tambahkan lewat panel admin."
                    : "Tidak ada panduan yang sesuai dengan filter yang dipilih."}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#8B7355] via-[#A0826D] to-[#D4A574]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ada Pertanyaan Tentang Panduan Ini?
            </h2>
            <p className="text-lg text-white/90">
              Tim kami siap membantu Anda dengan pertanyaan atau panduan lebih lanjut. Jangan ragu untuk menghubungi kami!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/layanan-informasi"
                className="px-8 py-4 rounded-lg bg-white text-[#8B7355] hover:bg-white/90 transition-colors font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                Hubungi Kami
              </Link>
              <Link
                href="/berita"
                className="px-8 py-4 rounded-lg border-2 border-white text-white hover:bg-white hover:text-[#8B7355] transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Lihat Berita & Tips
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
