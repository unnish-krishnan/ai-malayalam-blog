import ArticleCard from "./ArticleCard";
import { Article } from "@/types/article";

export default function RelatedArticles({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;
  return (
    <section className="mt-12 pt-10 border-t border-gray-border">
      <h2 className="text-ml-2xl font-bold font-malayalam text-text-primary mb-6">
        ബന്ധപ്പെട്ട ലേഖനങ്ങൾ
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
