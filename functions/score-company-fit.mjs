function isYesOrNo(value) {
  return value === "yes" || value === "no";
}

export function scoreCompanyFit({ rubric, answers = {} } = {}) {
  if (!rubric || rubric.pass_at == null) {
    return { score: 0, unknowns: ["rubric"], excluded: true, gates: [], fit_passed: false };
  }
  const unknowns = [];
  let score = 0;
  for (const [id, points] of Object.entries(rubric.points ?? {})) {
    const value = answers[id];
    if (value === "yes") score += points;
    else if (value !== "no") unknowns.push(id);
  }
  const gates = [];
  let excluded = false;
  for (const gate of rubric.gates ?? []) {
    const value = answers[gate.id];
    const missing = !isYesOrNo(value);
    const failed = missing || value === gate.fail_when;
    if (failed) excluded = true;
    if (missing && !unknowns.includes(gate.id)) unknowns.push(gate.id);
    gates.push({ id: gate.id, value: missing ? "unknown" : value, failed });
  }
  return {
    score,
    unknowns,
    excluded,
    gates,
    fit_passed: !excluded && score >= (rubric?.pass_at ?? 0),
  };
}
