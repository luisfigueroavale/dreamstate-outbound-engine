---
name: set-up-engine
description: "Confirm the workspace, copy the blank motion files, read Company Context, run the offline demo, and write the first install plan."
---
# Set up engine

Follow `docs/skill-frame.md`.

## Use when

- A new clone of this repo.
- The owner has signed in through the browser.

## Steps

1. Call `whoami` and stop if this folder should use a different workspace (`references/workspace.md`).
2. Copy `motion/` to `motion.local/` only when the owner asks, and stop if a needed file is still blank (`references/templates.md`).
3. Call `knowledge.context.resolve` and `knowledge.profile.get` and keep the pages out of tracked files (`references/context.md`).
4. Run `npm run demo` and read why each company was picked or held (`references/demo.md`).
5. Run `npm run plan-install` and stop (`references/stop.md`).

## Stop

- dry_run first, quote, wait for the owner's yes on that item
- Do not send, enroll, launch, post, schedule, or delete.
