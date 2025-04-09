import type { HeartConfig } from './types/heart';

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
      skeleton: {
        avatar: 'fluent:person-24-regular',
        image: 'fluent:image-32-regular',
      },
    },
    message: {
      nodata: 'No data',
      select: 'Select',
    },
    rounded: true,
    shadow: 'xl',
  } as HeartConfig,
});

declare module '@nuxt/schema' {
  interface AppConfigInput {
    heart?: HeartConfig;
  }
  interface AppConfig {
    heart: HeartConfig;
  }
}
