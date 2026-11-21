# No sync in v1

integrations.sync needs record_id. The credit price is 0 and the consequence is an external send into the CRM. Dry_run shows the payload. Live would write.

Fetch tools_get. If the owner insists on seeing the payload, dry_run only. Wait for a yes on that quoted item before any live call. This skill still does not go live in v1.

Show the owner that the dry_run, if you ran one, is a preview and not a completed sync.

Stop before live. A yes on the preview is not a yes to sync unless the owner says that word for that record. Do not batch the sync.
