# Call plan

Fictional example. No real companies or people.

Quoted, not measured. Nothing in this file has run.

| Step | Call | Quoted cost | Yes |
| --- | --- | --- | --- |
| 1 | `whoami` | 0 | Confirm the workspace |
| 2 | `tables.company_search.preview` | 0 | Show rows |
| 3 | `tables.workbooks.create` | 0 | dry_run, then a yes |
| 4 | `tables.table_sources.attach` and `tables.table_sources.update` | 0 | Caps required |
| 5 | `tables.table_sources.run` | dynamic, ceiling 50 | max_rows and max_credits |
| 6 | `tables.columns.catalog` then `tables.columns.add` | 0 to add | Copy the card id |
| 7 | `tables.columns.run` for fit | dynamic | One row first |
| 8 | `crm.signals.search_plan` and `crm.signals.search_preview` | 0 | Do not bind a feed |
| 9 | `crm.signals.search_run` | dynamic, ceiling 1000000 | approved and max_credits |
| 10 | `crm.contact.find_person` | 0.9 | One champion, then stop |
| 11 | `tables.people_search.preview` | 0 | Tier A and B only |
| 12 | `crm.contact.find_email` | variable, max 50 | Quote first |
| 13 | `tables.contacts.verify_email` | 0.45 an address | Catch-all held |
| 14 | `sequence.sequences.create_from_worksheet` | 0 | Draft only |
| 15 | `workflow.automations.import_preflight` then `workflow.automations.import` | 0 | Leave disabled |

Credit ceiling for a first quoted pass: set it in the brief before step 5. v1 does not spend it.
