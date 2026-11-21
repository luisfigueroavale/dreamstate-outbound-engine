---
name: merge-sources
description: "Merge exported rows on the normalised domain and keep every distinct signal. Use after two exports exist. It does not write a live dedupe."
---
# Merge sources

Follow `docs/skill-frame.md`.

## Use when

- Two or more exports should become one account list.
- A shared domain might be two different companies.

## Steps

1. Call `whoami`. Fetch `tools_get` before every `tools_run` (`references/exports.md`).
2. If two names share a domain and the records disagree, do not merge them (`references/identity.md`).
3. Preview duplicates with `tables.rows.query` and a dry_run of `tables.rows.dedupe` (`references/dedupe.md`).

## Dreamstate tools

| Step | Id | Mode | Needs a yes |
| --- | --- | --- | --- |
| 1 | `whoami` | live | no |
| 3 | `tables.rows.query` | live | no |
| 3 | `tables.rows.dedupe` | dry_run | yes before any live |

## Stop

- Do not merge when the records disagree on the company name.
- Stay on dry_run for dedupe. A live call would change rows.
- Do not drop a signal to force a single account.
