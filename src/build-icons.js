import { createConfig } from "./config/create-config.js";

import { scanIcons } from "./core/scan-icons.js";
import { normalizeIcons } from "./core/normalize-naming.js";
import { generateUnicodeMap } from "./core/generate-unicode-map.js";
import { buildSvgFont } from "./core/build-svg-font.js";
import { convertFonts } from "./core/convert-fonts.js";
import { generateSass } from "./core/generate-sass.js";
import { generateCss } from "./core/generate-css.js";
import { generatePreview } from "./core/generate-preview.js";

export async function buildIcons(userConfig = {}) {
  const config = createConfig(userConfig);

  const icons = scanIcons(config.inputDir);

  const iconsNormalized = normalizeIcons(icons, config);

  const glyphs = generateUnicodeMap(iconsNormalized);

  await buildSvgFont(glyphs, config);

  await convertFonts(config);

  if (process.argv.slice(2).includes("--sass")) {
    await generateSass(glyphs, config);
  } else {
    await generateCss(glyphs, config);
  }

  await generatePreview(glyphs, config);

  return glyphs;
}
