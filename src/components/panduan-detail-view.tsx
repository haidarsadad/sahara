"use client";

import Link from "next/link";
import {
  Book,
  Sprout,
  HandHeart,
  Package,
  Clock,
  Users,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { Button } from "@/components/ui/button";
import type { GuideRow } from "@/lib/types";

function getCategoryIcon(category: string) {
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
}

export function PanduanDetailView({ guide }: { guide: GuideRow | null }) {
  if (!guide) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/30">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Panduan Tidak Ditemukan</h1>
          <p className="text-muted-foreground">Panduan yang Anda cari tidak tersedia.</p>
          <Link href="/panduan">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Panduan
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const Icon = getCategoryIcon(guide.category);

  return (
    <div className="py-12 bg-gradient-to-br from-background to-muted/30 min-h-screen">
      {/* Back Button */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link href="/panduan">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Panduan
          </Button>
        </Link>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Featured Image + Header */}
          <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-8 shadow-2xl">
            <ImageWithFallback
              src={guide.image_url ?? ""}
              alt={guide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-medium border border-white/30">
                  <Icon className="w-4 h-4" />
                  {guide.category}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/20 backdrop-blur-md text-white border border-white/30">
                  {guide.difficulty}
                </span>
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-white drop-shadow-2xl">
                {guide.title}
              </h1>
            </div>
          </div>

          <div className="space-y-8">
            {/* Description & Meta */}
            <div className="bg-white/50 dark:bg-card/50 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/20 shadow-xl">
              <p className="text-muted-foreground leading-relaxed mb-6">{guide.description}</p>
              <div className="grid grid-cols-2 gap-4 max-w-md">
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
            </div>

            {/* Materials & Tools */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/50 dark:bg-card/50 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  Bahan yang Dibutuhkan
                </h3>
                <ul className="space-y-2">
                  {guide.materials.map((material, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{material}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/50 dark:bg-card/50 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  Alat yang Dibutuhkan
                </h3>
                <ul className="space-y-2">
                  {guide.tools.map((tool, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{tool}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Steps */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Langkah-Langkah</h2>
              <div className="space-y-6">
                {guide.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="bg-white/50 dark:bg-card/50 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl"
                  >
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-lg font-bold text-primary-foreground">{idx + 1}</span>
                      </div>
                      <div className="flex-1 space-y-3">
                        <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                        {step.tips && step.tips.length > 0 && (
                          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                            <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4" />
                              Tips:
                            </h4>
                            <ul className="space-y-1.5">
                              {step.tips.map((tip, tipIdx) => (
                                <li
                                  key={tipIdx}
                                  className="text-sm text-blue-800 dark:text-blue-200 flex items-start gap-2"
                                >
                                  <span className="text-blue-500 mt-1">•</span>
                                  <span>{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Warnings */}
            {guide.warnings && guide.warnings.length > 0 && (
              <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6 border border-red-200 dark:border-red-800">
                <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Peringatan Penting
                </h3>
                <ul className="space-y-2">
                  {guide.warnings.map((warning, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-red-800 dark:text-red-200">
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800">
              <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Manfaat &amp; Keuntungan
              </h3>
              <ul className="space-y-2">
                {guide.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-green-800 dark:text-green-200">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
