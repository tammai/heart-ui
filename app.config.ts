import type { HeartConfig } from './types/heart';

export default defineAppConfig({
  heart: {
    locale: 'en',
    size: 'md',
    icon: {
      loading: { name: 'fluent:spinner-ios-20-filled', animated: true },
      next: 'fluent:chevron-right-24-filled',
      prev: 'fluent:chevron-left-24-filled',
      first: 'fluent:arrow-previous-24-filled',
      last: 'fluent:arrow-next-24-filled',
      up: 'fluent:chevron-up-24-filled',
      down: 'fluent:chevron-down-24-filled',
      back: 'fluent:arrow-left-24-filled',
      dropdown: 'fluent:chevron-down-24-filled',
      select: 'fluent:chevron-up-down-24-filled',
      plus: 'fluent:add-24-filled',
      minus: 'fluent:subtract-24-filled',
      clear: 'fluent:dismiss-circle-12-filled',
      close: 'fluent:dismiss-24-filled',
      external: 'fluent:open-24-filled',
      show: 'fluent:eye-24-filled',
      hide: 'fluent:eye-off-24-filled',
      search: 'fluent:search-24-filled',
      success: 'fluent:checkmark-circle-24-filled',
      error: 'fluent:error-circle-24-filled',
      info: 'fluent:info-24-filled',
      warning: 'fluent:warning-24-filled',
      avatar: 'fluent:person-24-filled',
      image: 'fluent:image-24-filled',
    },
    message: {
      nodata: 'No data',
      select: 'Select',
    },
    rounded: true,
    shadow: false,
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
