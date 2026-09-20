import { expect, test } from "@playwright/test";

test("chat API protects unauthenticated requests", async ({ request }) => {
  const response = await request.post("/api/chat", {
    data: { question: "test" },
  });
  expect(response.status()).toBe(401);
});
