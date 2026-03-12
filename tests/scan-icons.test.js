import { describe, it, expect } from "vitest";
import { scanIcons } from "../src/core/scan-icons.js";

import path from "path";
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("scan-icons", () => {
  const iconsDir = path.join(__dirname, "fixtures/icons");
  const emptyDir = path.join(__dirname, "fixtures/empty");

  it("should throw error when icons directory does not exist", () => {
    expect(() => scanIcons("./invalid")).toThrow("Icons directory not found:");
  });

  it("should throw error when directory has no svg files", () => {
    expect(() => scanIcons(emptyDir)).toThrow(
      "Not found files inside directory:",
    );
  });

  it("should scan svg icons from directory", () => {
    const icons = scanIcons(iconsDir);
    expect(icons.length).toBeGreaterThan(0);
  });
});
