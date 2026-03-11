import { scanIcons } from "./core/scan-icons.js";
import { normalizeIcons } from "./core/normalize-naming.js";
import { generateUnicodeMap } from "./core/generate-unicode-map.js";
import { buildSvgFont } from "./core/build-svg-font.js";
import { convertFonts } from "./core/convert-fonts.js";
import { generateCss } from "./core/generate-css.js";
import { generatePreview } from "./core/generate-preview.js";

export async function buildIcons(userConfig = {}) {
  const config = {
    fontName: "fitness-icons",
    folderName: "fitness-icons",
    fontPath: "../assets/fonts",
    dist: "dist",
    cssClass: "icon-",
    ...userConfig,
  };

  const icons = scanIcons("src/assets/svg/icons-ui");

  const iconsNormalized = normalizeIcons(icons, config);

  const glyphs = generateUnicodeMap(iconsNormalized);

  await buildSvgFont(glyphs, config);

  await convertFonts(config);

  await generateCss(glyphs, config);

  await generatePreview(glyphs, config);
}
