/* eslint-disable @typescript-eslint/ban-ts-comment */
import { defineNuxtModule } from "@nuxt/kit";
// import tailwindcss from "@tailwindcss/vite";
// @ts-ignore
import { fileURLToPath } from "url";
// @ts-ignore
import { dirname, join } from "path";
// @ts-ignore
import { readFile, writeFile } from "fs";

const currentDir = dirname(fileURLToPath(import.meta.url));

// Module options TypeScript interface definition
type Color =
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose";

type NeutralColor = "neutral" | "gray" | "stone" | "zinc" | "slate";

type ThemeConfig = {
  "font-sans": string;
  "font-weight-light": number;
  "font-weight-normal": number;
  "font-weight-medium": number;
  "font-weight-semibold": number;
  "font-weight-bold": number;
  "color-primary": Color;
  "color-neutral": NeutralColor;
  "color-info": Color;
  "color-success": Color;
  "color-warning": Color;
  "color-danger": Color;
  [key: string]: string | number;
};

export interface ModuleOptions {
  loadTheme?: boolean;
  loadDarkTheme?: boolean;
  theme?: Partial<ThemeConfig>;
}

const CONFIG_MAPPING: Record<string, string> = {
  __FONT_SANS__: "font-sans",
  __FONT_WEIGHT_LIGHT__: "font-weight-light",
  __FONT_WEIGHT_NORMAL__: "font-weight-normal",
  __FONT_WEIGHT_MEDIUM__: "font-weight-medium",
  __FONT_WEIGHT_SEMIBOLD__: "font-weight-semibold",
  __FONT_WEIGHT_BOLD__: "font-weight-bold",
  __COLOR_PRIMARY__: "color-primary",
  __COLOR_NEUTRAL__: "color-neutral",
  __COLOR_DANGER__: "color-danger",
  __COLOR_SUCCESS__: "color-success",
  __COLOR_WARNING__: "color-warning",
  __COLOR_INFO__: "color-info",
};

const generateTailwindConfig = (
  options: ModuleOptions,
  src: string,
  dst: string
) => {
  readFile(join(currentDir, src), "utf-8", (err: Error, data: string) => {
    if (err) {
      return console.log("Cannot read file", src, err);
    }

    let result = data;

    for (const prop in CONFIG_MAPPING) {
      result = result.replaceAll(
        prop,
        `${options.theme![CONFIG_MAPPING[prop]]}`
      );
    }

    writeFile(join(currentDir, dst), result, "utf-8", (err: Error) => {
      if (err) {
        return console.log("Cannot write file", dst, err);
      }
    });
  });
};

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "heart",
    configKey: "heart",
  },
  // Default configuration options of the Nuxt module
  defaults: {
    loadTheme: true,
    loadDarkTheme: false,
    theme: {
      "font-sans": '"Be Vietnam Pro", sans-serif',
      "font-weight-light": 200,
      "font-weight-normal": 300,
      "font-weight-medium": 400,
      "font-weight-semibold": 500,
      "font-weight-bold": 600,
      "color-primary": "blue",
      "color-neutral": "slate",
      "color-info": "cyan",
      "color-success": "emerald",
      "color-warning": "amber",
      "color-danger": "rose",
    },
  },
  setup(_options, _nuxt) {
    // const resolver = createResolver(import.meta.url);

    if (_options.loadTheme) {
      // Generate CSS files
      generateTailwindConfig(
        _options,
        "../assets/css/tailwind.template.css",
        "../assets/css/tailwind.css"
      );
      generateTailwindConfig(
        _options,
        "../assets/css/dark.template.css",
        "../assets/css/dark.css"
      );

      // Load generated CSS files
      _nuxt.options.css = _nuxt.options.css ?? [];
      _nuxt.options.css.push(join(currentDir, "../assets/css/tailwind.css"));

      if (_options.loadDarkTheme) {
        _nuxt.options.css.push(join(currentDir, "../assets/css/dark.css"));
      }
    }
  },
});
