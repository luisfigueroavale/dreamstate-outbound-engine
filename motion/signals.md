# Signals

Status: blank

The numbers live in `signals.json`. One family counts once, at its freshest observation.

- Half life default: 21 days. Points halve on that interval.
- Cutoff default: 90 days. Past the cutoff the points are zero.
- Stacking: each extra family multiplies by 1.1, and the multiplier stops at 1.3.
- Tiers come from `tier_a` and `tier_b`.
- A single family can reach B or A only when that family is marked strong. A weak family on its own stays at C.
- Tier C gets no buyer search and no email spend.
- Buyer caps are `buyers_per_tier`.

Families in the starter file: hiring, route or depot news, a named system change, a new leader, and a past champion. Change the points in `motion.local/signals.json` after a learning note and a yes.
