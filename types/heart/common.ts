import type { LocaleCode } from './locale';

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type Arrayable<T> = T | T[];
export type Awaitable<T> = Promise<T> | T;

export type ComponentSize = 'sm' | 'md' | 'lg';

export interface HeartConfig {
  locale?: LocaleCode;
  size?: ComponentSize;
  icon?: Partial<{
    loading: { name: string; animated?: boolean };
    next: string;
    prev: string;
    dropdown: string;
    select: string;
    plus: string;
    minus: string;
    clear: string;
    close: string;
    show: string;
    skeleton: Partial<{
      avatar: string;
      image: string;
    }>;
  }>;
  message?: Partial<{
    nodata: string;
    select: string;
  }>;
  rounded?: boolean;
  shadow?: boolean;
}
