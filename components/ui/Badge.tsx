"use client";
import { getCategoryMeta } from "@/lib/categories";
import { Category } from "@/types/article";

interface BadgeProps {
  category: Category;
  size?: "sm" | "md";
}

export default function Badge({ category, size = "md" }: BadgeProps) {
  const meta = getCategoryMeta(category);
  const padding = size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-xs";
  return (
    <span
      className={`${padding} rounded-full font-semibold font-ui inline-block`}
      style={{ backgroundColor: meta.bgColor, color: meta.textColor }}
    >
      {meta.label}
    </span>
  );
}
