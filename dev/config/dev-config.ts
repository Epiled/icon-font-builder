// Devolvement configuration

import { UserConfig } from "#src/config/types.ts";

const fontName = "Epiled";

const devConfig: UserConfig = {
  iconsName: fontName,
  inputDir: "dev/assets/svg/icons-ui",
  outputDir: `.temp/assets/fonts/${fontName}`,

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
      outputDir: ".temp",
    },
    preview: {
      generation: true,
      outputDir: ".temp",
    },
  },

  formats: ["css"],
  stripPrefix: null,
  codepointsFile: ".icon-builder-cache"
};

export { devConfig };
