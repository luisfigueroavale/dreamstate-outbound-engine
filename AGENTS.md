# Agent contract

This folder is the outbound engine for one owner. Dreamstate is the system of record for companies, people, sequences, and the notes worth keeping. Files here are the method, the skills, and the blank templates. Codex is the preferred agent. Claude Code follows this same file.

Read [docs/start-here.md](docs/start-here.md), then [brand/AGENTS.md](brand/AGENTS.md). `set-up-engine` may create `brand.local/` and `motion.local/` from the blank templates. After that, a missing or blank file the current task needs means stop and ask. Do not guess.

Company facts come from Company Context through `knowledge.context.resolve`. The motion files point at those pages. Approvals follow `docs/rules.md` in [dreamstate-gtm-team](https://github.com/luisfigueroavale/dreamstate-gtm-team). Engine rules for this repo are [docs/engine-rules.md](docs/engine-rules.md).

## Workspace

Call `whoami` before the first Dreamstate read in a session. If more than one workspace is listed, ask which one and stop until the owner names it. The server is the single URL in [.mcp.json](.mcp.json). Do not add a second server. Do not paste a key. Sign in through the browser.

Fetch the capability before every run. The schema you just fetched wins over this repo, including over [docs/tool-map.md](docs/tool-map.md). If the fetch says not found, stop. Do not invent an id.

## Consent

Nothing sends, enrolls, launches, posts, spends credits, pushes to a CRM, changes a schedule, or deletes without the owner's yes on that item. A paid call is quoted first. Show the quote and wait. Unknown is not zero. Do not invent a fact or a number.

A local draft, a plan, or a pull request that is waiting for review is allowed. Say that nothing has been sent.

## Files

Do not commit `brand.local/`, `audience.local/`, `motion.local/`, `.banned-terms.local`, `data/`, `output/`, `work/`, or any key or `.env` file. The templates in `brand/` and `motion/` stay blank.

## Checks

Run `npm run check` and `npm test` before you say a change is done. `npm run check -- --strict` needs `.banned-terms.local` on the machine, one name per line.
