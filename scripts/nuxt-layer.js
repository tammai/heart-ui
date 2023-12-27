import fs from "node:fs";
import path from "path";

const sources = ["components", "composables", "utils"];
const destination = path.resolve("./dist/nuxt-layer/");

fs.rmSync(destination, { recursive: true, force: true });
fs.mkdirSync(destination);

fs.copyFileSync(
  path.resolve("./src/nuxt/nuxt.config.ts"),
  destination + "/nuxt.config.ts"
);

sources.forEach((source) =>
  fs.cpSync(path.resolve(`./src/${source}`), `${destination}/${source}/`, {
    recursive: true,
  })
);

console.log("\x1b[32m✓ Nuxt Layer");
