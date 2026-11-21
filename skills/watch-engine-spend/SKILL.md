---
name: watch-engine-spend
description: "Compare credit spend in the window with the brief ceiling and flag anything no step claimed."
---
# Watch engine spend

Follow `docs/skill-frame.md`.

## Use when

- Once a day, or when a bill looks high.
- A source may have run outside an approved window.

## Steps

1. Read `workspace.usage.spend_breakdown` for the brief window (`references/window.md`).
2. Compare rows with the claims in the batch packet and run `npm run spend-check` (`references/unclaimed.md`).
3. Flag a source run outside the approved window (`references/sources.md`).

## Stop

- dry_run first, quote, wait for the owner's yes on that item
- Do not send, enroll, launch, post, schedule, or delete.
