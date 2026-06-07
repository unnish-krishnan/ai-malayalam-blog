import ArticleForm from "@/components/admin/ArticleForm";

export const metadata = { title: "New Article | Admin" };

export default function NewArticlePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-ui text-text-primary">New Article</h1>
        <p className="text-text-secondary font-ui text-sm mt-0.5">Create a new Malayalam article</p>
      </div>
      <ArticleForm />
    </div>
  );
}
