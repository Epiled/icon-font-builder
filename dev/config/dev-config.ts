// Default configuration

import { UserConfig } from "#src/config/types.ts";

const fontName = "Epiled";

const devConfig: UserConfig = {
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
  stripPrefix: null,
  codepointsFile: "dist/codepoints.json"
};

export { devConfig };
