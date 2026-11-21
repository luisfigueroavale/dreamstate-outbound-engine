---
name: calibrate-fit
description: "Score ten known companies against decisions the owner wrote first, then edit the rubric."
---
# Calibrate fit

Follow `docs/skill-frame.md`.

## Use when

- The brief exists and the owner has named ten known companies.
- You are about to change fit points.

## Steps

1. Ask for the expected decision on each company before any paid call (`references/expected.md`).
2. Read `tables.columns.catalog` and add the fit card with `tables.columns.add` (`references/quote.md`).
3. Run one row with `tables.columns.run` and compare it to the expected decision (`references/rubric.md`).

## Stop

- dry_run first, quote, wait for the owner's yes on that item
- Do not send, enroll, launch, post, schedule, or delete.
