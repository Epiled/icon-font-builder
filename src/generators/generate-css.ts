// Step: 5 - CSS

import fs from "fs";
import path from "path";
import url from "url";
import handlebars from "handlebars";

import { CssResult, IconGlyph } from "../core/types.js";
import { ResolvedConfig } from "#config/types.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsTemplatePath = path.resolve(__dirname, "../../templates/icons.css.hbs");

const baseIconTemplatePath = path.resolve(
  __dirname,
  "../../templates/base-icons.hbs",
);

if (!fs.existsSync(baseIconTemplatePath))
  throw new Error(`Base icons template not found: ${baseIconTemplatePath}`);

if (!fs.existsSync(iconsTemplatePath)) {
  throw new Error(`Template CSS not found: ${iconsTemplatePath}`);
}

handlebars.registerPartial(
  "base-icons",
  fs.readFileSync(baseIconTemplatePath, "utf8"),
);

const cssRaw = fs.readFileSync(iconsTemplatePath, "utf8");
const cssTemplate = handlebars.compile(cssRaw);

function generateCss(glyphs: IconGlyph[] = [], config: ResolvedConfig): CssResult {
  const { font, css } = config;
  const { fontName, folderName, fontFileName, fontPath } = font;
  const { cssClass, cssFileName } = css;

  if (!Array.isArray(glyphs)) {
    throw new Error(
      "⚠️ generateCss called without valid glyphs array. This task should never run in isolation — it must be triggered by iconsBuild.",
    );
  }

  const outputPath = path.join("dist/css", `${cssFileName}.css`);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  const cssOutput = cssTemplate({
    fontName,
    folderName,
    fontFileName,
    fontPath,
    cssClass,
    glyphs,
  });

  fs.writeFileSync(outputPath, cssOutput);

  return { outputPath, cssOutput };
}

export { generateCss };
