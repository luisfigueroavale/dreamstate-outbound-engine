# Engine rules

Each rule is enforced by a function test or by `scripts/check.mjs`.

| Rule | Where it is enforced |
| --- | --- |
| One account per normalised domain, signals kept | `merge-sources` in `scripts/functions.test.mjs` |
| Cited facts only | `research-company` |
| Unknown scores 0 and a failed gate excludes | `score-company-fit` |
| Half life 21, cutoff 90, stack cap 1.3, weak single family stays C | `score-signals` |
| Fit before tier, then a named capacity hold | `rank-accounts` and the demo test |
| No invented profile URL | `find-buyer` |
| Employer and title confirmed or held | `check-buyer-role` |
| Title alone never proves authority | `score-buyer-fit` |
| Catch-all and unknown are held | `find-work-email` and `check-send-ready` |
| Same domain, same variant | `assign-variant` |
| Unresolved token holds | `draft-first-touch` and `check-send-ready` |
| Outcomes count only on delivered rows | `read-results` |
| Review floor 100, else too little data | `read-results` and the demo history |
| Unclaimed spend is flagged | `scripts/spend-check.test.mjs` |
| Install plan never calls the network | `scripts/plan-install.test.mjs` |
| Skill links point at `skills/` | `scripts/skills-link.test.mjs` |
| No em dash, no banned word, no hard-coded vendor definition id | `scripts/check.mjs` |

Tier C spends nothing more. A schedule, an enable, an enrollment, and a send each need their own yes.
