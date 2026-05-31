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
        background: "var(--color-bg)",
        foreground: "var(--color-text)",
        bg: {
          DEFAULT: "#0A0A0F",
          app: "#12121A",
        },
        "bg-app": "var(--color-bg-app)",
        surface: {
          DEFAULT: "#1C1C28",
          raised: "#242436",
        },
        border: {
          DEFAULT: "#2E2E3E",
          strong: "#3E3E52",
        },
        accent: {
          DEFAULT: "#D4A853",
          hover: "#E8C06A",
          glow: "rgba(212,168,83,0.25)",
        },
        text: {
          DEFAULT: "#F2F2F4",
          muted: "#8A8A9A",
          subtle: "#5A5A6A",
        },
        success: "#4CAF82",
        error: "#E85B5B",
      },
      fontFamily: {
        heading: ["var(--font-dm-sans)", "DM Sans", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "accent-glow": "0 0 0 2px #D4A853, 0 0 20px rgba(212,168,83,0.3)",
        "accent-glow-sm":
          "0 0 0 1px rgba(212,168,83,0.5), 0 0 12px rgba(212,168,83,0.2)",
        "card-hover":
          "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(212,168,83,0.2)",
        surface: "0 4px 24px rgba(0,0,0,0.3)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        "fade-up-delay":
          "fade-up 0.5s 0.15s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        "fade-up-delay-2":
          "fade-up 0.5s 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      transitionTimingFunction: {
        "bounce-soft": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
