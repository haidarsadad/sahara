import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { NewsFormValues } from "@/lib/types";

export async function GET() {
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json({ data: null, error: "Supabase belum dikonfigurasi." }, { status: 500 });
  }

  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("published_date", { ascending: false });

  if (error) {
    return NextResponse.json({ data: null, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data, error: null });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json({ data: null, error: "Supabase belum dikonfigurasi." }, { status: 500 });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ data: null, error: "Belum login." }, { status: 401 });
  }

  let body: Partial<NewsFormValues>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ data: null, error: "Body request tidak valid." }, { status: 400 });
  }

  const title = body.title?.trim();
  if (!title) {
    return NextResponse.json({ data: null, error: "Judul berita wajib diisi." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("news")
    .insert({
      title,
      published_date: body.published_date || new Date().toISOString().slice(0, 10),
      excerpt: body.excerpt?.trim() || null,
      content: body.content?.trim() || null,
      image_url: body.image_url?.trim() || null,
      category: body.category?.trim() || null,
      author: body.author?.trim() || null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ data: null, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data, error: null }, { status: 201 });
}
