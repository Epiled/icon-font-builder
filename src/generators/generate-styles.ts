import { ResolvedConfig } from "#src/config/types.js";
import { CssResult, IconGlyph, SassResult } from "#src/core/types.js";

import { generateCss } from "./generate-css.js";
import { generateSass } from "./generate-sass.js";

const generators = {
  css: generateCss,
  sass: generateSass
}

export async function generateStyles(glyphs: IconGlyph[], config: ResolvedConfig): Promise<(CssResult | SassResult | null)[]> {

  const tasks = config.formats.map((format) => {
    const generator = generators[format];
    return generator ? generator(glyphs, config) : null;
  });

  const results = await Promise.all(tasks);

  return results.filter(Boolean);
}