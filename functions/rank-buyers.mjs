export function rankBuyers({ buyers = [], limits = {} } = {}) {
  const held = [];
  const pools = new Map();
  for (const buyer of buyers) {
    if (!buyer.company_fit_passed || !buyer.buyer_fit_passed) {
      held.push({ ...buyer, selected: false, hold: "gate did not pass" });
      continue;
    }
    if (buyer.suppressed) {
      held.push({ ...buyer, selected: false, hold: "suppressed" });
      continue;
    }
    const cap = limits[buyer.tier] ?? 0;
    if (cap <= 0) {
      held.push({ ...buyer, selected: false, hold: "tier takes no buyers" });
      continue;
    }
    if (!pools.has(buyer.tier)) pools.set(buyer.tier, []);
    pools.get(buyer.tier).push(buyer);
  }
  const selected = [];
  for (const [tier, rows] of pools) {
    rows.sort((a, b) => b.score - a.score || (a.domain < b.domain ? -1 : a.domain > b.domain ? 1 : 0));
    const cap = limits[tier] ?? 0;
    rows.forEach((buyer, index) => {
      if (index < cap) selected.push({ ...buyer, selected: true, hold: null });
      else held.push({ ...buyer, selected: false, hold: "buyer cap" });
    });
  }
  selected.sort((a, b) => (a.domain < b.domain ? -1 : 1));
  return { selected, held };
}
