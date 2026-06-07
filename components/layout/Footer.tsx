import Link from "next/link";
import { Zap, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";

export default function Footer() {
  return (
    <footer className="bg-gray-dark text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                <Zap size={20} className="text-white" />
              </div>
              <span className="text-white font-bold text-xl font-malayalam">AI മലയാളം</span>
            </Link>
            <p className="text-sm font-malayalam text-gray-400 leading-relaxed">
              ടെക്, AI, സ്മാർട്ട്ഫോൺ — ഏറ്റവും പുതിയ വാർത്തകൾ മലയാളത്തിൽ
            </p>
            <div className="flex items-center gap-3 mt-5">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Youtube, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 bg-gray-700 hover:bg-primary rounded-lg flex items-center justify-center transition-colors"
                >
                  <Icon size={18} className="text-gray-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold font-malayalam mb-4">വിഭാഗങ്ങൾ</h3>
            <ul className="space-y-2.5">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/${cat.slug}`} className="text-sm font-malayalam text-gray-400 hover:text-white transition-colors">
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold font-ui mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { label: "ഞങ്ങളെ കുറിച്ച്", href: "/about" },
                { label: "ബന്ധപ്പെടുക", href: "/contact" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Admin", href: "/admin" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm font-malayalam text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter placeholder */}
          <div>
            <h3 className="text-white font-semibold font-malayalam mb-4">നിউസ്‌ലെറ്റർ</h3>
            <p className="text-sm font-malayalam text-gray-400 mb-3">ഏറ്റവും പുതിയ ടെക് വാർത്തകൾ ഇ-മെയിലിൽ ലഭിക്കാൻ</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="ഇ-മെയിൽ"
                className="flex-1 px-3 py-2 rounded-lg bg-gray-700 text-white text-sm font-malayalam placeholder-gray-500 border border-gray-600 focus:outline-none focus:border-primary"
              />
              <button className="px-4 py-2 bg-primary hover:bg-accent text-white text-sm rounded-lg font-ui font-medium transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center">
          <p className="text-sm font-malayalam text-gray-500">
            © 2026 AI മലയാളം. എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം.
          </p>
        </div>
      </div>
    </footer>
  );
}
