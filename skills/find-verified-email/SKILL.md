---
name: find-verified-email
description: "Find a work email, verify it, and hold catch-all or unknown."
---
# Find verified email

Follow `docs/skill-frame.md`.

## Use when

- A buyer passed both gates.
- You need a verified address before any draft can be ready.

## Steps

1. Read the lane order with `sequence.outreach.enrichment_sequence_get` (`references/waterfall.md`).
2. Quote `crm.contact.find_email` and then `tables.contacts.verify_email` (`references/verify.md`).
3. Hold catch-all, unknown, and a stale check (`references/hold.md`).

## Stop

- dry_run first, quote, wait for the owner's yes on that item
- Do not send, enroll, launch, post, schedule, or delete.
