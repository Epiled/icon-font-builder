import { describe, it, expect } from "vitest";

import fs from "fs";
import path from "path";
import url from "url";

import { createConfig } from "./src/config/create-config.js";

import { generateCss } from "./src/core/generate-css.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("generate-css", () => {
  const iconsDir = path.join(__dirname, "fixtures/icons");

  it("should generate css file", () => {
    const glyphs = [{ name: "icon-test", unicode: "e001" }];

    const config = createConfig({ iconsName: "Test-Icons" });

    const result = generateCss(glyphs, config);

    expect(result.outputPath).toContain("test-icons.css");
    expect(result.cssOutput).toContain("icon-test");
  });

  it("should throw error when has not valid glyphs array", () => {
    const config = { font: {}, css: {} };

    expect(() => generateCss("wrong", config)).toThrow(
      "⚠️ generateCss called without valid glyphs array. This task should never run in isolation — it must be triggered by iconsBuild.",
    );
  });

  it("should write css file to disk", () => {
    const glyphs = [{ name: "icon-test", unicode: "e001" }];

    const config = createConfig({
      iconsName: "Test-Icons",
      inputPath: iconsDir,
    });

    const result = generateCss(glyphs, config);

    expect(fs.existsSync(result.outputPath)).toBe(true);
  });
});
