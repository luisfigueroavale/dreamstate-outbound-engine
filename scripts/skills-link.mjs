import { lstatSync, mkdirSync, rmSync, symlinkSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export function repairLinks(root) {
  const links = [".agents/skills", ".claude/skills"];
  const repaired = [];
  for (const link of links) {
    const full = path.join(root, link);
    mkdirSync(path.dirname(full), { recursive: true });
    let kind = "missing";
    try {
      const info = lstatSync(full);
      kind = info.isSymbolicLink() ? "symlink" : "directory";
    } catch {
      kind = "missing";
    }
    if (kind === "symlink") continue;
    if (kind === "directory") rmSync(full, { recursive: true, force: true });
    symlinkSync("../skills", full);
    repaired.push(link);
  }
  return repaired;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const repaired = repairLinks(root);
  console.log(repaired.length ? `repaired ${repaired.join(", ")}` : "skill links already point at ../skills");
}
