import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { NewsForm } from "@/components/admin/NewsForm";

export default function NewNewsPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/news"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Daftar Berita
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Tambah Berita</h1>
      </div>

      <div className="bg-white/50 dark:bg-card/50 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/20 shadow-xl">
        <NewsForm />
      </div>
    </div>
  );
}
