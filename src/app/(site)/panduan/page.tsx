import { createClient } from "@/lib/supabase/server";
import { PanduanView } from "@/components/panduan-view";
import type { GuideRow } from "@/lib/types";

async function getGuides(): Promise<GuideRow[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("guides")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Gagal mengambil data panduan:", error.message);
    return [];
  }
  return data ?? [];
}

export default async function PanduanPage() {
  const guides = await getGuides();
  return <PanduanView guides={guides} />;
}
