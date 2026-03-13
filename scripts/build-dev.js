import { devConfig } from "../dev/config/dev-config.js";

import { buildIcons } from "../src/build-icons.js";

async function run() {
  await buildIcons(devConfig);
}

run().catch(console.error);
