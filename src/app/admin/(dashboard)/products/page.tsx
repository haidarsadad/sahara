import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { ProductTable } from "@/components/admin/ProductTable";
import type { ProductRow } from "@/lib/types";

export default async function AdminProductsPage() {
  const supabase = await createClient();
  let items: ProductRow[] = [];
  let loadError: string | null = null;

  if (supabase) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      loadError = error.message;
    } else {
      items = data ?? [];
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Produk</h1>
          <p className="text-muted-foreground mt-1">
            Katalog produk yang tampil di halaman /products dan section &quot;Produk Unggulan&quot;.
          </p>
        </div>
        <Link href="/admin/products/new">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
            <Plus className="w-4 h-4 mr-2" />
            Tambah Produk
          </Button>
        </Link>
      </div>

      {loadError && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-xl p-4 text-sm">
          Gagal memuat data: {loadError}
        </div>
      )}

      <div className="bg-white/50 dark:bg-card/50 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl overflow-hidden">
        <ProductTable initialItems={items} />
      </div>
    </div>
  );
}
