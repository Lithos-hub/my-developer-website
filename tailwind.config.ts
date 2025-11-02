import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/components/**/*.{js,vue,ts}",
    "./app/layouts/**/*.vue",
    "./app/pages/**/*.vue",
    "./app/plugins/**/*.{js,ts}",
    "./app/app.vue",
    "./app/error.vue",
    "./app/**/*.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#55EAD4",
        secondary: "#FB1543",
        secondarySoft: "#EF4444",
        dark: "#1d1d1d",
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
