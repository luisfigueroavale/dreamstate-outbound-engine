# Validation

Checked on 2026-11-21.

## Confirmed with tools_get

The ids in [tool-map.md](tool-map.md) marked confirmed returned a contract in workspace 0a13cecd-d194-46e5-94cc-328825aef631. Costs on that page are from those contracts. `crm.contact.find_person` is 0.9 credits. `crm.contact.find_email` is variable with a maximum of 50 credits a call. `tables.contacts.verify_email` is 0.45 credits an address.

## Confirmed with a free read

`workflow.automations.node_catalog` was run live at 0 credits. It lists a code action. Smoke test alone does not return the node list.

`skills_list` returned the Dreamstate skills this repo links to. `whoami` returned the Dreamstate workspace.

## Ran offline

`npm test` covers the functions, the first batch cases, spend flags, the install plan, and the skill links. `npm run demo` writes the reports at 0 credits. Nothing was sent.

## Not tested live

No source run, no column run, no sequence, no enrollment, no CRM sync, and no workflow enable. v1 does not run a paid pilot.

## Unconfirmed

See the unconfirmed list in [tool-map.md](tool-map.md). Those names are not called.
