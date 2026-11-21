# Route check and row run

tables.company_search.run costs 0 credits and takes route_id. Live is refused with not_executable and builds no rows. Use dry_run only, to check the route. Rows come from tables.table_sources.attach followed by tables.table_sources.run.

tables.table_sources.run is dynamic with a ceiling of 50 credits a call. table_id is required. max_rows is optional, from 1 to 10000. Fetch tools_get and dry_run the source run. Wait for a yes on that quoted item before any live call.

Show the owner the route from the dry_run and the quoted credits for the max_rows you asked for. Do not describe the route check as a filled worksheet.

Stop if the route dry_run fails. Stop if the quote is above the brief ceiling. Do not call the company search live in the hope that rows will appear.
