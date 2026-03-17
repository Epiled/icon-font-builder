import fs from "fs";
import path from "path";

import { IconGlyph } from "../core/types.js";

export function saveCodepointMap(glyphs: IconGlyph[], codepointsFile?: string) {

  const outputPath = path.resolve(process.cwd(), `${codepointsFile}.json`);

  // fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  const map = Object.fromEntries(
    glyphs.map((glyph) => {
    return [
      glyph.name,
      glyph.codepoint,
    ]
  }));

  fs.writeFileSync(outputPath, JSON.stringify(map, null, 2));

}
