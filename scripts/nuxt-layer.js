import fs from "node:fs";
import path from "path";

const sourceFiles = ["package.json", "nuxt.config.ts"];
const sourceDirs = ["components", "composables", "utils"];
const destination = path.resolve("./dist/nuxt-layer/");

fs.rmSync(destination, { recursive: true, force: true });
fs.mkdirSync(destination);

sourceFiles.forEach((source) =>
  fs.copyFileSync(path.resolve(`./src/${source}`), `${destination}/${source}`)
);

sourceDirs.forEach((source) =>
  fs.cpSync(path.resolve(`./src/${source}`), `${destination}/${source}/`, {
    recursive: true,
  })
);

console.log("\x1b[32m✓ Nuxt Layer");
