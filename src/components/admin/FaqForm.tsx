"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { FaqFormValues, FaqRow } from "@/lib/types";

interface FaqFormProps {
  initialData?: FaqRow;
}

const emptyValues: FaqFormValues = {
  question: "",
  answer: "",
  sort_order: 0,
};

export function FaqForm({ initialData }: FaqFormProps) {
  const router = useRouter();
  const isEditMode = Boolean(initialData);

  const [values, setValues] = useState<FaqFormValues>(
    initialData
      ? {
          question: initialData.question,
          answer: initialData.answer,
          sort_order: initialData.sort_order,
        }
      : emptyValues,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField<K extends keyof FaqFormValues>(field: K, value: FaqFormValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!values.question.trim() || !values.answer.trim()) {
      toast.error("Pertanyaan dan jawaban wajib diisi.");
      return;
    }

    setIsSubmitting(true);
    try {
      const url = isEditMode ? `/api/faqs/${initialData!.id}` : "/api/faqs";
      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error ?? "Gagal menyimpan FAQ.");
      }

      toast.success(isEditMode ? "FAQ berhasil diperbarui." : "FAQ berhasil ditambahkan.");
      router.push("/admin/faqs");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal menyimpan FAQ.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="question">Pertanyaan *</Label>
        <Input
          id="question"
          value={values.question}
          onChange={(e) => updateField("question", e.target.value)}
          placeholder="mis. Apakah produk SAHARA benar-benar 100% alami?"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="answer">Jawaban *</Label>
        <Textarea
          id="answer"
          value={values.answer}
          onChange={(e) => updateField("answer", e.target.value)}
          rows={4}
          required
        />
      </div>

      <div className="space-y-2 max-w-xs">
        <Label htmlFor="sort_order">Urutan Tampil</Label>
        <Input
          id="sort_order"
          type="number"
          value={values.sort_order}
          onChange={(e) => updateField("sort_order", Number(e.target.value))}
        />
        <p className="text-xs text-muted-foreground">Angka lebih kecil tampil lebih dulu.</p>
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {isSubmitting ? "Menyimpan..." : isEditMode ? "Simpan Perubahan" : "Tambah FAQ"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/faqs")}
          disabled={isSubmitting}
        >
          Batal
        </Button>
      </div>
    </form>
  );
}
