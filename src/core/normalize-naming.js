// Step: Normalize

function normalizeIcons(icons = [], config) {
  const prefix = config.cssClass || "";

  return icons.map((icon) => ({
    ...icon,
    name:
      prefix && icon.name.startsWith(prefix)
        ? icon.name.slice(prefix.length)
        : icon.name,
  }));
}

export { normalizeIcons };
