import { createClient } from "@/lib/supabase/server";
import { ProductDetailView } from "@/components/product-detail-view";
import type { ProductRow } from "@/lib/types";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  let product: ProductRow | null = null;
  let relatedProducts: ProductRow[] = [];

  if (supabase) {
    const { data } = await supabase.from("products").select("*").eq("id", id).maybeSingle();
    product = data;

    if (product) {
      const { data: related } = await supabase
        .from("products")
        .select("*")
        .eq("category", product.category)
        .neq("id", product.id)
        .limit(3);
      relatedProducts = related ?? [];
    }
  }

  return <ProductDetailView product={product} relatedProducts={relatedProducts} />;
}
