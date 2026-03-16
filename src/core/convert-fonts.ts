// Step: 4

import fs from "fs";
import path from "path";

import svg2ttf from "svg2ttf";
import ttf2woff from "ttf2woff";
import ttf2woff2 from "ttf2woff2";

import { ResolvedConfig } from "#config/types.js";

async function convertFonts(config: ResolvedConfig): Promise<void> {
  const { font, outputDir } = config;
  const { fontName } = font;

  const svgPath = path.join(outputDir, `${fontName}.svg`);
  const ttfPath = path.join(outputDir, `${fontName}.ttf`);
  const woffPath = path.join(outputDir, `${fontName}.woff`);
  const woff2Path = path.join(outputDir, `${fontName}.woff2`);

  const svg = fs.readFileSync(svgPath, "utf8");

  // SVG → TTF
  const ttf = svg2ttf(svg, {});
  fs.writeFileSync(ttfPath, Buffer.from(ttf.buffer));

  // TTF → WOFF
  const woff = ttf2woff(ttf.buffer);
  fs.writeFileSync(woffPath, Buffer.from(woff.buffer));

  // TTF → WOFF2
  const woff2 = ttf2woff2(ttf.buffer);
  fs.writeFileSync(woff2Path, Buffer.from(woff2));
}
export { convertFonts };
