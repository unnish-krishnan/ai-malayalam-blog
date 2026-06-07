import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ArticleCard from "@/components/article/ArticleCard";
import { Article, Category } from "@/types/article";
import { getCategoryMeta } from "@/lib/categories";

interface CategorySectionProps {
  category: Category;
  articles: Article[];
}

export default function CategorySection({ category, articles }: CategorySectionProps) {
  const meta = getCategoryMeta(category);
  if (articles.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-5 pb-3 border-b-2" style={{ borderColor: meta.color }}>
        <h2 className="text-ml-xl font-bold font-malayalam text-text-primary">
          {meta.label}
        </h2>
        <Link
          href={`/${category}`}
          className="flex items-center gap-1.5 text-sm font-ui font-medium hover:gap-2.5 transition-all"
          style={{ color: meta.color }}
        >
          എല്ലാം കാണാൻ <ArrowRight size={15} />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {articles.slice(0, 4).map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
