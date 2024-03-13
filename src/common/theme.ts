// @unocss-include

import { ref } from "vue";

export type CssEntry =
  | string
  | { [x: string]: boolean }
  | (string | { [x: string]: boolean })[];

const _defaultTheme = {
  css: {
    icon: {
      root: "inline-flex",
    },
    button: {
      root: "inline-flex items-center cursor-pointer transition-all",
      prefix: "",
      suffix: "",
      text: "font-semibold grow mx-[0.25em]",
      loading: "absolute top-0 left-0 z-1 w-full h-full flex justify-center items-center bg-[#fffffff12]",
      disabled: "opacity-50 pointer-events-none",
      style: {
        solid: {
          custom: "",
          default: "bg-neutral-2 c-neutral-9 hover:bg-neutral-3 focus:bg-neutral-3 active:bg-neutral-4",
          primary: "bg-primary-5 c-white hover:bg-primary-6 focus:bg-primary-6 active:bg-primary-7",
          danger: "bg-red-5 c-white hover:bg-red-6 focus:bg-red-6 active:bg-red-7",
          warning: "bg-orange-5 c-white hover:bg-orange-6 focus:bg-orange-6 active:bg-orange-7",
          success: "bg-green-5 c-white hover:bg-green-6 focus:bg-green-6 active:bg-green-7",
          info: "bg-cyan-5 c-white hover:bg-cyan-6 focus:bg-cyan-6 active:bg-cyan-7",
        },
        outline: {
          custom: "border-1",
          default: "border-1 border-neutral-2 c-neutral-9 hover:bg-neutral-2 focus:bg-neutral-2 active:border-neutral-3 active:bg-neutral-3",
          primary: "border-1 border-primary-2 c-primary-6 hover:bg-primary-2 focus:bg-primary-2 active:border-primary-3 active:bg-primary-3 active:c-primary-7",
          danger: "border-1 border-red-2 c-red-6 hover:bg-red-2 focus:bg-red-2 active:border-red-3 active:bg-red-3 active:c-red-7",
          warning: "border-1 border-orange-2 c-orange-6 hover:bg-orange-2 focus:bg-orange-2 active:border-orange-3 active:bg-orange-3 active:c-orange-7",
          success: "border-1 border-green-2 c-green-6 hover:bg-green-2 focus:bg-green-2 active:border-green-3 active:bg-green-3 active:c-green-7",
          info: "border-1 border-cyan-2 c-cyan-6 hover:bg-cyan-2 focus:bg-cyan-2 active:border-cyan-3 active:bg-cyan-3 active:c-cyan-7",
        },
        ghost: {
          custom: "",
          default: "c-neutral-9 hover:bg-neutral-2 focus:bg-neutral-2 active:bg-neutral-3",
          primary: "c-primary-6 hover:bg-primary-2 focus:bg-primary-2 active:bg-primary-3 active:c-primary-7",
          danger: "c-red-6 hover:bg-red-2 focus:bg-red-2 active:bg-red-3 active:c-red-7",
          warning: "c-orange-6 hover:bg-orange-2 focus:bg-orange-2 active:bg-orange-3 active:c-orange-7",
          success: "c-green-6 hover:bg-green-2 focus:bg-green-2 active:bg-green-3 active:c-green-7",
          info: "c-cyan-6 hover:bg-cyan-2 focus:bg-cyan-2 active:bg-cyan-3 active:c-cyan-7",
        }
      },
      size: {
        default: "px-3 h-11 rounded-lg text-md",
        large: "px-4 h-14 rounded-xl text-lg",
        small: "px-2 h-8 rounded text-sm",
      },
      rounded: "rounded-full"
    },
  },
  icons: {
    loading: { default: 'svg-spinners:270-ring-with-bg', dot: 'svg-spinners:3-dots-fade', clock: 'svg-spinners:clock', pulse: 'svg-spinners:pulse-2' },
  },
};

export type HeartTheme = typeof _defaultTheme & Record<string, any>;

export const theme = ref<HeartTheme>(_defaultTheme);

export const setTheme = (value: Record<string, any>) => {
  theme.value = Object.assign(_defaultTheme, value);
};
