[![Heart UI](./public/github-cover.svg 'Heart UI')](https://heart.nuxt.dev)

Heart UI is a versatile and customizable UI library for Nuxt, delivered as a Nuxt layer for seamless integration. Built on top of Tailwind CSS and official Nuxt modules.

## Setup

```typescript [nuxt.config.ts]
// nuxt.config.ts
// ...
extends: [
  ['github:tammai/heart-ui', { install: true }]
],
heart: {
  loadTheme: true,
  loadDarkTheme: false,
  // Override default theme
  theme: {
    'font-family': '"Be Vietnam Pro", sans-serif'
    'color-primary': 'rose',
    'color-neutral': 'zinc'
  }
}
// ...
```

### Theme Configuration

- `loadTheme` This config is enable by default, it will load default theme. If you plan to use your own Tailwind theme configuration, set it to `false`.
- `loadDarkTheme` This config will load default dark theme, default is `false`.
- `theme` This config is for customize Tailwind theme, optional, full documentation at https://heart.nuxt.dev

## TypeScript

If VS Code doesn't show intellisense for components, install [Nuxt Extension Pack](https://marketplace.visualstudio.com/items?itemName=Nuxtr.nuxt-vscode-extentions).
