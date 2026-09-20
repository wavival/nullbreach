import { expect, test } from "@playwright/test";

test("analyze API protects unauthenticated requests", async ({ request }) => {
  const response = await request.post("/api/analyze", {
    data: { code: "const token = 'test';" },
  });
  expect(response.status()).toBe(401);
});
