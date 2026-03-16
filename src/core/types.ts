import { ReadStream } from "fs";

export interface Icon {
  name: string;
  path: string;
}

export interface IconGlyph extends Icon {
  unicode: string;
  codepoint: number;
  unicodeHex: string;
}

export interface SassResult {
  outputPath: string;
  sassOutput: string;
}

export interface CssResult {
  outputPath: string;
  cssOutput: string;
}

export type GlyphStream = ReadStream & {
  metadata: {
    unicode: string[];
    name: string;
  };
};
