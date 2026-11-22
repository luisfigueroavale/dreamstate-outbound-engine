# Worksheets

Fictional example. No real companies or people.

Prices are quoted from the definition list on 2026-11-21, not measured on a live run. The per-row cap is the most that column may quote on one row before a new yes.

| Worksheet | Column | Definition id | Run when | Per-row cap |
| --- | --- | --- | --- | --- |
| Accounts | Domain | manual text | on import | none |
| Accounts | Fit | `column.ai_fit_score` with icp_fit_score | after merge | 0.04 credits |
| Accounts | Open jobs | `provider.enrich.hiring` | fit passed, not tier C | 1 credit, billed on a hit |
| Accounts | Job posts | `column.company_linkedin_jobs` | fit passed, not tier C | 1 credit a job, maximum 100 |
| Accounts | Depot or route news | `column.research` | fit passed, not tier C | about 4 credits |
| Accounts | New leader profile | `provider.enrich.linkedin.profile` | after the people source returns a profile_url | 0.9 credits |
| Accounts | Tier | local `score-signals` | after points | none |
| Buyers | Person source | `provider.linkedin.people.search` | tier A or B only | 0 a row, then a source run capped at 50 a call |
| Buyers | Buyer fit | `column.ai_fit_score` with person_job_fit | a person was found | 0.04 credits |
| Buyers | Email | `provider.enrich.email` | buyer fit passed | 12.45 credits, billed on a hit |
| Buyers | Verify | `tables.contacts.verify_email` | only if the email column did not already verify | 0.45 credits an address |
| Drafts | First touch | AI prompt column | email valid | 1 credit |

Do not paste a vendor lane id. Read `tables.executable_definitions.list_resolved` and copy the generic definition id it returns.
