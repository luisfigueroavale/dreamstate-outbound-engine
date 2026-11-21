---
name: set-up-engine
description: "Confirm the workspace, copy the blank motion files, and write the first install plan. Use after the owner has signed in through the browser. It does not spend credits or send a message."
---
# Set up engine

Follow `docs/skill-frame.md`.

## Use when

- A new clone, before any sourced row.
- You do not yet know which workspace this folder should use.

## Steps

1. Call `whoami`. Fetch `tools_get` before every `tools_run` (`references/workspace.md`).
2. Copy `motion/` to `motion.local/` only when the owner asks, and stop if a needed file still says Status: blank (`references/templates.md`).
3. Call `knowledge.context.resolve` and `knowledge.profile.get`. Keep the pages out of tracked files (`references/context.md`).
4. Run `npm run demo` and read the hold beside every company (`references/demo.md`).
5. Run `npm run plan-install` and stop (`references/stop.md`).

## Dreamstate tools

| Step | Id | Mode | Needs a yes |
| --- | --- | --- | --- |
| 1 | `whoami` | live | no |
| 3 | `knowledge.context.resolve` | live | no |
| 3 | `knowledge.profile.get` | live | no |

## Stop

- Do not guess a workspace when more than one is listed.
- Do not paste Company Context into a tracked file.
- Do not attach a source or run a column in this skill.
