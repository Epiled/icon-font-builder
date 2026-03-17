import { createConfig } from "./config/create-config.js";
import { UserConfig } from "./config/types.js";

import { IconGlyph } from "./core/types.js";
import { scanIcons } from "./core/scan-icons.js";
import { saveUnicodeMap } from "./core/save-unicode-map.js";
import { normalizeIcons } from "./core/normalize-naming.js";
import { assignCodepoints } from "./core/assign-codepoints.js";
import { saveCodepointMap } from "./cache/save-codepoint-map.js";
import { buildSvgFont } from "./core/build-svg-font.js";
import { convertFonts } from "./core/convert-fonts.js";

import { generatePreview } from "./generators/generate-preview.js";

import { loadCodepointMap } from "./cache/load-codepoint-map.js";
import { generateStyles } from "./generators/generate-styles.js";

export async function buildIcons(userConfig: UserConfig = {}): Promise<IconGlyph[]> {
  const config = createConfig(userConfig);

  const scanned = scanIcons(config.inputDir);
  const normalized = normalizeIcons(scanned, config);

  const cache = loadCodepointMap(config.codepointsFile);
  const icons = assignCodepoints(normalized, cache);

  const glyphs = saveUnicodeMap(icons);

  await saveCodepointMap(glyphs, config.codepointsFile);
  await buildSvgFont(glyphs, config);
  await convertFonts(config);

  if(config.templates.styles?.generation) {
    await generateStyles(glyphs, config);
  }

  if(config.templates.preview?.generation) {
    await generatePreview(glyphs, config);
  }

  console.log("End Generation Font Icon");

  return glyphs;
}
