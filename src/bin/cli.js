#!/usr/bin/env node

import { buildIcons } from "../build-icons";

const config = {
  inputDir: "src/icons",
  outputDir: "dist/fonts",
  cssFile: "dist/icons.css",
  cssClass: "icon",
  fontName: "icons",
};

await buildIcons(config);

console.log("Icons generated!");
