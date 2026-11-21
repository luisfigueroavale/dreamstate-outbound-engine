---
name: hand-off-to-sequence
description: "Create a draft sequence, preview the copy, and stop before enrollment. Use after check-send-ready. It does not activate an audience."
---
# Hand off to sequence

Follow `docs/skill-frame.md`.

## Use when

- A row is ready or one review away.
- A draft sequence does not exist yet.

## Steps

1. Call `whoami`. Fetch `tools_get` before every `tools_run` (`references/ready.md`).
2. Create a draft with `sequence.sequences.create_from_worksheet`, then `sequence.sequences.validate` and `sequence.sequences.copy_preview` (`references/draft.md`).
3. Stop before `sequence.sequences.enroll_selection` and `sequence.sequences.activate_audience`. dry_run first, show rows, credits and quote_hash, wait for the owner's yes on that item, then live with max_credits and an idempotency_key. (`references/stop.md`).

## Dreamstate tools

| Step | Id | Mode | Needs a yes |
| --- | --- | --- | --- |
| 1 | `whoami` | live | no |
| 2 | `sequence.sequences.create_from_worksheet` | dry_run | yes |
| 2 | `sequence.sequences.validate` | live | no |
| 2 | `sequence.sequences.copy_preview` | live | no |
| 3 | `sequence.sequences.enroll_selection` | dry_run | yes, v1 does not go live |
| 3 | `sequence.sequences.activate_audience` | dry_run | yes, v1 does not go live |

## Stop

- Do not enroll in v1.
- Do not activate. Activation sends.
- A row that fails the ready check stays out of the draft.
