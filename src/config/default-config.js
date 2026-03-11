// Default configuration

const fontName = "Epiled";

const defaultConfig = {
  inputDir: "src/assets/svg/icons-ui",
  outputDir: `dist/assets/fonts/${fontName}`,
  font: {
    fontName: fontName,
    folderName: fontName,
    fontFileName: fontName,
    fontPath: "../assets/fonts",
  },
  css: {
    cssClass: "icon-",
    cssFileName: fontName.toLowerCase(),
  },
};

export { defaultConfig };
