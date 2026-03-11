// Step: 3

import fs from "fs";
import path from "path";

async function buildSvgFont(icons, options) {
  const { SVGIcons2SVGFontStream } = await import("svgicons2svgfont");

  const { fontName, dist } = options;

  const fontPath = path.join(dist, `${fontName}.svg`);

  return new Promise((resolve, reject) => {
    const fontStream = new SVGIcons2SVGFontStream({
      fontName,
      normalize: true,
      fontHeight: 1000,
    });

    const writeStream = fs.createWriteStream(fontPath);

    fontStream.pipe(writeStream);

    writeStream.on("finish", resolve);
    writeStream.on("error", reject);

    icons.forEach((icon) => {
      const glyph = fs.createReadStream(icon.path);

      glyph.metadata = {
        unicode: [icon.unicode],
        name: icon.name,
      };
      fontStream.write(glyph);
    });

    fontStream.end();
  });
}

export { buildSvgFont };
