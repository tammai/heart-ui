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
      root: "flex justify-center items-center outline-2 cursor-pointer transition-all",
      prefix: "text-[1.5em]",
      suffix: "text-[1.5em]",
      text: "font-semibold whitespace-nowrap",
      busy: "bg-[#ffffff24] text-[1.5em]",
      disabled: "opacity-50 pointer-events-none",
      style: {
        solid: {
          custom: "",
          default:
            "bg-neutral-7 c-white hover:bg-neutral-8 focus:(outline-neutral-3 bg-neutral-8) active:bg-neutral-9",
          primary:
            "bg-primary-5 c-white hover:bg-primary-6 focus:(outline-primary-3 bg-primary-6) active:bg-primary-7",
          danger:
            "bg-danger-5 c-white hover:bg-danger-6 focus:(outline-danger-3 bg-danger-6) active:bg-danger-7",
          warning:
            "bg-warning-5 c-white hover:bg-warning-6 focus:(outline-warning-3 bg-warning-6) active:bg-warning-7",
          success:
            "bg-success-5 c-white hover:bg-success-6 focus:(outline-success-3 bg-success-6) active:bg-success-7",
          info: "bg-info-5 c-white hover:bg-info-6 focus:(outline-info-3 bg-info-6) active:bg-info-7",
        },
        semi: {
          custom: "",
          default:
            "bg-neutral-2 c-neutral-7 hover:bg-neutral-3 focus:(outline-neutral-4 bg-neutral-3) active:bg-neutral-4",
          primary:
            "bg-primary-1 c-primary-6 hover:bg-primary-2 focus:(outline-primary-3 bg-primary-2) active:bg-primary-3",
          danger:
            "bg-danger-1 c-danger-6 hover:bg-danger-2 focus:(outline-danger-3 bg-danger-2) active:bg-danger-3",
          warning:
            "bg-warning-1 c-warning-6 hover:bg-warning-2 focus:(outline-warning-3 bg-warning-2) active:bg-warning-3",
          success:
            "bg-success-1 c-success-6 hover:bg-success-2 focus:(outline-success-3 bg-success-2) active:bg-success-3",
          info: "bg-info-1 c-info-6 hover:bg-info-2 focus:(outline-info-3 bg-info-2) active:bg-info-3",
        },
        outline: {
          custom: "shadow-[inset_0_0_0_2px]",
          default:
            "shadow-[inset_0_0_0_2px] shadow-neutral-7 c-neutral-7 hover:(c-white bg-neutral-7) focus:(outline-neutral-3 c-white bg-neutral-7) active:(c-white shadow-neutral-8 bg-neutral-8)",
          primary:
            "shadow-[inset_0_0_0_2px] shadow-primary-5 c-primary-6 hover:(c-white bg-primary-5) focus:(outline-primary-3 c-white bg-primary-5) active:(c-white shadow-primary-6 bg-primary-6)",
          danger:
            "shadow-[inset_0_0_0_2px] shadow-danger-5 c-danger-6 hover:(c-white bg-danger-5) focus:(outline-danger-3 c-white bg-danger-5) active:(c-white shadow-danger-5 bg-danger-6)",
          warning:
            "shadow-[inset_0_0_0_2px] shadow-warning-5 c-warning-6 hover:(c-white bg-warning-5) focus:(outline-warning-3 c-white bg-warning-5) active:(c-white shadow-warning-5 bg-warning-6)",
          success:
            "shadow-[inset_0_0_0_2px] shadow-success-5 c-success-6 hover:(c-white bg-success-5) focus:(outline-success-3 c-white bg-success-5) active:(c-white shadow-success-5 bg-success-6)",
          info: "shadow-[inset_0_0_0_2px] shadow-info-5 c-info-6 hover:(c-white bg-info-5) focus:(outline-info-3 c-white bg-info-5) active:(c-white shadow-info-5 bg-info-6)",
        },
        ghost: {
          custom: "",
          default:
            "c-neutral-7 hover:bg-neutral-1 focus:(outline-neutral-3 bg-neutral-1) active:bg-neutral-2",
          primary:
            "c-primary-6 hover:bg-primary-1 focus:(outline-primary-3 bg-primary-1) active:bg-primary-2",
          danger:
            "c-danger-6 hover:bg-danger-1 focus:(outline-danger-3 bg-danger-1) active:bg-danger-2",
          warning:
            "c-warning-6 hover:bg-warning-1 focus:(outline-warning-3 bg-warning-1) active:bg-warning-2",
          success:
            "c-success-6 hover:bg-success-1 focus:(outline-success-3 bg-success-1) active:bg-success-2",
          info: "c-info-6 hover:bg-info-1 focus:(outline-info-3 bg-info-1) active:bg-info-2",
        },
      },
      size: {
        default: "gap-1 px-5 h-12 text-md rounded-2xl",
        large: "gap-1.5 px-7 h-14 text-lg rounded-[20px]",
        small: "gap-0.5 px-3 h-10 text-sm rounded-xl",
      },
      rounded: "rounded-full",
    },
  },
  icons: {
    loading: {
      default: "svg-spinners:270-ring-with-bg",
      dot: "svg-spinners:3-dots-fade",
      clock: "svg-spinners:clock",
      pulse: "svg-spinners:pulse-2",
    },
  },
};

export type HeartTheme = typeof _defaultTheme & Record<string, any>;

export const theme = ref<HeartTheme>(_defaultTheme);

export const setTheme = (value: Record<string, any>) => {
  theme.value = Object.assign(_defaultTheme, value);
};
