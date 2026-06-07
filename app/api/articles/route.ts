import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getAllArticles, createArticle } from "@/lib/articles";
import { ArticleData, Category } from "@/types/article";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") as Category | null;
  const status = searchParams.get("status") as "draft" | "published" | null;
  const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : undefined;

  const articles = getAllArticles({
    ...(category && { category }),
    ...(status && { status }),
    ...(limit && { limit }),
  });
  return NextResponse.json(articles);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data: ArticleData = await req.json();
    if (!data.title || !data.slug || !data.category) {
      return NextResponse.json({ error: "title, slug, and category are required" }, { status: 400 });
    }
    createArticle(data);
    return NextResponse.json({ success: true, slug: data.slug }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create article" }, { status: 500 });
  }
}
