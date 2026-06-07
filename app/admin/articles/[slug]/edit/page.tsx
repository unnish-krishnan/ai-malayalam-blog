import { getArticleBySlug } from "@/lib/articles";
import ArticleForm from "@/components/admin/ArticleForm";
import { notFound } from "next/navigation";

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props) {
  return { title: `Edit: ${params.slug} | Admin` };
}

export default function EditArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-ui text-text-primary">Edit Article</h1>
        <p className="text-text-secondary font-ui text-sm mt-0.5 font-mono">{params.slug}</p>
      </div>
      <ArticleForm article={article} isEdit />
    </div>
  );
}
