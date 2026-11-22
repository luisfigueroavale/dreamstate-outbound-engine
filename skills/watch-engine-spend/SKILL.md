---
name: watch-engine-spend
description: "Compare credit spend in the window with the brief ceiling and flag anything no step claimed. Use after a batch has been quoted. It does not turn a source back on."
---
# Watch engine spend

Follow `docs/skill-frame.md`.

## Use when

- You need the free ledger for the brief window.
- A source may have run outside an approved window.

## Steps

1. Call `whoami`. Fetch `tools_get` before every `tools_run` (`references/window.md`).
2. Read `workspace.usage.history_list` and compare it with the claims (`references/unclaimed.md`).
3. Read `runs_list` for source runs outside the approved window (`references/sources.md`).

## Dreamstate tools

| Step | Id | Mode | Needs a yes |
| --- | --- | --- | --- |
| 1 | `whoami` | live | no |
| 1 | `workspace.usage.spend_breakdown` | live | no |
| 2 | `workspace.usage.history_list` | live | no |
| 3 | `runs_list` | live | no |

## Stop

- Do not turn a source back on.
- Do not treat a missing row as zero spend.
- A schedule needs its own yes. This skill only reads.
