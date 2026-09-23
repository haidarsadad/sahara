import { createClient } from "@/lib/supabase/server";
import { BeritaDetailView } from "@/components/berita-detail-view";
import type { NewsRow } from "@/lib/types";

interface BeritaDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function BeritaDetailPage({ params }: BeritaDetailPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  let news: NewsRow | null = null;
  let relatedNews: NewsRow[] = [];

  if (supabase) {
    const { data } = await supabase.from("news").select("*").eq("id", id).maybeSingle();
    news = data;

    if (news && news.category) {
      const { data: related } = await supabase
        .from("news")
        .select("*")
        .eq("category", news.category)
        .neq("id", news.id)
        .limit(3);
      relatedNews = related ?? [];
    }
  }

  return <BeritaDetailView news={news} relatedNews={relatedNews} />;
}
