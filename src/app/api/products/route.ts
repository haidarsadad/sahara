import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { ProductFormValues } from "@/lib/types";

export async function GET() {
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json({ data: null, error: "Supabase belum dikonfigurasi." }, { status: 500 });
  }

  const { data, error } = await supabase
    .from("products")
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

  let body: Partial<ProductFormValues>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ data: null, error: "Body request tidak valid." }, { status: 400 });
  }

  const name = body.name?.trim();
  if (!name) {
    return NextResponse.json({ data: null, error: "Nama produk wajib diisi." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("products")
    .insert({
      name,
      description: body.description?.trim() || null,
      price: Number.isFinite(body.price) ? Number(body.price) : 0,
      image_url: body.image_url?.trim() || null,
      category: body.category?.trim() || "Umum",
      featured: Boolean(body.featured),
      ingredients: body.ingredients ?? [],
      benefits: body.benefits ?? [],
      composition: body.composition?.trim() || null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ data: null, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data, error: null }, { status: 201 });
}
