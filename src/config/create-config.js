// Function to create custom configuration

export function createConfig(userConfig = {}) {
  const iconsName = userConfig.iconsName || "Epiled";

  const fontName = userConfig.font?.fontName || iconsName;

  const config = {
    inputDir: userConfig.inputDir || "src/assets/svg/icons-ui",
    outputDir: userConfig.outputDir || `dist/assets/fonts/${fontName}`,
    iconsName,

    font: {
      fontName: userConfig.font?.folderName || fontName,
      folderName: userConfig.font?.folderName || fontName,
      fontFileName: userConfig.font?.fontFileName || fontName,
      fontPath: userConfig.font?.fontPath || "../assets/fonts",
    },

    css: {
      cssClass: userConfig.css?.cssClass || "icon-",
      cssFileName: userConfig.css?.cssFileName || fontName.toLowerCase(),
    },
  };

  return config;
}
