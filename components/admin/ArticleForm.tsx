"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Send } from "lucide-react";
import { Article, Category } from "@/types/article";
import { CATEGORIES } from "@/lib/categories";

interface ArticleFormProps {
  article?: Partial<Article>;
  isEdit?: boolean;
}

export default function ArticleForm({ article, isEdit = false }: ArticleFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const [form, setForm] = useState({
    title: article?.title || "",
    slug: article?.slug || "",
    category: article?.category || ("ai-news" as Category),
    summary: article?.summary || "",
    coverImage: article?.coverImage || "",
    author: article?.author || "എഡിറ്റർ",
    publishedAt: article?.publishedAt
      ? new Date(article.publishedAt).toISOString().slice(0, 16)
      : new Date().toISOString().slice(0, 16),
    status: article?.status || "draft",
    tags: article?.tags?.join(", ") || "",
    featured: article?.featured || false,
    content: article?.content || "",
  });

  const slugify = (text: string) =>
    text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setForm((f) => ({ ...f, title, ...(!isEdit && { slug: slugify(title) }) }));
  };

  const handleSubmit = async (status: "draft" | "published") => {
    if (!form.title || !form.slug || !form.category) {
      alert("Title, slug, and category are required.");
      return;
    }
    setLoading(true);
    const payload = {
      ...form,
      status,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      publishedAt: new Date(form.publishedAt).toISOString(),
    };

    const url = isEdit ? `/api/articles/${article?.slug}` : "/api/articles";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/admin/articles");
      router.refresh();
    } else {
      const err = await res.json();
      alert(err.error || "Failed to save article");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main */}
      <div className="lg:col-span-2 space-y-5">
        <div className="bg-white rounded-2xl border border-gray-border p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold font-ui text-text-primary mb-1.5">Title (Malayalam)</label>
            <input
              type="text"
              value={form.title}
              onChange={handleTitleChange}
              placeholder="ലേഖന ശീർഷകം"
              className="w-full px-4 py-3 border border-gray-border rounded-xl text-ml-base font-malayalam focus:outline-none focus:border-primary focus:ring-2 focus:ring-light-blue"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold font-ui text-text-primary mb-1.5">Slug</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              placeholder="article-slug"
              className="w-full px-4 py-3 border border-gray-border rounded-xl text-sm font-ui font-mono focus:outline-none focus:border-primary focus:ring-2 focus:ring-light-blue"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold font-ui text-text-primary mb-1.5">Summary (Malayalam, 5-10 lines)</label>
            <textarea
              value={form.summary}
              onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
              placeholder="ലേഖനത്തിന്റെ സംഗ്രഹം മലയാളത്തിൽ..."
              rows={6}
              className="w-full px-4 py-3 border border-gray-border rounded-xl text-ml-base font-malayalam focus:outline-none focus:border-primary focus:ring-2 focus:ring-light-blue resize-y"
            />
          </div>

          {/* Body Editor */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold font-ui text-text-primary">Article Body (MDX)</label>
              <button
                type="button"
                onClick={() => setPreviewMode(!previewMode)}
                className="text-xs font-ui text-primary hover:underline"
              >
                {previewMode ? "← Editor" : "Preview →"}
              </button>
            </div>
            {previewMode ? (
              <div
                className="min-h-48 p-4 bg-gray-light rounded-xl border border-gray-border text-ml-base font-malayalam whitespace-pre-wrap text-text-primary"
                dangerouslySetInnerHTML={{ __html: form.content.replace(/\n/g, "<br/>") }}
              />
            ) : (
              <textarea
                value={form.content}
                onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                placeholder="Full article body in Malayalam (Markdown/MDX)..."
                rows={14}
                className="w-full px-4 py-3 border border-gray-border rounded-xl text-sm font-mono focus:outline-none focus:border-primary focus:ring-2 focus:ring-light-blue resize-y"
              />
            )}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-5">
        {/* Actions */}
        <div className="bg-white rounded-2xl border border-gray-border p-5 space-y-3">
          <h3 className="text-sm font-bold font-ui text-text-primary">Actions</h3>
          <button
            onClick={() => handleSubmit("draft")}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-primary text-primary rounded-xl text-sm font-ui font-semibold hover:bg-light-blue transition-colors disabled:opacity-50"
          >
            <Save size={16} /> Save as Draft
          </button>
          <button
            onClick={() => handleSubmit("published")}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-ui font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50"
          >
            <Send size={16} /> {loading ? "Saving..." : "Publish"}
          </button>
        </div>

        {/* Meta */}
        <div className="bg-white rounded-2xl border border-gray-border p-5 space-y-4">
          <h3 className="text-sm font-bold font-ui text-text-primary">Article Settings</h3>

          <div>
            <label className="block text-xs font-semibold font-ui text-text-secondary mb-1">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as Category }))}
              className="w-full px-3 py-2 border border-gray-border rounded-xl text-sm font-ui focus:outline-none focus:border-primary"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.slug} value={cat.slug}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold font-ui text-text-secondary mb-1">Cover Image URL</label>
            <input
              type="text"
              value={form.coverImage}
              onChange={(e) => setForm((f) => ({ ...f, coverImage: e.target.value }))}
              placeholder="https://..."
              className="w-full px-3 py-2 border border-gray-border rounded-xl text-sm font-ui focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold font-ui text-text-secondary mb-1">Author</label>
            <input
              type="text"
              value={form.author}
              onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-border rounded-xl text-sm font-malayalam focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold font-ui text-text-secondary mb-1">Publish Date</label>
            <input
              type="datetime-local"
              value={form.publishedAt}
              onChange={(e) => setForm((f) => ({ ...f, publishedAt: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-border rounded-xl text-sm font-ui focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold font-ui text-text-secondary mb-1">Tags (comma separated)</label>
            <input
              type="text"
              value={form.tags}
              onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
              placeholder="AI, Technology, Malayalam"
              className="w-full px-3 py-2 border border-gray-border rounded-xl text-sm font-ui focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="featured"
              checked={form.featured}
              onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
              className="w-4 h-4 accent-primary"
            />
            <label htmlFor="featured" className="text-sm font-ui text-text-primary cursor-pointer">Featured Article</label>
          </div>
        </div>
      </div>
    </div>
  );
}
