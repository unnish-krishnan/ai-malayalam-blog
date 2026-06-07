import { Category, CategoryMeta } from "@/types/article";

export const CATEGORIES: CategoryMeta[] = [
  {
    slug: "ai-news",
    label: "AI ന്യൂസ്",
    color: "#1A56DB",
    bgColor: "#EFF6FF",
    textColor: "#1E40AF",
    description: "ആർട്ടിഫിഷ്യൽ ഇന്റലിജൻസ് രംഗത്തെ ഏറ്റവും പുതിയ വാർത്തകൾ",
  },
  {
    slug: "ai-tutorials",
    label: "AI ട്യൂട്ടോറിയൽ",
    color: "#7C3AED",
    bgColor: "#F5F3FF",
    textColor: "#6D28D9",
    description: "AI ഉപകരണങ്ങൾ ഉപയോഗിക്കുന്നതിനുള്ള ഘട്ടം ഘട്ടമായ ഗൈഡുകൾ",
  },
  {
    slug: "tech",
    label: "ടെക് ന്യൂസ്",
    color: "#059669",
    bgColor: "#ECFDF5",
    textColor: "#047857",
    description: "സാങ്കേതിക ലോകത്തെ പ്രധാന വാർത്തകളും അപ്ഡേറ്റുകളും",
  },
  {
    slug: "smartphones",
    label: "സ്മാർട്ട്ഫോൺ",
    color: "#D97706",
    bgColor: "#FFFBEB",
    textColor: "#B45309",
    description: "ഫോൺ അവലോകനങ്ങൾ, ലോഞ്ചുകൾ, ഒപ്പം ടിപ്സ്",
  },
  {
    slug: "how-to",
    label: "എങ്ങനെ ചെയ്യാം",
    color: "#DC2626",
    bgColor: "#FEF2F2",
    textColor: "#B91C1C",
    description: "സാങ്കേതിക പ്രശ്നങ്ങൾ പരിഹരിക്കാനുള്ള വഴികൾ",
  },
];

export const getCategoryMeta = (slug: Category): CategoryMeta => {
  return (
    CATEGORIES.find((c) => c.slug === slug) || {
      slug,
      label: slug,
      color: "#6B7280",
      bgColor: "#F3F4F6",
      textColor: "#374151",
      description: "",
    }
  );
};

export const CATEGORY_SLUGS: Category[] = [
  "ai-news",
  "ai-tutorials",
  "tech",
  "smartphones",
  "how-to",
];
