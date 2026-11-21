import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { renderPlan } from "./plan-install.mjs";

test("the install plan prints and does not call the network", () => {
  const plan = renderPlan([]);
  assert.match(plan, /Nothing has run/);
  assert.match(plan, /dry_run/);
  assert.match(plan, /Nothing has been sent or spent/);
  const fleet = renderPlan(["--example", "fleet"]);
  assert.match(fleet, /crm.signals.search_run/);
  const source = readFileSync(new URL("./plan-install.mjs", import.meta.url), "utf8");
  assert.equal(source.includes("fetch("), false);
  assert.equal(source.includes("node:http"), false);
});
