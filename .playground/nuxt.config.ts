export default defineNuxtConfig({
  compatibilityDate: "2025-03-28",
  devtools: {
    enabled: false,
  },
  extends: [".."],
  app: {
    head: {
      title: "Heart UI",
    },
  },
  modules: ["@nuxt/image", "@nuxtjs/color-mode"],
  heart: {
    loadDarkTheme: true,
    theme: {
      "color-primary": "orange",
      "color-neutral": "zinc",
      "background-color": "neutral-50",
      "text-color": "neutral-950",
    },
  },
});
