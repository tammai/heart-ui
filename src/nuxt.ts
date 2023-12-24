import {
  defineNuxtModule,
  createResolver,
  addPlugin,
  addComponentsDir,
  addImports,
} from "@nuxt/kit";
import { globalCss } from ".";

export default defineNuxtModule({
  meta: {
    name: "heart-ui",
    configKey: "heart",
  },
  setup: (_, nuxt) => {
    const resolver = createResolver(import.meta.url);

    addComponentsDir({
      path: resolver.resolve("./components/"),
      prefix: "h",
      pattern: "**/*.js",
      ignore: ["**/*.vue.js", "**/*.d.ts"],
    });

    addImports({
      name: "useGlobalCss", // name of the composable to be used
      as: "useGlobalCss",
      from: resolver.resolve("./composables/index"),
    });
    nuxt.options.build.transpile.push(resolver.resolve("./nuxt/plugin"));
    addPlugin(resolver.resolve("./nuxt/plugin"));
  },
});

declare module "@nuxt/schema" {
  interface AppConfigInput {
    heart?: { css: typeof globalCss } | undefined;
  }

  interface AppConfig {
    heart?: { css: typeof globalCss } | undefined;
  }

  interface NuxtConfig {
    heart?: { css: typeof globalCss } | undefined;
  }
  interface NuxtOptions {
    heart?: { css: typeof globalCss } | undefined;
  }
}
