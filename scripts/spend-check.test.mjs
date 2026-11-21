import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { checkSpend } from "./spend-check.mjs";

test("spend check flags an overrun, an unclaimed row, and a run outside the window", () => {
  const report = JSON.parse(readFileSync(new URL("./fixtures/spend.json", import.meta.url), "utf8"));
  const result = checkSpend(report);
  const kinds = result.flags.map((flag) => flag.kind);
  assert.ok(kinds.includes("overrun"));
  assert.ok(kinds.includes("unclaimed"));
  assert.ok(kinds.includes("outside window"));
});
