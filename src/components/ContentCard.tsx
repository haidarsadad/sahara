"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { ContentItem } from "@/lib/types";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./ImageWithFallback";

interface ContentCardProps {
  item: ContentItem;
  /** Tujuan tombol CTA. Tabel `content` hanya menyimpan teksnya, bukan link tujuan. */
  href?: string;
}

/**
 * Kartu untuk menampilkan satu baris tabel `content` (title, description,
 * image_url, cta_text) yang dikelola lewat panel admin. Dipakai di section
 * "Promo & Penawaran" pada homepage.
 *
 * Mengikuti resep visual yang sama dengan ProductCard: kartu kaca (glass
 * card) blur + rounded-xl + border putih transparan, supaya konsisten
 * dengan komponen lain di landing page, bukan style baru.
 */
export function ContentCard({ item, href = "/products" }: ContentCardProps) {
  return (
    <div className="group bg-white/60 dark:bg-card/60 backdrop-blur-xl rounded-xl overflow-hidden border border-white/20 hover:shadow-2xl hover:border-white/40 transition-all duration-300">
      {item.image_url && (
        <div className="aspect-video overflow-hidden bg-muted/50 backdrop-blur-sm">
          <ImageWithFallback
            src={item.image_url}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6 space-y-3 bg-white/40 dark:bg-card/40 backdrop-blur-md">
        <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {item.title}
        </h3>
        {item.description && (
          <p className="text-sm text-muted-foreground line-clamp-3">
            {item.description}
          </p>
        )}
        {item.cta_text && (
          <div className="pt-2">
            <Link href={href}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="inline-block"
              >
                <Button
                  size="sm"
                  className="bg-primary/90 hover:bg-primary text-primary-foreground backdrop-blur-sm shadow-lg"
                >
                  {item.cta_text}
                </Button>
              </motion.div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
