// @unocss-include

import { ref } from "vue";

export type CssEntry =
  | string
  | { [x: string]: boolean }
  | (string | { [x: string]: boolean })[];

const _defaultGlobalCss = {
  icon: {
    root: "inline-flex",
  },
  button: {
    root: "inline-flex items-center p-4",
    prefix: "" as CssEntry,
    suffix: "" as CssEntry,
  },
};

export const globalCss = ref<typeof _defaultGlobalCss & Record<string, any>>(
  _defaultGlobalCss
);

export const setGlobalCss = (value: Record<string, any>) => {
  globalCss.value = Object.assign(_defaultGlobalCss, value);
};
