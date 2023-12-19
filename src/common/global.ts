export type CssEntry =
  | string
  | { [x: string]: boolean }
  | (string | { [x: string]: boolean })[];

// @unocss-include
const _defaultGlobalCss = {
  icon: {
    root: "inline-flex",
  },
  button: {
    root: "inline-flex items-center",
    prefix: "" as CssEntry,
    suffix: "" as CssEntry,
  },
};

export const globalCss = _defaultGlobalCss;

export const setGlobalCss = (value: Record<string, Record<string, CssEntry>>) =>
  Object.assign(_defaultGlobalCss, value);
