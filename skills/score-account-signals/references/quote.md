# Hiring and news

provider.enrich.hiring is up to 1 credit a row, billed on a hit, and needs company_linkedin_url or company_domain. column.company_linkedin_jobs is up to 1 credit a job, maximum 100 a row, and needs company_linkedin_id. column.research is about 4 credits a row and needs query. Add each with tables.columns.add. Run with tables.columns.run.

Fetch tools_get for tables.columns.add and tables.columns.run. Quote columns.run with dry_run of table_id, column_key, and limit 1. The ceiling is 50 credits a call. Wait for a yes on that quoted item before any live call.

Show the owner the one-row quote for hiring and the one-row quote for the research question. Name the question you will ask about a depot or a route.

Stop if the quote is above the brief ceiling. Do not run the column on tier C. Do not run a company that failed fit.
