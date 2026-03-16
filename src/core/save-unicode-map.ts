// Step: 2

import { Icon, IconGlyph } from "./types.js";

function saveUnicodeMap(icons: Icon[]): IconGlyph[] {
  const baseCode = 0xe001;

  return [...icons]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((icon, index) => {
      const code = baseCode + index;

      return {
        ...icon,
        unicode: String.fromCharCode(code),
        codepoint: code,
        unicodeHex: code.toString(16),
      };
    });
}

export { saveUnicodeMap };
