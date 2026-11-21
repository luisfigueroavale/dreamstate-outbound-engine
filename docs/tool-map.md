# Tool map

Fetched with tools_get on 2026-11-21 in workspace 0a13cecd-d194-46e5-94cc-328825aef631. Server 1.3.33. A fresh fetch wins over this page. If the fetch says not found, stop.

CLI form: `dreamstate tools run <id>` after you have fetched the contract. Writes use dry_run first.

## How a call runs

1. Fetch the id.
2. A call that spends credits or writes starts as dry_run when that mode exists. Show rows, credits, and quote_hash.
3. dry_run first, quote, wait for the owner's yes on that item.
4. The live call repeats quote_hash when the dry run returned one, sets max_credits, and sends a new idempotency_key.
5. A free read with no dry run can run live. Say that it was a read.

## Confirmed reads

| Id | Cost | Status | Consent | Inputs | CLI |
| --- | --- | --- | --- | --- | --- |
| `knowledge.context.resolve` | 0 | confirmed | Free read. | Optional purpose. Omit it for company context. | `dreamstate tools run knowledge.context.resolve` |
| `knowledge.profile.get` | 0 | confirmed | Free read. | None required. | `dreamstate tools run knowledge.profile.get` |
| `knowledge.brain.context.search` | 0 | confirmed | Free read. | query | `dreamstate tools run knowledge.brain.context.search` |
| `knowledge.brain.context.get` | 0 | confirmed | Free read. | document_id | `dreamstate tools run knowledge.brain.context.get` |
| `tables.rows.query` | 0 | confirmed | Free read. | table_id | `dreamstate tools run tables.rows.query` |
| `tables.rows.count` | 0 | confirmed | Free read. | table_id | `dreamstate tools run tables.rows.count` |
| `tables.rows.inspect` | 0 | confirmed | Free read. | table_id, row_id | `dreamstate tools run tables.rows.inspect` |
| `tables.executable_definitions.list_resolved` | 0 | confirmed | Free read. | None required. | `dreamstate tools run tables.executable_definitions.list_resolved` |
| `tables.sourcing.preview` | 0 | confirmed | Free read. | definition_id | `dreamstate tools run tables.sourcing.preview` |
| `tables.sourcing.filters` | 0 | confirmed | Free read. | family | `dreamstate tools run tables.sourcing.filters` |
| `tables.company_search.filters` | 0 | confirmed | Free read. | None required. | `dreamstate tools run tables.company_search.filters` |
| `tables.company_search.plan` | 0 | confirmed | Free read. | None required. | `dreamstate tools run tables.company_search.plan` |
| `tables.company_search.preview` | 0 | confirmed | Free read. | None required. External read, no row write. | `dreamstate tools run tables.company_search.preview` |
| `tables.people_search.filters` | 0 | confirmed | Free read. | None required. | `dreamstate tools run tables.people_search.filters` |
| `tables.people_search.plan` | 0 | confirmed | Free read. | prompt | `dreamstate tools run tables.people_search.plan` |
| `tables.people_search.preview` | 0 | confirmed | Free read. | None required. | `dreamstate tools run tables.people_search.preview` |
| `crm.signals.search_plan` | 0 | confirmed | Free read. | prompt, family | `dreamstate tools run crm.signals.search_plan` |
| `crm.signals.search_preview` | 0 | confirmed | Free read. | keywords, idempotency_key. External read. | `dreamstate tools run crm.signals.search_preview` |
| `sequence.outreach.enrichment_sequence_get` | 0 | confirmed | Free read. | None required. | `dreamstate tools run sequence.outreach.enrichment_sequence_get` |
| `crm.records.activity_timeline_get` | 0 | confirmed | Free read. | None required. | `dreamstate tools run crm.records.activity_timeline_get` |
| `crm.records.search` | 0 | confirmed | Free read. | None required. | `dreamstate tools run crm.records.search` |
| `crm.records.duplicates_scan` | 0 | confirmed | Free read. | object_key | `dreamstate tools run crm.records.duplicates_scan` |
| `workflow.automations.export` | 0 | confirmed | Free read. | kind, automation_id | `dreamstate tools run workflow.automations.export` |
| `workflow.automations.import_preflight` | 0 | confirmed | Free read. | kind, document | `dreamstate tools run workflow.automations.import_preflight` |
| `workflow.automations.lint` | 0 | confirmed | Free read. | kind | `dreamstate tools run workflow.automations.lint` |
| `workflow.automations.preview` | 0 | confirmed | Free read. | kind, automation_id | `dreamstate tools run workflow.automations.preview` |
| `workflow.automations.node_catalog` | 0 | confirmed | Free read. | None. Live read on 2026-11-21 returned 110 nodes, including a code action. | `dreamstate tools run workflow.automations.node_catalog` |
| `workflow.approvals.list` | 0 | confirmed | Free read. | None required. | `dreamstate tools run workflow.approvals.list` |
| `workflow.workflows.templates_search` | 0 | confirmed | Free read. | None required. | `dreamstate tools run workflow.workflows.templates_search` |
| `workspace.blueprints.list` | 0 | confirmed | Free read. | None required. | `dreamstate tools run workspace.blueprints.list` |
| `workspace.blueprints.recommend` | 0 | confirmed | Free read. | None required. | `dreamstate tools run workspace.blueprints.recommend` |
| `workspace.usage.status_get` | 0 | confirmed | Free read. | None required. | `dreamstate tools run workspace.usage.status_get` |
| `workspace.usage.spend_breakdown` | 0 | confirmed | Free read. | from, an ISO timestamp. No dry run mode. Say it was a read. | `dreamstate tools run workspace.usage.spend_breakdown` |
| `workspace.usage.history_list` | 0 | confirmed | Free read. | None required. | `dreamstate tools run workspace.usage.history_list` |
| `tables.search_runs.get` | 0 | confirmed | Free read. | run_id | `dreamstate tools run tables.search_runs.get` |
| `tables.columns.catalog` | 0 | confirmed | Free read. | Optional family: classification, ai, or research. | `dreamstate tools run tables.columns.catalog` |
| `tables.company_enrichment.preview` | 0 | confirmed | Free read. | companies, 1 to 50. Estimate is 1 credit a missing field. No provider call. | `dreamstate tools run tables.company_enrichment.preview` |
| `tables.list` | 0 | confirmed | Free read. | Optional limit and cursor. | `dreamstate tools run tables.list` |
| `tables.table_sources.list` | 0 | confirmed | Free read. | table_id | `dreamstate tools run tables.table_sources.list` |
| `tables.findable_catalog.list` | 0 | confirmed | Free read. | None required. Copy definition ids from this list. | `dreamstate tools run tables.findable_catalog.list` |
| `sequence.sequences.validate` | 0 | confirmed | Free read. | definition | `dreamstate tools run sequence.sequences.validate` |
| `sequence.sequences.copy_preview` | 0 | confirmed | Free read. | sequence_id | `dreamstate tools run sequence.sequences.copy_preview` |
| `sequence.outreach.message_preview` | 0 | confirmed | Free read. | None required. | `dreamstate tools run sequence.outreach.message_preview` |
| `sequence.sequences.variants_get` | 0 | confirmed | Free read. | sequence_id | `dreamstate tools run sequence.sequences.variants_get` |
| `sequence.outreach.analytics_variant_compare` | 0 | confirmed | Free read. | sequence_id, objective | `dreamstate tools run sequence.outreach.analytics_variant_compare` |
| `sequence.outreach.analytics_step_aggregate_get` | 0 | confirmed | Free read. | None required. | `dreamstate tools run sequence.outreach.analytics_step_aggregate_get` |
| `sequence.sequences.analytics_get` | 0 | confirmed | Free read. | None required. | `dreamstate tools run sequence.sequences.analytics_get` |
| `sequence.outreach.analytics_performance_query` | 0 | confirmed | Free read. | from, to, group_by, objective | `dreamstate tools run sequence.outreach.analytics_performance_query` |
| `integrations.crm_management_preview` | 0 | confirmed | Free read. | connection_id, configuration | `dreamstate tools run integrations.crm_management_preview` |
| `integrations.crm_sync_import_plan` | 0 | confirmed | Free read. | provider, provider_object | `dreamstate tools run integrations.crm_sync_import_plan` |
| `senders.mailboxes.list` | 0 | confirmed | Free read. | None required. | `dreamstate tools run senders.mailboxes.list` |
| `senders.mailboxes.health_get` | 0 | confirmed | Free read. | None required. | `dreamstate tools run senders.mailboxes.health_get` |
| `visibility.linkedin.engagement_engagers` | 0 | confirmed | Free read. | harvest_id. Reads people already collected. | `dreamstate tools run visibility.linkedin.engagement_engagers` |
| `social.outreach.keyword_dm_rules.list` | 0 | confirmed | Free read. | artifact_id | `dreamstate tools run social.outreach.keyword_dm_rules.list` |

## Confirmed writes at 0 credits

These still wait. A price of 0 is not a yes.

| Id | Cost | Status | Consent | Inputs | CLI |
| --- | --- | --- | --- | --- | --- |
| `tables.workbooks.create` | 0 | confirmed | dry_run first, quote, wait for the owner's yes on that item | name | `dreamstate tools run tables.workbooks.create` |
| `tables.worksheets.create` | 0 | confirmed | dry_run first, quote, wait for the owner's yes on that item | name, workbook_id | `dreamstate tools run tables.worksheets.create` |
| `tables.rows.create_many` | 0 | confirmed | dry_run first, quote, wait for the owner's yes on that item | rows, table_id | `dreamstate tools run tables.rows.create_many` |
| `tables.rows.upsert` | 0 | confirmed | dry_run first, quote, wait for the owner's yes on that item | row_kind, table_id | `dreamstate tools run tables.rows.upsert` |
| `tables.columns.add` | 0 | confirmed | dry_run first, quote, wait for the owner's yes on that item | table_id, name. Pass binding_spec.definition_id from the catalog. | `dreamstate tools run tables.columns.add` |
| `tables.columns.add_many` | 0 | confirmed | dry_run first, quote, wait for the owner's yes on that item | columns, table_id | `dreamstate tools run tables.columns.add_many` |
| `tables.callables.publish` | 0 | confirmed | dry_run first, quote, wait for the owner's yes on that item | table_id, request_key, inputs, outputs | `dreamstate tools run tables.callables.publish` |
| `tables.worksheets.function_draft_save` | 0 | confirmed | dry_run first, quote, wait for the owner's yes on that item | revision | `dreamstate tools run tables.worksheets.function_draft_save` |
| `tables.worksheets.function_publish` | 0 | confirmed | dry_run first, quote, wait for the owner's yes on that item | function_id, revision | `dreamstate tools run tables.worksheets.function_publish` |
| `tables.worksheets.function_bind` | 0 | confirmed | dry_run first, quote, wait for the owner's yes on that item | function_id, revision, table_id, column_key, input_mappings, output_mappings, caller_credit_cap | `dreamstate tools run tables.worksheets.function_bind` |
| `tables.rows.dedupe` | 0 | confirmed | dry_run first, quote, wait for the owner's yes on that item | table_id, column_id, key_kind. Dry run is the preview. Live would change rows. | `dreamstate tools run tables.rows.dedupe` |
| `tables.table_sources.attach` | 0 | confirmed | dry_run first, quote, wait for the owner's yes on that item | table_id, source_column_id. One live source at a time. | `dreamstate tools run tables.table_sources.attach` |
| `tables.table_sources.update` | 0 | confirmed | dry_run first, show rows, credits and quote_hash, wait for the owner's yes on that item, then live with max_credits and an idempotency_key. | table_id, expected_state, per_run_max_rows, and per_run_max_credits. | `dreamstate tools run tables.table_sources.update` |
| `workflow.automations.import` | 0 | confirmed | dry_run first, quote, wait for the owner's yes on that item | kind, name, document. Creates a disabled workflow. | `dreamstate tools run workflow.automations.import` |
| `workflow.automations.compose` | 0 | confirmed | dry_run first, quote, wait for the owner's yes on that item | kind, name, steps | `dreamstate tools run workflow.automations.compose` |
| `workflow.automations.create` | 0 | confirmed | dry_run first, quote, wait for the owner's yes on that item | kind, name | `dreamstate tools run workflow.automations.create` |
| `workflow.automations.node_add` | 0 | confirmed | dry_run first, quote, wait for the owner's yes on that item | automation_id, kind, node | `dreamstate tools run workflow.automations.node_add` |
| `workflow.automations.node_patch` | 0 | confirmed | dry_run first, quote, wait for the owner's yes on that item | automation_id, kind, node_id, fields | `dreamstate tools run workflow.automations.node_patch` |
| `workflow.approvals.decide` | 0 | confirmed | dry_run first, quote, wait for the owner's yes on that item | approval_id, decision, plan_hash | `dreamstate tools run workflow.approvals.decide` |
| `workspace.blueprints.apply` | 0 | confirmed | dry_run first, quote, wait for the owner's yes on that item | blueprint_id | `dreamstate tools run workspace.blueprints.apply` |
| `knowledge.brain.knowledge.compose_document` | 0 | confirmed | dry_run first, quote, wait for the owner's yes on that item | content | `dreamstate tools run knowledge.brain.knowledge.compose_document` |
| `sequence.sequences.create_from_worksheet` | 0 | confirmed | dry_run first, quote, wait for the owner's yes on that item | worksheet_id, name, steps | `dreamstate tools run sequence.sequences.create_from_worksheet` |
| `sequence.outreach.enrichment_sequence_update` | 0 | confirmed | dry_run first, quote, wait for the owner's yes on that item | field, steps | `dreamstate tools run sequence.outreach.enrichment_sequence_update` |
| `visibility.linkedin.engagement_harvest` | 0 | confirmed | dry_run first, quote, wait for the owner's yes on that item | worksheet_id, linkedin_account_id, post_id. A free write. | `dreamstate tools run visibility.linkedin.engagement_harvest` |
| `social.outreach.keyword_dm_rules.replace` | 0 | confirmed | Destructive. It drops any rule you do not send back. dry_run first, show rows, credits and quote_hash, wait for the owner's yes on that item, then live with max_credits and an idempotency_key. | artifact_id, expected_revision, platform, and rules. Read the list first. | `dreamstate tools run social.outreach.keyword_dm_rules.replace` |
| `sequence.sequences.enroll_selection` | 0 | confirmed | dry_run first, quote, wait for the owner's yes on that item | sequence_id, worksheet_id. Enrollment. v1 does not call it live. | `dreamstate tools run sequence.sequences.enroll_selection` |
| `workflow.workflows.enable` | 0 | confirmed | dry_run first, quote, wait for the owner's yes on that item | workflow_ids. External activate. Needs its own yes. | `dreamstate tools run workflow.workflows.enable` |
| `workflow.workflows.status_set` | 0 | confirmed | dry_run first, quote, wait for the owner's yes on that item | workflow_id, status. External activate. Needs its own yes. | `dreamstate tools run workflow.workflows.status_set` |

## Paid ids

A skill that names one of these in backticks includes this sentence: "dry_run first, show rows, credits and quote_hash, wait for the owner's yes on that item, then live with max_credits and an idempotency_key."

| Id | Cost | Status | Consent | Inputs | CLI |
| --- | --- | --- | --- | --- | --- |
| `tables.columns.run` | dynamic, ceiling 50 credits a call | confirmed | dry_run first, show rows, credits and quote_hash, wait for the owner's yes on that item, then live with max_credits and an idempotency_key. | Quote with dry_run of table_id, column_key, and limit 1. | `dreamstate tools run tables.columns.run` |
| `tables.columns.run_all` | dynamic, ceiling 50 credits a call | confirmed | dry_run first, show rows, credits and quote_hash, wait for the owner's yes on that item, then live with max_credits and an idempotency_key. | Quote with dry_run of table_id, column_key, and limit 1. | `dreamstate tools run tables.columns.run_all` |
| `tables.company_search.run` | 0 credits. Live is refused with not_executable and builds no rows. | confirmed | dry_run only, to check the route. | route_id. Rows come from tables.table_sources.attach then tables.table_sources.run. | `dreamstate tools run tables.company_search.run` |
| `tables.people_search.run` | 0 credits. Live is refused with not_executable and builds no rows. | confirmed | dry_run only, to check the route. | people, company, from_table, and limit from 1 to 1000. Rows come from tables.table_sources.attach then tables.table_sources.run. | `dreamstate tools run tables.people_search.run` |
| `tables.table_sources.run` | dynamic, ceiling 50 credits a call | confirmed | dry_run first, show rows, credits and quote_hash, wait for the owner's yes on that item, then live with max_credits and an idempotency_key. | table_id. max_rows is optional, from 1 to 10000. | `dreamstate tools run tables.table_sources.run` |
| `crm.signals.search_run` | dynamic, ceiling 1000000 | confirmed | dry_run first, show rows, credits and quote_hash, wait for the owner's yes on that item, then live with max_credits and an idempotency_key. | definition_id from tables.findable_catalog.list. Live needs approved true, table_id, and max_credits. bind_feed together with every and max_credits_per_cycle creates a schedule and needs its own yes. | `dreamstate tools run crm.signals.search_run` |
| `crm.contact.find_person` | 0.9 credits | confirmed | dry_run first, quote, wait for the owner's yes on that item | An email or a public profile id. A Sales Navigator URL is refused. | `dreamstate tools run crm.contact.find_person` |
| `crm.contact.find_company` | dynamic, ceiling 50 | confirmed | dry_run first, quote, wait for the owner's yes on that item | domain or company_name. list_fields is free. | `dreamstate tools run crm.contact.find_company` |
| `crm.contact.find_email` | variable, maximum 50 a call. dry_run is free and returns the provider chain and a quote_hash. | confirmed | dry_run first, show rows, credits and quote_hash, wait for the owner's yes on that item, then live with max_credits and an idempotency_key. | linkedin_url, full_name, first_name, last_name, and domain. | `dreamstate tools run crm.contact.find_email` |
| `tables.contacts.verify_email` | 0.45 credits an address, 1 to 100 addresses, maximum 45 credits a call. There is no dry_run quote, so quote 0.45 times the address count. | confirmed | Live needs the owner's approval and max_credits from 3 to 300. | addresses. A confirmed catch-all may go to a specialist verifier that costs more. This engine still holds catch-alls. | `dreamstate tools run tables.contacts.verify_email` |
| `workflow.workflows.call` | dynamic, and it can send | confirmed | dry_run first, quote, wait for the owner's yes on that item | workflow_id, input_json. v1 does not call it live. | `dreamstate tools run workflow.workflows.call` |
| `sequence.sequences.activate_audience` | 0 credits, and it sends | confirmed | dry_run first, quote, wait for the owner's yes on that item | sequence_id. v1 does not activate. | `dreamstate tools run sequence.sequences.activate_audience` |
| `integrations.sync` | 0 credits, external send | confirmed | dry_run first, quote, wait for the owner's yes on that item | record_id. v1 does not sync. | `dreamstate tools run integrations.sync` |

## Column and source definitions

Confirmed on 2026-11-21 with `tables.executable_definitions.list_resolved` and `tables.columns.catalog`. These are definition ids, not `tools_get` capability ids. Add a column with `tables.columns.add` and `binding_spec.definition_id`. Attach a source with `tables.table_sources.attach`. Run cost is quoted on `tables.columns.run` or `tables.table_sources.run`.

Card keys that are not the id: `typesafe.fit_score` is the card key for `column.ai_fit_score`. `formula.merge` is the card key for `column.merge_columns`. `web.agent` is the card key for `column.web_agent`. `linkup.search` is the card key for `column.realtime_search`, which needs a vendor connection that is not ready here. Prefer `column.research` or `column.web_search`.

| Id | What it is | Cost | Inputs |
| --- | --- | --- | --- |
| `provider.enrich.email` | Work email column | Up to 12.45 credits a row, billed only on a hit. Lanes run from 1.81 to 12.45. The price includes verify. | All optional: full_name, first_name, last_name, company_name, company_domain, profile_url, linkedin_urn, existing_email, steps, validator. |
| `provider.enrich.person.waterfall` | Person enrich, including a phone lane | Variable, estimated at 132.45 credits a row, maximum 10000. | The email inputs plus existing_phone. Do not use this to find buyers. |
| `provider.enrich.hiring` | Open jobs | Up to 1 credit a row, billed on a hit. | company_linkedin_url or company_domain. |
| `provider.enrich.company_profile` | Company profile | Up to 1 credit a row, billed on a hit. | company_linkedin_url. |
| `provider.linkedin.people.search` | People search source | 0 credits a row. | account_id is required (a LinkedIn sender). Optional: keywords, title, titles, title_excludes, location, industry, company, past_company, limit, per_company_limit, and others. |
| `source.webhook_source` | Inbound webhook source | Free. It adds rows from the webhook. | items_path, upsert_field, require_secret, and body_format are optional. |
| `column.linkedin_post_engagers` | People who engaged with a post | Billed on every attempt, about 0.4 credits per engager returned. Post scans are billed separately, up to 300 items per profile row. | Optional: post_url, profile_url, posts_count, kinds. |
| `column.ai_fit_score` | Fit score. Templates icp_fit_score and person_job_fit. | 0.04 credits a row. | prompt is required. model_id is optional. |
| `column.merge_columns` | Merge values | Free. | values is required. separator is optional. |
| `column.web_agent` | Web research agent | Variable, about 2 credits a row. | prompt is required. instruction, model_id, and max_steps are optional. |
| `column.realtime_search` | The card behind linkup.search | 2 credits a row. Needs a vendor connection. | query is required. Prefer `column.research` when no connection is set up. |
| `column.research` | Web research without a vendor connection | Variable, about 4 credits a row. | query is required. |
| `column.web_search` | Web search | 4 credits a row, billed on every attempt. | query is required. |
| `column.formula` | Formula | Free. | expression is required. |
| `column.company_linkedin_jobs` | Open jobs from a company page | Up to 1 credit a job, maximum 100 jobs a row. | company_linkedin_id is required. |
| `column.company_employees` | People at a company | Variable, about 5.2 credits a row, maximum 600. | company_linkedin_url, company_domain, or company_id. |
| `source.engaged_with_account` | People who engaged with chosen profiles | 1 credit a row. | profile_urls is required. |
| `provider.enrich.linkedin.profile` | Profile enrichment | 0.9 credits a row. | profile_url is required. |

A confirmed catch-all may go to a specialist verifier that costs more than `tables.contacts.verify_email`. This engine still holds catch-alls. A new operations leader is not a `crm.contact.find_person` lookup, because that call needs a person you already know. Use `provider.linkedin.people.search` and then `provider.enrich.linkedin.profile`.

## Code node

A live read of `workflow.automations.node_catalog` lists a code action. Required config fields include source and output_schema. v1 keeps every graph disabled and runs the functions in `functions/` on this machine.

The MCP tool runs_list is a free read of recent runs. Fetch it before you use it. It is not a catalog id. `workspace.usage.history_list` is the free ledger read beside it.

A DNS read is not part of v1.

## What this repo does not call live

No send, no enroll, no activate, no schedule, no delete, and no CRM push in v1.
