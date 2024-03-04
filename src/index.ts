import { Plugin, type App } from "vue";
import { components } from "./components";
import { CssEntry, globalCss, setGlobalCss } from "./common";
import { heartGlobalKey } from "./common/symbols";

export * from "./components";
export * from "./composables";
export * from "./common";
export * from "./utils";

export interface HeartPluginOption {
  css: Record<string, Record<string, CssEntry>>
}

export const HeartUI = {
  install: (
    app: App,
    options: HeartPluginOption = { css: {} }
  ) => {
    setGlobalCss(options.css);
    app.provide(heartGlobalKey, { css: globalCss });

    components.forEach((component) => {
      app.component(component.name, component);
    });
  },
} as Plugin<HeartPluginOption>;
