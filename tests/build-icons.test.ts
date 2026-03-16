import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { buildIcons } from "#src/build-icons.ts";

import fs from "fs";
import path from "path";
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST = path.join(process.cwd(), "dist");

describe.sequential("build-icons", () => {
  it("should generate glyph map from svg files", async () => {
    const iconsDir = path.join(__dirname, "fixtures/icons");

    const result = await buildIcons({
      inputDir: iconsDir,
    });

    expect(result.length).toBe(2);

    fs.rmSync(DIST, { recursive: true, force: true });
  });
});
