import { test, expect } from "@playwright/test";

test("sign up successfully", async ({ page }) => {
  await page.goto("/sign-up", { waitUntil: "networkidle" });

  await page.getByLabel("Nome do estabelecimento").fill("Pizza Shop");
  await page.getByLabel("Nome do gerente").fill("John Smith");
  await page.getByLabel("Telefone").fill("7070-7070");
  await page.getByLabel("Seu e-mail").fill("john.smith@example.com");
  await page.getByRole("button", { name: "Finalizar cadastro" }).click();

  const toast = page.getByText("Estabelecimento cadastrado com sucesso!");

  await expect(toast).toBeVisible();
});

test("sign up with wrong information", async ({ page }) => {
  await page.goto("/sign-up", { waitUntil: "networkidle" });

  await page.getByLabel("Nome do estabelecimento").fill("Invalid name");
  await page.getByLabel("Nome do gerente").fill("John Smith");
  await page.getByLabel("Telefone").fill("7070-7070");
  await page.getByLabel("Seu e-mail").fill("john.smith@example.com");
  await page.getByRole("button", { name: "Finalizar cadastro" }).click();

  const toast = page.getByText("Erro ao realizar cadastro!");

  await expect(toast).toBeVisible();
});

test("navigate to login page", async ({ page }) => {
  await page.goto("/sign-up", { waitUntil: "networkidle" });

  await page.getByRole("link", { name: "Fazer login" }).click();

  const pageUrl = page.url();

  expect(pageUrl).toContain("/sign-in");
});
