import { buildIcons } from "#src/build-icons.js";

async function run() {
  await buildIcons();
}

run().catch(console.error);
