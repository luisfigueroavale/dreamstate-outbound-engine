---
name: design-copy-test
description: "Freeze one changed variable and two variants, then assign each company a stable variant. Use after a first touch exists. It does not spend credits or enroll."
---
# Design copy test

Follow `docs/skill-frame.md`.

## Use when

- The owner wants a test and has named the one sentence that may change.
- Two variants are enough.

## Steps

1. Call `whoami` before you edit the test file (`references/one-variable.md`).
2. Run the local `assign-variant` function (`references/assign.md`).

## Dreamstate tools

| Step | Id | Mode | Needs a yes |
| --- | --- | --- | --- |
| 1 | `whoami` | live | no |

## Stop

- Do not change two sentences in one round.
- Do not copy a variant from a different test id.
- This skill spends nothing and does not enroll.
