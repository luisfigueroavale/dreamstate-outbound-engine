const INSTRUCTION = /\b(ignore (the|previous|all)|override the|system prompt|you must score|disregard the)\b/i;

export function researchCompany({ domain, pages = [] } = {}) {
  const facts = [];
  const dropped = [];
  for (const page of pages) {
    for (const fact of page.facts ?? []) {
      const field = fact.field ?? null;
      const value = fact.value ?? null;
      const blob = `${field ?? ""} ${value ?? ""}`;
      if (INSTRUCTION.test(blob)) {
        dropped.push({ field, reason: "instruction kept as data, not followed" });
        continue;
      }
      if (!fact.citation) {
        dropped.push({ field, reason: "no citation" });
        continue;
      }
      facts.push({ field, value, citation: fact.citation });
    }
  }
  return { domain: domain ?? null, facts, dropped };
}
