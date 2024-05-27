import { defineNuxtPlugin, useAppConfig } from "#imports";
import { theme, HEART_GLOBAL_KEY, setTheme } from "../common";

export default defineNuxtPlugin((nuxtApp) => {
  const appConfig = useAppConfig();
  setTheme(appConfig.heart?.theme ?? {});
  nuxtApp.vueApp.provide(HEART_GLOBAL_KEY, { theme: theme.value });

  return {
    provide: {
      heart: { theme: theme.value, setTheme },
    },
  };
});
