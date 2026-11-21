function typeOf(value) {
  if (Array.isArray(value)) return "array";
  if (value === null) return "null";
  return typeof value;
}

function typeMatches(value, declared) {
  const accepted = Array.isArray(declared) ? declared : [declared];
  const actual = typeOf(value);
  return accepted.some((name) => (name === "integer" ? Number.isInteger(value) : actual === name));
}

function objectIssues(data, schema, path) {
  const issues = [];
  const required = schema.required ?? [];
  for (const key of required) {
    if (!Object.prototype.hasOwnProperty.call(data, key)) issues.push(`${path}.${key} is required`);
  }
  const properties = schema.properties ?? {};
  for (const key of Object.keys(properties)) {
    if (data[key] !== undefined) issues.push(...validate(data[key], properties[key], `${path}.${key}`));
  }
  if (schema.additionalProperties === false) {
    const extra = Object.keys(data).filter((k) => !(k in properties));
    for (const k of extra) issues.push(`${path}.${k} is not allowed`);
  }
  return issues;
}

export function validate(data, schema, path = "$") {
  const errors = [];
  if (!schema || typeof schema !== "object") return errors;
  if (Object.prototype.hasOwnProperty.call(schema, "const") && data !== schema.const) {
    errors.push(`${path} must be ${JSON.stringify(schema.const)}`);
  }
  if (Array.isArray(schema.enum) && !schema.enum.includes(data)) errors.push(`${path} is outside the allowed values`);
  if (schema.type && !typeMatches(data, schema.type)) {
    const label = Array.isArray(schema.type) ? schema.type.join(" or ") : schema.type;
    errors.push(`${path} should be ${label}`);
  }
  const isObject = schema.type === "object" && data && typeof data === "object" && !Array.isArray(data);
  if (isObject) errors.push(...objectIssues(data, schema, path));
  if (schema.type === "array" && Array.isArray(data)) {
    if (schema.minItems != null && data.length < schema.minItems) errors.push(`${path} needs at least ${schema.minItems} items`);
    if (schema.items) data.forEach((item, index) => errors.push(...validate(item, schema.items, `${path}[${index}]`)));
  }
  if (typeof data === "number" && schema.minimum != null && data < schema.minimum) errors.push(`${path} is below ${schema.minimum}`);
  return errors;
}
