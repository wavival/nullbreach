import { expect, test } from "@playwright/test";

test("analyze API protects unauthenticated requests", async ({ request }) => {
  const response = await request.post("/nullbreach/api/analyze", {
    data: { code: "const token = 'test';" },
  });
  expect(response.status()).toBe(401);
  await expect(response.json()).resolves.toEqual({ error: "Unauthorized" });
});
