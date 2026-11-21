# Email column and one-off

For a batch, add provider.enrich.email with tables.columns.add. It is up to 12.45 credits a row, billed only on a hit, and the price includes verify. Inputs are all optional: full_name, first_name, last_name, company_name, company_domain, profile_url, linkedin_urn, existing_email, steps, and validator. Quote tables.columns.run with dry_run of table_id, column_key, and limit 1.

For one person, crm.contact.find_email takes linkedin_url, full_name, first_name, last_name, and domain. Its dry_run is free and returns the provider chain and a quote_hash. The live maximum is 50 credits a call. Fetch tools_get first. Wait for a yes on that quoted item before any live call.

Show the owner the one-row quote, the address status, and whether verify was already included in the column price.

Stop if the quote is above the ceiling. Do not run the column on a buyer who failed fit. Do not use the person waterfall, which adds a phone lane and a much higher estimate.
