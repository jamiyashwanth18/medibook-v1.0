import { expect, test } from "@playwright/test";

import { uniqueSuffix } from "./support/api";

// [AC-001][AC-004] A new patient registers with a unique email, is sent to the
// sign-in screen, signs in, and lands in the patient area.
test("[AC-001][AC-004] a new patient registers, signs in, and reaches the patient area", async ({
  page,
}) => {
  const suffix = uniqueSuffix();
  const email = `qa.e2e.${suffix}@example.test`;
  const password = "Abcdef12";

  await page.goto("/login");
  await page.getByRole("tab", { name: "Register as a patient" }).click();

  await page.getByLabel("Full name").fill(`QA E2E Patient ${suffix}`);
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password", { exact: true }).fill(password);
  await page.getByLabel("Confirm password").fill(password);
  await page.getByRole("button", { name: "Create account" }).click();

  // Registration never signs the user in: the next stop is the sign-in screen.
  await expect(page).toHaveURL(/\/login/);
  await page.getByRole("tab", { name: "Sign in" }).click();

  await page.getByLabel("Email or phone").fill(email);
  await page.getByLabel("Password", { exact: true }).fill(password);
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page).not.toHaveURL(/\/login/);
  await expect(page.getByText("Find a doctor", { exact: true })).toBeVisible();
});
