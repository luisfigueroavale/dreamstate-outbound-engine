# inbound form to crm

A form lands on a worksheet through a webhook source you resolve at run time. Then `integrations.sync` can push one record. v1 leaves the graph disabled.

1. Resolve the webhook source with `tables.findable_catalog.list`. Do not paste an id.
2. Map the row with `integrations.crm_management_preview`.
3. Call `integrations.sync` only after a yes on that record. dry_run first, quote, wait for the owner's yes on that item

The graph is disabled. Nothing is sent.
