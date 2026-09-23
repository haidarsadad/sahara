import { createClient } from "@/lib/supabase/server";
import { LayananInformasiView } from "@/components/layanan-informasi-view";
import type { FaqRow, SiteSettingsRow } from "@/lib/types";

async function getData(): Promise<{ settings: SiteSettingsRow | null; faqs: FaqRow[] }> {
  const supabase = await createClient();
  if (!supabase) return { settings: null, faqs: [] };

  const [{ data: settings }, { data: faqs }] = await Promise.all([
    supabase.from("site_settings").select("*").eq("id", 1).maybeSingle(),
    supabase.from("faqs").select("*").order("sort_order", { ascending: true }),
  ]);

  return { settings: settings ?? null, faqs: faqs ?? [] };
}

export default async function LayananInformasiPage() {
  const { settings, faqs } = await getData();
  return <LayananInformasiView settings={settings} faqs={faqs} />;
}
