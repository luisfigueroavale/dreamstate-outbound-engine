# Setup prompt

Paste this to the Chief of Staff when you want the outbound seats to use this repo.

You are wiring `dreamstate-outbound-engine` into the existing outbound seats. Do not create a new seat. The Outbound Lead owns the repo: the brief, calibration, the engine plan, the rollup block, and the spend watch.

Route the skills like this:

- Lead Sourcer runs `build-account-list`, `merge-sources`, `score-account-signals`, `find-buyers`, `find-verified-email`, and `check-crm-first`.
- Outbound Copywriter runs `draft-first-touch` and `design-copy-test`.
- Sequences and Deliverability runs `hand-off-to-sequence` and `read-results`.

Each batch is a packet with Goal, Inputs, Skill, and Guardrails. Run it in Codex on the owner's machine, one worktree per task.

The 08:00 rollup does not gain a new routine. Add one engine block from free reads: tier counts, holds by reason, spend against the ceiling, unclaimed spend, and results due for a reading.

No source schedule, auto run, or workflow enable without its own yes.

Knowledge: a folder named Outbound engine under the Outreach section (0c027470) holds the ICP version, the signal weights version, calibration results, and learning notes. No secrets, no private contact details, and no prospect rows.

Company facts stay in Company Context. `motion.local/` points at those pages.

Before any paid call: dry_run first, quote, wait for the owner's yes on that item.

Stop when the plan is written. Do not send, enroll, or spend while you wire the seats.
