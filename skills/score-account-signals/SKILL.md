---
name: score-account-signals
description: "Add signal points, set tiers, and spend nothing more on tier C."
---
# Score account signals

Follow `docs/skill-frame.md`.

## Use when

- Accounts have passed company fit.
- You want hiring, news, or champion points.

## Steps

1. Read `motion.local/signals.json` and resolve the source with `tables.findable_catalog.list` (`references/families.md`).
2. Plan and preview with `crm.signals.search_plan` and `crm.signals.search_preview`, then quote `crm.signals.search_run` (`references/quote.md`).
3. Quote `crm.contact.find_person` for a past champion and run the local `score-signals` function (`references/tiers.md`).

## Stop

- dry_run first, quote, wait for the owner's yes on that item
- Do not send, enroll, launch, post, schedule, or delete.
