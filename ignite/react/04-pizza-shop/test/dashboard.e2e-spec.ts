import { test, expect } from "@playwright/test";

test("Display month revenue metrics", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.getByText("R$ 12.456,47")).toBeVisible();
  await expect(page.getByText("+7% em relação ao mês passado").first()).toBeVisible();
});

test("Display month orders amount metrics", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.getByText("56", { exact: true })).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^56\+7% em relação ao mês passado$/ })
      .getByRole("paragraph"),
  ).toBeVisible();
});

test("Display day orders amount metrics", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.getByText("20", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("-5% em relação a ontem")).toBeVisible();
});

test("Display month canceled orders amount metrics", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.getByText("17")).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^17\+7% em relação ao mês passado$/ })
      .getByRole("paragraph"),
  ).toBeVisible();
});
