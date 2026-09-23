import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { ContentForm } from "@/components/admin/ContentForm";

interface EditContentPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditContentPage({ params }: EditContentPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: item } = supabase
    ? await supabase.from("content").select("*").eq("id", id).maybeSingle()
    : { data: null };

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Daftar Konten
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Edit Konten</h1>
      </div>

      <div className="bg-white/50 dark:bg-card/50 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/20 shadow-xl">
        {item ? (
          <ContentForm initialData={item} />
        ) : (
          <p className="text-muted-foreground">
            Konten tidak ditemukan. Mungkin sudah dihapus.
          </p>
        )}
      </div>
    </div>
  );
}
