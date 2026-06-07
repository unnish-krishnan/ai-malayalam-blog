import ArticleCard from "@/components/article/ArticleCard";
import { Article } from "@/types/article";

export default function LatestNewsGrid({ articles }: { articles: Article[] }) {
  return (
    <section className="mb-12">
      <h2 className="text-ml-2xl font-bold font-malayalam text-text-primary mb-6 pb-3 border-b-2 border-primary">
        ഏറ്റവും പുതിയ വാർത്തകൾ
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {articles.map((article, i) => (
          <ArticleCard key={article.slug} article={article} priority={i < 2} />
        ))}
      </div>
    </section>
  );
}
