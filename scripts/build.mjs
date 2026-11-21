import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dreamstate = path.join(root, "dreamstate");

const columns = [
  {
    step: "research-company",
    definition_id: "column.research",
    credits_per_row: 4,
    run_cap: "Quote tables.columns.run with limit 1 before a larger live run.",
    input_bindings: { query: { kind: "template", from: "prompts/research-company.md" } },
  },
  {
    step: "score-company-fit",
    definition_id: "column.ai_fit_score",
    template_key: "icp_fit_score",
    credits_per_row: 0.04,
    run_cap: "Quote tables.columns.run with table_id, column_key, and limit 1.",
    input_bindings: { prompt: { kind: "template", template_key: "icp_fit_score" } },
    prompt_required: true,
    model_id: "optional",
  },
  {
    step: "find-buyer",
    attach_with: "tables.table_sources.attach",
    definition_id: "provider.linkedin.people.search",
    credits_per_row: 0,
    run_cap: "Source rows land through tables.table_sources.run, ceiling 50 credits a call.",
    input_bindings: { account_id: { kind: "sender", required: true } },
  },
  {
    step: "score-buyer-fit",
    definition_id: "column.ai_fit_score",
    template_key: "person_job_fit",
    credits_per_row: 0.04,
    run_cap: "Quote tables.columns.run with table_id, column_key, and limit 1.",
    input_bindings: { prompt: { kind: "template", template_key: "person_job_fit" } },
    prompt_required: true,
  },
  {
    step: "find-work-email",
    definition_id: "provider.enrich.email",
    credits_per_row: 12.45,
    billed: "only on a hit, and the price includes verify",
    run_cap: "Quote tables.columns.run with limit 1. Ceiling 50 credits a call.",
    input_bindings: {
      full_name: { required: false },
      company_domain: { required: false },
      profile_url: { required: false },
    },
  },
  {
    step: "draft-first-touch",
    column_kind: "ai prompt",
    credits_per_row: 1,
    run_cap: "An AI prompt column. Quote tables.columns.run before any live row.",
    input_bindings: { prompt: { kind: "template", from: "prompts/draft-first-touch.md" } },
    prompt_required: true,
  },
];

const workflows = [
  {
    name: "signals-into-accounts",
    summary: "Score signals with the local function, then write tiers. Disabled.",
    nodes: [
      {
        node_kind: "action",
        subtype: "code",
        source: "functions/score-signals.mjs",
        output_schema: { type: "object", properties: { points: { type: "number" }, tier: { type: "string" } } },
      },
      { node_kind: "action", subtype: "table_row_add" },
    ],
  },
  {
    name: "tier-buyers",
    summary: "Find buyers only for tier A and B. Disabled.",
    nodes: [
      {
        node_kind: "action",
        subtype: "code",
        source: "functions/rank-accounts.mjs",
        output_schema: { type: "object", properties: { selected: { type: "array" }, held: { type: "array" } } },
      },
      { node_kind: "action", subtype: "worksheet_column_run" },
    ],
  },
  {
    name: "copy-and-handoff",
    summary: "Draft the first touch and stop at an approval before any enrollment. Disabled.",
    nodes: [
      {
        node_kind: "action",
        subtype: "code",
        source: "functions/check-send-ready.mjs",
        output_schema: {
          type: "object",
          properties: { ready: { type: "boolean" }, holds: { type: "array" }, words: { type: "number" } },
        },
      },
      { node_kind: "action", subtype: "request_approval" },
    ],
  },
];

function writeJson(file, value) {
  writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

export function buildDreamstate() {
  rmSync(dreamstate, { recursive: true, force: true });
  mkdirSync(path.join(dreamstate, "columns"), { recursive: true });
  mkdirSync(path.join(dreamstate, "callables"), { recursive: true });
  mkdirSync(path.join(dreamstate, "workflows"), { recursive: true });
  const prompts = readdirSync(path.join(root, "prompts")).filter((name) => name.endsWith(".md")).sort();
  const functions = readdirSync(path.join(root, "functions")).filter((name) => name.endsWith(".mjs") && name !== "support.mjs").sort();
  for (const column of columns) {
    const source = column.step === "find-buyer";
    writeJson(path.join(dreamstate, "columns", `${column.step}.json`), {
      kind: source ? "source" : "column",
      status: "disabled",
      add_with: source ? "tables.table_sources.attach" : "tables.columns.add",
      run_with: source ? "tables.table_sources.run" : "tables.columns.run",
      ...column,
    });
  }
  for (const name of ["merge-sources", "score-signals", "rank-accounts", "assign-variant", "check-send-ready", "read-results"]) {
    writeJson(path.join(dreamstate, "callables", `${name}.json`), {
      kind: "callable",
      status: "disabled",
      step: name,
      publish_with: "tables.callables.publish",
      local_function: `functions/${name}.mjs`,
    });
  }
  for (const workflow of workflows) {
    writeJson(path.join(dreamstate, "workflows", `${workflow.name}.json`), {
      kind: "workflow",
      status: "disabled",
      name: workflow.name,
      summary: workflow.summary,
      import_with: "workflow.automations.import",
      preflight_with: "workflow.automations.import_preflight",
      lint_with: "workflow.automations.lint",
      nodes: workflow.nodes,
      code_node: "The catalog lists subtype code. v1 keeps the graph disabled and runs the function on this machine.",
    });
  }
  writeJson(path.join(dreamstate, "manifest.json"), {
    kind: "manifest",
    status: "disabled",
    functions,
    prompts,
    note: "Generated by npm run build. Nothing here is installed.",
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  buildDreamstate();
  console.log("built dreamstate/");
}
