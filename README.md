[![Heart UI](./public/github-cover.svg 'Heart UI')](https://heart.nuxt.dev)

# 💖 Heart UI

**Heart UI** is a simple, beautiful and customizable UI component library for [Nuxt](https://nuxt.com), delivered as a Nuxt layer for seamless integration.
Built on top of Tailwind CSS and official Nuxt modules, designed to help developers build clean and consistent user interfaces faster.

![MIT License](https://img.shields.io/github/license/tammai/heart-ui)
![Nuxt](https://img.shields.io/badge/nuxt-3-green?logo=nuxt.js)
![Made with Vue](https://img.shields.io/badge/made--with-vue-green?logo=vue.js)

---

## 🚀 Features

- 📦 Pre-built components for common UI patterns
- 🎨 Customizable with Tailwind CSS classes
- ⚡ Zero-config setup with Nuxt 3 layer support
- 📘 Developer-friendly documentation _(in progress)_
- 🌱 Lightweight and composable

---

## 📦 Installation

No need to install any dependencies, just add the Heart UI layer to your Nuxt project and you're good to go!

## 🔧 Usage

```typescript [nuxt.config.ts]
// nuxt.config.ts
extends: [
  ['github:tammai/heart-ui', { install: true }]
],
```

In your component:

```html
<template>
  <HButton>Click me</HButton>
</template>
```

## 📚 Documentation

Full documentation is coming soon at https://heart.nuxt.dev.

Stay tuned! 🚧

## 🛠️ Development

Clone the repo and start the playground locally:

```bash
git clone https://github.com/tammai/heart-ui.git
cd heart-ui
pnpm install
pnpm dev
```

Then open your browser and navigate to `http://localhost:3000` to see the Heart UI components in action.

## 🤝 Contributing

Contributions are welcome!
Please open an issue or submit a pull request.

## 💬 Feedback

Have suggestions or ideas? Feel free to open an [issue](https://github.com/tammai/heart-ui/issues) or reach out!

## 📄 License

MIT © Tam Mai
