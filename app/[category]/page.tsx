import { notFound } from "next/navigation";
import { getArticlesByCategory } from "@/lib/articles";
import { CATEGORY_SLUGS, getCategoryMeta } from "@/lib/categories";
import { Category } from "@/types/article";
import ArticleCard from "@/components/article/ArticleCard";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Pagination from "@/components/ui/Pagination";
import type { Metadata } from "next";

export const revalidate = 300;

const ARTICLES_PER_PAGE = 10;

interface Props {
  params: { category: string };
  searchParams: { page?: string };
}

export async function generateStaticParams() {
  return CATEGORY_SLUGS.map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!CATEGORY_SLUGS.includes(params.category as Category)) return {};
  const meta = getCategoryMeta(params.category as Category);
  return { title: meta.label, description: meta.description };
}

export default function CategoryPage({ params, searchParams }: Props) {
  if (!CATEGORY_SLUGS.includes(params.category as Category)) notFound();

  const category = params.category as Category;
  const meta = getCategoryMeta(category);
  const currentPage = parseInt(searchParams.page || "1");

  const allArticles = getArticlesByCategory(category);
  const totalPages = Math.ceil(allArticles.length / ARTICLES_PER_PAGE);
  const articles = allArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Breadcrumb items={[{ label: meta.label }]} />
      </div>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-10 rounded-full" style={{ backgroundColor: meta.color }} />
        <div>
          <h1 className="text-ml-3xl font-bold font-malayalam text-text-primary">{meta.label}</h1>
          <p className="text-sm font-malayalam text-text-secondary mt-0.5">{meta.description}</p>
        </div>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-ml-xl font-malayalam text-gray-mid">ഇനിയും ലേഖനങ്ങൾ ഇല്ല.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath={`/${category}`}
          />
        </>
      )}
    </div>
  );
}
