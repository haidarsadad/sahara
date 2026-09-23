"use client";

import { useRef, useState } from "react";
import { ImageIcon, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { Label } from "@/components/ui/label";
import { ImageWithFallback } from "@/components/ImageWithFallback";

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  /** Sub-folder di bucket "images", biar rapi per jenis konten (mis. "products"). */
  folder: string;
}

const MAX_SIZE_MB = 5;
const BUCKET = "images";

export function ImageUploadField({ label, value, onChange, folder }: ImageUploadFieldProps) {
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("File harus berupa gambar (JPG, PNG, WebP, atau GIF).");
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      toast.error(`Ukuran gambar maksimal ${MAX_SIZE_MB}MB.`);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    setIsUploading(true);
    try {
      const supabase = createClient();
      const dotIndex = file.name.lastIndexOf(".");
      const ext = dotIndex !== -1 ? file.name.slice(dotIndex + 1).toLowerCase() : "jpg";
      const path = `${folder}/${crypto.randomUUID()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, { cacheControl: "3600", upsert: false });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
      onChange(data.publicUrl);
      toast.success("Gambar berhasil diupload.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal upload gambar.");
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex items-start gap-4">
        <div className="w-28 h-28 rounded-lg overflow-hidden bg-muted border border-border flex-shrink-0 flex items-center justify-center">
          {value ? (
            <ImageWithFallback src={value} alt="Pratinjau gambar" className="w-full h-full object-cover" />
          ) : (
            <ImageIcon className="w-8 h-8 text-muted-foreground" />
          )}
        </div>
        <div className="flex-1 space-y-2 min-w-0">
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFileChange}
            disabled={isUploading}
            className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-primary-foreground file:text-sm file:font-medium hover:file:bg-primary/90 file:cursor-pointer cursor-pointer disabled:opacity-50"
          />
          {isUploading && (
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Loader2 className="w-3 h-3 animate-spin" />
              Mengupload...
            </p>
          )}
          {value && !isUploading && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-xs text-destructive hover:underline inline-flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              Hapus gambar
            </button>
          )}
          <p className="text-xs text-muted-foreground">JPG, PNG, WebP, atau GIF. Maksimal {MAX_SIZE_MB}MB.</p>
        </div>
      </div>
    </div>
  );
}
