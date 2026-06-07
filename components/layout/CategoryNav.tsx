import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";

export default function CategoryNav() {
  return (
    <nav className="bg-primary-dark border-t border-blue-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide">
          <Link
            href="/"
            className="flex-shrink-0 px-4 py-2.5 text-sm font-semibold text-blue-100 hover:text-white hover:bg-primary transition-colors font-ui"
          >
            ഹോം
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="flex-shrink-0 px-4 py-2.5 text-sm font-semibold text-blue-100 hover:text-white hover:bg-primary transition-colors font-malayalam"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
