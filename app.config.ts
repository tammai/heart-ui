// type Status = "info" | "success" | "warning" | "danger";

export default defineAppConfig({
  heart: {
    default: {
      size: "md",
      icon: {
        loading: "",
        next: "",
        prev: "",
        dropdown: "",
        select: "",
        plus: "",
        minus: "",
        clear: "",
        close: "",
        show: "",
      },
      message: {
        nodata: "No data",
        select: "Select",
      },
      rounded: "md",
      shadow: "xl",
    },
  },
});

declare module "@nuxt/schema" {
  interface AppConfigInput {
    heart?: {
      default?: {
        size?: "sm" | "md" | "lg" | string;
        icon?: Partial<{
          loading: string;
          next: string;
          prev: string;
          dropdown: string;
          select: string;
          plus: string;
          minus: string;
          clear: string;
          close: string;
          show: string;
        }>;
        message?: Partial<{
          nodata: string;
          select: string;
        }>;
        rounded?:
          | "none"
          | "xs"
          | "sm"
          | "md"
          | "lg"
          | "xl"
          | "2xl"
          | "3xl"
          | "4xl"
          | "full";
        shadow?: "none" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
      };
    };
  }
}
