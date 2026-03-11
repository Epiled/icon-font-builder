// Step: 5

import fs from "fs";
import path from "path";
import url from "url";
import handlebars from "handlebars";

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

handlebars.registerPartial(
  "base-icons",
  fs.readFileSync(baseIconTemplatePath, "utf8"),
);

function generateSass(glyphs = [], config) {
  const { font, cssClass } = config;
  const { fontName, folderName, fontFileName, fontPath } = font;

  if (!fs.existsSync(iconsTemplatePath)) {
    throw new Error(`Template SASS not found: ${iconsTemplatePath}`);
  }

  if (!Array.isArray(glyphs)) {
    throw new Error(
      "⚠️ generateSass called without valid glyphs array. This task should never run in isolation — it must be triggered by iconsBuild.",
    );
  }

  const outputPath = path.join("dist/sass", `_${fontFileName}.scss`);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  const sassRaw = fs.readFileSync(iconsTemplatePath, "utf8");
  const sassCompiled = handlebars.compile(sassRaw);

  const sassParse = sassCompiled({
    fontName,
    folderName,
    fontFileName,
    fontPath,
    cssClass,
    glyphs,
  });

  fs.writeFileSync(outputPath, sassParse);
}

export { generateSass };
