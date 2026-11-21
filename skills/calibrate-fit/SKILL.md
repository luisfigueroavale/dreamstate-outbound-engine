---
name: calibrate-fit
description: "Score ten known companies against decisions the owner wrote first. Use after write-motion-brief. It does not grow the list past those ten rows."
---
# Calibrate fit

Follow `docs/skill-frame.md`.

## Use when

- The brief exists and names ten companies the owner already knows.
- You are about to change fit points.

## Steps

1. Call `whoami`. Fetch `tools_get` before every `tools_run` (`references/expected.md`).
2. Read `tables.columns.catalog` and add `column.ai_fit_score` with `tables.columns.add` (`references/quote.md`).
3. Run one row with `tables.columns.run`. dry_run first, show rows, credits and quote_hash, wait for the owner's yes on that item, then live with max_credits and an idempotency_key. (`references/rubric.md`).

## Dreamstate tools

| Step | Id | Mode | Needs a yes |
| --- | --- | --- | --- |
| 1 | `whoami` | live | no |
| 2 | `tables.columns.catalog` | live | no |
| 2 | `tables.columns.add` | dry_run | yes |
| 3 | `tables.columns.run` | dry_run | yes |

## Stop

- Do not score a row before the owner writes keep or hold.
- Do not run more than one live row without a new yes.
- Do not change the rubric in the same turn as the score unless the owner agrees.
