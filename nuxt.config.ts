import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  modules: ["@nuxt/fonts", "@nuxt/icon"],
  fonts: {
    defaults: {
      weights: [200, 300, 400, 500, 600],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
