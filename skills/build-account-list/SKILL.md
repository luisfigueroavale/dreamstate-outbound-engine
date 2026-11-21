---
name: build-account-list
description: "Preview a company source for free, then run it under a row cap and a credit cap."
---
# Build account list

Follow `docs/skill-frame.md`.

## Use when

- The brief has an audience cap and a credit ceiling.
- You need a worksheet of companies.

## Steps

1. Call `tables.sourcing.preview` and `tables.company_search.preview` (`references/preview.md`).
2. Attach with `tables.table_sources.attach` and set caps with `tables.table_sources.update` (`references/caps.md`).
3. Run `tables.company_search.run` only as a plan, then land rows with `tables.table_sources.run` (`references/run.md`).

## Stop

- dry_run first, quote, wait for the owner's yes on that item
- Do not send, enroll, launch, post, schedule, or delete.
