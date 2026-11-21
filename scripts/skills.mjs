import { readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const names = readdirSync(path.join(root, "skills")).filter((name) => statSync(path.join(root, "skills", name)).isDirectory()).sort();
for (const name of names) console.log(name);
console.log(`${names.length} skills`);
