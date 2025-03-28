/* eslint-disable @typescript-eslint/ban-ts-comment */
import tailwindcss from "@tailwindcss/vite";
// @ts-ignore
import { fileURLToPath } from "url";
// @ts-ignore
import { dirname, join } from "path";

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
  modules: ["@nuxt/fonts", "@nuxt/icon", "@nuxt/image", "@nuxtjs/color-mode"],
  css: [join(currentDir, "./assets/css/tailwind.css")],
  fonts: {
    defaults: {
      weights: [200, 300, 400, 500],
      styles: ["normal", "italic"],
      subsets: [
        "cyrillic-ext",
        "cyrillic",
        "greek-ext",
        "greek",
        "vietnamese",
        "latin-ext",
        "latin",
      ],
    },
    families: [{ name: "Be Vietnam Pro", provider: "google" }],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
