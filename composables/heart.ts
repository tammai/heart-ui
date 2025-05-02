import type { DeepPartial } from '../types/heart';
import { mergeObjects } from 'tailwind-variants/dist/utils.js';

/**
 * Get the config from the app.config.ts
 *
 * @returns Reactive config for Heart UI
 */
export const useHeartConfig = () => {
  const { locale, icon, size, message } = useAppConfig().heart;

  return reactive({
    locale,
    size,
    icon,
    message,
  });
};

/**
 * Get the config from the app.config.ts then merge it with the prop
 *
 * @param name Key of the config
 * @param prop Config from prop
 * @returns Merged config
 */
export const useHeartTheme = <T>(
  name: string,
  prop: DeepPartial<T> = {} as DeepPartial<T>,
): DeepPartial<T> => {
  const global = getHeartConfig(`ui.${name}`) || {};

  return (mergeObjects(prop, global) ?? {}) as DeepPartial<T>;
};
