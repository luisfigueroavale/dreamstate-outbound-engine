---
name: build-signal-engine
description: "Walk the fleet example from plan to disabled graphs. v1 stops before a paid pilot."
---
# Build signal engine

Follow `docs/skill-frame.md`.

## Use when

- The owner wants the whole engine mapped.
- The fleet example is the guide.

## Steps

1. Read `examples/fleet-signal-engine/plan.md` and run `npm run plan-install -- --example fleet` (`references/plan.md`).
2. Quote each paid step and wait (`references/quote.md`).
3. Preflight with `workflow.automations.import_preflight`, import disabled with `workflow.automations.import`, and lint with `workflow.automations.lint` (`references/disabled.md`).
4. Stop (`references/stop.md`).

## Stop

- dry_run first, quote, wait for the owner's yes on that item
- Do not send, enroll, launch, post, schedule, or delete.
