---
name: score-account-signals
description: "Add hiring, news, and champion points, then set tiers. Use after company fit has passed. It does not buy emails, and tier C stops."
---
# Score account signals

Follow `docs/skill-frame.md`.

## Use when

- Accounts have passed company fit.
- You want points before any people search.

## Steps

1. Call `whoami`. Fetch `tools_get` before every `tools_run` (`references/families.md`).
2. Add `provider.enrich.hiring` and `column.company_linkedin_jobs` for hiring, and `column.research` for depot or route news. dry_run first, show rows, credits and quote_hash, wait for the owner's yes on that item, then live with max_credits and an idempotency_key. (`references/quote.md`).
3. Find a new leader with `provider.linkedin.people.search` plus `provider.enrich.linkedin.profile`, then run local `score-signals` (`references/tiers.md`).

## Dreamstate tools

| Step | Id | Mode | Needs a yes |
| --- | --- | --- | --- |
| 1 | `whoami` | live | no |
| 1 | `tables.findable_catalog.list` | live | no |
| 2 | `tables.columns.add` | dry_run | yes |
| 2 | `tables.columns.run` | dry_run | yes |
| 3 | `tables.table_sources.attach` | dry_run | yes |
| 3 | `tables.table_sources.run` | dry_run | yes |
| 3 | `crm.signals.search_plan` | live | no |
| 3 | `crm.signals.search_preview` | live | no |
| 3 | `crm.signals.search_run` | dry_run | yes |

## Stop

- Do not spend on a tier C company.
- Do not call crm.contact.find_person to invent a new leader.
- Do not set bind_feed. A schedule needs its own yes.
