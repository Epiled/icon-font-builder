/**
 * Creates a custom configuration for the icon builder.
 *
 * @warning
 * ⚠️ The iconsName must be unique to avoid CSS conflicts.
 *
 * @example
 * import { createConfig } from "@epiled/icon-font-builder"
 *
 * const config = createConfig({
 *   iconsName: "MyIcons"
 * })
 */

export function createConfig(userConfig = {}) {
  const iconsName = userConfig.iconsName || "Icons";

  const defaultFont = {
    fontName: iconsName,
    folderName: iconsName,
    fontFileName: iconsName,
    fontPath: "../fonts",
  };

  const defaultCss = {
    cssClass: "icon",
    cssFileName: iconsName.toLowerCase(),
  };

  const config = {
    iconsName,
    inputDir: userConfig.inputDir || "src/icons",
    outputDir:
      userConfig.outputDir ||
      `dist/fonts/${userConfig.font?.fontName || iconsName}`,

    font: {
      ...defaultFont,
      ...(userConfig.font || {}),
    },
    css: {
      ...defaultCss,
      ...(userConfig.css || {}),
    },

    ...userConfig.extra,
  };

  return config;
}
