# Stable assignment

The local assign-variant function hashes test_id, audience, and the normalised domain with SHA-256. The variant is chosen from the first 8 hex digits. The same domain always gets the same variant. A rerun does not reshuffle.

There is no Dreamstate call and no credit cost. Pass the two variants from the local test file. Do not pass a third variant you invented in chat.

Show the owner a few domains, the hex prefix, and the line each domain received.

Stop if the hash changes when you repeat the same input. That means the domain was not normalised. Fix the input. Do not hand-assign a line to force a result.
