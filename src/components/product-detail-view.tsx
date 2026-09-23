"use client";

import Link from "next/link";
import { ArrowLeft, ShoppingCart, Check } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./ImageWithFallback";
import { formatPrice } from "@/lib/format";
import type { ProductRow } from "@/lib/types";

interface ProductDetailViewProps {
  product: ProductRow | null;
  relatedProducts: ProductRow[];
}

export function ProductDetailView({ product, relatedProducts }: ProductDetailViewProps) {
  if (!product) {
    return (
      <div className="py-20 bg-background min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Produk Tidak Ditemukan
          </h1>
          <p className="text-muted-foreground mb-8">
            Produk yang Anda cari tidak ada.
          </p>
          <Link href="/products">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Kembali ke Produk
              </Button>
            </motion.div>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gradient-to-br from-background to-muted/30 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link href="/products">
            <Button variant="ghost" className="hover:bg-white/50 backdrop-blur-md">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Kembali ke Produk
            </Button>
          </Link>
        </div>

        {/* Product Detail */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-white/50 dark:bg-muted/50 backdrop-blur-xl shadow-2xl border border-white/20">
              <ImageWithFallback
                src={product.image_url ?? ""}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.featured && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-accent/90 backdrop-blur-md text-accent-foreground border border-white/20">
                  Pilihan Populer
                </Badge>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6 bg-white/50 dark:bg-card/50 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-xl">
            <div>
              <Badge variant="outline" className="mb-4 backdrop-blur-sm bg-white/30 border-white/20">
                {product.category}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="py-4 border-y border-border">
              <div className="text-3xl font-bold text-primary">
                {formatPrice(product.price)}
              </div>
            </div>

            {/* Composition */}
            {product.composition && (
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Detail Produk
                </h3>
                <p className="text-muted-foreground">{product.composition}</p>
              </div>
            )}

            {/* Ingredients */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div>
                <h3 className="font-semibold text-foreground mb-3">
                  Komposisi
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ingredient, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-muted text-foreground"
                    >
                      {ingredient}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Benefits */}
            {product.benefits && product.benefits.length > 0 && (
              <div>
                <h3 className="font-semibold text-foreground mb-3">
                  Manfaat Utama
                </h3>
                <ul className="space-y-2">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA Section */}
            <div className="pt-6 space-y-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <ShoppingCart className="mr-2 w-5 h-5" />
                  Tambah ke Keranjang
                </Button>
              </motion.div>
              <p className="text-sm text-center text-muted-foreground">
                Gratis ongkir untuk pembelian di atas Rp 200.000
              </p>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
              Anda Mungkin Juga Suka
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all"
                >
                  <Link href={`/products/${relatedProduct.id}`}>
                    <div className="aspect-square overflow-hidden bg-muted">
                      <ImageWithFallback
                        src={relatedProduct.image_url ?? ""}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-2">
                        {relatedProduct.name}
                      </h3>
                      <div className="text-lg font-semibold text-primary">
                        {formatPrice(relatedProduct.price)}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
