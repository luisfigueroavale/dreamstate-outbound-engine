# Draft sequence

sequence.sequences.create_from_worksheet needs worksheet_id, name, and steps. It is a free draft and supports dry_run. sequence.sequences.validate needs definition and is a free read. sequence.sequences.copy_preview needs sequence_id and is a free read.

Fetch tools_get. Dry_run the create. Wait for a yes on that quoted item before any live call. Then validate and preview live, and say those two were reads.

Show the owner the preview of one real row and the validation messages.

Stop if validation fails. Do not enroll to see if the error goes away. Leave the sequence as a draft.
