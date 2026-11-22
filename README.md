# Dreamstate Outbound Engine

**Pick the companies worth a message, find the right person, write one reviewed first touch, and learn from every round, run on Dreamstate.**

Fit comes first. Signals raise a company that already fits. Contacts are priced only for the top tiers. Nothing sends unless you say yes on that item. The plain map is [docs/start-here.md](docs/start-here.md).

Codex is the preferred agent. Claude Code uses the same [AGENTS.md](AGENTS.md).

## Who it is for

A founder or a small team already on Dreamstate who wants a small batch, and a reason for every company that was picked or held.

## What the agent will not do

It will not send, enroll, launch, spend credits, push to your CRM, change a schedule, or delete anything without your yes on that item. It will not invent a fact, a number, or a customer. A catch-all or an unverified email is never ready. The rules are in [AGENTS.md](AGENTS.md) and [docs/engine-rules.md](docs/engine-rules.md).

## The first 30 minutes

1. Install the Dreamstate CLI if it is not installed: `npx @trydreamstate/cli install`. Sign in in the browser. Do not paste a key. The server URL is in [.mcp.json](.mcp.json).
2. Start the offline sample from this folder with `npm run demo`. The write-up lands at `output/demo/report.md`, and the saved twin is [examples/first-batch/report.md](examples/first-batch/report.md). Look at the hold reason next to every company.
3. Open the folder in Codex or Claude Code and run `set-up-engine`. It calls `whoami` and confirms the workspace.
4. Copy `motion/` to `motion.local/` and fill [motion/brief.md](motion/brief.md) with the agent, from Company Context and your answers.
5. Run `calibrate-fit` on ten companies you know. Write your expected decision for each before any paid call.
6. Run `npm run plan-install` and read the call plan. Nothing has run.
7. Run `npm install` and `npm run check`.
8. Stop. Nothing has been sent or spent.

## How a day and a week move

Each morning the spend watch reads free credit rows and flags anything no step claimed. The 08:00 rollup gets one engine block: tier counts, holds by reason, spend against the ceiling, unclaimed spend, and results waiting for a reading. One batch a week. The longer version is [docs/how-a-week-moves.md](docs/how-a-week-moves.md). The method is [docs/method.md](docs/method.md).

## What is in the box

| Piece | What it is | What it costs | Who uses it |
| --- | --- | --- | --- |
| [motion/](motion/brief.md) | Blank brief, rubrics, signals, and one test | Free | Outbound Lead |
| [functions/](functions/merge-sources.mjs) | 14 pure functions with tests | Free, offline | Every outbound seat |
| [prompts/](prompts/research-company.md) | Six prompts for the AI steps | Free until a column run is quoted | Outbound Copywriter, Lead Sourcer |
| [skills/](skills/set-up-engine/SKILL.md) | 15 skills | Free reads, paid steps quoted | See the table below |
| [examples/first-batch/](examples/first-batch/report.md) | Offline demo | 0 credits | Anyone learning the engine |
| [examples/fleet-signal-engine/](examples/fleet-signal-engine/plan.md) | Fictional worked example | Quoted, not measured | Outbound Lead |
| [examples/add-ons/](examples/add-ons/README.md) | Three disabled add-ons | A yes before any live call | Lead Sourcer |
| [docs/tool-map.md](docs/tool-map.md) | Capability, cost, consent, CLI form | Free to read | Every seat |

Skill count: 15
Function count: 14

## Skills

| Skill | Step | What it does | What it costs |
| --- | --- | --- | --- |
| `set-up-engine` | Setup | Confirms the workspace, copies templates, runs the demo, writes the plan | Free |
| `write-motion-brief` | Brief | Fills the local brief and stops on a blank cap | Free |
| `calibrate-fit` | Calibrate | Ten known companies, expected decisions first, then one quoted row | Quoted per row |
| `build-account-list` | Source | Free preview, then a capped source run | Preview free, run quoted |
| `merge-sources` | Dedupe | One account per domain, uncertain identity held | Free |
| `score-account-signals` | Signals | Points, decay, tiers. Tier C spends nothing more | Each signal quoted |
| `find-buyers` | Buyer | People search only at tier A and B | Quoted per row |
| `find-verified-email` | Contact | Waterfall, then verify. Catch-all is held | Quoted per row |
| `check-crm-first` | CRM | Existing, new, ambiguous, or failed. No write without a yes | Free reads |
| `draft-first-touch` | Copy | One draft from evidence, the variant, and the offer | Free unless an AI column is quoted |
| `design-copy-test` | Test | One changed variable, two variants, stable assignment | Free |
| `hand-off-to-sequence` | Handoff | Draft sequence and preview. Stops before enrollment | Free draft. Enrollment needs a yes |
| `read-results` | Learn | Variant results, an interval, and a learning note after a yes | Free reads. The note waits for a yes |
| `watch-engine-spend` | Guard | Spend against the ceiling, plus unclaimed rows | Free |
| `build-signal-engine` | Engine | The fleet plan, quoted step by step, graphs left disabled | Quoted. v1 does not run a paid pilot |

## Functions

| Function | Kind | Where it runs |
| --- | --- | --- |
| `merge-sources` | Code | Local, and as a disabled callable |
| `research-company` | AI column | Prompt plus a local check |
| `score-company-fit` | AI column | Prompt plus a local check |
| `score-signals` | Code | Local. Tier math, decay, and stacking |
| `rank-accounts` | Code | Local |
| `find-buyer` | Data | Local, then a quoted people search when you leave the demo |
| `check-buyer-role` | Data | Local |
| `score-buyer-fit` | AI column | Prompt plus a local check |
| `rank-buyers` | Code | Local |
| `find-work-email` | Data | Local record of a quoted waterfall |
| `assign-variant` | Code | Local. SHA-256, stable per domain |
| `draft-first-touch` | AI column | Prompt plus a local check |
| `check-send-ready` | Code | Local, before any sequence handoff |
| `read-results` | Code | Local. Wilson interval and a plain verdict |

## Map

| Path | What it is |
| --- | --- |
| [AGENTS.md](AGENTS.md) | Rules for Codex and Claude Code |
| [docs/](docs/start-here.md) | Method, measuring, rules, the tool map |
| [skills/](skills/set-up-engine/SKILL.md) | One skill per job |
| [motion/](motion/brief.md) | Blank brief. Your copy is `motion.local/` |
| [functions/](functions/score-signals.mjs) | The math |
| [prompts/](prompts/draft-first-touch.md) | The AI steps |
| [dreamstate/](dreamstate/manifest.json) | Disabled column, callable, and workflow specs |
| [examples/fleet-signal-engine/](examples/fleet-signal-engine/engine-map.md) | Fictional fleet example |
| [brand/](brand/AGENTS.md) | Blank templates. Your copy is `brand.local/` |
| [scripts/check.mjs](scripts/check.mjs) | Repo check |

## Choose a starting task

- Run a first batch. The Outbound Lead uses `set-up-engine`, then `write-motion-brief`, then `calibrate-fit`.

  Paste this prompt: "You are the Outbound Lead. Follow set-up-engine, then write-motion-brief, then calibrate-fit. Keep the work offline until I approve one quoted row."

- Map the signal path. The Outbound Lead uses `build-signal-engine` on the fleet folder and leaves every graph disabled.

  Paste this prompt: "You are the Outbound Lead. Follow build-signal-engine in examples/fleet-signal-engine. Quote each step. Do not enable a workflow."

- Connect the worksheet. The Outbound Lead reads `npm run plan-install`. The Lead Sourcer runs `build-account-list` only after the caps are approved.

  Paste this prompt: "You are the Outbound Lead. Run npm run plan-install and stop. The Lead Sourcer may follow build-account-list only after I approve the caps."

- Read what came back. Sequences and Deliverability follows `read-results` only after messages were delivered.

  Paste this prompt: "You are Sequences and Deliverability. Follow read-results. If a variant has fewer than 100 delivered messages, say too little data and leave the rubric alone."

## Names you never want in the repo

Put them in `.banned-terms.local`, one name per line. Blank lines and lines that start with `#` are ignored. Git does not track the file. `npm run check` scans text for those names when the file is present. A git worktree reads the main checkout's copy. When neither exists it prints `BANNED-TERM SCAN SKIPPED` and continues. `npm run check -- --strict` fails in that case.

## Part of the Dreamstate GTM team

The Outbound Lead owns this repo. No new seat. The seats and the rollup live next door.

| Repo | What it is |
| --- | --- |
| [dreamstate-gtm-team](https://github.com/luisfigueroavale/dreamstate-gtm-team) | Seats, rules, and the 08:00 rollup |
| [dreamstate-linkedin-funnel](https://github.com/luisfigueroavale/dreamstate-linkedin-funnel) | Content desk |
| [dreamstate-geo](https://github.com/luisfigueroavale/dreamstate-geo) | Search desk |
| [dreamstate-design](https://github.com/luisfigueroavale/dreamstate-design) | Graphics |
| [dreamstate-plugins](https://github.com/luisfigueroavale/dreamstate-plugins) | Install path and the Dreamstate skills |
| [dreamstate-launch-videos](https://github.com/luisfigueroavale/dreamstate-launch-videos) | Launch video library |

Where posts and pictures live: [docs/content-and-media.md](docs/content-and-media.md). Which Dreamstate skill teaches which pack: [docs/dreamstate-skills.md](docs/dreamstate-skills.md).

## License

[MIT](LICENSE). Copyright (c) 2026 Luis Vale.
