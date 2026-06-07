"use client";
import Link from "next/link";
import { X } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-4 bg-primary">
          <span className="text-white font-bold text-xl font-malayalam">AI മലയാളം</span>
          <button onClick={onClose} className="text-white p-1">
            <X size={24} />
          </button>
        </div>
        <nav className="flex-1 py-4 overflow-y-auto">
          <Link href="/" onClick={onClose} className="block px-6 py-3 text-ml-base font-malayalam text-text-primary hover:bg-light-blue hover:text-primary border-b border-gray-border">
            ഹോം
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              onClick={onClose}
              className="block px-6 py-3 text-ml-base font-malayalam text-text-primary hover:bg-light-blue hover:text-primary border-b border-gray-border"
            >
              {cat.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-border">
          <p className="text-xs text-text-secondary font-ui text-center">© 2026 AI മലയാളം</p>
        </div>
      </div>
    </div>
  );
}
