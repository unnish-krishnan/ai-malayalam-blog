"use client";
import { useState } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchBar({ onClose }: { onClose?: () => void }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      onClose?.();
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative flex items-center">
      <Search size={18} className="absolute left-3 text-gray-mid" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="തിരയുക..."
        className="w-full pl-10 pr-10 py-2.5 border border-gray-border rounded-xl text-ml-base font-malayalam focus:outline-none focus:border-primary focus:ring-2 focus:ring-light-blue bg-white"
        autoFocus
      />
      {query && (
        <button type="button" onClick={() => setQuery("")} className="absolute right-3 text-gray-mid hover:text-text-primary">
          <X size={16} />
        </button>
      )}
    </form>
  );
}
