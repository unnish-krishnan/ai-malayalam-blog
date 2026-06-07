import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1A56DB",
        "primary-dark": "#1E40AF",
        accent: "#3B82F6",
        "light-blue": "#EFF6FF",
        "gray-dark": "#1F2937",
        "gray-mid": "#6B7280",
        "gray-light": "#F3F4F6",
        "gray-border": "#E5E7EB",
        "text-primary": "#111827",
        "text-secondary": "#4B5563",
      },
      fontFamily: {
        malayalam: ["var(--font-noto-malayalam)", "sans-serif"],
        ui: ["var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        "ml-base": ["17px", "1.7"],
        "ml-lg": ["19px", "1.7"],
        "ml-xl": ["22px", "1.6"],
        "ml-2xl": ["26px", "1.5"],
        "ml-3xl": ["32px", "1.4"],
      },
    },
  },
  plugins: [],
};
export default config;
