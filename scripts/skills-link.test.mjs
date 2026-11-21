import assert from "node:assert/strict";
import { lstatSync, mkdtempSync, mkdirSync, readlinkSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { repairLinks } from "./skills-link.mjs";

test("skills link replaces a real directory with a symlink", () => {
  const root = mkdtempSync(path.join(tmpdir(), "engine-links-"));
  mkdirSync(path.join(root, ".agents", "skills"), { recursive: true });
  writeFileSync(path.join(root, ".agents", "skills", "placeholder.txt"), "zip");
  const repaired = repairLinks(root);
  assert.deepEqual(repaired, [".agents/skills", ".claude/skills"]);
  assert.equal(readlinkSync(path.join(root, ".agents/skills")), "../skills");
  assert.equal(lstatSync(path.join(root, ".claude/skills")).isSymbolicLink(), true);
  rmSync(root, { recursive: true, force: true });
});
