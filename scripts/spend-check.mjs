import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export function checkSpend(report) {
  const flags = [];
  let spent = 0;
  const claimed = new Map();
  for (const claim of report.claims ?? []) claimed.set(claim.capability_id, (claimed.get(claim.capability_id) ?? 0) + Number(claim.credits));
  const used = new Map();
  for (const row of report.spend ?? []) {
    const credits = Number(row.credits);
    spent += credits;
    used.set(row.capability_id, (used.get(row.capability_id) ?? 0) + credits);
    const windows = report.approved_windows ?? [];
    const inside = windows.some((window) => row.at >= window.start && row.at <= window.end);
    if (windows.length && !inside) flags.push({ kind: "outside window", capability_id: row.capability_id, at: row.at, credits });
  }
  if (spent > Number(report.ceiling)) flags.push({ kind: "overrun", credits: spent, ceiling: report.ceiling });
  for (const [capabilityId, credits] of used) {
    const cover = claimed.get(capabilityId) ?? 0;
    if (credits > cover) flags.push({ kind: "unclaimed", capability_id: capabilityId, credits: credits - cover });
  }
  return { spent, ceiling: report.ceiling, flags };
}

function printReport(result) {
  console.log(`spent ${result.spent} against ceiling ${result.ceiling}`);
  if (!result.flags.length) console.log("no flags");
  for (const flag of result.flags) console.log(`${flag.kind}: ${flag.capability_id ?? ""} ${flag.credits ?? ""}`.trim());
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const file = process.argv[2];
  if (!file) {
    console.error("pass a saved spend json file");
    process.exit(1);
  }
  printReport(checkSpend(JSON.parse(readFileSync(file, "utf8"))));
}
