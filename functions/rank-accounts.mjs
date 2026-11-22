const TIER_ORDER = { A: 0, B: 1, C: 2 };

function compareAccounts(a, b) {
  const byTier = (TIER_ORDER[a.tier] ?? 9) - (TIER_ORDER[b.tier] ?? 9);
  if (byTier) return byTier;
  if (a.signal_points !== b.signal_points) return b.signal_points - a.signal_points;
  if (a.fit_score !== b.fit_score) return b.fit_score - a.fit_score;
  if (a.domain < b.domain) return -1;
  if (a.domain > b.domain) return 1;
  return 0;
}

export function rankAccounts({ accounts = [], capacity = 0 } = {}) {
  const held = [];
  const eligible = [];
  for (const account of accounts) {
    if (!account.fit_passed) {
      held.push({ ...account, selected: false, hold: "company fit did not pass" });
      continue;
    }
    if (account.suppressed) {
      held.push({ ...account, selected: false, hold: "suppressed" });
      continue;
    }
    if (account.tier === "C") {
      held.push({ ...account, selected: false, hold: "tier C, no further spend" });
      continue;
    }
    eligible.push(account);
  }
  eligible.sort(compareAccounts);
  const selected = [];
  eligible.forEach((account, index) => {
    if (index < capacity) selected.push({ ...account, selected: true, hold: null, rank: index + 1 });
    else held.push({ ...account, selected: false, hold: "capacity" });
  });
  return { selected, held };
}
