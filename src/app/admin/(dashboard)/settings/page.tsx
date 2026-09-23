import { createClient } from "@/lib/supabase/server";
import { SettingsForm } from "@/components/admin/SettingsForm";
import type { SiteSettingsRow } from "@/lib/types";

export default async function AdminSettingsPage() {
  const supabase = await createClient();

  let settings: SiteSettingsRow | null = null;
  let loadError: string | null = null;

  if (supabase) {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle();

    if (error) {
      loadError = error.message;
    } else {
      settings = data ?? null;
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Pengaturan Situs</h1>
        <p className="text-muted-foreground mt-1">
          Teks Beranda (hero, tentang kami, misi, statistik, CTA) dan info kontak di halaman Layanan
          Informasi.
        </p>
      </div>

      {loadError && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-xl p-4 text-sm">
          Gagal memuat data: {loadError}
        </div>
      )}

      <div className="bg-white/50 dark:bg-card/50 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/20 shadow-xl">
        <SettingsForm initialData={settings} />
      </div>
    </div>
  );
}
