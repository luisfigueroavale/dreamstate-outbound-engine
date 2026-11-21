---
name: read-results
description: "Read variant results, run the local results function, and write a learning note only after a yes."
---
# Read results

Follow `docs/skill-frame.md`.

## Use when

- A test has delivered messages.
- The weekly review needs a verdict.

## Steps

1. Read `sequence.sequences.variants_get` and `sequence.outreach.analytics_variant_compare` (`references/pull.md`).
2. Run the local `read-results` function and use its verdict words (`references/verdict.md`).
3. After a yes, write the note with `knowledge.brain.knowledge.compose_document` (`references/note.md`).

## Stop

- dry_run first, quote, wait for the owner's yes on that item
- Do not send, enroll, launch, post, schedule, or delete.
