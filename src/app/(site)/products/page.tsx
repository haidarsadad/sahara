import { createClient } from "@/lib/supabase/server";
import { ProductListView } from "@/components/product-list-view";
import type { ProductRow } from "@/lib/types";

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }>;
}

async function getProducts(): Promise<ProductRow[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Gagal mengambil data produk:", error.message);
    return [];
  }
  return data ?? [];
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const [{ category }, products] = await Promise.all([searchParams, getProducts()]);

  return <ProductListView initialCategory={category ?? "All"} products={products} />;
}
