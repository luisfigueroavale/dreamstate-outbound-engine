# inbound form to crm

A form lands on a worksheet through a webhook source you resolve at run time. Then `integrations.sync` can push one record. v1 leaves the graph disabled.

1. Attach `source.webhook_source`. It is a free source that adds rows from an inbound webhook.
2. Search with `crm.records.search` and class the row as existing, new, ambiguous, or failed before any mapping.
3. Map the row with `integrations.crm_management_preview` only after that class is known, so a sync cannot create a duplicate.
4. Call `integrations.sync` for one record only after a yes on that record. v1 does not sync.

The graph is disabled. Nothing is sent.
