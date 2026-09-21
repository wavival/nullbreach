export function normalizeEmail(value: unknown) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

export function isValidEmail(value: string) {
  return /^\S+@\S+\.\S+$/.test(value);
}

export function isNonEmptyString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}
