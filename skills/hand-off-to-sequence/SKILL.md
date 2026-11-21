---
name: hand-off-to-sequence
description: "Create a draft sequence, preview the copy, and stop before enrollment."
---
# Hand off to sequence

Follow `docs/skill-frame.md`.

## Use when

- `check-send-ready` has a row that is ready or one review away.
- A sequence does not exist yet.

## Steps

1. Run the local `check-send-ready` function and list every hold (`references/ready.md`).
2. Create a draft with `sequence.sequences.create_from_worksheet`, then `sequence.sequences.validate` and `sequence.sequences.copy_preview` (`references/draft.md`).
3. Stop before `sequence.sequences.enroll_selection` and `sequence.sequences.activate_audience` (`references/stop.md`).

## Stop

- dry_run first, quote, wait for the owner's yes on that item
- Do not send, enroll, launch, post, schedule, or delete.
