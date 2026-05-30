import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vantage: {
          black: "#1A1A24",
          "black-90": "#32323B",
          "black-70": "#5C5C66",
          "black-50": "#868691",
          "black-30": "#B0B0BC",
          "black-10": "#DADAE7",
          teal: "#006D77",
          gold: "#E2B44F",
          white: "#FFFFFF",
          "light-grey": "#F0F0F0",
          "medium-grey": "#A0A0A0",
          "dark-grey": "#505050",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        "display": ["3rem", { lineHeight: "3.5rem", fontWeight: "700" }],
      },
    },
  },
  plugins: [],
};

export default config;
