import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/fonts', '@nuxt/icon', '@nuxtjs/color-mode'],
  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
      },
    },
  },
  fonts: {
    defaults: {
      weights: [300, 400, 500, 600, 700],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
