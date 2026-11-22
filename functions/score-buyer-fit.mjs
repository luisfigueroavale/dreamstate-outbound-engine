export function scoreBuyerFit({ rubric, answers = {} } = {}) {
  if (!rubric || rubric.pass_at == null) {
    return { score: 0, unknowns: ["rubric"], fit_passed: false, hold: "buyer rubric is missing" };
  }
  const unknowns = [];
  let score = 0;
  for (const [id, points] of Object.entries(rubric.points ?? {})) {
    const value = answers[id];
    if (value === "yes") score += points;
    else if (value !== "no") unknowns.push(id);
  }
  const titleOnly = answers.title_match === "yes" && answers.authority !== "yes";
  const disqualified = answers.disqualified === "yes";
  const disqualifierKnown = answers.disqualified === "yes" || answers.disqualified === "no";
  const fitPassed = disqualifierKnown && !disqualified && answers.authority === "yes" && score >= rubric.pass_at;
  let hold = null;
  if (disqualified) hold = "disqualified";
  else if (titleOnly) hold = "title alone never proves authority";
  else if (!disqualifierKnown) hold = "disqualification is unknown";
  else if (!fitPassed) hold = "buyer fit did not pass";
  return { score, unknowns, fit_passed: fitPassed, hold };
}
