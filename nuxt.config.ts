import glsl from "vite-plugin-glsl";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@tresjs/nuxt",
    "@pinia/nuxt",
    "@nuxt/icon",
    "@nuxtjs/i18n",
  ],
  tres: {
    devtools: true,
  },
  css: ["~/assets/css/main.css"],
  app: {
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
  },
  i18n: {
    defaultLocale: "en",
    locales: [
      {
        code: "en",
        name: "English",
        file: "en.json",
        flag: "/icons/gb.svg",
      },
      {
        code: "es",
        name: "Español",
        file: "es.json",
        flag: "/icons/es.svg",
      },
      {
        code: "pt",
        name: "Português",
        file: "pt.json",
        flag: "/icons/pt.svg",
      },
      {
        code: "fr",
        name: "Français",
        file: "fr.json",
        flag: "/icons/fr.svg",
      },
      {
        code: "it",
        name: "Italiano",
        file: "it.json",
        flag: "/icons/it.svg",
      },
      {
        code: "de",
        name: "Deutsch",
        file: "de.json",
        flag: "/icons/de.svg",
      },
    ],
    strategy: "no_prefix",
  },
  vite: {
    plugins: [glsl()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "~/assets/scss/variables.scss" as *; 
          @use "~/assets/scss/animations.scss" as *;
          @use "~/assets/scss/breakpoints.scss" as *;
          @use "~/assets/scss/fonts.scss" as *;
          @use "~/assets/scss/general.scss" as *;
          @use "~/assets/scss/mixins.scss" as *;`,
        },
      },
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
