"use client";

import Link from "next/link";
import { Calendar, User, Tag, ArrowLeft, Share2 } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import type { NewsRow } from "@/lib/types";
import { formatDate } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

interface BeritaDetailViewProps {
  news: NewsRow | null;
  relatedNews: NewsRow[];
}

export function BeritaDetailView({ news, relatedNews }: BeritaDetailViewProps) {
  if (!news) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/30">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Berita Tidak Ditemukan</h1>
          <p className="text-muted-foreground">Berita yang Anda cari tidak tersedia.</p>
          <Link href="/berita">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Berita
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gradient-to-br from-background to-muted/30 min-h-screen">
      {/* Back Button */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link href="/berita">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Berita
          </Button>
        </Link>
      </div>

      {/* Article Header */}
      <article className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Featured Image */}
          <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-8 shadow-2xl">
            <ImageWithFallback
              src={news.image_url ?? ""}
              alt={news.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              {news.category && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/90 backdrop-blur-md text-primary-foreground text-sm font-medium mb-4">
                  <Tag className="w-3 h-3" />
                  {news.category}
                </span>
              )}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight drop-shadow-2xl">
                {news.title}
              </h1>
            </div>
          </div>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
            <div className="flex items-center gap-6 text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {formatDate(news.published_date)}
              </span>
              <span className="inline-flex items-center gap-2">
                <User className="w-5 h-5" />
                {news.author}
              </span>
            </div>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
              <Share2 className="w-4 h-4 mr-2" />
              Bagikan
            </Button>
          </div>

          {/* Article Content */}
          <div className="bg-white/50 dark:bg-card/50 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-white/20 shadow-xl">
            <div
              className="prose prose-lg max-w-none
                prose-headings:text-foreground prose-headings:font-bold
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-3
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                prose-ul:text-muted-foreground prose-ul:my-4
                prose-ol:text-muted-foreground prose-ol:my-4
                prose-li:my-2
                prose-strong:text-foreground prose-strong:font-semibold
                prose-blockquote:border-l-4 prose-blockquote:border-primary
                prose-blockquote:pl-4 prose-blockquote:italic
                prose-blockquote:text-muted-foreground prose-blockquote:bg-muted/30
                prose-blockquote:py-2 prose-blockquote:rounded-r-lg"
              dangerouslySetInnerHTML={{ __html: news.content ?? "" }}
            />
          </div>

          {/* Share Section */}
          <div className="mt-12 p-6 bg-muted rounded-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-foreground mb-1">Suka artikel ini?</h3>
                <p className="text-sm text-muted-foreground">Bagikan kepada teman dan keluarga Anda!</p>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 rounded-lg bg-[#25D366] text-white hover:bg-[#128C7E] transition-colors text-sm font-medium">
                  WhatsApp
                </button>
                <button className="px-4 py-2 rounded-lg bg-[#1877F2] text-white hover:bg-[#166FE5] transition-colors text-sm font-medium">
                  Facebook
                </button>
                <button className="px-4 py-2 rounded-lg bg-[#1DA1F2] text-white hover:bg-[#1A91DA] transition-colors text-sm font-medium">
                  Twitter
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related News */}
      {relatedNews.length > 0 && (
        <section className="py-20 bg-muted mt-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                Berita Terkait
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedNews.map((relatedItem, index) => (
                  <motion.div
                    key={relatedItem.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href={`/berita/${relatedItem.id}`}>
                      <div className="bg-white/50 dark:bg-card/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] h-full flex flex-col">
                        <div className="relative h-48 overflow-hidden">
                          <ImageWithFallback
                            src={relatedItem.image_url ?? ""}
                            alt={relatedItem.title}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="text-sm text-muted-foreground mb-2">
                            <Calendar className="w-4 h-4 inline mr-1" />
                            {formatDate(relatedItem.published_date)}
                          </div>
                          <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
                            {relatedItem.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
                            {relatedItem.excerpt}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
