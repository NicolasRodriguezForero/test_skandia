import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Bases oscuras (violeta profundo)
        ink: "#160a33",
        grape: "#1f1147",
        plum: "#2c1a63",
        // Acentos neón
        neon: {
          cyan: "#2DE2E6",
          pink: "#FF2E97",
          purple: "#9D4EDD",
          lime: "#B8FF3C",
        },
        cream: "#FFE9C7",
      },
      fontFamily: {
        rounded: ['"Baloo 2"', '"Comic Sans MS"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        "neon-pink": "0 0 24px rgba(255,46,151,0.45)",
        "neon-cyan": "0 0 24px rgba(45,226,230,0.45)",
        "neon-purple": "0 0 50px rgba(157,78,221,0.40)",
      },
    },
  },
  plugins: [],
};

export default config;
