import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderReport, runBatch } from "./engine.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function args(argv) {
  const parsed = { reviewed: [], capacity: null, example: "both" };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === "--reviewed") parsed.reviewed.push(argv[++i]);
    else if (argv[i] === "--capacity") parsed.capacity = Number(argv[++i]);
    else if (argv[i] === "--example") parsed.example = argv[++i];
  }
  return parsed;
}

function writePair(dir, result) {
  mkdirSync(dir, { recursive: true });
  const reportFile = path.join(dir, "report.md");
  const resultsFile = path.join(dir, "results.json");
  const jsonBody = `${JSON.stringify(result, null, 2)}\n`;
  writeFileSync(reportFile, renderReport(result));
  writeFileSync(resultsFile, jsonBody);
}

export function runDemo(argv = []) {
  const parsed = args(argv);
  const commit = parsed.reviewed.length === 0 && parsed.capacity == null;
  const jobs = [];
  if (parsed.example === "both" || parsed.example === "first") jobs.push(["first-batch", "examples/first-batch"]);
  if (parsed.example === "both" || parsed.example === "fleet") jobs.push(["fleet-signal-engine", "examples/fleet-signal-engine"]);
  for (const [name, folder] of jobs) {
    const batch = JSON.parse(readFileSync(path.join(root, folder, "batch.json"), "utf8"));
    const result = runBatch(batch, { reviewed: parsed.reviewed, capacity: parsed.capacity });
    writePair(path.join(root, "output", name), result);
    if (name === "first-batch") writePair(path.join(root, "output", "demo"), result);
    if (commit) writePair(path.join(root, folder), result);
    console.log(`${batch.seller}: ready ${result.funnel.ready}, sent ${result.sent}, credits ${result.credits}`);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  runDemo(process.argv.slice(2));
}
