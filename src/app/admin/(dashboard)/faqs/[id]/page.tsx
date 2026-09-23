import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { FaqForm } from "@/components/admin/FaqForm";

interface EditFaqPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditFaqPage({ params }: EditFaqPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: item } = supabase
    ? await supabase.from("faqs").select("*").eq("id", id).maybeSingle()
    : { data: null };

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/faqs"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Daftar FAQ
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Edit FAQ</h1>
      </div>

      <div className="bg-white/50 dark:bg-card/50 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/20 shadow-xl">
        {item ? (
          <FaqForm initialData={item} />
        ) : (
          <p className="text-muted-foreground">FAQ tidak ditemukan. Mungkin sudah dihapus.</p>
        )}
      </div>
    </div>
  );
}
