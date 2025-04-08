// type Status = "info" | "success" | "warning" | "danger";

import type { HeartConfig, LocaleCode } from './types/heart';

export default defineAppConfig({
  heart: {
    locale: 'en',
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
    heart?: HeartConfig;
  }
}
