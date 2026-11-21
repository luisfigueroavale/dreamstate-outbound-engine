---
name: check-crm-first
description: "Class an account as existing, new, ambiguous, or a failed lookup before any CRM write."
---
# Check crm first

Follow `docs/skill-frame.md`.

## Use when

- A batch is about to be compared with the CRM.
- Someone asked to push rows.

## Steps

1. Search with `crm.records.search` (`references/search.md`).
2. Preview the mapping with `integrations.crm_management_preview` (`references/classes.md`).
3. Do not call `integrations.sync` without a yes on that row (`references/write.md`).

## Stop

- dry_run first, quote, wait for the owner's yes on that item
- Do not send, enroll, launch, post, schedule, or delete.
