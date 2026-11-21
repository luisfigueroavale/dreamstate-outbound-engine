import { ageDays, observedDateKind, roundTo } from "./support.mjs";

export function scoreSignals({ signals = [], rules, as_of } = {}) {
  const catalog = new Map((rules?.families ?? []).map((family) => [family.id, family]));
  const best = new Map();
  const notes = [];
  for (const signal of signals) {
    const family = catalog.get(signal.family);
    if (!family) {
      notes.push({ family: signal.family ?? null, reason: "unknown family" });
      continue;
    }
    const age = ageDays(as_of, signal.observed_on);
    let points = 0;
    if (age == null) {
      const kind = observedDateKind(as_of, signal.observed_on);
      notes.push({ family: family.id, reason: kind === "after" ? "date after as_of" : "missing date" });
    } else if (age > rules.cutoff_days) {
      notes.push({ family: family.id, reason: "past cutoff", age_days: age });
    } else {
      const decay = 0.5 ** (Math.max(0, age) / rules.half_life_days);
      points = family.points * decay;
    }
    const prior = best.get(family.id);
    if (!prior || points > prior.points) {
      best.set(family.id, { id: family.id, strong: Boolean(family.strong), points, age_days: age });
    }
  }
  const active = [...best.values()].filter((family) => family.points > 0);
  const base = active.reduce((sum, family) => sum + family.points, 0);
  const extra = Math.max(0, active.length - 1);
  const rawMultiplier = extra === 0 ? 1 : rules.stack_per_extra ** extra;
  const multiplier = Math.min(rules.stack_cap, rawMultiplier);
  const points = roundTo(base * multiplier, 2);
  let tier = "C";
  if (points >= rules.tier_a) tier = "A";
  else if (points >= rules.tier_b) tier = "B";
  let singleFamilyCapped = false;
  if (active.length === 1 && !active[0].strong && tier !== "C") {
    tier = "C";
    singleFamilyCapped = true;
  }
  return {
    points,
    tier,
    multiplier: roundTo(multiplier, 2),
    families: active
      .map((family) => ({ id: family.id, strong: family.strong, points: roundTo(family.points, 2) }))
      .sort((a, b) => (a.id < b.id ? -1 : 1)),
    single_family_capped: singleFamilyCapped,
    notes,
  };
}
