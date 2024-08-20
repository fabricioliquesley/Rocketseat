import { test, expect } from "@playwright/test";

test("update profile successfully", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await page.getByRole("button", { name: "Pizza Shop" }).click();
  await page.getByRole("menuitem", { name: "Perfil da loja" }).click();
  await page.getByLabel("Nome").fill("Pizza Factory");
  await page.getByLabel("description").fill("Other description");
  await page.getByRole("button", { name: "Salvar" }).click();

  await page.waitForLoadState("networkidle");

  const toast = page.getByText("Perfil atualizado!");

  await expect(toast).toBeVisible();

  await page.getByRole("button", { name: "Close" }).click();

  expect(page.getByRole("button", { name: "Pizza Factory" })).toContainText(
    "Pizza Factory",
  );
  await expect(page.getByRole("button", { name: "Pizza Factory" })).toBeVisible();
});

test("update profile with error", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await page.getByRole("button", { name: "Pizza Shop" }).click();
  await page.getByRole("menuitem", { name: "Perfil da loja" }).click();
  await page.getByLabel("Nome").fill("Invalid name");
  await page.getByLabel("description").fill("Other description");
  await page.getByRole("button", { name: "Salvar" }).click();

  await page.waitForLoadState("networkidle");

  const toast = page.getByText("Erro ao atualizar perfil, tente novamente!");

  await expect(toast).toBeVisible();
});
