# Quote each step

Fit uses column.ai_fit_score at 0.04 credits a row. Open jobs use provider.enrich.hiring at up to 1 credit a row, or column.company_linkedin_jobs at up to 1 credit a job with a maximum of 100 a row. News uses column.research at about 4 credits a row. A profile is provider.enrich.linkedin.profile at 0.9. Email is provider.enrich.email at up to 12.45. Verify is 0.45 an address. Source runs use tables.table_sources.run with a ceiling of 50 credits a call.

For each of those, fetch tools_get and dry_run one row where a dry_run exists. Wait for a yes on that quoted item before any live call. v1 does not continue into the live call.

Show the owner the quote_hash, the row count, and the credits for that one row.

Stop after the quote. A quote is a price, not a yes. Do not chain the next live call because the previous quote was small.
