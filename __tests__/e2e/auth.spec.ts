import { expect, test } from "@playwright/test";

test("login page is available", async ({ page }) => {
  await page.goto("/nullbreach/login");
  await expect(page).toHaveTitle(/NullBreach/i);
  await expect(page.getByRole("heading")).toBeVisible();
});
