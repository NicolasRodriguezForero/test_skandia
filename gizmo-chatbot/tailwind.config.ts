import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Bases oscuras (azul-verde profundo / teal-navy)
        ink: "#05161B",
        grape: "#08232C",
        plum: "#0E3540",
        // Acentos neón: mezcla verde + azul
        neon: {
          cyan: "#35D6FF", // cian-azul
          pink: "#1FD9A0", // verde-agua (acento principal)
          purple: "#1C8FE0", // azul eléctrico (cierre de degradado / glow)
          lime: "#36F0A8", // verde-aqua
        },
        cream: "#FFE7C2",
      },
      fontFamily: {
        rounded: ['"Baloo 2"', '"Comic Sans MS"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        "neon-pink": "0 0 10px rgba(31,217,160,0.30)",
        "neon-cyan": "0 0 10px rgba(53,214,255,0.28)",
        "neon-purple": "0 0 55px rgba(28,143,224,0.40)",
      },
    },
  },
  plugins: [],
};

export default config;
