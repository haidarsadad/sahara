import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { GuideTable } from "@/components/admin/GuideTable";
import type { GuideRow } from "@/lib/types";

export default async function AdminGuidesPage() {
  const supabase = await createClient();
  let items: GuideRow[] = [];
  let loadError: string | null = null;

  if (supabase) {
    const { data, error } = await supabase
      .from("guides")
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
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Panduan</h1>
          <p className="text-muted-foreground mt-1">
            Panduan yang tampil di halaman /panduan.
          </p>
        </div>
        <Link href="/admin/guides/new">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
            <Plus className="w-4 h-4 mr-2" />
            Tambah Panduan
          </Button>
        </Link>
      </div>

      {loadError && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-xl p-4 text-sm">
          Gagal memuat data: {loadError}
        </div>
      )}

      <div className="bg-white/50 dark:bg-card/50 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl overflow-hidden">
        <GuideTable initialItems={items} />
      </div>
    </div>
  );
}
