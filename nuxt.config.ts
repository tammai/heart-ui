import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  modules: ['@nuxt/image', '@nuxt/fonts', '@nuxt/icon', '@nuxtjs/color-mode'],
  fonts: {
    defaults: {
      weights: [300, 400, 500, 600, 700],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
