---
name: draft-first-touch
description: "Write one draft from evidence, the assigned variant, and the offer. Use after a buyer is otherwise held only for review. It does not enroll."
---
# Draft first touch

Follow `docs/skill-frame.md`.

## Use when

- The Outbound Copywriter has the offer file and a passed buyer.
- The draft must stay unreviewed until the owner reads it.

## Steps

1. Call `whoami`. Fetch `tools_get` before every `tools_run` (`references/evidence.md`).
2. Pass `docs/ai-tells.md` and keep the assigned line exact (`references/voice.md`).
3. Preview with `sequence.outreach.message_preview` and leave the draft unreviewed (`references/preview.md`).

## Dreamstate tools

| Step | Id | Mode | Needs a yes |
| --- | --- | --- | --- |
| 1 | `whoami` | live | no |
| 1 | `knowledge.context.resolve` | live | no |
| 3 | `sequence.outreach.message_preview` | live | no |

## Stop

- Stop if brand.local/voice.md is missing or blank.
- Do not invent proof.
- Do not enroll from this skill.
