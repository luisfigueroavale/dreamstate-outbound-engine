# Dedupe preview

tables.rows.query needs table_id. tables.rows.dedupe needs table_id, column_id, and key_kind. Dry_run is the preview. Live would change rows even though the credit price is 0.

Fetch tools_get for both. Query live and say it was a read. Dedupe stays on dry_run until the owner says yes on that preview. Do not send a live dedupe from this skill.

Show the owner the duplicate groups and the key you used. Say which group you would keep and which you would hold.

Stop if the preview groups rows that the identity check already marked as uncertain. Do not treat a 0 credit price as permission to write.
