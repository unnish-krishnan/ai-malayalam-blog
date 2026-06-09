import { notFound } from "next/navigation";
import { getAllArticles, getArticleBySlug, getRelatedArticles } from "@/lib/articles";
import { CATEGORY_SLUGS } from "@/lib/categories";
import { Category } from "@/types/article";
import ArticleHeader from "@/components/article/ArticleHeader";
import ArticleBody from "@/components/article/ArticleBody";
import RelatedArticles from "@/components/article/RelatedArticles";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const revalidate = 300;

interface Props {
  params: { category: string; slug: string };
}

export async function generateStaticParams() {
  const articles = getAllArticles({ status: "published" });
  return articles.map((a) => ({ category: a.category, slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      images: [{ url: article.coverImage }],
    },
  };
}

export default function ArticlePage({ params }: Props) {
  if (!CATEGORY_SLUGS.includes(params.category as Category)) notFound();

  const article = getArticleBySlug(params.slug);
  if (!article || article.status !== "published") notFound();

  const related = getRelatedArticles(article.slug, article.category, 3);

  // Prev/Next
  const allInCat = getAllArticles({ category: article.category, status: "published" });
  const currentIdx = allInCat.findIndex((a) => a.slug === article.slug);
  const prev = currentIdx < allInCat.length - 1 ? allInCat[currentIdx + 1] : null;
  const next = currentIdx > 0 ? allInCat[currentIdx - 1] : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <ArticleHeader article={article} />
      <ArticleBody content={article.content} />

      {/* Prev / Next */}
      {(prev || next) && (
        <div className="flex justify-between gap-4 mt-12 pt-8 border-t border-gray-border">
          {prev ? (
            <Link href={`/${prev.category}/${prev.slug}`} className="flex items-center gap-2 group max-w-xs">
              <ChevronLeft size={20} className="text-primary flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
              <div>
                <p className="text-xs font-ui text-text-secondary mb-0.5">മുൻ ലേഖനം</p>
                <p className="text-sm font-malayalam text-text-primary font-medium line-clamp-2 group-hover:text-primary transition-colors">{prev.title}</p>
              </div>
            </Link>
          ) : <div />}
          {next && (
            <Link href={`/${next.category}/${next.slug}`} className="flex items-center gap-2 group max-w-xs text-right ml-auto">
              <div>
                <p className="text-xs font-ui text-text-secondary mb-0.5">അടുത്ത ലേഖനം</p>
                <p className="text-sm font-malayalam text-text-primary font-medium line-clamp-2 group-hover:text-primary transition-colors">{next.title}</p>
              </div>
              <ChevronRight size={20} className="text-primary flex-shrink-0 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      )}

      <RelatedArticles articles={related} />
    </div>
  );
}
