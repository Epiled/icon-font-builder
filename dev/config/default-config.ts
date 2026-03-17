// Default configuration

import { UserConfig } from "#src/config/types.ts";

const fontName = "Epiled";

const defaultConfig: UserConfig = {
  iconsName: fontName,
  inputDir: "dev/assets/svg/icons-ui",
  outputDir: `dist/assets/fonts/${fontName}`,

  font: {
    fontName: fontName,
    folderName: fontName,
    fontFileName: fontName,
    fontPath: "../assets/fonts",
  },

  css: {
    cssClass: "icon",
    cssFileName: fontName.toLowerCase(),
  },
  
  templates: {
    styles: {
      generation: true,
      outputDir: "dist",
    },
    preview: {
      generation: true,
      outputDir: "dist",
    },
  },

  formats: ["css"],
  stripPrefix: null,
  codepointsFile: ".icon-builder-cache",
};

export { defaultConfig };
