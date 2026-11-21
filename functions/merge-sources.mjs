import { normaliseDomain } from "./support.mjs";

function signalKey(signal) {
  return JSON.stringify([signal.family ?? "", signal.observed_on ?? "", signal.detail ?? ""]);
}

export function mergeSources({ records = [] } = {}) {
  const rejected = [];
  const grouped = new Map();
  for (const record of records) {
    const parsed = normaliseDomain(record.domain);
    if (!parsed.ok) {
      rejected.push({
        source_id: record.source_id ?? null,
        domain: record.domain ?? null,
        reason: parsed.reason,
      });
      continue;
    }
    if (!grouped.has(parsed.domain)) {
      grouped.set(parsed.domain, {
        domain: parsed.domain,
        names: [],
        source_ids: [],
        signals: [],
        seen: new Set(),
      });
    }
    const account = grouped.get(parsed.domain);
    if (record.name && !account.names.includes(record.name)) account.names.push(record.name);
    if (record.source_id && !account.source_ids.includes(record.source_id)) account.source_ids.push(record.source_id);
    for (const signal of record.signals ?? []) {
      const key = signalKey(signal);
      if (account.seen.has(key)) continue;
      account.seen.add(key);
      account.signals.push({
        family: signal.family,
        observed_on: signal.observed_on ?? null,
        detail: signal.detail ?? null,
      });
    }
  }
  const accounts = [...grouped.values()]
    .map(({ seen, ...account }) => account)
    .sort((a, b) => (a.domain < b.domain ? -1 : a.domain > b.domain ? 1 : 0));
  return { accounts, rejected };
}
