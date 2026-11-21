# New leader and tiers

crm.contact.find_person needs a person you already know, so it cannot discover a new operations leader. Attach provider.linkedin.people.search with tables.table_sources.attach. account_id, a LinkedIn sender, is required. Then enrich a profile with provider.enrich.linkedin.profile at 0.9 credits a row. profile_url is required. Land source rows with tables.table_sources.run.

Also plan signals with crm.signals.search_plan and crm.signals.search_preview, which are free. crm.signals.search_run live needs approved true, table_id, and max_credits. Fetch tools_get and dry_run the signal run. Wait for a yes on that quoted item before any live call. The local score-signals function sets the tier from the file.

Show the owner the tier, the points, and the families that fired. Say when a single weak family was capped at C.

Stop before bind_feed. That flag, together with every and max_credits_per_cycle, creates a schedule and needs a separate yes. Tier C gets no further spend.
