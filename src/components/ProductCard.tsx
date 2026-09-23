"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { ProductRow } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./ImageWithFallback";

interface ProductCardProps {
  product: ProductRow;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-white/60 dark:bg-card/60 backdrop-blur-xl rounded-xl overflow-hidden border border-white/20 hover:shadow-2xl hover:border-white/40 transition-all duration-300">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-square overflow-hidden bg-muted/50 backdrop-blur-sm">
          <ImageWithFallback
            src={product.image_url ?? ""}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <div className="p-4 space-y-3 bg-white/40 dark:bg-card/40 backdrop-blur-md">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          {product.featured && (
            <Badge variant="secondary" className="bg-accent/80 backdrop-blur-sm text-accent-foreground text-xs border border-white/20">
              Populer
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-semibold text-primary">
            {formatPrice(product.price)}
          </span>
          <Link href={`/products/${product.id}`}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button size="sm" className="bg-primary/90 hover:bg-primary text-primary-foreground backdrop-blur-sm shadow-lg">
                Lihat Detail
              </Button>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
}
