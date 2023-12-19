import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";
import { glob } from "glob";
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
        ...Object.fromEntries(
          glob.sync("src/components/**/*.vue").map((file) => [
            // This remove `src/` as well as the file extension from each
            // file, so e.g. src/nested/foo.js becomes nested/foo
            path.relative(
              "src",
              file.slice(0, file.length - path.extname(file).length)
            ),
            // This expands the relative paths to absolute paths, so e.g.
            // src/nested/foo becomes /project/src/nested/foo.js
            fileURLToPath(new URL(file, import.meta.url)),
          ])
        ),
      },
      name: "HeartUI",
    },
    rollupOptions: {
      external: ["vue", "@nuxt/kit"],
      output: {
        preserveModules: true,
        globals: {
          vue: "vue",
        },
      },
    },
  },
});
