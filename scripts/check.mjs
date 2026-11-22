import { execFileSync } from "node:child_process";
import { existsSync, lstatSync, readFileSync, readdirSync, readlinkSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validate } from "./lib/schema.mjs";
import { dashLines, findListedWords, loadWordList } from "./lib/words.mjs";

const TEXT = /\.(md|mjs|js|css|json|ya?ml|txt|html)$/i;
const SKIP = new Set([".git", "node_modules", "work", "data", "output", "brand.local", "audience.local", "motion.local"]);
const SECRET = [
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  /\bAKIA[0-9A-Z]{16}\b/,
  /\bghp_[A-Za-z0-9]{20,}\b/,
  /\bgithub_pat_[A-Za-z0-9_]{20,}\b/,
  /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/,
  /\bsk_(?:live|test)_[A-Za-z0-9]{8,}\b/,
];
const MACHINE = ["/Use" + "rs/", "/ho" + "me/", "/priv" + "ate/", "/opt/" + "cursor/"];
const DOTTED = /^[a-z][a-z0-9_]*(?:\.[a-z][a-z0-9_]+)+$/;
const QUOTE = "dry_run first, show rows, credits and quote_hash, wait for the owner's yes on that item, then live with max_credits and an idempotency_key.";
const MAX_BYTES = 5 * 1024 * 1024;
const BINARY = /\.(png|jpe?g|gif|webp|woff2?|ttf|otf)$/i;
const FUNCTIONS = [
  "merge-sources",
  "research-company",
  "score-company-fit",
  "score-signals",
  "rank-accounts",
  "find-buyer",
  "check-buyer-role",
  "score-buyer-fit",
  "rank-buyers",
  "find-work-email",
  "assign-variant",
  "draft-first-touch",
  "check-send-ready",
  "read-results",
];

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const full = path.join(dir, name);
    const info = lstatSync(full);
    if (info.isSymbolicLink()) continue;
    if (info.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function rel(root, full) {
  return path.relative(root, full).split(path.sep).join("/");
}

function tracked(root) {
  try {
    return execFileSync("git", ["ls-files", "-z"], { cwd: root, encoding: "utf8" }).split("\0").filter(Boolean);
  } catch {
    return [];
  }
}

export function bannedTermsPath(root) {
  const local = path.join(root, ".banned-terms.local");
  if (existsSync(local)) return local;
  try {
    const common = execFileSync("git", ["rev-parse", "--path-format=absolute", "--git-common-dir"], {
      cwd: root,
      encoding: "utf8",
    }).trim();
    const main = path.join(path.dirname(common), ".banned-terms.local");
    if (existsSync(main)) return main;
  } catch {
    return null;
  }
  return null;
}

function readTerms(file) {
  return readFileSync(file, "utf8").split(/\r?\n/).map((line) => line.trim()).filter((line) => line && !line.startsWith("#"));
}

function termHit(text, term) {
  const escaped = term.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?<![a-z0-9])${escaped}(?![a-z0-9])`).test(text.toLowerCase());
}

function localDocTargets(markdown) {
  const targets = [];
  const pattern = /\[[^\]]*\]\(([^)\s]+)\)/g;
  for (const match of String(markdown).matchAll(pattern)) {
    const raw = match[1].split("#")[0].split("?")[0];
    if (!raw) continue;
    if (/^[a-z][a-z0-9+.-]*:/i.test(raw) || raw.startsWith("/")) continue;
    targets.push(decodeURIComponent(raw));
  }
  return targets;
}

function referenceWordCount(markdown) {
  return String(markdown).split(/\s+/).filter(Boolean).length;
}

export function dottedIds(text) {
  const ids = new Set();
  for (const match of String(text).matchAll(/`([^`]+)`/g)) {
    const token = match[1].trim();
    if (DOTTED.test(token)) ids.add(token);
  }
  for (const match of String(text).matchAll(/"((?:[a-z][a-z0-9_]*\.)+[a-z][a-z0-9_]*)"/g)) ids.add(match[1]);
  return ids;
}

function schemaFor(file) {
  if (file.endsWith(".contract.json")) return "scripts/schemas/contract.schema.json";
  if (file.endsWith("/signals.json") || file.endsWith("motion/signals.json")) return "scripts/schemas/signals.schema.json";
  if (file.endsWith("/test.json")) return "scripts/schemas/test.schema.json";
  if (file.endsWith("/results.json")) return "scripts/schemas/results.schema.json";
  if (file.endsWith("/batch.json")) return "scripts/schemas/batch.schema.json";
  if (file.endsWith("/call-plan.json")) return "scripts/schemas/call-plan.schema.json";
  if (file.startsWith("dreamstate/") && file.endsWith(".json")) return "scripts/schemas/dreamstate.schema.json";
  if (file.endsWith("/spend.json")) return "scripts/schemas/spend.schema.json";
  return null;
}

function toolMapRows(text) {
  const ids = new Set();
  const paid = new Set();
  for (const id of dottedIds(text)) ids.add(id);
  const paidBlock = text.split(/^## Paid ids\s*$/m)[1]?.split(/^## /m)[0] ?? "";
  for (const id of dottedIds(paidBlock)) paid.add(id);
  return { ids, paid };
}

export function runChecks(root, argv = []) {
  const strict = argv.includes("--strict");
  const errors = [];
  const notes = [];
  const bad = (message) => errors.push(message);
  const files = walk(root).map((full) => rel(root, full));
  const textFiles = files.filter((file) => TEXT.test(file));

  for (const file of files) {
    if (BINARY.test(file)) bad(`${file} is a binary image or font`);
    if (statSync(path.join(root, file)).size > MAX_BYTES) bad(`${file} is over 5 MB`);
  }

  const bannedWords = loadWordList(path.join(root, "scripts/banned-words.json"));
  const vendorIds = loadWordList(path.join(root, "scripts/vendor-ids.json"));
  for (const file of textFiles) {
    if (file === "scripts/banned-words.json" || file === "docs/ai-tells.md") continue;
    const body = readFileSync(path.join(root, file), "utf8");
    for (const line of dashLines(body)) bad(`${file}:${line} has an em dash or an en dash`);
    if (file !== "scripts/banned-words.json") {
      for (const word of findListedWords(body, bannedWords)) bad(`${file} uses a banned word (${word})`);
    }
    for (const pattern of SECRET) if (pattern.test(body)) bad(`${file} looks like it contains a secret`);
    if (MACHINE.some((part) => body.includes(part))) bad(`${file} contains a machine path`);
    const vendorScope = file.startsWith("skills/") || file.startsWith("dreamstate/") || file.startsWith("prompts/") || file.startsWith("motion/") || file.startsWith("examples/");
    if (vendorScope) {
      for (const id of vendorIds) if (body.includes(id)) bad(`${file} hard-codes a vendor definition id`);
    }
  }

  for (const file of tracked(root)) {
    if (/(^|\/)(brand\.local|audience\.local|motion\.local|data|output|work)(\/|$)/.test(file)) bad(`${file} is tracked and must stay local`);
    if (file === ".banned-terms.local" || file.endsWith("/.env") || file.includes(".env.") || file.endsWith(".key")) bad(`${file} is tracked and must stay local`);
  }

  const agents = path.join(root, "AGENTS.md");
  const claude = path.join(root, "CLAUDE.md");
  if (!existsSync(agents) || !existsSync(claude)) bad("AGENTS.md and CLAUDE.md are both required");
  else if (readFileSync(agents, "utf8") !== readFileSync(claude, "utf8")) bad("AGENTS.md and CLAUDE.md differ");

  for (const link of [".agents/skills", ".claude/skills"]) {
    const full = path.join(root, link);
    let info = null;
    try {
      info = lstatSync(full);
    } catch {
      info = null;
    }
    if (!info?.isSymbolicLink()) bad(`${link} should be a symlink to ../skills`);
    else if (readlinkSync(full) !== "../skills") bad(`${link} should point at ../skills`);
  }

  const skillRoot = path.join(root, "skills");
  const folders = readdirSync(skillRoot).filter((name) => statSync(path.join(skillRoot, name)).isDirectory());
  if (folders.length !== 15) bad(`expected 15 skills, found ${folders.length}`);
  for (const name of folders) {
    const file = path.join(skillRoot, name, "SKILL.md");
    const label = `skills/${name}/SKILL.md`;
    if (!existsSync(file)) {
      bad(`${label} is missing`);
      continue;
    }
    const body = readFileSync(file, "utf8");
    const head = body.match(/^---\n([\s\S]*?)\n---/);
    if (!head) {
      bad(`${label} has no frontmatter`);
      continue;
    }
    if (!new RegExp(`^name:\\s*${name}\\s*$`, "m").test(head[1])) bad(`${label} name does not match its folder`);
    if (!/^description:\s+".+"\s*$/m.test(head[1])) bad(`${label} needs a quoted description`);
    if (!body.includes("docs/skill-frame.md")) bad(`${label} does not point at docs/skill-frame.md`);
    if (!body.includes("## Use when")) bad(`${label} has no Use when section`);
    const steps = body.match(/^## Steps\s*\n([\s\S]*?)(?=^## )/m);
    if (!steps) bad(`${label} has no Steps section`);
    else {
      const lines = steps[1].split("\n").map((line) => line.trim()).filter((line) => /^\d+\.\s/.test(line));
      if (!lines.length) bad(`${label} has no numbered steps`);
      for (const line of lines) {
        const ref = line.match(/references\/([a-z0-9-]+\.md)/);
        if (!ref) bad(`${label} step does not point at a reference: ${line}`);
        else if (!existsSync(path.join(skillRoot, name, "references", ref[1]))) bad(`${label} missing references/${ref[1]}`);
      }
    }
    const referenceDir = path.join(skillRoot, name, "references");
    if (existsSync(referenceDir)) {
      for (const refName of readdirSync(referenceDir)) {
        if (!refName.endsWith(".md")) continue;
        const words = referenceWordCount(readFileSync(path.join(referenceDir, refName), "utf8"));
        if (words < 40) bad(`skills/${name}/references/${refName} is nearly empty (${words} words)`);
      }
    }
  }

  for (const name of FUNCTIONS) {
    const contract = `functions/${name}.contract.json`;
    const fixture = `scripts/fixtures/${name}.json`;
    if (!existsSync(path.join(root, `functions/${name}.mjs`))) bad(`functions/${name}.mjs is missing`);
    if (!existsSync(path.join(root, contract))) bad(`${contract} is missing`);
    if (!existsSync(path.join(root, fixture))) bad(`${fixture} is missing`);
    const tests = textFiles.filter((file) => file.endsWith(".test.mjs")).map((file) => readFileSync(path.join(root, file), "utf8")).join("\n");
    if (!tests.includes(name)) bad(`${name} has no test mention`);
  }

  for (const file of files.filter((item) => item.endsWith(".json"))) {
    const schemaPath = schemaFor(file);
    if (!schemaPath) continue;
    const data = JSON.parse(readFileSync(path.join(root, file), "utf8"));
    const schema = JSON.parse(readFileSync(path.join(root, schemaPath), "utf8"));
    for (const error of validate(data, schema)) bad(`${file} ${error}`);
  }

  for (const file of textFiles.filter((item) => item.startsWith("prompts/") && item.endsWith(".md"))) {
    const body = readFileSync(path.join(root, file), "utf8");
    const head = body.match(/^---\n([\s\S]*?)\n---/);
    const declared = new Set();
    if (!head) bad(`${file} has no frontmatter`);
    else {
      for (const line of head[1].split("\n")) {
        const item = line.match(/^\s+-\s+([a-z0-9_]+)\s*$/);
        if (item) declared.add(item[1]);
      }
    }
    for (const match of body.matchAll(/\{\{\s*([a-z0-9_]+)\s*\}\}/g)) {
      if (!declared.has(match[1])) bad(`${file} uses undeclared input ${match[1]}`);
    }
  }

  const readme = readFileSync(path.join(root, "README.md"), "utf8");
  const skillCount = Number(readme.match(/Skill count:\s*(\d+)/)?.[1]);
  const functionCount = Number(readme.match(/Function count:\s*(\d+)/)?.[1]);
  if (skillCount !== folders.length) bad(`README skill count ${skillCount} does not match ${folders.length}`);
  if (functionCount !== FUNCTIONS.length) bad(`README function count ${functionCount} does not match ${FUNCTIONS.length}`);

  for (const file of textFiles.filter((item) => item.endsWith(".md"))) {
    const body = readFileSync(path.join(root, file), "utf8");
    for (const destination of localDocTargets(body)) {
      const resolved = path.resolve(root, path.dirname(file), destination);
      if (!existsSync(resolved)) bad(`${file} links to missing ${destination}`);
    }
  }

  const mapFile = path.join(root, "docs/tool-map.md");
  if (!existsSync(mapFile)) bad("docs/tool-map.md is missing");
  else {
    const mapText = readFileSync(mapFile, "utf8");
    const map = toolMapRows(mapText);
    const watched = textFiles.filter((file) => file.startsWith("skills/") || file.startsWith("dreamstate/") || file.startsWith("prompts/"));
    for (const file of watched) {
      const body = readFileSync(path.join(root, file), "utf8");
      for (const id of dottedIds(body)) {
        if (!map.ids.has(id)) bad(`${file} names ${id}, which is not in docs/tool-map.md`);
      }
    }
    for (const name of folders) {
      const dir = path.join(skillRoot, name);
      const blob = walk(dir).map((full) => readFileSync(full, "utf8")).join("\n");
      for (const id of map.paid) {
        if (blob.includes(`\`${id}\``) && !blob.includes(QUOTE)) bad(`skills/${name} names paid ${id} without the quote sentence`);
      }
    }
    if (!mapText.includes("Cost") || !mapText.includes("Status")) bad("docs/tool-map.md needs a cost and a status");
  }

  const terms = bannedTermsPath(root);
  if (!terms) {
    notes.push("BANNED-TERM SCAN SKIPPED");
    if (strict) bad("strict mode needs .banned-terms.local");
  } else {
    const list = readTerms(terms);
    const scanned = [...textFiles];
    for (const file of scanned) {
      const body = readFileSync(path.join(root, file), "utf8");
      for (const term of list) if (termHit(body, term)) bad(`${file} contains a banned term`);
    }
    notes.push(`banned-term scan: ${list.length} terms, ${scanned.length} files`);
  }

  return { errors, notes, files: textFiles.length };
}

function main() {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const { errors, notes, files } = runChecks(root, process.argv.slice(2));
  for (const note of notes) console.log(note);
  for (const error of errors) console.error(`FAIL ${error}`);
  if (errors.length) {
    console.error(`${errors.length} check(s) failed`);
    process.exit(1);
  }
  console.log(`ok: ${files} text files checked`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
