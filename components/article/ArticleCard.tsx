import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { Article } from "@/types/article";
import { formatDate, truncate } from "@/lib/utils";

interface ArticleCardProps {
  article: Article;
  priority?: boolean;
}

export default function ArticleCard({ article, priority = false }: ArticleCardProps) {
  return (
    <Link
      href={`/${article.category}/${article.slug}`}
      className="group bg-white rounded-xl border border-gray-border overflow-hidden hover:shadow-lg hover:border-accent transition-all duration-200 flex flex-col"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-gray-light">
        <Image
          src={article.coverImage || "https://picsum.photos/800/450?random=99"}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
        />
      </div>
      <div className="p-4 flex flex-col flex-1 gap-2">
        <Badge category={article.category} size="sm" />
        <h3 className="text-ml-base font-bold font-malayalam text-text-primary line-clamp-2 group-hover:text-primary transition-colors leading-snug">
          {article.title}
        </h3>
        <p className="text-sm font-malayalam text-text-secondary line-clamp-2 flex-1">
          {truncate(article.summary, 120)}
        </p>
        <div className="flex items-center gap-1.5 text-xs text-gray-mid font-ui mt-1">
          <Calendar size={12} />
          <span>{formatDate(article.publishedAt)}</span>
        </div>
      </div>
    </Link>
  );
}
