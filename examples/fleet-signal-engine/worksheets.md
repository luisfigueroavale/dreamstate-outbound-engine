# Worksheets

Fictional example. No real companies or people.

Prices below are quoted from tools_get on 2026-11-21, not measured on a live run.

| Worksheet | Column | Card | Run when | Cap |
| --- | --- | --- | --- | --- |
| Accounts | Domain | manual | on import | none |
| Accounts | Fit | copy from `tables.columns.catalog` | after merge | one row first |
| Accounts | Signal points | local `score-signals`, or a formula column | after fit passes | the brief ceiling |
| Accounts | Tier | local function | after points | none |
| Buyers | Person | people search | tier A or B only | `buyers_per_tier` |
| Buyers | Email | resolve at run time, then `tables.contacts.verify_email` | buyer fit passed | 0.45 credits an address |
| Drafts | First touch | AI column only if quoted | email valid | word limit 90 |

Do not paste a vendor definition id. Read `tables.findable_catalog.list` or `tables.columns.catalog` and copy what it returns.
