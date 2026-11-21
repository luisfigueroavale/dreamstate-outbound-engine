import { ageDays, hasToken, wordCount } from "./support.mjs";

export function checkSendReady(row = {}) {
  const holds = [];
  const windowDays = row.verification_window_days ?? 14;
  const wordLimit = row.word_limit ?? 90;
  if (!row.company_fit_passed) holds.push("company fit did not pass");
  if (!row.buyer_fit_passed) holds.push("buyer fit did not pass");
  if (row.email_status === "catch_all") holds.push("catch-all is held");
  else if (row.email_status === "unknown" || row.email_status == null) holds.push("unknown email is held");
  else if (row.email_status !== "valid") holds.push("email is not valid");
  if (row.email_status === "valid") {
    const age = ageDays(row.as_of, row.verified_on);
    if (age == null) holds.push("verification date missing");
    else if (age > windowDays) holds.push("verification is stale");
  }
  if (row.reviewed !== true) holds.push("not reviewed");
  if (row.suppression !== "clear") holds.push("suppression is not clear");
  if (!(Number(row.capacity_left) > 0)) holds.push("no capacity left");
  if (!row.sequence_id) holds.push("draft sequence id missing");
  if (!row.test_id || !row.variant) holds.push("test ids missing");
  if (hasToken(row.body)) holds.push("unresolved token");
  const words = wordCount(row.body);
  if (words > wordLimit) holds.push("over the word limit");
  return { ready: holds.length === 0, holds, words };
}
