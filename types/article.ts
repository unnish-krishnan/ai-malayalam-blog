export type Category =
  | "ai-news"
  | "ai-tutorials"
  | "tech"
  | "smartphones"
  | "how-to";

export type ArticleStatus = "draft" | "published";

export interface ArticleFrontmatter {
  title: string;
  slug: string;
  category: Category;
  summary: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  status: ArticleStatus;
  tags: string[];
  featured: boolean;
}

export interface Article extends ArticleFrontmatter {
  content: string;
  readingTime?: number;
}

export interface ArticleData {
  title: string;
  slug: string;
  category: Category;
  summary: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  status: ArticleStatus;
  tags: string[];
  featured: boolean;
  content: string;
}

export interface CategoryMeta {
  slug: Category;
  label: string;
  color: string;
  bgColor: string;
  textColor: string;
  description: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalArticles: number;
  articlesPerPage: number;
}
