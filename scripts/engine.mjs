import { assignVariant } from "../functions/assign-variant.mjs";
import { checkBuyerRole } from "../functions/check-buyer-role.mjs";
import { checkSendReady } from "../functions/check-send-ready.mjs";
import { draftFirstTouch } from "../functions/draft-first-touch.mjs";
import { findBuyer } from "../functions/find-buyer.mjs";
import { findWorkEmail } from "../functions/find-work-email.mjs";
import { mergeSources } from "../functions/merge-sources.mjs";
import { rankAccounts } from "../functions/rank-accounts.mjs";
import { rankBuyers } from "../functions/rank-buyers.mjs";
import { readResults } from "../functions/read-results.mjs";
import { scoreBuyerFit } from "../functions/score-buyer-fit.mjs";
import { scoreCompanyFit } from "../functions/score-company-fit.mjs";
import { scoreSignals } from "../functions/score-signals.mjs";

function tierCounts(accounts) {
  const counts = { A: 0, B: 0, C: 0 };
  for (const account of accounts) counts[account.tier] = (counts[account.tier] ?? 0) + 1;
  return counts;
}

export function runBatch(batch, options = {}) {
  const capacity = options.capacity ?? batch.capacity;
  const reviewed = new Set(options.reviewed ?? []);
  const merged = mergeSources({ records: batch.records });
  const scored = merged.accounts.map((account) => {
    const profile = batch.companies[account.domain] ?? {};
    const fit = scoreCompanyFit({ rubric: batch.company_rubric, answers: profile.answers ?? {} });
    const signals = scoreSignals({ signals: account.signals, rules: batch.signals, as_of: batch.as_of });
    return {
      domain: account.domain,
      names: account.names,
      source_ids: account.source_ids,
      signal_count: account.signals.length,
      fit_score: fit.score,
      fit_passed: fit.fit_passed,
      excluded: fit.excluded,
      unknowns: fit.unknowns,
      suppression: profile.suppression ?? "missing",
      suppressed: profile.suppression === "listed",
      tier: signals.tier,
      signal_points: signals.points,
      signal_families: signals.families.map((family) => family.id),
      single_family_capped: signals.single_family_capped,
      signal_notes: signals.notes,
    };
  });
  const ranked = rankAccounts({ accounts: scored, capacity });
  const buyerRows = [];
  for (const account of ranked.selected) {
    const profile = batch.companies[account.domain] ?? {};
    const found = findBuyer({
      account_domain: account.domain,
      roles: batch.roles,
      people: profile.people ?? [],
    });
    if (!found.found) {
      buyerRows.push({
        domain: account.domain,
        tier: account.tier,
        company_fit_passed: true,
        buyer_fit_passed: false,
        suppressed: false,
        score: 0,
        hold_detail: found.hold,
      });
      continue;
    }
    const role = checkBuyerRole({
      account_domain: account.domain,
      person: {
        current_employer_domain: found.person.employer_domain,
        current_title: found.person.title,
        expected_titles: batch.roles,
      },
    });
    if (!role.confirmed) {
      buyerRows.push({
        domain: account.domain,
        tier: account.tier,
        company_fit_passed: true,
        buyer_fit_passed: false,
        suppressed: false,
        score: 0,
        person: found.person,
        hold_detail: role.hold,
      });
      continue;
    }
    const buyerFit = scoreBuyerFit({ rubric: batch.buyer_rubric, answers: profile.buyer_answers ?? {} });
    buyerRows.push({
      domain: account.domain,
      tier: account.tier,
      company_fit_passed: true,
      buyer_fit_passed: buyerFit.fit_passed,
      suppressed: false,
      score: buyerFit.score,
      person: found.person,
      hold_detail: buyerFit.hold,
      unknowns: buyerFit.unknowns,
    });
  }
  const rankedBuyers = rankBuyers({ buyers: buyerRows, limits: batch.signals.buyers_per_tier });
  const messages = rankedBuyers.selected.map((buyer) => {
    const profile = batch.companies[buyer.domain] ?? {};
    const email = findWorkEmail(profile.email ?? {});
    const variant = assignVariant({
      test_id: batch.test.test_id,
      audience: batch.test.audience,
      domain: buyer.domain,
      variants: batch.test.variants,
    });
    const draft = draftFirstTouch({
      variant_line: variant.variant,
      observation: profile.observation ?? "",
      offer_line: batch.offer_line,
      allow_proof: false,
    });
    const ready = checkSendReady({
      company_fit_passed: true,
      buyer_fit_passed: true,
      email_status: email.status,
      verified_on: email.checked_on,
      as_of: batch.as_of,
      verification_window_days: batch.verification_window_days,
      reviewed: reviewed.has(buyer.domain),
      suppression: profile.suppression,
      capacity_left: batch.capacity_left,
      sequence_id: batch.sequence_id,
      test_id: batch.test.test_id,
      variant: variant.variant,
      body: draft.ok ? draft.body : "",
      word_limit: batch.word_limit,
    });
    const holds = [...draft.holds, ...ready.holds];
    return {
      domain: buyer.domain,
      person: buyer.person,
      email_status: email.status,
      email_hold: email.hold,
      variant: variant.variant,
      hex8: variant.hex8,
      body: draft.body,
      reviewed: reviewed.has(buyer.domain),
      ready: ready.ready && draft.ok,
      holds,
    };
  });
  const history = readResults({ events: batch.history?.events ?? [], floor: batch.history?.floor ?? 100 });
  const tiers = tierCounts(scored);
  const verified = messages.filter((row) => row.email_status === "valid").length;
  return {
    fictional: true,
    seller: batch.seller,
    as_of: batch.as_of,
    capacity,
    credits: 0,
    sent: 0,
    funnel: {
      records: batch.records.length,
      rejected: merged.rejected.length,
      accounts: scored.length,
      tier_a: tiers.A,
      tier_b: tiers.B,
      tier_c: tiers.C,
      selected_accounts: ranked.selected.length,
      buyers: rankedBuyers.selected.length,
      verified_emails: verified,
      ready: messages.filter((row) => row.ready).length,
      sent: 0,
      credits: 0,
    },
    rejected: merged.rejected,
    accounts: scored.map((account) => {
      const selected = ranked.selected.find((row) => row.domain === account.domain);
      const held = ranked.held.find((row) => row.domain === account.domain);
      return { ...account, selected: Boolean(selected), hold: held?.hold ?? null, rank: selected?.rank ?? null };
    }),
    buyer_holds: rankedBuyers.held,
    messages,
    history,
  };
}

function linesForHolds(result) {
  const lines = [];
  for (const row of result.rejected) {
    lines.push(`- Rejected record ${row.source_id ?? "without an id"}: ${row.reason}.`);
  }
  for (const account of result.accounts) {
    if (!account.hold) continue;
    lines.push(`- ${account.domain}: ${account.hold}. Tier ${account.tier}, signal points ${account.signal_points}, fit score ${account.fit_score}.`);
  }
  for (const buyer of result.buyer_holds) {
    lines.push(`- Buyer at ${buyer.domain}: ${buyer.hold_detail ?? buyer.hold}.`);
  }
  for (const message of result.messages) {
    if (message.ready) {
      lines.push(`- ${message.domain}: ready for review handoff. Nothing is sent.`);
      continue;
    }
    lines.push(`- ${message.domain}: held (${message.holds.join("; ")}).`);
  }
  return lines;
}

export function renderReport(result) {
  const funnel = result.funnel;
  const history = result.history.ok
    ? result.history.comparisons.flatMap((group) => group.variants.map((variant) => (
      `- ${group.test_id} / ${variant.variant}: delivered ${variant.delivered}, positive replies ${variant.positive_replies}, meetings ${variant.meetings}, verdict ${variant.verdict}.`
    )))
    : [`- Results read failed: ${result.history.error}.`];
  return [
    `# ${result.seller} offline batch`,
    "",
    "Fictional example. No real companies or people.",
    "",
    `As of ${result.as_of}. Capacity ${result.capacity}. Credits ${result.credits}. Sent ${result.sent}.`,
    "",
    "## Funnel",
    "",
    "| Stage | Count |",
    "| --- | --- |",
    `| Records | ${funnel.records} |`,
    `| Rejected records | ${funnel.rejected} |`,
    `| Accounts | ${funnel.accounts} |`,
    `| Tier A | ${funnel.tier_a} |`,
    `| Tier B | ${funnel.tier_b} |`,
    `| Tier C | ${funnel.tier_c} |`,
    `| Selected accounts | ${funnel.selected_accounts} |`,
    `| Buyers | ${funnel.buyers} |`,
    `| Verified emails | ${funnel.verified_emails} |`,
    `| Ready | ${funnel.ready} |`,
    `| Sent | ${funnel.sent} |`,
    `| Credits | ${funnel.credits} |`,
    "",
    "## Holds",
    "",
    ...linesForHolds(result),
    "",
    "## Selected accounts",
    "",
    ...result.accounts.filter((account) => account.selected).map((account) => (
      `- ${account.rank}. ${account.domain}, tier ${account.tier}, signal points ${account.signal_points}, fit score ${account.fit_score}.`
    )),
    "",
    "## History sample",
    "",
    ...history,
    "",
    "This file is an offline reading. It does not send, enroll, or spend.",
    "",
  ].join("\n");
}
