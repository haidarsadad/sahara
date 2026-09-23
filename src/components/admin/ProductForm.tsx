"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { TagListEditor } from "./TagListEditor";
import { ImageUploadField } from "./ImageUploadField";
import type { ProductFormValues, ProductRow } from "@/lib/types";

interface ProductFormProps {
  initialData?: ProductRow;
}

const emptyValues: ProductFormValues = {
  name: "",
  description: "",
  price: 0,
  image_url: "",
  category: "",
  featured: false,
  ingredients: [],
  benefits: [],
  composition: "",
};

export function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const isEditMode = Boolean(initialData);

  const [values, setValues] = useState<ProductFormValues>(
    initialData
      ? {
          name: initialData.name,
          description: initialData.description ?? "",
          price: initialData.price,
          image_url: initialData.image_url ?? "",
          category: initialData.category,
          featured: initialData.featured,
          ingredients: initialData.ingredients ?? [],
          benefits: initialData.benefits ?? [],
          composition: initialData.composition ?? "",
        }
      : emptyValues,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField<K extends keyof ProductFormValues>(field: K, value: ProductFormValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!values.name.trim()) {
      toast.error("Nama produk wajib diisi.");
      return;
    }

    setIsSubmitting(true);
    try {
      const url = isEditMode ? `/api/products/${initialData!.id}` : "/api/products";
      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error ?? "Gagal menyimpan produk.");
      }

      toast.success(isEditMode ? "Produk berhasil diperbarui." : "Produk berhasil ditambahkan.");
      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal menyimpan produk.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="name">Nama Produk *</Label>
          <Input
            id="name"
            value={values.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="mis. Sabuya (Sabun Lidah Buaya)"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Kategori</Label>
          <Input
            id="category"
            value={values.category}
            onChange={(e) => updateField("category", e.target.value)}
            placeholder="mis. Perawatan Kulit"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Deskripsi</Label>
        <Textarea
          id="description"
          value={values.description}
          onChange={(e) => updateField("description", e.target.value)}
          rows={3}
        />
      </div>

      <div className="space-y-2 max-w-xs">
        <Label htmlFor="price">Harga (Rp) *</Label>
        <Input
          id="price"
          type="number"
          min={0}
          value={values.price}
          onChange={(e) => updateField("price", Number(e.target.value))}
        />
      </div>

      <ImageUploadField
        label="Gambar Produk"
        value={values.image_url}
        onChange={(url) => updateField("image_url", url)}
        folder="products"
      />

      <div className="flex items-center gap-3 py-2">
        <Switch
          id="featured"
          checked={values.featured}
          onCheckedChange={(checked) => updateField("featured", checked)}
        />
        <Label htmlFor="featured" className="cursor-pointer">
          Tampilkan di section &quot;Produk Unggulan&quot; homepage
        </Label>
      </div>

      <div className="space-y-2">
        <Label htmlFor="composition">Detail Produk / Komposisi</Label>
        <Textarea
          id="composition"
          value={values.composition}
          onChange={(e) => updateField("composition", e.target.value)}
          rows={2}
        />
      </div>

      <TagListEditor
        label="Komposisi / Bahan (chip)"
        items={values.ingredients}
        onChange={(items) => updateField("ingredients", items)}
        placeholder="Ketik bahan lalu Enter"
      />

      <TagListEditor
        label="Manfaat Utama"
        items={values.benefits}
        onChange={(items) => updateField("benefits", items)}
        placeholder="Ketik manfaat lalu Enter"
      />

      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {isSubmitting ? "Menyimpan..." : isEditMode ? "Simpan Perubahan" : "Tambah Produk"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/products")}
          disabled={isSubmitting}
        >
          Batal
        </Button>
      </div>
    </form>
  );
}
