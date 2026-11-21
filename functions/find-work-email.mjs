const HOLDS = {
  catch_all: "catch-all is held",
  unknown: "unknown email is held",
  invalid: "email is not valid",
  missing: "email is missing",
};

export function findWorkEmail({ address = null, waterfall_status = null, verification_status = null, checked_on = null } = {}) {
  const status = verification_status || waterfall_status || "missing";
  const held = status !== "valid";
  return {
    address,
    status,
    checked_on,
    held,
    hold: held ? HOLDS[status] ?? "email is not valid" : null,
  };
}
