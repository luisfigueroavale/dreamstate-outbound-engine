# History and claims

workspace.usage.history_list is a free read with no required field. It is the ledger beside the breakdown. A claim is a step in the batch packet that names a capability id and the credits it expected.

Fetch tools_get, then tools_run live, and say it was a read. Credits in the ledger that no claim covers are unclaimed. The local spend-check script flags that gap, an overrun, and a timestamp outside the approved window.

Show the owner each unclaimed capability id and the credit amount. Do not round the amount to zero.

Stop if you cannot tie a row to a step. Leave it flagged. Do not delete the ledger row. Do not rerun the source to make the numbers match.
