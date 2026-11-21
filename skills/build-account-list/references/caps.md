# Caps on the source

tables.table_sources.attach needs table_id and source_column_id. A worksheet holds one live source. tables.table_sources.update needs table_id and expected_state. The cap fields are per_run_max_rows and per_run_max_credits. Set them from the brief, not from a guess.

Fetch tools_get, then dry_run each write. Wait for a yes on that quoted item before any live call.

Show the owner the two cap numbers on the dry_run preview and the source id you will attach. Wait for a yes that names those numbers.

Stop if expected_state does not match the current binding. Stop if either cap is missing. Do not raise a cap inside the same call that attaches the source.
