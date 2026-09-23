import { AlertTriangle } from "lucide-react";

export function ConfigNotice() {
  return (
    <div className="max-w-lg bg-white/50 dark:bg-card/50 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-xl text-center space-y-4">
      <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mx-auto">
        <AlertTriangle className="w-6 h-6 text-destructive" />
      </div>
      <h1 className="text-xl font-bold text-foreground">Supabase Belum Dikonfigurasi</h1>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Salin <code className="px-1.5 py-0.5 rounded bg-muted text-foreground">.env.example</code> menjadi{" "}
        <code className="px-1.5 py-0.5 rounded bg-muted text-foreground">.env.local</code>, isi{" "}
        <code className="px-1.5 py-0.5 rounded bg-muted text-foreground">NEXT_PUBLIC_SUPABASE_URL</code> &amp;{" "}
        <code className="px-1.5 py-0.5 rounded bg-muted text-foreground">NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code>,
        jalankan <code className="px-1.5 py-0.5 rounded bg-muted text-foreground">supabase/schema.sql</code> di
        SQL Editor Supabase, lalu restart server dev. Langkah lengkap ada di README.md.
      </p>
    </div>
  );
}
