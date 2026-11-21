# Buyer fit column

Use column.ai_fit_score with the person_job_fit template. The price is 0.04 credits a row. prompt is required and model_id is optional. Template inputs are person_name, job_title, company_name, and target_role. Add it with tables.columns.add. Quote tables.columns.run with dry_run of table_id, column_key, and limit 1.

Fetch tools_get for both calls. Wait for a yes on that quoted item before any live call. Title alone never proves authority. The local score-buyer-fit function agrees with that rule.

Show the owner the one-row score, the unknowns, and whether authority was evidenced.

Stop if authority is unknown. Do not pass the buyer. Do not switch to provider.enrich.person.waterfall, which includes a phone lane and is the wrong tool for finding buyers.
