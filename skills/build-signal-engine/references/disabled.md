# Disabled graphs

workflow.automations.import_preflight needs kind and document and is a free read. workflow.automations.import needs kind, name, and document. It creates a disabled workflow and supports dry_run. workflow.automations.lint needs kind and is a free read. The catalog lists a code action. v1 still runs the functions on this machine.

Fetch tools_get. Preflight and lint are live reads. The import is a dry_run until a yes. Wait for a yes on that quoted item before any live call. Leave the result disabled.

Show the owner the lint messages and the disabled flag. Do not show an enable button as the next step.

Stop if lint fails. Do not enable the graph to test the failure. Do not add a schedule node.
