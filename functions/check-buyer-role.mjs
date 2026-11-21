import { normaliseDomain } from "./support.mjs";

export function checkBuyerRole({ account_domain, person = {} } = {}) {
  const employer = normaliseDomain(person.current_employer_domain);
  const account = normaliseDomain(account_domain);
  if (!employer.ok || !account.ok || employer.domain !== account.domain) {
    return { confirmed: false, hold: "current employer not confirmed" };
  }
  const title = String(person.current_title ?? "").toLowerCase();
  const expected = (person.expected_titles ?? []).map((role) => String(role).trim()).filter(Boolean);
  const matched = expected.some((role) => title.includes(role.toLowerCase()));
  if (!matched) return { confirmed: false, hold: "current role not confirmed" };
  return { confirmed: true, hold: null };
}
