"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { ImageUploadField } from "./ImageUploadField";
import type { ContentFormValues, ContentItem } from "@/lib/types";

interface ContentFormProps {
  /** Kalau diisi, form dalam mode edit dan akan PUT ke /api/content/:id. */
  initialData?: ContentItem;
}

const emptyValues: ContentFormValues = {
  title: "",
  description: "",
  image_url: "",
  cta_text: "",
};

export function ContentForm({ initialData }: ContentFormProps) {
  const router = useRouter();
  const isEditMode = Boolean(initialData);

  const [values, setValues] = useState<ContentFormValues>(
    initialData
      ? {
          title: initialData.title,
          description: initialData.description ?? "",
          image_url: initialData.image_url ?? "",
          cta_text: initialData.cta_text ?? "",
        }
      : emptyValues,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField<K extends keyof ContentFormValues>(field: K, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!values.title.trim()) {
      toast.error("Judul wajib diisi.");
      return;
    }

    setIsSubmitting(true);
    try {
      const url = isEditMode ? `/api/content/${initialData!.id}` : "/api/content";
      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error ?? "Gagal menyimpan konten.");
      }

      toast.success(isEditMode ? "Konten berhasil diperbarui." : "Konten berhasil ditambahkan.");
      router.push("/admin");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal menyimpan konten.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Form Fields */}
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="title">Judul *</Label>
            <Input
              id="title"
              value={values.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="mis. Diskon 20% Produk Perawatan Kulit"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              value={values.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Deskripsi singkat promo atau penawaran ini"
              rows={4}
            />
          </div>

          <ImageUploadField
            label="Gambar"
            value={values.image_url}
            onChange={(url) => updateField("image_url", url)}
            folder="content"
          />

          <div className="space-y-2">
            <Label htmlFor="cta_text">Teks Tombol (CTA)</Label>
            <Input
              id="cta_text"
              value={values.cta_text}
              onChange={(e) => updateField("cta_text", e.target.value)}
              placeholder="mis. Belanja Sekarang"
            />
          </div>
        </div>

        {/* Live Preview - mengikuti gaya ContentCard di homepage */}
        <div className="space-y-2">
          <Label className="text-muted-foreground">Pratinjau di Homepage</Label>
          <div className="bg-muted/40 rounded-2xl p-6 flex items-center justify-center">
            <div className="w-full max-w-sm bg-white/60 dark:bg-card/60 backdrop-blur-xl rounded-xl overflow-hidden border border-white/20 shadow-xl">
              {values.image_url && (
                <div className="aspect-video overflow-hidden bg-muted/50">
                  <ImageWithFallback
                    src={values.image_url}
                    alt={values.title || "Pratinjau"}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6 space-y-3">
                <h3 className="font-semibold text-lg text-foreground line-clamp-1">
                  {values.title || "Judul konten"}
                </h3>
                {values.description && (
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {values.description}
                  </p>
                )}
                {values.cta_text && (
                  <div className="pt-2">
                    <span className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary/90 text-primary-foreground text-sm shadow-lg">
                      {values.cta_text}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {isSubmitting ? "Menyimpan..." : isEditMode ? "Simpan Perubahan" : "Tambah Konten"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin")}
          disabled={isSubmitting}
        >
          Batal
        </Button>
      </div>
    </form>
  );
}
