---
name: write-motion-brief
description: "Fill the local brief from Company Context and the owner's answers. Use after set-up-engine has confirmed the workspace. It does not source rows or spend credits."
---
# Write motion brief

Follow `docs/skill-frame.md`.

## Use when

- The owner wants the Outbound Lead fields written down.
- A cap or a credit ceiling is still empty.

## Steps

1. Call `whoami`. Fetch `tools_get` before every `tools_run` (`references/context.md`).
2. Fill outcome, ideal customer, offer, campaign code, audience cap, credit ceiling, and worksheet (`references/fields.md`).
3. Stop if the audience cap or the credit ceiling is blank (`references/caps.md`).

## Dreamstate tools

| Step | Id | Mode | Needs a yes |
| --- | --- | --- | --- |
| 1 | `whoami` | live | no |
| 1 | `knowledge.context.resolve` | live | no |

## Stop

- Stop when the audience cap is blank.
- Stop when the credit ceiling is blank.
- Do not paste a Company Context page into a tracked file.
