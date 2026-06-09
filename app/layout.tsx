import type { Metadata } from "next";
import { Noto_Sans_Malayalam, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AuthProvider from "./AuthProvider";

const notoSansMalayalam = Noto_Sans_Malayalam({
  variable: "--font-noto-malayalam",
  subsets: ["malayalam"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AI മലയാളം — ടെക് & AI വാർത്തകൾ",
    template: "%s | AI മലയാളം",
  },
  description: "AI ന്യൂസ്, ടെക് ന്യൂസ്, സ്മാർട്ട്ഫോൺ, How-To ഗൈഡുകൾ — മലയാളത്തിൽ",
  keywords: ["AI", "Technology", "Malayalam", "Tech News", "Smartphones"],
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ml" className={`${notoSansMalayalam.variable} ${inter.variable}`}>
      <body className="bg-gray-light text-text-primary antialiased">
        <AuthProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
