import { describe, it, expect } from "vitest";

import fs from "fs";
import path from "path";
import url from "url";

import { createConfig } from "#src/config/create-config.js";

import { generateSass } from "#src/generators/generate-sass.js";

import { IconGlyph } from "#src/core/types.ts";
import { ResolvedConfig } from "#src/config/types.ts";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("generate-sass", () => {
  const iconsDir = path.join(__dirname, "fixtures/icons");
  const glyph = {
      name: "icon-test", 
      path: "./",
      unicode: "e001",
      codepoint: 0,
      unicodeHex: "",
    }

  it("should generate sass file", () => {
    const glyphs: IconGlyph[] = [glyph];

    const config = createConfig({ iconsName: "Test-Icons" });

    const result = generateSass(glyphs, config);

    expect(result.outputPath).toContain("_test-icons.scss");
    expect(result.sassOutput).toContain("icon-test");
  });

  it("should throw error when has not valid glyphs array", () => {
    const config = { font: {}, css: {} };

    expect(() => generateSass("wrong" as unknown as IconGlyph[], config as unknown as ResolvedConfig)).toThrow(
      /⚠️ generateSass called without valid glyphs array. This task should never run in isolation — it must be triggered by iconsBuild./,
    );
  });

  it("should write sass file to disk", () => {
    const glyphs: IconGlyph[] = [glyph];

    const config = createConfig({
      iconsName: "Test-Icons",
      inputPath: iconsDir,
    });

    const result = generateSass(glyphs, config);

    expect(fs.existsSync(result.outputPath)).toBe(true);
  });
});
