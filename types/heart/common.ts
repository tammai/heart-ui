import type { LocaleCode } from './locale';

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export interface HeartConfig {
  locale?: LocaleCode;
  size?: 'sm' | 'md' | 'lg';
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
