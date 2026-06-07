"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PlusCircle, Filter } from "lucide-react";
import ArticleTable from "@/components/admin/ArticleTable";
import { Article } from "@/types/article";
import { CATEGORIES } from "@/lib/categories";

export default function ArticlesListPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (status) params.set("status", status);
    const res = await fetch(`/api/articles?${params.toString()}`);
    const data = await res.json();
    setArticles(data);
    setLoading(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchArticles(); }, [category, status]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-ui text-text-primary">Articles</h1>
        <Link
          href="/admin/articles/new"
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-ui font-semibold hover:bg-primary-dark transition-colors"
        >
          <PlusCircle size={18} /> New Article
        </Link>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-gray-border">
        <Filter size={16} className="text-gray-mid" />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-1.5 border border-gray-border rounded-lg text-sm font-ui focus:outline-none focus:border-primary"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c.slug} value={c.slug}>{c.label}</option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-3 py-1.5 border border-gray-border rounded-lg text-sm font-ui focus:outline-none focus:border-primary"
        >
          <option value="">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-10 font-ui text-text-secondary">Loading...</div>
      ) : (
        <ArticleTable articles={articles} />
      )}
    </div>
  );
}
