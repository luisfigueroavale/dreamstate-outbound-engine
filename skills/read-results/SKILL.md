---
name: read-results
description: "Read variant results, run the local results function, and write a learning note only after a yes. Use after messages were delivered. It does not change a live sequence by itself."
---
# Read results

Follow `docs/skill-frame.md`.

## Use when

- A test has delivered messages, or you need to see that it has too few.
- The weekly review needs a verdict.

## Steps

1. Call `whoami`. Fetch `tools_get` before every `tools_run` (`references/pull.md`).
2. Run the local `read-results` function and use its verdict words (`references/verdict.md`).
3. After a yes, write the note with `knowledge.brain.knowledge.compose_document`. dry_run first, show rows, credits and quote_hash, wait for the owner's yes on that item, then live with max_credits and an idempotency_key. (`references/note.md`).

## Dreamstate tools

| Step | Id | Mode | Needs a yes |
| --- | --- | --- | --- |
| 1 | `whoami` | live | no |
| 1 | `sequence.sequences.variants_get` | live | no |
| 1 | `sequence.outreach.analytics_variant_compare` | live | no |
| 3 | `knowledge.brain.knowledge.compose_document` | dry_run | yes |

## Stop

- Under 100 delivered messages the verdict is too little data.
- Do not copy a winning line into a new test as if it were proof.
- Do not put prospect rows in Knowledge.
