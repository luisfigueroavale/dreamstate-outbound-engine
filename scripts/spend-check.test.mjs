import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { validate } from "./lib/schema.mjs";
import { checkSpend } from "./spend-check.mjs";

test("spend check flags an overrun, an unclaimed row, and a run outside the window", () => {
  const report = JSON.parse(readFileSync(new URL("./fixtures/spend.json", import.meta.url), "utf8"));
  const result = checkSpend(report);
  const kinds = result.flags.map((flag) => flag.kind);
  assert.ok(kinds.includes("overrun"));
  assert.ok(kinds.includes("unclaimed"));
  assert.ok(kinds.includes("outside window"));
  const bad = checkSpend({
    ceiling: 10,
    claims: [{ capability_id: "tables.columns.run", credits: -1 }],
    spend: [{ capability_id: "tables.columns.run", credits: "12", at: "2026-11-21" }],
    approved_windows: [],
  });
  assert.equal(bad.flags.filter((flag) => flag.kind === "bad credits").length, 2);
  const spendSchema = JSON.parse(readFileSync(new URL("./schemas/spend.schema.json", import.meta.url), "utf8"));
  assert.ok(validate({ ceiling: 1, claims: [{ capability_id: "x", credits: -2 }], spend: [] }, spendSchema).length > 0);
  assert.ok(validate({ ceiling: 1, claims: [{ capability_id: "x", credits: "4" }], spend: [] }, spendSchema).length > 0);
  const signalSchema = JSON.parse(readFileSync(new URL("./schemas/signals.schema.json", import.meta.url), "utf8"));
  const signals = JSON.parse(readFileSync(new URL("../motion/signals.json", import.meta.url), "utf8"));
  assert.deepEqual(validate(signals, signalSchema), []);
  const broken = { ...signals, buyers_per_tier: { A: -1, B: 1, C: 0 } };
  assert.ok(validate(broken, signalSchema).length > 0);
});
