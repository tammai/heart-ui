import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "HeartUI",
  description: "The UI Library for Vue/Nuxt lovers",
  head: [["link", { rel: "icon", href: "/heart.svg", type: "image/svg+xml" }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/heart.svg",

    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/tammai/heart-ui" },
    ],
  },
});
