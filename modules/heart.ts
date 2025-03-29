/* eslint-disable @typescript-eslint/ban-ts-comment */
import { defineNuxtModule } from "@nuxt/kit";
// import tailwindcss from "@tailwindcss/vite";
// @ts-ignore
import { fileURLToPath } from "url";
// @ts-ignore
import { dirname, join } from "path";

const currentDir = dirname(fileURLToPath(import.meta.url));

// Module options TypeScript interface definition
export interface ModuleOptions {
  loadTheme?: boolean;
  loadDarkTheme?: boolean;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "heart",
    configKey: "heart",
  },
  // Default configuration options of the Nuxt module
  defaults: {
    loadTheme: true,
    loadDarkTheme: false,
  },
  setup(_options, _nuxt) {
    // const resolver = createResolver(import.meta.url);

    if (_options.loadTheme) {
      _nuxt.options.css = _nuxt.options.css ?? [];
      _nuxt.options.css.push(join(currentDir, "../assets/css/tailwind.css"));

      if (_options.loadDarkTheme) {
        _nuxt.options.css.push(join(currentDir, "../assets/css/dark.css"));
      }
    }
  },
});
