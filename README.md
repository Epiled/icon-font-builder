# icon-font-builder

Generate icon fonts from SVG files.

## Install

npm install @epiled/icon-font-builder

## CLI

npx @epiled/icon-font-builder

## Node API

import { buildIcons } from "icon-font-builder";

await buildIcons({
inputDir: "src/icons",
outputDir: "dist/fonts",
cssClass: "icon",
fontName: "icons"
});
