// Step: 1

import fs from "fs";
import path from "path";

function scanIcons(dir) {
  if (!fs.existsSync(dir)) {
    throw new Error(`Icons directory not found: ${dir}`);
  }

  const files = fs.readdirSync(dir);

  if (files.length <= 0) {
    throw new Error(`Not found files inside directory: ${dir}`);
  }

  const icons = files
    .filter((file) => file.endsWith(".svg"))
    .sort()
    .map((file) => ({
      name: path.basename(file, ".svg"),
      path: path.join(dir, file).replace(/\\/g, "/"),
    }));

  return icons;
}

export { scanIcons };
