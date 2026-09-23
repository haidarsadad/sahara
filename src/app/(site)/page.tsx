import { createClient } from "@/lib/supabase/server";
import { HomeView } from "@/components/home-view";
import type { ContentItem, NewsRow, ProductRow, SiteSettingsRow } from "@/lib/types";

interface HomeData {
  promoItems: ContentItem[];
  featuredProducts: ProductRow[];
  latestNews: NewsRow[];
  settings: SiteSettingsRow | null;
}

async function getHomeData(): Promise<HomeData> {
  const supabase = await createClient();
  if (!supabase) {
    return { promoItems: [], featuredProducts: [], latestNews: [], settings: null };
  }

  const [promoRes, productsRes, newsRes, settingsRes] = await Promise.all([
    supabase.from("content").select("*").order("created_at", { ascending: false }).limit(6),
    supabase
      .from("products")
      .select("*")
      .eq("featured", true)
      .order("created_at", { ascending: false })
      .limit(6),
    supabase.from("news").select("*").order("published_date", { ascending: false }).limit(3),
    supabase.from("site_settings").select("*").eq("id", 1).maybeSingle(),
  ]);

  return {
    promoItems: promoRes.data ?? [],
    featuredProducts: productsRes.data ?? [],
    latestNews: newsRes.data ?? [],
    settings: settingsRes.data ?? null,
  };
}

export default async function HomePage() {
  const { promoItems, featuredProducts, latestNews, settings } = await getHomeData();

  return (
    <HomeView
      promoItems={promoItems}
      featuredProducts={featuredProducts}
      latestNews={latestNews}
      settings={settings}
    />
  );
}
