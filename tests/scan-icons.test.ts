import { describe, it, expect } from "vitest";
import { scanIcons } from "#src/core/scan-icons.js";

import fs from "fs";
import path from "path";
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("scan-icons", () => {
  const iconsDir = path.join(__dirname, "fixtures/icons");

  it("should throw error when icons directory does not exist", () => {
    expect(() => scanIcons("./invalid")).toThrow(/Icons directory not found:/);
  });

  it("should throw error when directory has no svg files", () => {
    const tempDir = path.join(__dirname, "temp");

    fs.mkdirSync(tempDir, { recursive: true });

    expect(() => scanIcons(tempDir)).toThrow(
      /Not found files inside directory:/,
    );

    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it("should scan svg icons from directory", () => {
    const icons = scanIcons(iconsDir);
    expect(icons.length).toBeGreaterThan(0);
  });
});
