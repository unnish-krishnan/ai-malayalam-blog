import { getAllArticles, getArticlesByCategory, getFeaturedArticles } from "@/lib/articles";
import HeroSection from "@/components/home/HeroSection";
import LatestNewsGrid from "@/components/home/LatestNewsGrid";
import CategorySection from "@/components/home/CategorySection";
import TrendingBar from "@/components/home/TrendingBar";
import { CATEGORY_SLUGS } from "@/lib/categories";

export const revalidate = 3600;

export default function HomePage() {
  const allPublished = getAllArticles({ status: "published" });
  const featured = getFeaturedArticles();
  const hero = featured[0] || allPublished[0];
  const latest = allPublished.slice(0, 8);
  const trending = allPublished.slice(0, 6);

  if (!hero) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-ml-2xl font-malayalam text-gray-mid">ഇനിയും ലേഖനങ്ങൾ ഇല്ല. Admin-ൽ ചേർക്കൂ.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <HeroSection article={hero} />
      <TrendingBar articles={trending} />
      <LatestNewsGrid articles={latest} />
      {CATEGORY_SLUGS.map((cat) => {
        const articles = getArticlesByCategory(cat, 4);
        return <CategorySection key={cat} category={cat} articles={articles} />;
      })}
    </div>
  );
}
