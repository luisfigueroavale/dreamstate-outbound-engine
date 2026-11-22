# Workspace

This step takes no catalog inputs. Call whoami first and read the workspace list on the response. The folder is allowed to continue only when the owner names the same workspace you see.

whoami is a free MCP read. There is no dry_run. Say that it was a read. If a later step needs a catalog id, fetch that id with tools_get before tools_run. The fetched schema wins over this repo.

Show the owner the workspace name and the sender counts from readiness. Do not show a key, a token, or a private contact.

Stop if the list has more than one workspace and the owner has not picked. Stop if the call fails. Do not continue into a copy or a demo on the wrong workspace.
