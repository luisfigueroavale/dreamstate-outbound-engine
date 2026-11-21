---
name: write-motion-brief
description: "Fill the local brief with the Outbound Lead fields and stop when a cap or a ceiling is blank."
---
# Write motion brief

Follow `docs/skill-frame.md`.

## Use when

- The owner wants the brief filled from Company Context and their answers.
- A cap or a credit ceiling is still empty.

## Steps

1. Read `knowledge.context.resolve` and name the pages, do not paste them (`references/context.md`).
2. Fill outcome, ideal customer, offer, campaign code, audience cap, credit ceiling, and worksheet (`references/fields.md`).
3. Stop if the audience cap or the credit ceiling is blank (`references/caps.md`).

## Stop

- dry_run first, quote, wait for the owner's yes on that item
- Do not send, enroll, launch, post, schedule, or delete.
