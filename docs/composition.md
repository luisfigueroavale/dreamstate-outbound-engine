# Composition

Each stage names the local function and the Dreamstate step. The agent runs the Dreamstate step. This repo does not call the network.

| Stage | Local function | Dreamstate step | Gate |
| --- | --- | --- | --- |
| Merge | `merge-sources` | `tables.rows.query`, `tables.rows.dedupe` dry run | Bad domains are rejected |
| Research | `research-company` | a research column from `tables.columns.catalog` | No citation means null |
| Company fit | `score-company-fit` | `tables.columns.add`, then `tables.columns.run` | Failed gate or score under the line |
| Signals | `score-signals` | `crm.signals.search_plan`, then a quoted `crm.signals.search_run` | Tier C stops |
| Rank | `rank-accounts` | none | Capacity hold |
| Buyer | `find-buyer`, `check-buyer-role`, `score-buyer-fit` | `tables.people_search.preview`, then a quoted run | Title alone fails |
| Email | `find-work-email` | `crm.contact.find_email`, `tables.contacts.verify_email` | Catch-all, unknown, and stale hold |
| Variant | `assign-variant` | none | Stable for the domain |
| Draft | `draft-first-touch` | `sequence.outreach.message_preview` | Unreviewed |
| Ready | `check-send-ready` | `sequence.sequences.create_from_worksheet` as a draft | Enrollment is a later yes |
| Learn | `read-results` | `sequence.outreach.analytics_variant_compare` | Floor of 100 delivered |

Column cards are copied from `tables.columns.catalog` at run time. See [tool-map.md](tool-map.md).
