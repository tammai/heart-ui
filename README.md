# Heart UI

A versatile and customizable UI library for Nuxt, delivered as a Nuxt layer for seamless integration. Built with TailwindCSS v4, VueUse, and official Nuxt modules, it provides a modern, efficient foundation for scalable and maintainable applications. Open-source and developer-friendly, Heart UI enhances both productivity and user experience.

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
}
// ...
```

### Theme Configuration

- `loadTheme` This config is enable by default, it will load default theme. If you plan to use your own Tailwind theme configuration, set it to `false`.
- `loadDarkTheme` This config will load default dark theme, default is `false`.

## TypeScript

If you have problem with intellisense in VS Code, that cannot suggest hints for components. Consider to install [Nuxt Extension Pack](https://marketplace.visualstudio.com/items?itemName=Nuxtr.nuxt-vscode-extentions).
