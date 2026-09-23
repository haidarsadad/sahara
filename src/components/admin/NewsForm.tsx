"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploadField } from "./ImageUploadField";
import { RichTextEditor } from "./RichTextEditor";
import type { NewsFormValues, NewsRow } from "@/lib/types";

interface NewsFormProps {
  initialData?: NewsRow;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

const emptyValues: NewsFormValues = {
  title: "",
  published_date: today(),
  excerpt: "",
  content: "",
  image_url: "",
  category: "",
  author: "",
};

export function NewsForm({ initialData }: NewsFormProps) {
  const router = useRouter();
  const isEditMode = Boolean(initialData);

  const [values, setValues] = useState<NewsFormValues>(
    initialData
      ? {
          title: initialData.title,
          published_date: initialData.published_date || today(),
          excerpt: initialData.excerpt ?? "",
          content: initialData.content ?? "",
          image_url: initialData.image_url ?? "",
          category: initialData.category ?? "",
          author: initialData.author ?? "",
        }
      : emptyValues,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField<K extends keyof NewsFormValues>(field: K, value: NewsFormValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!values.title.trim()) {
      toast.error("Judul berita wajib diisi.");
      return;
    }

    setIsSubmitting(true);
    try {
      const url = isEditMode ? `/api/news/${initialData!.id}` : "/api/news";
      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error ?? "Gagal menyimpan berita.");
      }

      toast.success(isEditMode ? "Berita berhasil diperbarui." : "Berita berhasil ditambahkan.");
      router.push("/admin/news");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal menyimpan berita.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Judul *</Label>
        <Input
          id="title"
          value={values.title}
          onChange={(e) => updateField("title", e.target.value)}
          placeholder="mis. Peluncuran Produk Baru: Sabuya"
          required
        />
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        <div className="space-y-2">
          <Label htmlFor="published_date">Tanggal</Label>
          <Input
            id="published_date"
            type="date"
            value={values.published_date}
            onChange={(e) => updateField("published_date", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Kategori</Label>
          <Input
            id="category"
            value={values.category}
            onChange={(e) => updateField("category", e.target.value)}
            placeholder="mis. Produk Baru"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="author">Penulis</Label>
          <Input
            id="author"
            value={values.author}
            onChange={(e) => updateField("author", e.target.value)}
            placeholder="mis. Tim SAHARA"
          />
        </div>
      </div>

      <ImageUploadField
        label="Gambar Berita"
        value={values.image_url}
        onChange={(url) => updateField("image_url", url)}
        folder="news"
      />

      <div className="space-y-2">
        <Label htmlFor="excerpt">Ringkasan (excerpt)</Label>
        <Textarea
          id="excerpt"
          value={values.excerpt}
          onChange={(e) => updateField("excerpt", e.target.value)}
          rows={2}
          placeholder="Ringkasan singkat, tampil di kartu berita"
        />
      </div>

      <div className="space-y-2">
        <Label>Isi Berita</Label>
        <RichTextEditor value={values.content} onChange={(html) => updateField("content", html)} />
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {isSubmitting ? "Menyimpan..." : isEditMode ? "Simpan Perubahan" : "Tambah Berita"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/news")}
          disabled={isSubmitting}
        >
          Batal
        </Button>
      </div>
    </form>
  );
}
