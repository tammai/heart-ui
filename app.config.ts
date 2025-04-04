// type Status = "info" | "success" | "warning" | "danger";

export default defineAppConfig({
  heart: {
    size: 'md',
    icon: {
      loading: '',
      next: '',
      prev: '',
      dropdown: '',
      select: '',
      plus: '',
      minus: '',
      clear: '',
      close: '',
      show: '',
    },
    message: {
      nodata: 'No data',
      select: 'Select',
    },
    rounded: true,
    shadow: 'xl',
  },
});

declare module '@nuxt/schema' {
  interface AppConfigInput {
    heart?: {
      size?: 'sm' | 'md' | 'lg';
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
      rounded?: boolean;
      shadow?: 'none' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    };
  }
}
