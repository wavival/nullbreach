import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "640px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#38BDF8",
          foreground: "#0B1220",
          hover: "#0EA5E9",
          active: "#0284C7",
        },
        secondary: {
          DEFAULT: "#3B82F6",
          foreground: "#F1F5F9",
          hover: "#2563EB",
          active: "#1D4ED8",
        },
        neutral: "#71796F",
        surface: { DEFAULT: "#0F172A", alt: "#1E293B" },
        foreground: { DEFAULT: "#F1F5F9", muted: "#94A3B8" },
        border: "#334155",
        severity: {
          critical: "#FF8B7C",
          high: "#FBBF24",
          medium: "#3B82F6",
          low: "#38BDF8",
        },
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "32px",
        "3xl": "48px",
        "4xl": "64px",
        navbar: "64px",
      },
      borderRadius: {
        DEFAULT: "4px",
        sm: "4px",
        md: "4px",
        lg: "4px",
        xl: "4px",
      },
      boxShadow: {
        medium: "0 8px 12px rgba(0, 0, 0, 0.4)",
        large: "0 12px 24px rgba(0, 0, 0, 0.5)",
      },
      fontFamily: {
        headline: ["Inter", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      fontSize: {
        h2: [
          "28px",
          { lineHeight: "1.2", letterSpacing: "-0.3px", fontWeight: "700" },
        ],
        h3: ["24px", { lineHeight: "1.3", fontWeight: "600" }],
        h4: ["20px", { lineHeight: "1.4", fontWeight: "600" }],
        "body-lg": ["16px", { lineHeight: "1.5" }],
        body: ["14px", { lineHeight: "1.5" }],
        "body-sm": ["12px", { lineHeight: "1.4" }],
        label: ["12px", { lineHeight: "1.4", letterSpacing: "0.5px" }],
        code: ["13px", { lineHeight: "1.5" }],
      },
      transitionDuration: { hover: "150ms", modal: "200ms" },
      transitionTimingFunction: {
        hover: "cubic-bezier(0, 0, 0.2, 1)",
        modal: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
