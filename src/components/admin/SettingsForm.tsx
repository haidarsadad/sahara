"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ImageUploadField } from "./ImageUploadField";
import type { SiteSettingsFormValues, SiteSettingsRow } from "@/lib/types";

interface SettingsFormProps {
  initialData: SiteSettingsRow | null;
}

const emptyValues: SiteSettingsFormValues = {
  hero_title: "",
  hero_title_accent: "",
  hero_subtitle: "",
  hero_image_url: "",
  about_intro: "",
  about_heading: "",
  about_body: "",
  mission_heading: "",
  mission_text: "",
  stat1_value: "",
  stat1_title: "",
  stat1_description: "",
  stat2_value: "",
  stat2_title: "",
  stat2_description: "",
  stat3_value: "",
  stat3_title: "",
  stat3_description: "",
  cta_heading: "",
  cta_body: "",
  contact_address: "",
  contact_phone: "",
  contact_email: "",
  contact_hours: "",
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-semibold text-foreground pt-2">{children}</h2>;
}

export function SettingsForm({ initialData }: SettingsFormProps) {
  const router = useRouter();

  const [values, setValues] = useState<SiteSettingsFormValues>(
    initialData
      ? {
          hero_title: initialData.hero_title ?? "",
          hero_title_accent: initialData.hero_title_accent ?? "",
          hero_subtitle: initialData.hero_subtitle ?? "",
          hero_image_url: initialData.hero_image_url ?? "",
          about_intro: initialData.about_intro ?? "",
          about_heading: initialData.about_heading ?? "",
          about_body: initialData.about_body ?? "",
          mission_heading: initialData.mission_heading ?? "",
          mission_text: initialData.mission_text ?? "",
          stat1_value: initialData.stat1_value ?? "",
          stat1_title: initialData.stat1_title ?? "",
          stat1_description: initialData.stat1_description ?? "",
          stat2_value: initialData.stat2_value ?? "",
          stat2_title: initialData.stat2_title ?? "",
          stat2_description: initialData.stat2_description ?? "",
          stat3_value: initialData.stat3_value ?? "",
          stat3_title: initialData.stat3_title ?? "",
          stat3_description: initialData.stat3_description ?? "",
          cta_heading: initialData.cta_heading ?? "",
          cta_body: initialData.cta_body ?? "",
          contact_address: initialData.contact_address ?? "",
          contact_phone: initialData.contact_phone ?? "",
          contact_email: initialData.contact_email ?? "",
          contact_hours: initialData.contact_hours ?? "",
        }
      : emptyValues,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField<K extends keyof SiteSettingsFormValues>(
    field: K,
    value: SiteSettingsFormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error ?? "Gagal menyimpan pengaturan.");
      }

      toast.success("Pengaturan berhasil disimpan.");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal menyimpan pengaturan.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <SectionHeading>Hero (Beranda)</SectionHeading>
      <Separator />
      <div className="grid md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="hero_title">Judul Baris 1</Label>
          <Input
            id="hero_title"
            value={values.hero_title}
            onChange={(e) => updateField("hero_title", e.target.value)}
            placeholder="Temukan Kebaikan"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="hero_title_accent">Judul Baris 2 (warna aksen)</Label>
          <Input
            id="hero_title_accent"
            value={values.hero_title_accent}
            onChange={(e) => updateField("hero_title_accent", e.target.value)}
            placeholder="Alami Murni"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="hero_subtitle">Subjudul</Label>
        <Textarea
          id="hero_subtitle"
          value={values.hero_subtitle}
          onChange={(e) => updateField("hero_subtitle", e.target.value)}
          rows={2}
        />
      </div>
      <ImageUploadField
        label="Gambar Hero"
        value={values.hero_image_url}
        onChange={(url) => updateField("hero_image_url", url)}
        folder="settings"
      />
      <p className="text-xs text-muted-foreground -mt-3">
        Kosongkan untuk pakai gambar default bawaan (/images/hero.png).
      </p>

      <SectionHeading>Tentang Kami</SectionHeading>
      <Separator />
      <div className="space-y-2">
        <Label htmlFor="about_intro">Kalimat pembuka section</Label>
        <Textarea
          id="about_intro"
          value={values.about_intro}
          onChange={(e) => updateField("about_intro", e.target.value)}
          rows={2}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="about_heading">Judul Cerita</Label>
        <Input
          id="about_heading"
          value={values.about_heading}
          onChange={(e) => updateField("about_heading", e.target.value)}
          placeholder="Dari Hati, Untuk Anda"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="about_body">Isi Cerita (per paragraf)</Label>
        <Textarea
          id="about_body"
          value={values.about_body}
          onChange={(e) => updateField("about_body", e.target.value)}
          rows={6}
        />
        <p className="text-xs text-muted-foreground">
          Pisahkan tiap paragraf dengan baris kosong (Enter dua kali).
        </p>
      </div>

      <SectionHeading>Misi</SectionHeading>
      <Separator />
      <div className="space-y-2">
        <Label htmlFor="mission_heading">Judul Misi</Label>
        <Input
          id="mission_heading"
          value={values.mission_heading}
          onChange={(e) => updateField("mission_heading", e.target.value)}
          placeholder="Misi Kami"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="mission_text">Teks Misi</Label>
        <Textarea
          id="mission_text"
          value={values.mission_text}
          onChange={(e) => updateField("mission_text", e.target.value)}
          rows={3}
        />
      </div>

      <SectionHeading>Statistik (3 kartu)</SectionHeading>
      <Separator />
      <div className="grid md:grid-cols-3 gap-5">
        {(["stat1", "stat2", "stat3"] as const).map((key, i) => (
          <div key={key} className="space-y-3 bg-muted/40 rounded-xl p-4">
            <p className="text-xs font-medium text-muted-foreground">Statistik {i + 1}</p>
            <div className="space-y-2">
              <Label htmlFor={`${key}_value`}>Angka</Label>
              <Input
                id={`${key}_value`}
                value={values[`${key}_value`]}
                onChange={(e) => updateField(`${key}_value`, e.target.value)}
                placeholder="100%"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${key}_title`}>Label</Label>
              <Input
                id={`${key}_title`}
                value={values[`${key}_title`]}
                onChange={(e) => updateField(`${key}_title`, e.target.value)}
                placeholder="Alami"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${key}_description`}>Deskripsi</Label>
              <Textarea
                id={`${key}_description`}
                value={values[`${key}_description`]}
                onChange={(e) => updateField(`${key}_description`, e.target.value)}
                rows={2}
              />
            </div>
          </div>
        ))}
      </div>

      <SectionHeading>Call to Action (penutup homepage)</SectionHeading>
      <Separator />
      <div className="space-y-2">
        <Label htmlFor="cta_heading">Judul CTA</Label>
        <Input
          id="cta_heading"
          value={values.cta_heading}
          onChange={(e) => updateField("cta_heading", e.target.value)}
          placeholder="Siap Merasakan Hidup Alami?"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cta_body">Teks CTA</Label>
        <Textarea
          id="cta_body"
          value={values.cta_body}
          onChange={(e) => updateField("cta_body", e.target.value)}
          rows={2}
        />
      </div>

      <SectionHeading>Info Kontak (halaman Layanan Informasi)</SectionHeading>
      <Separator />
      <div className="grid md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="contact_address">Alamat</Label>
          <Textarea
            id="contact_address"
            value={values.contact_address}
            onChange={(e) => updateField("contact_address", e.target.value)}
            rows={2}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact_hours">Jam Operasional</Label>
          <Textarea
            id="contact_hours"
            value={values.contact_hours}
            onChange={(e) => updateField("contact_hours", e.target.value)}
            rows={2}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact_phone">Telepon</Label>
          <Textarea
            id="contact_phone"
            value={values.contact_phone}
            onChange={(e) => updateField("contact_phone", e.target.value)}
            rows={2}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact_email">Email</Label>
          <Textarea
            id="contact_email"
            value={values.contact_email}
            onChange={(e) => updateField("contact_email", e.target.value)}
            rows={2}
          />
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Alamat/telepon/email boleh lebih dari satu baris (Enter untuk baris baru).
      </p>

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {isSubmitting ? "Menyimpan..." : "Simpan Pengaturan"}
        </Button>
      </div>
    </form>
  );
}
