import { readFileSync } from "node:fs";
import { scoreCompanyFit } from "../functions/score-company-fit.mjs";
import { scoreSignals } from "../functions/score-signals.mjs";

const file = process.argv[2] ?? "examples/first-batch/batch.json";
const batch = JSON.parse(readFileSync(file, "utf8"));
for (const [domain, company] of Object.entries(batch.companies)) {
  const fit = scoreCompanyFit({ rubric: batch.company_rubric, answers: company.answers ?? {} });
  const record = batch.records.find((row) => String(row.domain).includes(domain));
  const signals = scoreSignals({ signals: record?.signals ?? [], rules: batch.signals, as_of: batch.as_of });
  console.log(`${domain} fit ${fit.score} passed ${fit.fit_passed} tier ${signals.tier} points ${signals.points}`);
}
