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
}
