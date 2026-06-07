import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { Article } from "@/types/article";
import { formatDate } from "@/lib/utils";

export default function HeroSection({ article }: { article: Article }) {
  return (
    <section className="mb-10">
      <Link
        href={`/${article.category}/${article.slug}`}
        className="group relative block w-full h-72 md:h-[480px] rounded-2xl overflow-hidden shadow-xl"
      >
        <Image
          src={article.coverImage || "https://picsum.photos/1200/600?random=0"}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          priority
          sizes="100vw"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <Badge category={article.category} />
          <h1 className="mt-3 text-white text-ml-2xl md:text-ml-3xl font-bold font-malayalam leading-tight line-clamp-3 group-hover:text-blue-200 transition-colors">
            {article.title}
          </h1>
          <p className="mt-2 text-blue-100 text-ml-base font-malayalam line-clamp-2 hidden md:block">
            {article.summary}
          </p>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2 text-blue-200 text-sm font-ui">
              <Calendar size={14} />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
            <span className="flex items-center gap-1 text-white text-sm font-ui bg-primary px-4 py-1.5 rounded-full group-hover:bg-accent transition-colors">
              വായിക്കുക <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
