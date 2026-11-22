const HOLDS = {
  catch_all: "catch-all is held",
  unknown: "unknown email is held",
  invalid: "email is not valid",
  missing: "email is missing",
};

export function findWorkEmail({ address = null, waterfall_status = null, verification_status = null, checked_on = null } = {}) {
  const status = verification_status || waterfall_status || "missing";
  const blankAddress = address == null || String(address).trim() === "";
  const held = status !== "valid" || blankAddress;
  let hold = null;
  if (status === "valid" && blankAddress) hold = "email is missing";
  else if (status !== "valid") hold = HOLDS[status] ?? "email is not valid";
  return {
    address,
    status,
    checked_on,
    held,
    hold,
  };
}
