import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { FaqFormValues } from "@/lib/types";

interface RouteParams {
  params: Promise<{ id: string }>;
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

  let body: Partial<FaqFormValues>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ data: null, error: "Body request tidak valid." }, { status: 400 });
  }

  const question = body.question?.trim();
  const answer = body.answer?.trim();
  if (!question || !answer) {
    return NextResponse.json(
      { data: null, error: "Pertanyaan dan jawaban wajib diisi." },
      { status: 400 },
    );
  }

  const { data, error } = await supabase
    .from("faqs")
    .update({
      question,
      answer,
      sort_order: Number.isFinite(body.sort_order) ? Number(body.sort_order) : 0,
    })
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    return NextResponse.json({ data: null, error: error.message }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ data: null, error: "FAQ tidak ditemukan." }, { status: 404 });
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

  const { error } = await supabase.from("faqs").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ data: null, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data: { id }, error: null });
}
