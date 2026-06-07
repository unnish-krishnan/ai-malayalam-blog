import { getAllArticles, getArticlesThisWeek } from "@/lib/articles";
import StatsCards from "@/components/admin/StatsCards";
import ArticleTable from "@/components/admin/ArticleTable";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

export default function AdminDashboard() {
  const all = getAllArticles();
  const published = all.filter((a) => a.status === "published");
  const drafts = all.filter((a) => a.status === "draft");
  const thisWeek = getArticlesThisWeek();
  const recent = all.slice(0, 10);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-ui text-text-primary">Dashboard</h1>
          <p className="text-text-secondary font-ui text-sm mt-0.5">Manage your AI Malayalam blog</p>
        </div>
        <Link
          href="/admin/articles/new"
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-ui font-semibold hover:bg-primary-dark transition-colors"
        >
          <PlusCircle size={18} /> New Article
        </Link>
      </div>

      <StatsCards
        total={all.length}
        published={published.length}
        drafts={drafts.length}
        thisWeek={thisWeek}
      />

      <div>
        <h2 className="text-lg font-bold font-ui text-text-primary mb-4">Recent Articles</h2>
        <ArticleTable articles={recent} />
      </div>
    </div>
  );
}
