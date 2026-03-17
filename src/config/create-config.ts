import { CssConfig, FontConfig, ResolvedConfig, TemplateConfig, UserConfig } from "./types.js";

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
export function createConfig<T = Record<string, unknown>>(userConfig: UserConfig<T> = {} as UserConfig<T>): ResolvedConfig<T> {
  const iconsName = userConfig.iconsName || "Icons";

  const defaultFont: Required<FontConfig> = {
    fontName: iconsName,
    folderName: iconsName,
    fontFileName: iconsName,
    fontPath: "../fonts",
  };

  const defaultCss: Required<CssConfig> = {
    cssClass: "icon",
    cssFileName: iconsName.toLowerCase(),
  };

  const defaultTemplates: Required<TemplateConfig> = {
    styles: {
      generation: true,
      outputDir: "dist",
    },
    preview: {
      generation: true,
      outputDir: "dist",
    },
  }

  const config: ResolvedConfig<T> = {
    ...userConfig,

    iconsName,
    inputDir: userConfig.inputDir ?? "src/icons",
    outputDir:
      userConfig.outputDir ??
      `dist/fonts/${userConfig.font?.fontName ?? iconsName}`,

    font: {
      ...defaultFont,
      ...(userConfig.font),
    },

    css: {
      ...defaultCss,
      ...(userConfig.css),
    },
    
    templates: {
      styles: {
        ...defaultTemplates.styles,
        ...userConfig.templates?.styles,
      },
      preview: {
        ...defaultTemplates.preview,
        ...userConfig.templates?.preview,
      },
    },

    formats: ["css"],
    stripPrefix: userConfig.stripPrefix ?? null,
    codepointsFile: userConfig.codepointsFile ?? ".icon-builder-cache",
  };

  return config;
}
