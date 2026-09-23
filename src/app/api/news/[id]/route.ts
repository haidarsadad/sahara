import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { NewsFormValues } from "@/lib/types";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json({ data: null, error: "Supabase belum dikonfigurasi." }, { status: 500 });
  }

  const { data, error } = await supabase.from("news").select("*").eq("id", id).maybeSingle();

  if (error) {
    return NextResponse.json({ data: null, error: error.message }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ data: null, error: "Berita tidak ditemukan." }, { status: 404 });
  }
  return NextResponse.json({ data, error: null });
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
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
    .update({
      title,
      published_date: body.published_date || new Date().toISOString().slice(0, 10),
      excerpt: body.excerpt?.trim() || null,
      content: body.content?.trim() || null,
      image_url: body.image_url?.trim() || null,
      category: body.category?.trim() || null,
      author: body.author?.trim() || null,
    })
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    return NextResponse.json({ data: null, error: error.message }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ data: null, error: "Berita tidak ditemukan." }, { status: 404 });
  }
  return NextResponse.json({ data, error: null });
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
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

  const { error } = await supabase.from("news").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ data: null, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data: { id }, error: null });
}
