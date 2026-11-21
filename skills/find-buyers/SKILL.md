---
name: find-buyers
description: "Search people only at tier A and B, then score buyer fit."
---
# Find buyers

Follow `docs/skill-frame.md`.

## Use when

- Selected accounts are tier A or B.
- Tier C must not get a people search.

## Steps

1. Skip every tier C row (`references/tiers.md`).
2. Preview with `tables.people_search.preview`, then `tables.people_search.run` under a cap (`references/roles.md`).
3. Score buyer fit with `tables.columns.run` (`references/quote.md`).

## Stop

- dry_run first, quote, wait for the owner's yes on that item
- Do not send, enroll, launch, post, schedule, or delete.
