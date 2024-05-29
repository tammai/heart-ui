// uno.config.ts
import {
  defineConfig,
  presetUno,
  presetWebFonts,
  transformerVariantGroup,
} from "unocss";
import { theme } from "unocss/preset-mini";
import presetTheme from "unocss-preset-theme";
import { readFileSync } from "node:fs";

const _defaultTheme = {
  colors: {
    primary: theme.colors.blue,
    danger: theme.colors.rose,
    info: theme.colors.cyan,
    warning: theme.colors.amber,
    success: theme.colors.green,
    neutral: theme.colors.slate,
  },
};

export default defineConfig({
  content: {
    pipeline: {
      include: [/\.(vue|ts|html)($|\?)/, /^.*?\bheart-ui\b.*?\.js($|\?)/],
    },
  },
  preflights: [
    {
      getCSS: () => {
        const reset = readFileSync(
          "./node_modules/@unocss/reset/tailwind-compat.css"
        )
          .toString()
          .replace(
            "font-family: ui-sans-serif",
            "font-family: Inter, ui-sans-serif"
          );
        return reset;
      },
    },
  ],
  theme: _defaultTheme,
  presets: [
    presetUno(),
    presetWebFonts({ fonts: { sans: "Inter:400,600" } }),
    presetTheme({ theme: { light: _defaultTheme }, prefix: "--un-theme" }),
  ],
  shortcuts: Object.fromEntries(
    ["4xl", "3xl", "2xl", "xl", "lg", "base"].map((item, index) => [
      `heading-${index + 1}`,
      `font-semibold text-${item}`,
    ])
  ),
  transformers: [transformerVariantGroup()],
});
