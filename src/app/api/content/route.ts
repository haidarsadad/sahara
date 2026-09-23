import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { ContentFormValues } from "@/lib/types";

/** GET /api/content - daftar semua konten. Publik (dipakai homepage juga). */
export async function GET() {
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json(
      { data: null, error: "Supabase belum dikonfigurasi." },
      { status: 500 },
    );
  }

  const { data, error } = await supabase
    .from("content")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ data: null, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data, error: null });
}

/** POST /api/content - buat konten baru. Wajib login (RLS juga menegakkan ini di level DB). */
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json(
      { data: null, error: "Supabase belum dikonfigurasi." },
      { status: 500 },
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ data: null, error: "Belum login." }, { status: 401 });
  }

  let body: Partial<ContentFormValues>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ data: null, error: "Body request tidak valid." }, { status: 400 });
  }

  const title = body.title?.trim();
  if (!title) {
    return NextResponse.json(
      { data: null, error: "Judul (title) wajib diisi." },
      { status: 400 },
    );
  }

  const { data, error } = await supabase
    .from("content")
    .insert({
      title,
      description: body.description?.trim() || null,
      image_url: body.image_url?.trim() || null,
      cta_text: body.cta_text?.trim() || null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ data: null, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data, error: null }, { status: 201 });
}
