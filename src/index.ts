import { App } from "vue";
import { components } from "./components";
import { CssEntry, setGlobalCss } from "./common";
export * from "./components";
export * from "./common";
export * from "./utils";

export const HeartUI = {
  install: (
    app: App,
    options = { css: {} as Record<string, Record<string, CssEntry>> }
  ) => {
    setGlobalCss(options.css);
    components.forEach((component) => {
      app.component(component.name, component);
    });
  },
};
