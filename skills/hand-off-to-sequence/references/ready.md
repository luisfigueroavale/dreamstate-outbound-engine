# Ready check

Call whoami first. The local check-send-ready function holds a row unless both gates passed, the email status is valid, the verification is inside the window, reviewed is true, suppression is clear, capacity remains, the draft sequence id is set, the test ids are set, no token remains, and the body is inside the word limit.

Run the local function before any sequence call. Fetch tools_get only when you are about to create the draft. Catch-all and unknown never pass.

Show the owner every hold, one reason per line. Count how many rows are actually ready.

Stop if the ready count is 0. Do not create a sequence for held rows. Do not flip reviewed to true yourself.
