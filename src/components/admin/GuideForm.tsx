"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { TagListEditor } from "./TagListEditor";
import { StepsEditor } from "./StepsEditor";
import { ImageUploadField } from "./ImageUploadField";
import {
  GUIDE_CATEGORIES,
  GUIDE_DIFFICULTIES,
  type GuideFormValues,
  type GuideRow,
} from "@/lib/types";

interface GuideFormProps {
  initialData?: GuideRow;
}

const emptyValues: GuideFormValues = {
  title: "",
  category: GUIDE_CATEGORIES[0],
  difficulty: GUIDE_DIFFICULTIES[0],
  duration: "",
  target_audience: "",
  description: "",
  image_url: "",
  materials: [],
  tools: [],
  steps: [],
  warnings: [],
  benefits: [],
};

export function GuideForm({ initialData }: GuideFormProps) {
  const router = useRouter();
  const isEditMode = Boolean(initialData);

  const [values, setValues] = useState<GuideFormValues>(
    initialData
      ? {
          title: initialData.title,
          category: initialData.category,
          difficulty: initialData.difficulty,
          duration: initialData.duration ?? "",
          target_audience: initialData.target_audience ?? "",
          description: initialData.description ?? "",
          image_url: initialData.image_url ?? "",
          materials: initialData.materials ?? [],
          tools: initialData.tools ?? [],
          steps: initialData.steps ?? [],
          warnings: initialData.warnings ?? [],
          benefits: initialData.benefits ?? [],
        }
      : emptyValues,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField<K extends keyof GuideFormValues>(field: K, value: GuideFormValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!values.title.trim()) {
      toast.error("Judul panduan wajib diisi.");
      return;
    }

    setIsSubmitting(true);
    try {
      const url = isEditMode ? `/api/guides/${initialData!.id}` : "/api/guides";
      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error ?? "Gagal menyimpan panduan.");
      }

      toast.success(isEditMode ? "Panduan berhasil diperbarui." : "Panduan berhasil ditambahkan.");
      router.push("/admin/guides");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal menyimpan panduan.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Judul Panduan *</Label>
        <Input
          id="title"
          value={values.title}
          onChange={(e) => updateField("title", e.target.value)}
          placeholder="mis. Cara Menanam Lidah Buaya di Pekarangan Rumah"
          required
        />
      </div>

      <div className="grid md:grid-cols-4 gap-5">
        <div className="space-y-2">
          <Label>Kategori</Label>
          <Select value={values.category} onValueChange={(v) => updateField("category", v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {GUIDE_CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Tingkat Kesulitan</Label>
          <Select value={values.difficulty} onValueChange={(v) => updateField("difficulty", v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {GUIDE_DIFFICULTIES.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="duration">Durasi</Label>
          <Input
            id="duration"
            value={values.duration}
            onChange={(e) => updateField("duration", e.target.value)}
            placeholder="mis. 30 menit"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="target_audience">Target</Label>
          <Input
            id="target_audience"
            value={values.target_audience}
            onChange={(e) => updateField("target_audience", e.target.value)}
            placeholder="mis. Pemula"
          />
        </div>
      </div>

      <ImageUploadField
        label="Gambar Panduan"
        value={values.image_url}
        onChange={(url) => updateField("image_url", url)}
        folder="guides"
      />

      <div className="space-y-2">
        <Label htmlFor="description">Deskripsi Singkat</Label>
        <Textarea
          id="description"
          value={values.description}
          onChange={(e) => updateField("description", e.target.value)}
          rows={3}
        />
      </div>

      <Separator />

      <div className="grid md:grid-cols-2 gap-6">
        <TagListEditor
          label="Bahan yang Dibutuhkan"
          items={values.materials}
          onChange={(items) => updateField("materials", items)}
          placeholder="Tambah bahan lalu Enter"
        />
        <TagListEditor
          label="Alat yang Dibutuhkan"
          items={values.tools}
          onChange={(items) => updateField("tools", items)}
          placeholder="Tambah alat lalu Enter"
        />
      </div>

      <Separator />

      <StepsEditor steps={values.steps} onChange={(steps) => updateField("steps", steps)} />

      <Separator />

      <div className="grid md:grid-cols-2 gap-6">
        <TagListEditor
          label="Peringatan (opsional)"
          items={values.warnings}
          onChange={(items) => updateField("warnings", items)}
          placeholder="Tambah peringatan lalu Enter"
        />
        <TagListEditor
          label="Manfaat & Keuntungan"
          items={values.benefits}
          onChange={(items) => updateField("benefits", items)}
          placeholder="Tambah manfaat lalu Enter"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {isSubmitting ? "Menyimpan..." : isEditMode ? "Simpan Perubahan" : "Tambah Panduan"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/guides")}
          disabled={isSubmitting}
        >
          Batal
        </Button>
      </div>
    </form>
  );
}
