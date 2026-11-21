function typeOf(value) {
  if (Array.isArray(value)) return "array";
  if (value === null) return "null";
  return typeof value;
}

export function validate(data, schema, path = "$") {
  const errors = [];
  if (!schema || typeof schema !== "object") return errors;
  if (schema.const !== undefined && data !== schema.const) errors.push(`${path} must be ${JSON.stringify(schema.const)}`);
  if (schema.enum && !schema.enum.includes(data)) errors.push(`${path} is outside the allowed values`);
  if (schema.type) {
    const types = Array.isArray(schema.type) ? schema.type : [schema.type];
    const actual = typeOf(data);
    const ok = types.some((type) => (type === "integer" ? Number.isInteger(data) : actual === type));
    if (!ok) errors.push(`${path} should be ${types.join(" or ")}`);
  }
  if (schema.type === "object" && data && typeof data === "object" && !Array.isArray(data)) {
    for (const key of schema.required ?? []) {
      if (data[key] === undefined) errors.push(`${path}.${key} is required`);
    }
    if (schema.properties) {
      for (const [key, child] of Object.entries(schema.properties)) {
        if (data[key] !== undefined) errors.push(...validate(data[key], child, `${path}.${key}`));
      }
    }
    if (schema.additionalProperties === false) {
      for (const key of Object.keys(data)) {
        if (!schema.properties?.[key]) errors.push(`${path}.${key} is not allowed`);
      }
    }
  }
  if (schema.type === "array" && Array.isArray(data)) {
    if (schema.minItems != null && data.length < schema.minItems) errors.push(`${path} needs at least ${schema.minItems} items`);
    if (schema.items) data.forEach((item, index) => errors.push(...validate(item, schema.items, `${path}[${index}]`)));
  }
  if (typeof data === "number" && schema.minimum != null && data < schema.minimum) errors.push(`${path} is below ${schema.minimum}`);
  return errors;
}
