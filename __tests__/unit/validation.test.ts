import {
  isNonEmptyString,
  isValidEmail,
  normalizeEmail,
} from "@/lib/validation";

describe("validation helpers", () => {
  it("normalizes a user email", () => {
    expect(normalizeEmail("  USER@Example.COM ")).toBe("user@example.com");
    expect(normalizeEmail(null)).toBe("");
  });

  it("accepts only basic valid email addresses", () => {
    expect(isValidEmail("user@example.com")).toBe(true);
    expect(isValidEmail("not-an-email")).toBe(false);
  });

  it("requires trimmed content", () => {
    expect(isNonEmptyString(" message ")).toBe(true);
    expect(isNonEmptyString("   ")).toBe(false);
    expect(isNonEmptyString({})).toBe(false);
  });
});
