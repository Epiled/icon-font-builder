// Step: Normalize

import { UserConfig } from "#config/types.js";
import { Icon } from "./types.js";

function normalizeIcons(icons: Icon[] = [], config: UserConfig): Icon[] {
  const prefix = config.stripPrefix ?? "";

  return icons.map((icon) => ({
    ...icon,
    name:
      prefix && icon.name.startsWith(prefix)
        ? icon.name.slice(prefix.length)
        : icon.name,
  }));
}

export { normalizeIcons };
