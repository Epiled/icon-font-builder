import { devConfig } from "#dev/config/dev-config.js";

import { buildIcons } from "#src/build-icons.js";

async function run() {
  const glyphs = await buildIcons(devConfig);

  console.log("Glyphs: ", glyphs);
}

run().catch(console.error);
