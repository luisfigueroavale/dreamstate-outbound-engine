---
name: merge-sources
description: "Merge exported rows on the normalised domain and flag an identity you cannot prove."
---
# Merge sources

Follow `docs/skill-frame.md`.

## Use when

- Two or more exports should become one account list.
- A domain looks shared by unrelated companies.

## Steps

1. Run the local `merge-sources` function on the export (`references/exports.md`).
2. If two names share a domain and the records disagree, do not merge them (`references/identity.md`).
3. Preview duplicates with `tables.rows.query` and `tables.rows.dedupe` (`references/dedupe.md`).

## Stop

- dry_run first, quote, wait for the owner's yes on that item
- Do not send, enroll, launch, post, schedule, or delete.
