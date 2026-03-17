export interface FontConfig {
  fontName?: string;
  folderName?: string;
  fontFileName?: string;
  fontPath?: string;
}

export interface CssConfig {
  cssClass?: string;
  cssFileName?: string;
}

export interface TemplateConfig {
  styles?: {
    generation?: boolean,
    outputDir?: string,
  },
  preview?: {
    generation?: boolean,
    outputDir?: string,
  },
}

export type Styles = "css" | "sass";

export type UserConfig<T = Record<string, unknown>> = {
  iconsName?: string;
  inputDir?: string;
  outputDir?: string;
  font?: FontConfig,
  css?: CssConfig,
  formats?: Styles[];
  templates?: TemplateConfig;
  stripPrefix?: string | null,
  codepointsFile?: string | null;
} & T

export type ResolvedConfig<T = Record<string, unknown>> = {
  iconsName: string;
  inputDir: string;
  outputDir: string;
  font: Required<FontConfig>
  css: Required<CssConfig>
  formats: Styles[];
  templates: Required<TemplateConfig>;
  codepointsFile: string;
} & T