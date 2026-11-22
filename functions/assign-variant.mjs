import { createHash } from "node:crypto";
import { normaliseDomain } from "./support.mjs";

export function assignVariant({ test_id, audience, domain, variants = [] } = {}) {
  if (!variants.length) {
    return { ok: false, hold: "no variants", variant: null, hex8: null, domain: domain ?? null };
  }
  const parsed = normaliseDomain(domain);
  const normalised = parsed.ok ? parsed.domain : String(domain ?? "").trim().toLowerCase();
  const hex = createHash("sha256").update(`${test_id}\n${audience}\n${normalised}`).digest("hex");
  const index = Number.parseInt(hex.slice(0, 8), 16) % variants.length;
  return { ok: true, hold: null, variant: variants[index], index, hex8: hex.slice(0, 8), domain: normalised };
}
