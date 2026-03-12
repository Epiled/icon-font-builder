import { describe, it, expect } from "vitest";
import { createConfig } from "./src/config/create-config.js";

describe("create-config", () => {
  it("should return a config object", () => {
    const config = createConfig({
      iconsName: "Test-Icons",
    });

    expect(config).toBeTypeOf("object");
  });

  it("should use default values", () => {
    const config = createConfig({});

    expect(config).toHaveProperty("inputDir");
  });

  it("should keep provided root values", () => {
    const config = createConfig({
      iconsName: "Test-Icons",
    });

    expect(config.iconsName).toBe("Test-Icons");
  });

  it("should keep nested config values", () => {
    const config = createConfig({
      font: { fontName: "Test-Icons" },
    });

    expect(config.font.fontName).toBe("Test-Icons");
  });
});
