import type { DeepPartial } from '../../types/heart';
import { mergeObjects } from 'tailwind-variants/dist/utils.js';

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

export const useHeartGlobalZIndex = () => {
  const savedZIndex = ref(1987);

  return {
    currentZIndex: savedZIndex,
    nextZIndex: () => {
      savedZIndex.value += 1;
      return savedZIndex.value;
    },
  };
};
