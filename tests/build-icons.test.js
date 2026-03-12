import { describe, it, expect } from "vitest";
import { buildIcons } from "./src/build-icons";

import path from "path";
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("build-icons", () => {
  it("should generate glyph map from svg files", async () => {
    const iconsDir = path.join(__dirname, "fixtures/icons");

    const result = await buildIcons({
      inputDir: iconsDir,
    });

    expect(result.length).toBe(2);
  });
});
