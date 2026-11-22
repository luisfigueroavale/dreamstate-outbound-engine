---
name: build-account-list
description: "Preview a company source for free, then land rows under a row cap and a credit cap. Use after the brief has both caps. It does not search for people."
---
# Build account list

Follow `docs/skill-frame.md`.

## Use when

- The Outbound Lead has set an audience cap and a credit ceiling.
- The Lead Sourcer is ready to fill one worksheet.

## Steps

1. Call `whoami`. Fetch `tools_get` before every `tools_run` (`references/preview.md`).
2. Attach with `tables.table_sources.attach` and set `per_run_max_rows` and `per_run_max_credits` with `tables.table_sources.update` (`references/caps.md`).
3. Check the route with `tables.company_search.run` in dry_run only, then land rows with `tables.table_sources.run`. dry_run first, show rows, credits and quote_hash, wait for the owner's yes on that item, then live with max_credits and an idempotency_key. (`references/run.md`).

## Dreamstate tools

| Step | Id | Mode | Needs a yes |
| --- | --- | --- | --- |
| 1 | `whoami` | live | no |
| 1 | `tables.sourcing.preview` | live | no |
| 1 | `tables.company_search.preview` | live | no |
| 2 | `tables.table_sources.attach` | dry_run | yes |
| 2 | `tables.table_sources.update` | dry_run | yes |
| 3 | `tables.company_search.run` | dry_run | no, live is refused |
| 3 | `tables.table_sources.run` | dry_run | yes |

## Stop

- Do not start without both caps.
- Do not attach a second live source on a worksheet that already has one.
- Do not treat a route check as rows in the sheet.
