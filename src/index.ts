import { type App } from "vue";
import * as components from "./components";
import { theme, setTheme, type HeartTheme, HEART_GLOBAL_KEY } from "./common";
import "@unocss/reset/tailwind.css"; // Will bundle with default UnoCSS output

export * from "./components";
export * from "./composables";
export * from "./common";
export * from "./utils";

export interface HeartPluginOptions {
  theme: HeartTheme;
}

export const HeartUI = {
  install: (app: App, options?: HeartPluginOptions) => {
    if (options) {
      setTheme(options.theme);
    }

    app.provide(HEART_GLOBAL_KEY, { theme: theme });

    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component);
    });
  },
};
