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
    "@nuxtjs/sitemap",
  ],
  tres: {
    devtools: true,
  },
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Carlos Segura Garcia - Software Engineer specialized in Vue.js frontend development. Portfolio showcasing web applications and projects.",
        },
        {
          name: "keywords",
          content:
            "Carlos Segura Garcia, software engineer, frontend developer, Vue.js, Nuxt.js, web developer, portfolio",
        },
        { name: "author", content: "Carlos Segura Garcia" },
        // Open Graph
        { property: "og:type", content: "website" },
        {
          property: "og:title",
          content: "Carlos Segura Garcia - Software Engineer",
        },
        {
          property: "og:description",
          content:
            "Software Engineer specialized in Vue.js frontend development. Check out my portfolio.",
        },
        { property: "og:site_name", content: "Carlos Segura Garcia Portfolio" },
        // Twitter Card
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "Carlos Segura Garcia - Software Engineer",
        },
        {
          name: "twitter:description",
          content:
            "Software Engineer specialized in Vue.js frontend development. Check out my portfolio.",
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "canonical", href: "https://carlos-segura-garcia.com" },
        { rel: "manifest", href: "/manifest.json" },
      ],
    },
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
  devServer: {
    host: "0.0.0.0",
    port: 3000,
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
