# How a week moves

One batch a week. The Outbound Lead owns the brief, the calibration, the plan, and the spend watch.

## A day

`watch-engine-spend` reads the free spend breakdown and flags unclaimed credits. The 08:00 rollup in dreamstate-gtm-team gets one engine block from free reads: tier counts, holds by reason, spend against the ceiling, unclaimed spend, and results that are due for a reading. This repo does not add a second routine.

## A week

Monday is the plan: `npm run plan-install`, then quotes, then a yes on each item that should run. Midweek is the batch, capped. Friday is `read-results` if the review floor is met. If it is not, the verdict is too little data and the rubric stays put.

Each batch is a Chief of Staff packet with Goal, Inputs, Skill, and Guardrails. Run it in Codex, one worktree per task. No source schedule without its own yes.
