// uno.config.ts
import { defineConfig } from 'unocss'

export default defineConfig({
  // ...UnoCSS options
  content: {
    pipeline: {
      include: [/\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/, '../dist/**/*.js']
    }
  },
  theme: {
    colors: {
      primary: {
        50: '#e7f0fe',
        100: '#c4dafc',
        200: '#9dc1fb',
        300: '#76a8f9',
        400: '#5895f7',
        500: '#3b82f6',
        600: '#357af5',
        700: '#2d6ff3',
        800: '#2665f2',
        900: '#1952ef',
        0.5: '#e7f0fe',
        1: '#c4dafc',
        2: '#9dc1fb',
        3: '#76a8f9',
        4: '#5895f7',
        5: '#3b82f6',
        6: '#357af5',
        7: '#2d6ff3',
        8: '#2665f2',
        9: '#1952ef'
      }
    }
  }
})
