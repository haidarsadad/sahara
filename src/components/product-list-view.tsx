"use client";

import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { Button } from "./ui/button";
import type { ProductRow } from "@/lib/types";

interface ProductListViewProps {
  products: ProductRow[];
  /** Nilai awal filter kategori, dibaca dari ?category= di URL (mis. link di Footer). */
  initialCategory?: string;
}

export function ProductListView({ products, initialCategory = "All" }: ProductListViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="py-12 bg-gradient-to-br from-background to-muted/30 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="bg-white/50 dark:bg-card/50 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-white/20 shadow-xl max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Produk Kami
            </h1>
            <p className="text-lg text-muted-foreground">
              Jelajahi koleksi lengkap produk alami handmade kami, dibuat dengan cinta dan perhatian untuk kesejahteraan Anda.
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        {products.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-primary/90 text-primary-foreground hover:bg-primary backdrop-blur-md shadow-lg"
                    : "border-white/20 bg-white/40 dark:bg-card/40 backdrop-blur-md hover:bg-white/60 dark:hover:bg-card/60"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              {products.length === 0
                ? "Belum ada produk. Tambahkan lewat panel admin."
                : "Tidak ada produk di kategori ini."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
