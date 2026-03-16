import { describe, it, expect } from "vitest";

import fs from "fs";
import path from "path";
import url from "url";

import { createConfig } from "#src/config/create-config.js";

import { generateCss } from "#src/generators/generate-css.js";

import { IconGlyph } from "#src/core/types.ts";
import { ResolvedConfig } from "#src/config/types.ts";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("generate-css", () => {
  const iconsDir = path.join(__dirname, "fixtures/icons");
  const glyph = {
      name: "icon-test", 
      path: "dev/assets/svg/icons-ui/icon-add-user.svg",
      unicode: "e001",
      codepoint: 57345,
      unicodeHex: "e001",
    }

  it("should generate css file", () => {
    const glyphs: IconGlyph[] = [glyph];

    const config = createConfig({ iconsName: "Test-Icons" });

    const result = generateCss(glyphs, config);

    expect(result.outputPath).toContain("test-icons.css");
    expect(result.cssOutput).toContain("icon-test");
  });

  it("should throw error when has not valid glyphs array", () => {
    const config = { font: {}, css: {} };

    expect(() => generateCss("wrong" as unknown as IconGlyph[], config as unknown as ResolvedConfig)).toThrow(
      /⚠️ generateCss called without valid glyphs array. This task should never run in isolation — it must be triggered by iconsBuild./,
    );
  });

  it("should write css file to disk", () => {
    const glyphs: IconGlyph[] = [glyph];

    const config = createConfig({
      iconsName: "Test-Icons",
      inputPath: iconsDir,
    });

    const result = generateCss(glyphs, config);

    expect(fs.existsSync(result.outputPath)).toBe(true);
  });
});
