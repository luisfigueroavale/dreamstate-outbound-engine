---
name: find-verified-email
description: "Find a work email for a buyer who already passed both gates, then verify it. Use after find-buyers. It does not send, and a catch-all stays held."
---
# Find verified email

Follow `docs/skill-frame.md`.

## Use when

- A buyer passed company fit and buyer fit.
- You need a verified address before a draft can be ready.

## Steps

1. Call `whoami`. Fetch `tools_get` before every `tools_run` (`references/waterfall.md`).
2. For a batch, add `provider.enrich.email` with `tables.columns.add` and quote `tables.columns.run`. For one person, use `crm.contact.find_email`. dry_run first, show rows, credits and quote_hash, wait for the owner's yes on that item, then live with max_credits and an idempotency_key. (`references/verify.md`).
3. Hold catch-all, unknown, and a stale check. A specialist verifier exists and this engine still holds catch-alls (`references/hold.md`).

## Dreamstate tools

| Step | Id | Mode | Needs a yes |
| --- | --- | --- | --- |
| 1 | `whoami` | live | no |
| 2 | `sequence.outreach.enrichment_sequence_get` | live | no |
| 2 | `tables.columns.add` | dry_run | yes |
| 2 | `tables.columns.run` | dry_run | yes |
| 2 | `crm.contact.find_email` | dry_run | yes |
| 3 | `tables.contacts.verify_email` | live | yes |

## Stop

- A catch-all is never ready.
- Do not invent a second verifier id.
- Do not send when the only path left is a profile with no verified email.
