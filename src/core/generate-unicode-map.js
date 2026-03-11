// Step: 2

function generateUnicodeMap(icons) {
  const baseCode = 0xe001;

  return icons
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((icon, index) => {
      const code = baseCode + index;

      return {
        ...icon,
        unicode: String.fromCharCode(code),
        codepoint: code,
        unicodeHex: code.toString(16),
      };
    });
}

export { generateUnicodeMap };
