# People source

tables.people_search.plan needs prompt and is free. tables.people_search.preview is free. tables.people_search.run is 0 credits but live is refused with not_executable and builds no rows. Use it only as a dry_run route check. Inputs are people, company, from_table, and limit from 1 to 1000.

Attach provider.linkedin.people.search with tables.table_sources.attach. account_id, a LinkedIn sender, is required. Optional filters include keywords, title, titles, title_excludes, location, industry, company, past_company, limit, and per_company_limit. Set per_run_max_rows and per_run_max_credits with tables.table_sources.update. Land rows with tables.table_sources.run. Fetch tools_get and dry_run the source run. Wait for a yes on that quoted item before any live call.

Show the owner one preview person per role, the sender account_id, and the quoted max_rows. Walk roles in order. A miss moves to the next role.

Stop if account_id is missing. Stop if the quote exceeds the ceiling. Do not call the people search live expecting rows to appear.
