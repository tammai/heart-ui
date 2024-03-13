import { Plugin, type App } from "vue";
import { components } from "./components";
import { theme, setTheme, HeartTheme, heartGlobalKey } from "./common";
import "@unocss/reset/tailwind.css";

export * from "./components";
export * from "./composables";
export * from "./common";
export * from "./utils";

export interface HeartPluginOption {
  theme: HeartTheme;
}

export const HeartUI = {
  install: (
    app: App,
    options: HeartPluginOption = { theme: {} as HeartTheme }
  ) => {
    setTheme(options.theme);
    app.provide(heartGlobalKey, { theme: theme });

    components.forEach((component) => {
      app.component(component.name, component);
    });
  },
} as Plugin;
