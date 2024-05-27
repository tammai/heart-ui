// uno.config.ts
import {
  defineConfig,
  presetUno,
  presetWebFonts,
  transformerVariantGroup,
} from "unocss";
import { theme } from "unocss/preset-mini";

export default defineConfig({
  content: {
    pipeline: {
      include: [/\.(vue|ts|html)($|\?)/, /^.*?\bheart-ui\b.*?\.js($|\?)/],
    },
  },
  preflights: [
    { getCSS: () => `html{font-family:Inter,${theme.fontFamily.sans}}` },
  ],
  theme: {
    colors: {
      primary: theme.colors.blue,
      danger: theme.colors.rose,
      info: theme.colors.cyan,
      warning: theme.colors.amber,
      success: theme.colors.green,
      neutral: theme.colors.slate,
    },
  },
  presets: [presetUno(), presetWebFonts({ fonts: { sans: "Inter:400,600" } })],
  shortcuts: {
    "heading-1": "text-4xl font-semibold",
    "heading-2": "text-3xl font-semibold",
    "heading-3": "text-2xl font-semibold",
    "heading-4": "text-xl font-semibold",
    "heading-5": "text-lg font-semibold",
  },
  transformers: [transformerVariantGroup()],
});
