import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { ContentTable } from "@/components/admin/ContentTable";
import type { ContentItem } from "@/lib/types";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  let items: ContentItem[] = [];
  let loadError: string | null = null;

  if (supabase) {
    const { data, error } = await supabase
      .from("content")
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
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Promo Beranda</h1>
          <p className="text-muted-foreground mt-1">
            Konten di sini tampil di section &quot;Promo &amp; Penawaran&quot; pada homepage.
          </p>
        </div>
        <Link href="/admin/content/new">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
            <Plus className="w-4 h-4 mr-2" />
            Tambah Konten
          </Button>
        </Link>
      </div>

      {loadError && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-xl p-4 text-sm">
          Gagal memuat data: {loadError}
        </div>
      )}

      <div className="bg-white/50 dark:bg-card/50 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl overflow-hidden">
        <ContentTable initialItems={items} />
      </div>
    </div>
  );
}
