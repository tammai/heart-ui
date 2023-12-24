import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";
import { globSync } from "glob";
import path from "node:path";
import { fileURLToPath } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), UnoCSS({ mode: "dist-chunk" })],
  publicDir: false,
  build: {
    lib: {
      entry: {
        index: "./src/index.ts",
        nuxt: "./src/nuxt.ts",
        "nuxt/plugin": "./src/nuxt/plugin.ts",
        ...Object.fromEntries(
          globSync("src/components/**/*.vue").map((file) => {
            return [
              path.relative(
                "src",
                file.slice(0, file.length - path.extname(file).length)
              ),
              fileURLToPath(new URL(file, import.meta.url)),
            ];
          })
        ),
      },
      name: "HeartUI",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["vue", "@nuxt/kit", "nuxt/app"],
      output: {
        preserveModules: true,
        globals: {
          vue: "vue",
        },
      },
    },
  },
});
