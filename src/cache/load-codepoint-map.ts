import fs from "fs";
import path from "path";

export function loadCodepointMap() {
  
  const iconCache = path.resolve(
    process.cwd(),
    ".icon-builder-cache.json"
  );

  let cache = {}

  if(fs.existsSync(iconCache)) {
    const raw = fs.readFileSync(iconCache, "utf8");
    cache = JSON.parse(raw)
  }

  return cache;
}
