import { roundTo } from "./support.mjs";

const Z = 1.96;

export function wilsonInterval(positive, delivered, z = Z) {
  if (!delivered) return { low: null, high: null };
  const p = positive / delivered;
  const z2 = z * z;
  const den = 1 + z2 / delivered;
  const center = (p + z2 / (2 * delivered)) / den;
  const margin = (z * Math.sqrt((p * (1 - p)) / delivered + z2 / (4 * delivered * delivered))) / den;
  return { low: roundTo(center - margin, 4), high: roundTo(center + margin, 4) };
}

function intervalsOverlap(left, right) {
  if (left.low == null || right.low == null) return true;
  return left.low <= right.high && right.low <= left.high;
}

function sameFacts(a, b) {
  return Boolean(a.delivered) === Boolean(b.delivered)
    && Boolean(a.positive_reply) === Boolean(b.positive_reply)
    && Boolean(a.meeting) === Boolean(b.meeting);
}

function verdictFor(variant, others, floor) {
  if (variant.delivered < floor) return "too little data";
  if (!others.length) return "too little data";
  if (others.some((other) => other.delivered < floor)) return "too little data";
  const above = others.filter((other) => !intervalsOverlap(variant.interval, other.interval) && variant.interval.low > other.interval.high);
  const below = others.filter((other) => !intervalsOverlap(variant.interval, other.interval) && variant.interval.high < other.interval.low);
  if (above.length && !below.length && above.length === others.length) return "ahead";
  if (below.length && !above.length && below.length === others.length) return "behind";
  if (above.length || below.length) return "no clear difference";
  return "no clear difference";
}

export function readResults({ events = [], floor = 100 } = {}) {
  const groups = new Map();
  for (const event of events) {
    const groupKey = [event.test_id, event.audience, event.prompt_version].join("\t");
    if (!groups.has(groupKey)) groups.set(groupKey, new Map());
    const bucket = groups.get(groupKey);
    const prior = bucket.get(event.message_id);
    if (prior && !sameFacts(prior, event)) {
      return { ok: false, error: "conflicting duplicate", message_id: event.message_id, comparisons: [] };
    }
    if (!prior) bucket.set(event.message_id, event);
  }
  const comparisons = [];
  for (const [groupKey, messages] of groups) {
    const [testId, audience, promptVersion] = groupKey.split("\t");
    const byVariant = new Map();
    for (const event of messages.values()) {
      if (!byVariant.has(event.variant)) {
        byVariant.set(event.variant, { delivered: 0, positive_replies: 0, meetings: 0 });
      }
      const cell = byVariant.get(event.variant);
      if (!event.delivered) continue;
      cell.delivered += 1;
      if (event.positive_reply) cell.positive_replies += 1;
      if (event.meeting) cell.meetings += 1;
    }
    const variants = [...byVariant.entries()].map(([variant, cell]) => ({
      variant,
      ...cell,
      positive_rate: cell.delivered ? roundTo(cell.positive_replies / cell.delivered, 4) : null,
      interval: wilsonInterval(cell.positive_replies, cell.delivered),
    }));
    for (const variant of variants) {
      const others = variants.filter((item) => item.variant !== variant.variant);
      variant.verdict = verdictFor(variant, others, floor);
    }
    comparisons.push({ test_id: testId, audience, prompt_version: promptVersion, floor, variants });
  }
  return { ok: true, error: null, comparisons };
}
