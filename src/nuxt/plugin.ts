import { defineNuxtPlugin, useAppConfig } from "#imports";
import { theme, heartGlobalKey, setTheme } from "../common";

export default defineNuxtPlugin((nuxtApp) => {
  const appConfig = useAppConfig();
  setTheme(appConfig.heart?.theme ?? {});
  nuxtApp.vueApp.provide(heartGlobalKey, { theme: theme.value });

  return {
    provide: {
      heart: { theme: theme.value, setTheme },
    },
  };
});
