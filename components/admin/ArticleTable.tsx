"use client";
import Link from "next/link";
import { Edit2, Trash2, Eye, EyeOff } from "lucide-react";
import { Article } from "@/types/article";
import { formatDate } from "@/lib/utils";
import { getCategoryMeta } from "@/lib/categories";
import { useRouter } from "next/navigation";

export default function ArticleTable({ articles }: { articles: Article[] }) {
  const router = useRouter();

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    const res = await fetch(`/api/articles/${slug}`, { method: "DELETE" });
    if (res.ok) router.refresh();
    else alert("Failed to delete article");
  };

  const handleToggleStatus = async (article: Article) => {
    const newStatus = article.status === "published" ? "draft" : "published";
    const res = await fetch(`/api/articles/${article.slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...article, status: newStatus }),
    });
    if (res.ok) router.refresh();
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-light border-b border-gray-border">
              <th className="text-left px-5 py-3 text-sm font-semibold text-text-secondary font-ui">Title</th>
              <th className="text-left px-5 py-3 text-sm font-semibold text-text-secondary font-ui hidden md:table-cell">Category</th>
              <th className="text-left px-5 py-3 text-sm font-semibold text-text-secondary font-ui">Status</th>
              <th className="text-left px-5 py-3 text-sm font-semibold text-text-secondary font-ui hidden lg:table-cell">Date</th>
              <th className="text-right px-5 py-3 text-sm font-semibold text-text-secondary font-ui">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-border">
            {articles.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-text-secondary font-ui">No articles found.</td>
              </tr>
            )}
            {articles.map((article) => {
              const cat = getCategoryMeta(article.category);
              return (
                <tr key={article.slug} className="hover:bg-gray-light/50 transition-colors">
                  <td className="px-5 py-4 max-w-xs">
                    <p className="text-sm font-medium font-malayalam text-text-primary line-clamp-1">{article.title}</p>
                    <p className="text-xs text-gray-mid font-ui mt-0.5">/{article.slug}</p>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="text-xs px-2.5 py-1 rounded-full font-ui font-medium" style={{ backgroundColor: cat.bgColor, color: cat.textColor }}>
                      {cat.label}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-ui font-medium ${
                      article.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {article.status === "published" ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className="text-sm text-text-secondary font-ui">{formatDate(article.publishedAt)}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleToggleStatus(article)}
                        className="p-1.5 text-gray-mid hover:text-primary hover:bg-light-blue rounded-lg transition-colors"
                        title={article.status === "published" ? "Unpublish" : "Publish"}
                      >
                        {article.status === "published" ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      <Link
                        href={`/admin/articles/${article.slug}/edit`}
                        className="p-1.5 text-gray-mid hover:text-primary hover:bg-light-blue rounded-lg transition-colors"
                      >
                        <Edit2 size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(article.slug)}
                        className="p-1.5 text-gray-mid hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
