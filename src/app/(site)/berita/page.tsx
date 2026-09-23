import { createClient } from "@/lib/supabase/server";
import { BeritaListView } from "@/components/berita-list-view";
import type { NewsRow } from "@/lib/types";

async function getNews(): Promise<NewsRow[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("published_date", { ascending: false });

  if (error) {
    console.error("Gagal mengambil data berita:", error.message);
    return [];
  }
  return data ?? [];
}

export default async function BeritaPage() {
  const news = await getNews();
  return <BeritaListView news={news} />;
}
