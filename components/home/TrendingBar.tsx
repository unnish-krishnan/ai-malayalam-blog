import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { Article } from "@/types/article";

export default function TrendingBar({ articles }: { articles: Article[] }) {
  return (
    <div className="bg-light-blue border border-accent/20 rounded-xl p-4 mb-10 flex items-center gap-4 overflow-hidden">
      <div className="flex items-center gap-2 flex-shrink-0 bg-primary text-white px-3 py-1.5 rounded-lg">
        <TrendingUp size={16} />
        <span className="text-sm font-ui font-semibold">Trending</span>
      </div>
      <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide flex-1">
        {articles.map((article, i) => (
          <Link
            key={article.slug}
            href={`/${article.category}/${article.slug}`}
            className="flex-shrink-0 flex items-center gap-2 hover:text-primary transition-colors"
          >
            <span className="text-sm font-bold text-primary font-ui">{i + 1}.</span>
            <span className="text-sm font-malayalam text-text-primary whitespace-nowrap hover:text-primary transition-colors line-clamp-1 max-w-xs">
              {article.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
