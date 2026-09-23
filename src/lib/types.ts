/** Satu baris di tabel `content` Supabase (section "Promo & Penawaran"). */
export interface ContentItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  cta_text: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContentFormValues {
  title: string;
  description: string;
  image_url: string;
  cta_text: string;
}

/** Satu baris di tabel `products`. */
export interface ProductRow {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category: string;
  featured: boolean;
  ingredients: string[];
  benefits: string[];
  composition: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProductFormValues {
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  featured: boolean;
  ingredients: string[];
  benefits: string[];
  composition: string;
}

/** Satu baris di tabel `news`. */
export interface NewsRow {
  id: string;
  title: string;
  published_date: string; // format "YYYY-MM-DD" (kolom `date` di Postgres)
  excerpt: string | null;
  content: string | null; // HTML
  image_url: string | null;
  category: string | null;
  author: string | null;
  created_at: string;
  updated_at: string;
}

export interface NewsFormValues {
  title: string;
  published_date: string;
  excerpt: string;
  content: string;
  image_url: string;
  category: string;
  author: string;
}

/** Satu langkah di dalam field jsonb `steps` pada tabel `guides`. */
export interface GuideStep {
  title: string;
  description: string;
  tips?: string[];
}

/** Satu baris di tabel `guides`. */
export interface GuideRow {
  id: string;
  title: string;
  category: string; // "Menanam" | "Merawat" | "Membuat Produk"
  difficulty: string; // "Pemula" | "Menengah" | "Lanjutan"
  duration: string | null;
  target_audience: string | null;
  description: string | null;
  image_url: string | null;
  materials: string[];
  tools: string[];
  steps: GuideStep[];
  warnings: string[];
  benefits: string[];
  created_at: string;
  updated_at: string;
}

export interface GuideFormValues {
  title: string;
  category: string;
  difficulty: string;
  duration: string;
  target_audience: string;
  description: string;
  image_url: string;
  materials: string[];
  tools: string[];
  steps: GuideStep[];
  warnings: string[];
  benefits: string[];
}

export const GUIDE_CATEGORIES = ["Menanam", "Merawat", "Membuat Produk"] as const;
export const GUIDE_DIFFICULTIES = ["Pemula", "Menengah", "Lanjutan"] as const;

/** Satu baris di tabel `faqs`. */
export interface FaqRow {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface FaqFormValues {
  question: string;
  answer: string;
  sort_order: number;
}

/**
 * Baris tunggal (id selalu 1) di tabel `site_settings` - teks Beranda
 * (hero/tentang/misi/CTA) dan info kontak di Layanan Informasi.
 */
export interface SiteSettingsRow {
  id: number;
  hero_title: string | null;
  hero_title_accent: string | null;
  hero_subtitle: string | null;
  hero_image_url: string | null;
  about_intro: string | null;
  about_heading: string | null;
  about_body: string | null;
  mission_heading: string | null;
  mission_text: string | null;
  stat1_value: string | null;
  stat1_title: string | null;
  stat1_description: string | null;
  stat2_value: string | null;
  stat2_title: string | null;
  stat2_description: string | null;
  stat3_value: string | null;
  stat3_title: string | null;
  stat3_description: string | null;
  cta_heading: string | null;
  cta_body: string | null;
  contact_address: string | null;
  contact_phone: string | null;
  contact_email: string | null;
  contact_hours: string | null;
  updated_at: string;
}

export interface SiteSettingsFormValues {
  hero_title: string;
  hero_title_accent: string;
  hero_subtitle: string;
  hero_image_url: string;
  about_intro: string;
  about_heading: string;
  about_body: string;
  mission_heading: string;
  mission_text: string;
  stat1_value: string;
  stat1_title: string;
  stat1_description: string;
  stat2_value: string;
  stat2_title: string;
  stat2_description: string;
  stat3_value: string;
  stat3_title: string;
  stat3_description: string;
  cta_heading: string;
  cta_body: string;
  contact_address: string;
  contact_phone: string;
  contact_email: string;
  contact_hours: string;
}

/**
 * Definisi skema Supabase supaya `.from("...")` type-safe.
 */
export interface Database {
  public: {
    Tables: {
      content: {
        Row: ContentItem;
        Insert: Partial<Omit<ContentItem, "id" | "created_at" | "updated_at">> &
          Pick<ContentItem, "title">;
        Update: Partial<Omit<ContentItem, "id" | "created_at" | "updated_at">>;
      };
      products: {
        Row: ProductRow;
        Insert: Partial<Omit<ProductRow, "id" | "created_at" | "updated_at">> &
          Pick<ProductRow, "name">;
        Update: Partial<Omit<ProductRow, "id" | "created_at" | "updated_at">>;
      };
      news: {
        Row: NewsRow;
        Insert: Partial<Omit<NewsRow, "id" | "created_at" | "updated_at">> &
          Pick<NewsRow, "title">;
        Update: Partial<Omit<NewsRow, "id" | "created_at" | "updated_at">>;
      };
      guides: {
        Row: GuideRow;
        Insert: Partial<Omit<GuideRow, "id" | "created_at" | "updated_at">> &
          Pick<GuideRow, "title">;
        Update: Partial<Omit<GuideRow, "id" | "created_at" | "updated_at">>;
      };
      faqs: {
        Row: FaqRow;
        Insert: Partial<Omit<FaqRow, "id" | "created_at" | "updated_at">> &
          Pick<FaqRow, "question" | "answer">;
        Update: Partial<Omit<FaqRow, "id" | "created_at" | "updated_at">>;
      };
      site_settings: {
        Row: SiteSettingsRow;
        Insert: Partial<SiteSettingsRow>;
        Update: Partial<Omit<SiteSettingsRow, "id">>;
      };
    };
  };
}
