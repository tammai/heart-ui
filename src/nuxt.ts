import {
  defineNuxtModule,
  createResolver,
  addPlugin,
  addComponentsDir,
  addImports,
} from "@nuxt/kit";
import { HeartTheme } from ".";

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
      name: "useTheme", // name of the composable to be used
      as: "useHeartTheme",
      from: resolver.resolve("./composables/index"),
    });
    nuxt.options.build.transpile.push(resolver.resolve("./nuxt/plugin"));
    addPlugin(resolver.resolve("./nuxt/plugin"));
  },
});

declare module "@nuxt/schema" {
  interface AppConfigInput {
    heart?: { theme: { css: HeartTheme } } | undefined;
  }

  interface AppConfig {
    heart?: { theme: { css: HeartTheme } } | undefined;
  }

  interface NuxtConfig {
    heart?: { theme: { css: HeartTheme } } | undefined;
  }
  interface NuxtOptions {
    heart?: { theme: { css: HeartTheme } } | undefined;
  }
}
