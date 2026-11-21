# Signal weights

Fictional example. No real companies or people.

| Family | Points | Strong | How it is quoted |
| --- | --- | --- | --- |
| Hiring a fleet or maintenance manager | 12 | no | `provider.enrich.hiring` at up to 1 credit a row, and `column.company_linkedin_jobs` at up to 1 credit a job, maximum 100 a row |
| A posting that names a telematics or fleet system change | 24 | yes | The same hiring columns, then a quoted judgment |
| A new operations leader within a year | 22 | yes | `provider.linkedin.people.search` (account_id required) and then `provider.enrich.linkedin.profile` at 0.9 credits a row. `crm.contact.find_person` cannot find a leader you do not already know |
| A new depot or route in public news | 10 | no | `column.research` at about 4 credits a row |
| A past champion now at the account | 46 | yes | `provider.enrich.linkedin.profile` when you already have a profile_url, quoted |

Half life 21 days. Cutoff 90 days. Stack 1.1 per extra family, cap 1.3. Tier A from 40 points. Tier B from 18. A weak family alone stays at C.
