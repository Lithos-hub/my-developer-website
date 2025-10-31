import type { Config } from "tailwindcss";

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#55EAD4",
        secondary: "#FB1543",
        secondarySoft: "#EF4444",
        secondarySubtle: "#EF444450",
        dark1: "#003554",
        dark2: "#242423",
        light1: "#f2f4f3",
        light2: "#cfdbd5",
      },
      fontFamily: {
        lucania: ["Lucania", "sans-serif"],
        exo: ["Exo", "sans-serif"],
        jetbrainsMono: ["JetBrains Mono", "sans-serif"],
        whiteRabbit: ["WhiteRabbit", "sans-serif"],
        rajdhaniBold: ["Rajdhani Bold", "sans-serif"],
        rajdhaniLight: ["Rajdhani Light", "sans-serif"],
        rajdhaniMedium: ["Rajdhani Medium", "sans-serif"],
        rajdhaniRegular: ["Rajdhani Regular", "sans-serif"],
        rajdhaniSemiBold: ["Rajdhani SemiBold", "sans-serif"],
        orbitron: ["Orbitron", "sans-serif"],
      },
    },
  },
} satisfies Config;
