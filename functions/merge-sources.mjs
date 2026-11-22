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
  const accounts = [];
  for (const { seen, ...account } of grouped.values()) {
    if (account.names.length > 1) {
      rejected.push({
        source_id: account.source_ids.join(","),
        domain: account.domain,
        source_ids: account.source_ids,
        names: account.names,
        reason: "identity not proven",
      });
      continue;
    }
    accounts.push(account);
  }
  accounts.sort((left, right) => left.domain.localeCompare(right.domain));
  return { accounts, rejected };
}
