export function serializeBigInt(value: any): any {
  let result = value;

  if (value === null || value === undefined) {
    // leave result as is
  } else if (typeof value === 'bigint') {
    result = Number(value);
  } else if (value instanceof Date) {
    result = value.toISOString();
  } else if (Array.isArray(value)) {
    result = value.map(serializeBigInt);
  } else if (typeof value === 'object') {
    result = Object.fromEntries(Object.entries(value).map(([k, v]) => [k, serializeBigInt(v)]));
  }

  return result;
}
