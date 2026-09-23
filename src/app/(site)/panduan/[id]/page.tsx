import { createClient } from "@/lib/supabase/server";
import { PanduanDetailView } from "@/components/panduan-detail-view";
import type { GuideRow } from "@/lib/types";

interface PanduanDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function PanduanDetailPage({ params }: PanduanDetailPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  let guide: GuideRow | null = null;
  if (supabase) {
    const { data } = await supabase.from("guides").select("*").eq("id", id).maybeSingle();
    guide = data;
  }

  return <PanduanDetailView guide={guide} />;
}
