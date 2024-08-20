import { test, expect } from "@playwright/test";

test("List orders", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  await expect(
    page.getByRole("cell", { name: "customer-1", exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("cell", { name: "customer-10" })).toBeVisible();
});

test("Paginated orders", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  await page.getByRole("button", { name: "Próxima página" }).click();

  await expect(
    page.getByRole("cell", { name: "customer-11", exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("cell", { name: "customer-20" })).toBeVisible();

  await page.getByRole("button", { name: "Ultima Página" }).click();

  await expect(
    page.getByRole("cell", { name: "customer-51", exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("cell", { name: "customer-60" })).toBeVisible();

  await page.getByRole("button", { name: "Página anterior" }).click();

  await expect(
    page.getByRole("cell", { name: "customer-41", exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("cell", { name: "customer-50" })).toBeVisible();

  await page.getByRole("button", { name: "Primeira página" }).click();

  await expect(
    page.getByRole("cell", { name: "customer-1", exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("cell", { name: "customer-10" })).toBeVisible();
});

test("Filter by status", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  await page.getByRole("combobox").click();
  await page.getByLabel("Em preparo").click();
  await page.getByRole("button", { name: "Filtrar resultados" }).click();

  await expect(page.getByRole("cell", { name: "Em preparo" })).toHaveCount(10);
});

test("Filter by order id", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  await page.getByPlaceholder("ID do pedido").fill("order-5");
  await page.getByRole("button", { name: "Filtrar resultados" }).click();

  await expect(
    page.getByRole("cell", { name: "order-5", exact: true }),
  ).toBeVisible();
});

test("Filter by customer name", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  await page.getByPlaceholder("Nome do cliente").fill("customer-5");
  await page.getByRole("button", { name: "Filtrar resultados" }).click();

  await expect(
    page.getByRole("cell", { name: "customer-5", exact: true }),
  ).toBeVisible();
});
