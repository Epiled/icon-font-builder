# Icon Font Builder

Generate icon fonts from SVG files and automatically create CSS classes.

<p>
  <a href="https://www.npmjs.com/package/@epiled/icon-font-builder">
    <img src="https://img.shields.io/npm/v/@epiled/icon-font-builder" alt="npm version">
  </a>
  <a href="https://www.npmjs.com/package/@epiled/icon-font-builder">
    <img src="https://img.shields.io/npm/dw/@epiled/icon-font-builder" alt="downloads">
  </a>
  <a href="https://github.com/Epiled/icon-font-builder/actions">
    <img src="https://img.shields.io/github/actions/workflow/status/Epiled/icon-font-builder/test.yml?label=tests" alt="tests">
  </a>
  <img src="https://img.shields.io/npm/l/@epiled/icon-font-builder" alt="license">
</p>

## Table of Contents

- [Install](#install)
- [CLI](#cli)
- [Node API](#node-api)
- [Usage](#usage)
- [Examples](#examples)
  - [Gulp](#gulp)
    - [Minimal configuration](#minimal-configuration)
    - [Recommended configuration](#recommended-configuration)
    - [Full configuration](#full-configuration)
- [Options](#options)
- [Requirements](#requirements)
- [Author](#author)
- [License](#license)

## Features

- Generate icon fonts from SVG files
- Automatic CSS class generation
- CLI and Node API support
- Customizable output structure
- Automatic icons preview page

## Install

```bash
npm install @epiled/icon-font-builder
```

## CLI

```bash
npx @epiled/icon-font-builder
```

## Node API

```js
import { buildIcons } from "@epiled/icon-font-builder";

await buildIcons();
```

## Usage

After building the icons, include the generated CSS in your project:

```html
<link rel="stylesheet" href="css/icons.css" />
```

Then use the icons with CSS classes:

```html
<i class="icon-add-user"></i>
<i class="icon-arrow"></i>
```

## Examples

### Gulp

Example using Gulp task runner.

#### Minimal configuration

```js
import gulp from "gulp";
import { buildIcons } from "@epiled/icon-font-builder";

gulp.task("buildIcons", async function () {
  await buildIcons();
});
```

##### Example Project Structure:

```text
src/
├── icons/
|  ├── add-user.svg
|  └── arrow.svg
```

##### Output Tree:

```text
dist/
├── css/
|  └── icons.css
├── fonts/
|  └── Icons/
|     ├── Icons.svg
|     ├── Icons.ttf
|     ├── Icons.woff
|     └── Icons.woff2
└── icons-preview.html
```

##### Output CSS:

```css
@font-face {
  font-family: "Icons";
  src:
    url("../fonts/Icons/Icons.woff2") format("woff2"),
    url("../fonts/Icons/Icons.woff") format("woff"),
    url("../fonts/Icons/Icons.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

[class^="icon-"],
[class*=" icon-"] {
  font-family: "Icons" !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-add-user::before {
  content: "\e001";
}

.icon-arrow::before {
  content: "\e002";
}
```

#### Recommended configuration

```js
import gulp from "gulp";
import { buildIcons } from "@epiled/icon-font-builder";

gulp.task("buildIcons", async function () {
  await buildIcons({iconsName: "Epl-Icons"});
});
```

##### Output Tree:

```text
dist/
├── Epl-Icons/
│   └── Epl-Icons/
│       ├── Epl-Icons.svg
│       ├── Epl-Icons.ttf
│       ├── Epl-Icons.woff
│       └── Epl-Icons.woff2
├── css/
│   └── epl-icons.css
└── icons-preview.html
```

##### Output CSS:

```css
@font-face {
  font-family: "Epl-Icons";
  src:
    url("../Epl-Icons/Epl-Icons/Epl-Icons.woff2")
      format("woff2"),
    url("../Epl-Icons/Epl-Icons/Epl-Icons.woff")
      format("woff"),
    url("../Epl-Icons/Epl-Icons/Epl-Icons.ttf")
      format("truetype");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

[class^="icon-"],
[class*=" icon-"] {
  font-family: "Epl-Icons" !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-add-user::before {
  content: "\e001";
}

.icon-arrow::before {
  content: "\e002";
}
```

#### Full configuration

```js
import gulp from "gulp";
import { buildIcons } from "@epiled/icon-font-builder";

gulp.task("buildIcons", async function () {
  await buildIcons({
    iconsName: "Icons-All", // required
    inputDir: "src/icons",
    outputDir: `dist/Icons-Output`,
    font: {
      fontName: "Icons-Font-Name",
      folderName: "Icons-Folder-Name",
      fontFileName: "Icons-Font-File-Name",
      fontPath: "../Icons-Font-Path",
    },
    css: {
      cssClass: "icon-all",
      cssFileName: "icons-css-file-name",
    },
    stripPrefix: "icon-", // removes "icon-" prefix from icon filenames
    codepointsFile: ".icon-builder-cache", // experimental: custom path not supported yet: file used to store icon → codepoint mapping
  });
});
```

> ⚠️ **Note**
> `codepointsFile` is currently auto-managed by the builder.  
> Custom paths are not supported yet and will be ignored.

##### Output Tree:

```text
dist/
├── Icons-Output/
│   └── Icons-Folder-Name/
│       ├── Icons-Font-File-Name.svg
│       ├── Icons-Font-File-Name.ttf
│       ├── Icons-Font-File-Name.woff
│       └── Icons-Font-File-Name.woff2
├── css/
│   └── icons-css-file-name.css
└── icons-preview.html
```

##### Output CSS:

```css
@font-face {
  font-family: "Icons-All";
  src:
    url("../Icons-Font-Path/Icons-Folder-Name/Icons-Font-File-Name.woff2")
      format("woff2"),
    url("../Icons-Font-Path/Icons-Folder-Name/Icons-Font-File-Name.woff")
      format("woff"),
    url("../Icons-Font-Path/Icons-Folder-Name/Icons-Font-File-Name.ttf")
      format("truetype");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

[class^="icon-all-"],
[class*=" icon-all-"] {
  font-family: "Icons-All" !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-all-add-user::before {
  content: "\e001";
}

.icon-all-arrow::before {
  content: "\e002";
}
```

## Options

| Option            | Type                 | Default    | Description                                   |
| ----------------- | -------------------- | ---------- | --------------------------------------------- |
| iconsName         | string               | Icons      | Name of the icon set                          |
| inputDir          | string               | src/icons  | Source folder for SVG icons                   |
| outputDir         | string               | dist/fonts | Output directory                              |
| font.fontName     | string               | Icons      | Font name                                     |
| font.folderName   | string               | Icons      | Folder name for font files                    |
| font.fontFileName | string               | Icons      | Font file base name                           |
| font.fontPath     | string               | ../fonts   | Path to font in generated styles              |
| css.cssClass      | string               | icon       | CSS class prefix                              |
| css.cssFileName   | string               | icons      | Name of generated CSS/SASS file               |
| formats           | ("css" \| "sass")[]  | ["css"]    | Output style formats to generate              |
| stripPrefix       | string \| null       | null       | Remove a prefix from icon names               |
| codepointsFile    | string               | —          | File path to store persistent icon codepoints → codepoint mapping (auto-managed) |


## Requirements

- Node.js >= 24.14.0
- npm >= 11.9.0

## Author

- [Felipe de Andrade](https://github.com/Epiled)

## License

[MIT](https://github.com/Epiled/icon-font-builder/blob/main/LICENSE)
