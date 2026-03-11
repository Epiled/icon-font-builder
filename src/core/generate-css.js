// Step: 5

import fs from "fs";
import path from "path";
import url from "url";
import handlebars from "handlebars";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsTemplatePath = path.resolve(__dirname, "../templates/icons.css.hbs");

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

function generateCss(glyphs = [], config) {
  console.log("Config", glyphs);
  if (!fs.existsSync(iconsTemplatePath)) {
    throw new Error(`Template CSS not found: ${iconsTemplatePath}`);
  }

  if (!Array.isArray(glyphs)) {
    throw new Error(
      "⚠️ generateCss called without valid glyphs array. This task should never run in isolation — it must be triggered by iconsBuild.",
    );
  }

  const cssRaw = fs.readFileSync(iconsTemplatePath, "utf8");
  const cssCompiled = handlebars.compile(cssRaw);

  const cssParse = cssCompiled({
    fontName: config.fontName,
    folderName: config.folderName,
    fontPath: config.fontPath,
    cssClass: config.cssClass,
    glyphs,
  });

  const outputPath = path.join("dist", `${config.folderName}.css`);

  fs.writeFileSync(outputPath, cssParse);
}

export { generateCss };
