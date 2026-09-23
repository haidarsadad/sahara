import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { GuideFormValues } from "@/lib/types";

export async function GET() {
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json({ data: null, error: "Supabase belum dikonfigurasi." }, { status: 500 });
  }

  const { data, error } = await supabase
    .from("guides")
    .select("*")
    .order("created_at", { ascending: false });

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

  let body: Partial<GuideFormValues>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ data: null, error: "Body request tidak valid." }, { status: 400 });
  }

  const title = body.title?.trim();
  if (!title) {
    return NextResponse.json({ data: null, error: "Judul panduan wajib diisi." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("guides")
    .insert({
      title,
      category: body.category || "Menanam",
      difficulty: body.difficulty || "Pemula",
      duration: body.duration?.trim() || null,
      target_audience: body.target_audience?.trim() || null,
      description: body.description?.trim() || null,
      image_url: body.image_url?.trim() || null,
      materials: body.materials ?? [],
      tools: body.tools ?? [],
      steps: body.steps ?? [],
      warnings: body.warnings ?? [],
      benefits: body.benefits ?? [],
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ data: null, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data, error: null }, { status: 201 });
}
