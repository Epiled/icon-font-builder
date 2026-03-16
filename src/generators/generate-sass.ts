// Step: 5 - SASS

import fs from "fs";
import path from "path";
import url from "url";
import handlebars from "handlebars";

import { IconGlyph, SassResult } from "../core/types.js";
import { ResolvedConfig } from "#config/types.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsTemplatePath = path.resolve(
  __dirname,
  "../templates/icons.scss.hbs",
);

const baseIconTemplatePath = path.resolve(
  __dirname,
  "../templates/base-icons.hbs",
);

if (!fs.existsSync(baseIconTemplatePath))
  throw new Error(`Base icons template not found: ${baseIconTemplatePath}`);

if (!fs.existsSync(iconsTemplatePath)) {
  throw new Error(`Template SASS not found: ${iconsTemplatePath}`);
}

handlebars.registerPartial(
  "base-icons",
  fs.readFileSync(baseIconTemplatePath, "utf8"),
);

const sassRaw = fs.readFileSync(iconsTemplatePath, "utf8");
const sassTemplate = handlebars.compile(sassRaw);

function generateSass(glyphs: IconGlyph[] = [], config: ResolvedConfig): SassResult {
  const { font, css } = config;
  const { fontName, folderName, fontFileName, fontPath } = font;
  const { cssClass, cssFileName } = css;

  if (!Array.isArray(glyphs)) {
    throw new Error(
      "⚠️ generateSass called without valid glyphs array. This task should never run in isolation — it must be triggered by iconsBuild.",
    );
  }

  const outputPath = path.join("dist/sass", `_${cssFileName}.scss`);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  const sassOutput = sassTemplate({
    fontName,
    folderName,
    fontFileName,
    fontPath,
    cssClass,
    glyphs,
  });

  fs.writeFileSync(outputPath, sassOutput);

  return { outputPath, sassOutput };
}

export { generateSass };
