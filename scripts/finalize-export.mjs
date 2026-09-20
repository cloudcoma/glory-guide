import { constants } from "node:fs";
import { copyFile, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Next.js can export nested RSC segment paths on Windows, while its browser
// router requests flat filenames. Add the expected files after export.
// https://github.com/vercel/next.js/issues/92339
// On builds that already emit flat paths (including Linux), this is a no-op.
const outputRoot = fileURLToPath(new URL("../out/", import.meta.url));

async function visit(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const source = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await visit(source);
      continue;
    }
    if (!entry.isFile() || !entry.name.endsWith(".txt")) continue;
    const parts = path.relative(outputRoot, source).split(path.sep);
    const segmentIndex = parts.findIndex(part => part.startsWith("__next."));
    if (segmentIndex === -1 || segmentIndex === parts.length - 1) continue;
    const target = path.join(outputRoot, ...parts.slice(0, segmentIndex), parts.slice(segmentIndex).join("."));
    try {
      await copyFile(source, target, constants.COPYFILE_EXCL);
    } catch (error) {
      if (error.code !== "EEXIST") throw error;
      const [existing, expected] = await Promise.all([readFile(target), readFile(source)]);
      if (!existing.equals(expected)) throw new Error(`Conflicting exported segment: ${target}`);
    }
  }
}

await visit(outputRoot);
