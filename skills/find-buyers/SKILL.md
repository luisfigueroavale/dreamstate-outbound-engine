---
name: find-buyers
description: "Search people only at tier A and B, then score buyer fit. Use after score-account-signals. It does not search tier C or send a message."
---
# Find buyers

Follow `docs/skill-frame.md`.

## Use when

- Selected accounts are tier A or B.
- A role miss should move to the next role, not to a blast.

## Steps

1. Call `whoami`. Fetch `tools_get` before every `tools_run` (`references/tiers.md`).
2. Run `tables.people_search.plan` and `tables.people_search.preview`. Attach `provider.linkedin.people.search` with account_id. Set caps with `tables.table_sources.update`. Run `tables.table_sources.run`. dry_run first, show rows, credits and quote_hash, wait for the owner's yes on that item, then live with max_credits and an idempotency_key. (`references/roles.md`).
3. Score buyer fit with `column.ai_fit_score` and the person_job_fit template at 0.04 credits a row. dry_run first, show rows, credits and quote_hash, wait for the owner's yes on that item, then live with max_credits and an idempotency_key. (`references/quote.md`).

## Dreamstate tools

| Step | Id | Mode | Needs a yes |
| --- | --- | --- | --- |
| 1 | `whoami` | live | no |
| 2 | `tables.people_search.plan` | live | no |
| 2 | `tables.people_search.preview` | live | no |
| 2 | `tables.table_sources.attach` | dry_run | yes |
| 2 | `tables.table_sources.update` | dry_run | yes |
| 2 | `tables.table_sources.run` | dry_run | yes |
| 3 | `tables.columns.add` | dry_run | yes |
| 3 | `tables.columns.run` | dry_run | yes |

## Stop

- Do not search tier C.
- Do not use provider.enrich.person.waterfall to find buyers.
- Run the local check-buyer-role hold before the fit column. A missing employer or title stays held.
- A title without evidenced authority does not pass.
