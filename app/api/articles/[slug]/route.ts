import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getArticleBySlug, updateArticle, deleteArticle } from "@/lib/articles";

interface Params { params: { slug: string } }

export async function GET(_req: NextRequest, { params }: Params) {
  const article = getArticleBySlug(params.slug);
  if (!article) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(article);
}

export async function PUT(req: NextRequest, { params }: Params) {
  if (!(await isAuthenticated(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const data = await req.json();
    const success = updateArticle(params.slug, data);
    if (!success) return NextResponse.json({ error: "Article not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to update article" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  if (!(await isAuthenticated(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const success = deleteArticle(params.slug);
  if (!success) return NextResponse.json({ error: "Article not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
