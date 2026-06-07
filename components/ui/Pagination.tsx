import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      {currentPage > 1 && (
        <Link
          href={`${basePath}?page=${currentPage - 1}`}
          className="flex items-center gap-1 px-3 py-2 border border-gray-border rounded-lg text-sm font-ui hover:bg-light-blue hover:border-primary transition-colors"
        >
          <ChevronLeft size={16} /> മുൻ
        </Link>
      )}
      {pages.map((p) => (
        <Link
          key={p}
          href={`${basePath}?page=${p}`}
          className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-ui font-medium transition-colors ${
            p === currentPage
              ? "bg-primary text-white"
              : "border border-gray-border hover:bg-light-blue hover:border-primary"
          }`}
        >
          {p}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="flex items-center gap-1 px-3 py-2 border border-gray-border rounded-lg text-sm font-ui hover:bg-light-blue hover:border-primary transition-colors"
        >
          അടുത്തത് <ChevronRight size={16} />
        </Link>
      )}
    </div>
  );
}
