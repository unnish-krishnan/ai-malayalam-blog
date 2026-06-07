import Image from "next/image";
import { Calendar, User, Clock, Tag } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { Article } from "@/types/article";
import { formatDate } from "@/lib/utils";
import { getCategoryMeta } from "@/lib/categories";

export default function ArticleHeader({ article }: { article: Article }) {
  const catMeta = getCategoryMeta(article.category);
  return (
    <div className="mb-8">
      <div className="mb-4">
        <Breadcrumb
          items={[
            { label: catMeta.label, href: `/${article.category}` },
            { label: article.title },
          ]}
        />
      </div>

      {/* Cover Image */}
      <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden bg-gray-light mb-6">
        <Image
          src={article.coverImage || "https://picsum.photos/800/450?random=99"}
          alt={article.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1280px) 100vw, 1280px"
        />
      </div>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <Badge category={article.category} />
        <div className="flex items-center gap-1.5 text-sm text-text-secondary font-ui">
          <Calendar size={14} />
          <span>{formatDate(article.publishedAt)}</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-text-secondary font-ui">
          <User size={14} />
          <span>{article.author}</span>
        </div>
        {article.readingTime && (
          <div className="flex items-center gap-1.5 text-sm text-text-secondary font-ui">
            <Clock size={14} />
            <span>{article.readingTime} min read</span>
          </div>
        )}
      </div>

      {/* Title */}
      <h1 className="text-ml-3xl font-bold font-malayalam text-text-primary leading-tight mb-5">
        {article.title}
      </h1>

      {/* Summary Block */}
      <div className="border-l-4 border-primary bg-light-blue rounded-r-xl p-5 mb-6">
        <p className="text-ml-base font-malayalam text-text-primary leading-relaxed">
          {article.summary}
        </p>
      </div>

      {/* Tags */}
      {article.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <Tag size={14} className="text-gray-mid" />
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-light text-text-secondary text-xs rounded-full font-ui hover:bg-light-blue hover:text-primary cursor-pointer transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
