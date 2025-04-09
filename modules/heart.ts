/* eslint-disable @typescript-eslint/ban-ts-comment */
import { defineNuxtModule } from '@nuxt/kit';
// import tailwindcss from "@tailwindcss/vite";
// @ts-ignore
import { fileURLToPath } from 'url';
// @ts-ignore
import { dirname, join } from 'path';
// @ts-ignore
import { readFile, writeFile } from 'fs';

const currentDir = dirname(fileURLToPath(import.meta.url));

// Module options TypeScript interface definition
type Color =
  | 'red'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'rose';

type NeutralColor = 'neutral' | 'gray' | 'stone' | 'zinc' | 'slate';

type ThemeConfig = {
  'font-sans': string;
  'font-weight-light': number;
  'font-weight-normal': number;
  'font-weight-medium': number;
  'font-weight-semibold': number;
  'font-weight-bold': number;
  'color-primary': Color;
  'color-neutral': NeutralColor;
  'color-info': Color;
  'color-success': Color;
  'color-warning': Color;
  'color-danger': Color;
  'background-color': string;
  'text-color': string;
  [key: string]: string | number;
};

export interface ModuleOptions {
  loadTheme?: boolean;
  loadDarkTheme?: boolean;
  theme?: Partial<ThemeConfig>;
}

/**
 * Configuration mapping for generate Tailwind configuration
 */
const CONFIG_MAPPING: Record<string, string> = {
  __FONT_SANS__: 'font-sans',
  __FONT_WEIGHT_LIGHT__: 'font-weight-light',
  __FONT_WEIGHT_NORMAL__: 'font-weight-normal',
  __FONT_WEIGHT_MEDIUM__: 'font-weight-medium',
  __FONT_WEIGHT_SEMIBOLD__: 'font-weight-semibold',
  __FONT_WEIGHT_BOLD__: 'font-weight-bold',
  __COLOR_PRIMARY__: 'color-primary',
  __COLOR_NEUTRAL__: 'color-neutral',
  __COLOR_DANGER__: 'color-danger',
  __COLOR_SUCCESS__: 'color-success',
  __COLOR_WARNING__: 'color-warning',
  __COLOR_INFO__: 'color-info',
  __BACKGROUND_COLOR__: 'background-color',
  __TEXT_COLOR__: 'text-color',
};

/**
 * Generate Tailwind configuration file based on template
 *
 * @param options Module options
 * @param src Input file path
 * @param dst Output file path
 */
const generateTailwindConfig = (
  options: ModuleOptions,
  src: string,
  dst: string,
): void => {
  readFile(join(currentDir, src), 'utf-8', (err: Error, data: string) => {
    if (err) {
      return console.log('Cannot read file', src, err);
    }

    let result = data;

    for (const prop in CONFIG_MAPPING) {
      result = result.replaceAll(
        prop,
        `${options.theme![CONFIG_MAPPING[prop]]}`,
      );
    }

    writeFile(join(currentDir, dst), result, 'utf-8', (err: Error) => {
      if (err) {
        return console.log('Cannot write file', dst, err);
      }
    });
  });
};

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'heart',
    configKey: 'heart',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    loadTheme: true,
    loadDarkTheme: false,
    theme: {
      'font-sans': '"Be Vietnam Pro", sans-serif',
      'font-weight-light': 200,
      'font-weight-normal': 300,
      'font-weight-medium': 400,
      'font-weight-semibold': 500,
      'font-weight-bold': 600,
      'color-primary': 'blue',
      'color-neutral': 'slate',
      'color-info': 'cyan',
      'color-success': 'emerald',
      'color-warning': 'amber',
      'color-danger': 'rose',
      'background-color': 'neutral-50',
      'text-color': 'neutral-950',
    },
  },
  setup(_options, _nuxt) {
    const TAILWIND_TEMPLATE_PATH = '../assets/css/tailwind.template.css';
    const TAILWIND_CSS_PATH = '../assets/css/tailwind.css';
    const DARK_TEMPLATE_PATH = '../assets/css/dark.template.css';
    const DARK_CSS_PATH = '../assets/css/dark.css';

    if (_options.loadTheme) {
      // Generate CSS files
      generateTailwindConfig(
        _options,
        TAILWIND_TEMPLATE_PATH,
        TAILWIND_CSS_PATH,
      );
      generateTailwindConfig(_options, DARK_TEMPLATE_PATH, DARK_CSS_PATH);

      // Load generated CSS files
      const _css = [..._nuxt.options.css];

      _nuxt.options.css = [join(currentDir, TAILWIND_CSS_PATH)];

      if (_options.loadDarkTheme) {
        _nuxt.options.css.push(join(currentDir, DARK_CSS_PATH));
      }

      _nuxt.options.css = [..._nuxt.options.css, ..._css];
    }
  },
});
