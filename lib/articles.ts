import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Article, ArticleData, Category, ArticleStatus } from "@/types/article";
import { calculateReadingTime } from "./utils";

const CONTENT_DIR = path.join(process.cwd(), "content");

function getContentDir(category: Category): string {
  return path.join(CONTENT_DIR, category);
}

function parseArticleFile(filePath: string): Article | null {
  try {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    return {
      title: data.title || "",
      slug: data.slug || path.basename(filePath, ".md"),
      category: data.category || "tech",
      summary: data.summary || "",
      coverImage: data.coverImage || "",
      author: data.author || "എഡിറ്റർ",
      publishedAt: data.publishedAt || new Date().toISOString(),
      status: data.status || "draft",
      tags: Array.isArray(data.tags) ? data.tags : [],
      featured: data.featured || false,
      content,
      readingTime: calculateReadingTime(content),
    };
  } catch {
    return null;
  }
}

interface GetAllArticlesOptions {
  category?: Category;
  status?: ArticleStatus;
  limit?: number;
  featured?: boolean;
}

export function getAllArticles(options: GetAllArticlesOptions = {}): Article[] {
  const { category, status, limit, featured } = options;
  let articles: Article[] = [];

  const categoriesToSearch = category
    ? [category]
    : (fs
        .readdirSync(CONTENT_DIR)
        .filter((f) =>
          fs.statSync(path.join(CONTENT_DIR, f)).isDirectory()
        ) as Category[]);

  for (const cat of categoriesToSearch) {
    const catDir = path.join(CONTENT_DIR, cat);
    if (!fs.existsSync(catDir)) continue;
    const files = fs
      .readdirSync(catDir)
      .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
    for (const file of files) {
      const article = parseArticleFile(path.join(catDir, file));
      if (article) articles.push(article);
    }
  }

  if (status) {
    articles = articles.filter((a) => a.status === status);
  }
  if (featured !== undefined) {
    articles = articles.filter((a) => a.featured === featured);
  }

  articles.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  if (limit) articles = articles.slice(0, limit);
  return articles;
}

export function getArticleBySlug(slug: string): Article | null {
  const categories = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => fs.statSync(path.join(CONTENT_DIR, f)).isDirectory());

  for (const cat of categories) {
    const filePath = path.join(CONTENT_DIR, cat, `${slug}.md`);
    if (fs.existsSync(filePath)) return parseArticleFile(filePath);
    const mdxPath = path.join(CONTENT_DIR, cat, `${slug}.mdx`);
    if (fs.existsSync(mdxPath)) return parseArticleFile(mdxPath);
  }
  return null;
}

export function getArticlesByCategory(
  category: Category,
  limit?: number
): Article[] {
  return getAllArticles({ category, status: "published", limit });
}

export function getFeaturedArticles(): Article[] {
  return getAllArticles({ status: "published", featured: true });
}

export function getRelatedArticles(
  slug: string,
  category: Category,
  limit: number = 3
): Article[] {
  return getAllArticles({ category, status: "published" })
    .filter((a) => a.slug !== slug)
    .slice(0, limit);
}

export function createArticle(data: ArticleData): void {
  const catDir = getContentDir(data.category);
  if (!fs.existsSync(catDir)) fs.mkdirSync(catDir, { recursive: true });
  const { content, ...frontmatter } = data;
  const fileContent = matter.stringify(content || "", frontmatter);
  fs.writeFileSync(path.join(catDir, `${data.slug}.md`), fileContent, "utf8");
}

export function updateArticle(
  slug: string,
  data: Partial<ArticleData>
): boolean {
  const existing = getArticleBySlug(slug);
  if (!existing) return false;
  const catDir = getContentDir(existing.category);
  const filePath = path.join(catDir, `${slug}.md`);
  const { content, ...frontmatter } = { ...existing, ...data };
  const fileContent = matter.stringify(content || "", frontmatter);
  fs.writeFileSync(filePath, fileContent, "utf8");

  // If category changed, move file
  if (data.category && data.category !== existing.category) {
    const newCatDir = getContentDir(data.category);
    if (!fs.existsSync(newCatDir)) fs.mkdirSync(newCatDir, { recursive: true });
    const newFilePath = path.join(newCatDir, `${slug}.md`);
    fs.renameSync(filePath, newFilePath);
  }
  return true;
}

export function deleteArticle(slug: string): boolean {
  const article = getArticleBySlug(slug);
  if (!article) return false;
  const filePath = path.join(getContentDir(article.category), `${slug}.md`);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    return true;
  }
  return false;
}

export function getArticlesThisWeek(): number {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  return getAllArticles().filter(
    (a) => new Date(a.publishedAt) >= oneWeekAgo
  ).length;
}
