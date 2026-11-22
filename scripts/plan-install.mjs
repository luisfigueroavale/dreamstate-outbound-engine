import path from "node:path";
import { fileURLToPath } from "node:url";

const steps = [
  ["whoami", "live", "0", "Confirm the workspace. Stop if it is not the one the owner named."],
  ["knowledge.context.resolve", "live", "0", "Read Company Context. This is a free read."],
  ["tables.sourcing.preview", "live", "0", "Free first look at a source. Pass the definition id from tables.findable_catalog.list."],
  ["tables.company_search.preview", "live", "0", "Free company preview. It can call out, and it does not write rows."],
  ["tables.workbooks.create", "dry_run", "0", "dry_run first, quote, wait for the owner's yes on that item before a live create."],
  ["tables.worksheets.create", "dry_run", "0", "dry_run first, quote, wait for the owner's yes on that item."],
  ["tables.table_sources.attach", "dry_run", "0", "dry_run first, quote, wait for the owner's yes on that item. Set row and credit caps with tables.table_sources.update."],
  ["tables.table_sources.run", "dry_run", "dynamic", "dry_run first, quote, wait for the owner's yes on that item. Live needs max_rows and max_credits."],
  ["tables.columns.add", "dry_run", "0", "Add the column only after tables.columns.catalog returns the card. dry_run first, quote, wait for the owner's yes on that item."],
  ["tables.columns.run", "dry_run", "dynamic", "dry_run first, quote, wait for the owner's yes on that item."],
  ["workflow.automations.import_preflight", "live", "0", "Read the disabled graph. Do not import until the owner says yes."],
  ["workflow.automations.import", "dry_run", "0", "dry_run first, quote, wait for the owner's yes on that item. Leave the workflow disabled."],
  ["workflow.automations.lint", "live", "0", "Free lint. Do not enable the workflow."],
  ["sequence.sequences.create_from_worksheet", "dry_run", "0", "Draft only. dry_run first, quote, wait for the owner's yes on that item."],
  ["sequence.sequences.enroll_selection", "dry_run", "0", "Stop. Enrollment waits for a separate yes. v1 does not enroll."],
  ["sequence.sequences.activate_audience", "dry_run", "0", "Stop. Activation sends. v1 does not activate."],
];

const fleet = [
  ["crm.signals.search_plan", "live", "0", "Plan the fleet signal source. Do not pass a hard-coded definition id."],
  ["crm.signals.search_preview", "live", "0", "Preview is free and external. Show the rows."],
  ["crm.signals.search_run", "dry_run", "dynamic, ceiling 1000000", "dry_run first, quote, wait for the owner's yes on that item. Do not set bind_feed."],
  ["crm.contact.find_person", "dry_run", "0.9", "dry_run first, quote, wait for the owner's yes on that item."],
  ["tables.contacts.verify_email", "dry_run", "0.45 an address", "dry_run first, quote, wait for the owner's yes on that item. A catch-all stays held."],
];

function selected(argv) {
  return argv.includes("--example") && argv[argv.indexOf("--example") + 1] === "fleet" ? [...steps, ...fleet] : steps;
}

export function renderPlan(argv = []) {
  const lines = [
    "Install plan. Nothing has run.",
    "Every write starts as dry_run. A quote is a price, not a yes.",
    "",
  ];
  selected(argv).forEach((step, index) => {
    lines.push(`${index + 1}. ${step[0]}`);
    lines.push(`   mode: ${step[1]}`);
    lines.push(`   cost: ${step[2]}`);
    lines.push(`   note: ${step[3]}`);
  });
  lines.push("");
  lines.push("Stop. Nothing has been sent or spent.");
  return lines.join("\n");
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.log(renderPlan(process.argv.slice(2)));
}
