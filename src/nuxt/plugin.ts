import { defineNuxtPlugin, useAppConfig } from "#imports";
import { globalCss, heartGlobalKey, setGlobalCss } from "../common";

export default defineNuxtPlugin((nuxtApp) => {
  const appConfig = useAppConfig();
  setGlobalCss(appConfig.heart?.css ?? {});
  nuxtApp.vueApp.provide(heartGlobalKey, { css: globalCss.value });

  return {
    provide: {
      heart: { css: globalCss.value },
    },
  };
});
