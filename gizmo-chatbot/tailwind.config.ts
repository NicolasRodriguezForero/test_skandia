import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FFF6E9",
        gizmo: {
          mint: "#8ED1C0",
          deep: "#1f6f63",
          coral: "#FF7E62",
          sun: "#FFC24B",
        },
      },
      fontFamily: {
        rounded: ['"Baloo 2"', '"Comic Sans MS"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
