#!/usr/bin/env node

import { buildIcons } from "../src/build-icons";

try {
  await buildIcons();
  console.log("✓ Icon font generated successfully");
} catch (error) {
  console.error("✖ Error generating icons:");
  console.error(error);
  process.exit(1);
}
