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
        canvas:      "#ffffff",
        "surface-soft": "#f7f7f7",
        "surface-card": "#ffffff",
        hairline:    "#dddddd",
        "hairline-soft": "#ebebeb",
        ink:         "#222222",
        body:        "#3f3f3f",
        muted:       "#6a6a6a",
        "muted-soft":"#929292",
        primary: {
          DEFAULT:  "#D4A853",
          hover:    "#c49640",
          disabled: "#ead9aa",
        },
        "on-primary": "#ffffff",
        /* legacy */
        background: "var(--canvas)",
        foreground: "var(--ink)",
        accent: {
          DEFAULT: "#D4A853",
          hover:   "#c49640",
        },
      },
      fontFamily: {
        sans:    ["var(--font-inter)", "Inter", "-apple-system", "system-ui", "sans-serif"],
        heading: ["var(--font-inter)", "Inter", "-apple-system", "system-ui", "sans-serif"],
        body:    ["var(--font-inter)", "Inter", "-apple-system", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "card-hover": "rgba(0,0,0,0.02) 0 0 0 1px, rgba(0,0,0,0.04) 0 2px 6px, rgba(0,0,0,0.1) 0 4px 8px",
      },
      borderRadius: {
        btn:    "8px",
        card:   "14px",
        pill:   "9999px",
      },
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up":         "fade-up 0.45s ease both",
        "fade-up-delay":   "fade-up 0.45s 0.12s ease both",
        "fade-up-delay-2": "fade-up 0.45s 0.24s ease both",
      },
    },
  },
  plugins: [],
};
export default config;
