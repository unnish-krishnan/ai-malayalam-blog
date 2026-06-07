"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X, Zap } from "lucide-react";
import CategoryNav from "./CategoryNav";
import MobileMenu from "./MobileMenu";
import SearchBar from "@/components/ui/SearchBar";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="bg-primary shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
                <Zap size={20} className="text-primary" />
              </div>
              <span className="text-white font-bold text-xl font-malayalam leading-tight">
                AI മലയാളം
              </span>
            </Link>

            {/* Desktop search */}
            <div className="hidden md:flex flex-1 max-w-md mx-6">
              {searchOpen ? (
                <div className="flex-1 flex items-center gap-2">
                  <div className="flex-1">
                    <SearchBar onClose={() => setSearchOpen(false)} />
                  </div>
                  <button onClick={() => setSearchOpen(false)} className="text-white p-1">
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="flex items-center gap-2 bg-blue-600/40 hover:bg-blue-600/60 text-blue-100 hover:text-white px-4 py-2 rounded-xl text-sm font-ui transition-colors w-full"
                >
                  <Search size={16} />
                  <span>തിരയുക...</span>
                </button>
              )}
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="md:hidden text-white p-2 hover:bg-blue-600 rounded-lg transition-colors"
              >
                <Search size={20} />
              </button>
              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden text-white p-2 hover:bg-blue-600 rounded-lg transition-colors"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>

          {/* Mobile search bar */}
          {searchOpen && (
            <div className="md:hidden pb-3">
              <SearchBar onClose={() => setSearchOpen(false)} />
            </div>
          )}
        </div>

        {/* Category nav */}
        <CategoryNav />
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
