# Call plan

Fictional example. No real companies or people.

Quoted, not measured. Nothing in this file has run. Each ceiling is the most that step may quote. A live call still waits for a yes on that item.

| Step | Call | Quoted price | Ceiling |
| --- | --- | --- | --- |
| 1 | `whoami` | 0 | 0. Confirm the workspace. |
| 2 | `tables.company_search.preview` | 0 | 0. Show rows. Live search run is refused and writes nothing. |
| 3 | `tables.workbooks.create` then `tables.worksheets.create` | 0 | 0. dry_run, then a yes. |
| 4 | `tables.table_sources.attach` and `tables.table_sources.update` | 0 | Set per_run_max_rows and per_run_max_credits. |
| 5 | `tables.table_sources.run` for companies | dynamic | 50 credits a call. max_rows optional, 1 to 10000. |
| 6 | `tables.columns.add` for `column.ai_fit_score` | 0 to add | Fit run is 0.04 credits a row. Quote one row first. |
| 7 | `tables.columns.run` for fit | 0.04 a row | 50 credits a call. dry_run with limit 1. |
| 8 | `provider.enrich.hiring` for open jobs | up to 1 a row, billed on a hit | 50 credits a call. Needs company_linkedin_url or company_domain. |
| 9 | `column.company_linkedin_jobs` | up to 1 credit a job | Maximum 100 jobs a row. company_linkedin_id required. |
| 10 | `column.research` for a depot or a route | about 4 a row | 50 credits a call. query required. |
| 11 | `provider.linkedin.people.search` then `tables.table_sources.run` for a new leader | 0 a row for the source, then the source run | 50 credits a call. account_id required. Do not use `crm.contact.find_person` to invent a leader. |
| 12 | `provider.enrich.linkedin.profile` | 0.9 a row | profile_url required. Quote one row. |
| 13 | `crm.signals.search_plan` and `crm.signals.search_preview` | 0 | 0. Do not set bind_feed. |
| 14 | `crm.signals.search_run` | dynamic | 1000000 on the contract. This plan caps the step at 50. Live needs approved true, table_id, and max_credits. |
| 15 | `tables.people_search.plan` and preview, then `tables.table_sources.run` for buyers | preview 0, source run dynamic | 50 credits a call. Tier A and B only. |
| 16 | `tables.columns.run` for person_job_fit | 0.04 a row | 50 credits a call. Quote with limit 1. |
| 17 | `provider.enrich.email` | up to 12.45 a row, billed on a hit | 50 credits a call. The price includes verify. |
| 18 | `tables.contacts.verify_email` when the column did not already verify | 0.45 an address | 45 credits a call. Quote 0.45 times the address count. Catch-all stays held. |
| 19 | `sequence.sequences.create_from_worksheet` | 0 | Draft only. |
| 20 | `workflow.automations.import_preflight` then `workflow.automations.import` | 0 | Leave the graph disabled. |

The brief ceiling has to be set before step 5. v1 does not spend it.
