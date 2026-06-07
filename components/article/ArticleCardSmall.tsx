import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { Article } from "@/types/article";
import { formatDate } from "@/lib/utils";

export default function ArticleCardSmall({ article }: { article: Article }) {
  return (
    <Link
      href={`/${article.category}/${article.slug}`}
      className="group flex gap-3 p-3 rounded-xl hover:bg-light-blue transition-colors"
    >
      <div className="relative w-20 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-light">
        <Image
          src={article.coverImage || "https://picsum.photos/800/450?random=99"}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-200"
          sizes="80px"
        />
      </div>
      <div className="flex flex-col gap-1 min-w-0">
        <Badge category={article.category} size="sm" />
        <h4 className="text-sm font-bold font-malayalam text-text-primary line-clamp-2 group-hover:text-primary transition-colors">
          {article.title}
        </h4>
        <span className="text-xs text-gray-mid font-ui">{formatDate(article.publishedAt)}</span>
      </div>
    </Link>
  );
}
