// Step: 6

import fs from "fs";
import path from "path";
import url from "url";
import handlebars from "handlebars";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const previewTemplatePath = path.resolve(
  __dirname,
  "../templates/icons-preview.hbs",
);

function generatePreview(glyphs = [], config) {
  const { font, css } = config;
  const { fontName } = font;
  const { cssClass, cssFileName } = css;

  if (!fs.existsSync(previewTemplatePath)) {
    throw new Error(`Template preview not found: ${previewTemplatePath}`);
  }

  if (!Array.isArray(glyphs)) {
    throw new Error(
      "⚠️ generatePreview called without valid glyphs array. This task should never run in isolation — it must be triggered by iconsBuild.",
    );
  }

  const previewRaw = fs.readFileSync(previewTemplatePath, "utf8");
  const previewComplied = handlebars.compile(previewRaw);

  const previewParse = previewComplied({
    fontName,
    cssClass,
    cssFileName,
    glyphs,
  });

  const outputPath = path.join("dist", `icons-preview.html`);

  fs.writeFileSync(outputPath, previewParse);
}

export { generatePreview };
