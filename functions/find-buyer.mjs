import { normaliseDomain } from "./support.mjs";

function sameDomain(left, right) {
  const a = normaliseDomain(left);
  const b = normaliseDomain(right);
  return a.ok && b.ok && a.domain === b.domain;
}

export function findBuyer({ account_domain, roles = [], people = [] } = {}) {
  const skipped = [];
  for (const role of roles) {
    const want = String(role).toLowerCase();
    for (const person of people) {
      const title = String(person.title ?? "").toLowerCase();
      if (!title.includes(want)) continue;
      if (person.excluded) {
        skipped.push({ name: person.name ?? null, reason: "excluded profile" });
        continue;
      }
      if (!person.employer_domain || !sameDomain(person.employer_domain, account_domain)) {
        skipped.push({
          name: person.name ?? null,
          reason: person.employer_domain ? "employer does not match" : "employer missing",
        });
        continue;
      }
      if (!person.profile_url) {
        skipped.push({ name: person.name ?? null, reason: "no profile url" });
        continue;
      }
      return {
        found: true,
        hold: null,
        person: {
          name: person.name ?? null,
          title: person.title,
          profile_url: person.profile_url,
          role,
          employer_domain: person.employer_domain,
        },
        skipped,
      };
    }
  }
  const employerReasons = new Set(["employer missing", "employer does not match"]);
  const onlyEmployer = skipped.length > 0 && skipped.every((row) => employerReasons.has(row.reason));
  const hold = onlyEmployer ? "current employer not confirmed" : "no buyer in the role list";
  return { found: false, person: null, hold, skipped };
}
