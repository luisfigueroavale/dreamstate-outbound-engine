---
name: build-signal-engine
description: "Walk the fleet example from the printed plan to disabled graphs. Use after the owner asks for the whole engine on the fleet folder. It does not run a paid pilot."
---
# Build signal engine

Follow `docs/skill-frame.md`.

## Use when

- The fleet folder is the guide and every company there is fictional.
- v1 stops before a live row.

## Steps

1. Call `whoami`. Fetch `tools_get` before every `tools_run` (`references/plan.md`).
2. Quote each paid step and wait. dry_run first, show rows, credits and quote_hash, wait for the owner's yes on that item, then live with max_credits and an idempotency_key. (`references/quote.md`).
3. Preflight with `workflow.automations.import_preflight`, import disabled with `workflow.automations.import`, and lint with `workflow.automations.lint`. dry_run first, show rows, credits and quote_hash, wait for the owner's yes on that item, then live with max_credits and an idempotency_key. (`references/disabled.md`).
4. Stop. No enable, no enroll, no send, no schedule (`references/stop.md`).

## Dreamstate tools

| Step | Id | Mode | Needs a yes |
| --- | --- | --- | --- |
| 1 | `whoami` | live | no |
| 3 | `workflow.automations.import_preflight` | live | no |
| 3 | `workflow.automations.import` | dry_run | yes |
| 3 | `workflow.automations.lint` | live | no |

## Stop

- v1 does not run a paid pilot.
- Graphs stay disabled.
- A later live row is still quoted first and waits for a yes on that item.
