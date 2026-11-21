---
name: check-crm-first
description: "Class each account as existing, new, ambiguous, or a failed lookup before any CRM write. Use after a batch exists and before any sync. It does not push records."
---
# Check crm first

Follow `docs/skill-frame.md`.

## Use when

- A batch is about to be compared with the CRM.
- Someone asked to push rows.

## Steps

1. Call `whoami`. Fetch `tools_get` before every `tools_run` (`references/search.md`).
2. Preview the mapping with `integrations.crm_management_preview` (`references/classes.md`).
3. Do not call `integrations.sync` without a yes on that record. dry_run first, show rows, credits and quote_hash, wait for the owner's yes on that item, then live with max_credits and an idempotency_key. (`references/write.md`).

## Dreamstate tools

| Step | Id | Mode | Needs a yes |
| --- | --- | --- | --- |
| 1 | `whoami` | live | no |
| 1 | `crm.records.search` | live | no |
| 2 | `integrations.crm_management_preview` | live | no |
| 3 | `integrations.sync` | dry_run | yes, and v1 does not go live |

## Stop

- Do not label an ambiguous lookup as new.
- Do not treat a failed lookup as proof the account is absent.
- v1 does not sync, even after a dry_run.
