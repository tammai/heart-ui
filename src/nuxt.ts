// import { fileURLToPath } from "node:url";
import { defineNuxtModule, addComponentsDir, createResolver } from "@nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "heart-ui",
    configKey: "heart",
  },
  setup() {
    addComponentsDir({
      path: createResolver(import.meta.url).resolve("./components/"),
      prefix: "h",
      pattern: "**/*.js",
      ignore: ["**/*.vue.js", "**/*.cjs", "**/*.d.ts"],
    });
  },
});

declare module "@nuxt/schema" {
  interface NuxtConfig {
    heart?: Record<string, unknown>;
  }
  interface NuxtOptions {
    heart?: Record<string, unknown>;
  }
}
