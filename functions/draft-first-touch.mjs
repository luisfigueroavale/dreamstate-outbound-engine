import { hasToken } from "./support.mjs";

const FLATTERY = /\b(huge fan|love what you|impressed by your|congrats on your|quick question)\b/i;
const PROOF = /\b(case study|customers say|we helped \d+)\b/i;

export function draftFirstTouch({ variant_line = "", observation = "", offer_line = "", allow_proof = false } = {}) {
  const holds = [];
  if (!variant_line) holds.push("missing variant line");
  if (!observation) holds.push("missing observation");
  if (FLATTERY.test(`${observation} ${offer_line}`)) holds.push("flattery");
  if (!allow_proof && PROOF.test(`${observation} ${offer_line}`)) holds.push("invented proof");
  const body = [observation, variant_line, offer_line].filter(Boolean).join(" ");
  if (hasToken(body)) holds.push("unresolved token");
  if (variant_line && body && !body.includes(variant_line)) holds.push("variant line missing");
  const observationCount = observation ? body.split(observation).length - 1 : 0;
  if (observation && observationCount !== 1) holds.push("observation must appear once");
  return { body, reviewed: false, holds, ok: holds.length === 0 };
}
