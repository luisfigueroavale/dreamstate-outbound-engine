export function normaliseDomain(value) {
  if (value == null) return { ok: false, reason: "missing domain" };
  let raw = String(value).trim().toLowerCase();
  if (!raw) return { ok: false, reason: "missing domain" };
  raw = raw.replace(/^[a-z][a-z0-9+.-]*:\/\//, "");
  raw = raw.split(/[/?#]/)[0];
  raw = raw.replace(/:\d+$/, "");
  if (raw.startsWith("www.")) raw = raw.slice(4);
  raw = raw.replace(/\.$/, "");
  if (!/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/.test(raw)) {
    return { ok: false, reason: "domain is not usable" };
  }
  return { ok: true, domain: raw };
}

export function ageDays(asOf, observed) {
  if (!asOf || !observed) return null;
  const stamp = (value) => Date.parse(String(value).length === 10 ? `${value}T00:00:00Z` : value);
  const left = stamp(asOf);
  const right = stamp(observed);
  if (Number.isNaN(left) || Number.isNaN(right)) return null;
  return Math.floor((left - right) / 86400000);
}

export function roundTo(value, places) {
  const factor = 10 ** places;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

export function wordCount(text) {
  return String(text ?? "").trim().split(/\s+/).filter(Boolean).length;
}

export function hasToken(text) {
  return /\{\{[^{}]+\}\}/.test(String(text ?? ""));
}
