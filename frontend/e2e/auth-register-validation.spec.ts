import { expect, test } from "@playwright/test";

import { apiRegisterPatient, uniqueSuffix } from "./support/api";

// [AC-002] Registering again with an email already in use shows the duplicate message.
test("[AC-002] registering with an email already in use shows the 'already in use' message", async ({
  page,
  request,
}) => {
  const existing = await apiRegisterPatient(request);

  await page.goto("/login");
  await page.getByRole("tab", { name: "Register as a patient" }).click();
  await page.getByLabel("Full name").fill(`QA E2E Duplicate ${uniqueSuffix()}`);
  await page.getByLabel("Email").fill(existing.email);
  await page.getByLabel("Password", { exact: true }).fill("Abcdef12");
  await page.getByLabel("Confirm password").fill("Abcdef12");
  await page.getByRole("button", { name: "Create account" }).click();

  await expect(page.getByText("already in use", { exact: false })).toBeVisible();
});

// [AC-003][NFR-004] A password shorter than 8 characters or missing a digit shows the rules.
test("[AC-003][NFR-004] a password shorter than 8 characters shows the password rules", async ({
  page,
}) => {
  const suffix = uniqueSuffix();

  await page.goto("/login");
  await page.getByRole("tab", { name: "Register as a patient" }).click();
  await page.getByLabel("Full name").fill(`QA E2E Short Pw ${suffix}`);
  await page.getByLabel("Email").fill(`qa.e2e.${suffix}@example.test`);
  await page.getByLabel("Password", { exact: true }).fill("Ab1");
  await page.getByLabel("Confirm password").fill("Ab1");
  await page.getByRole("button", { name: "Create account" }).click();

  await expect(page.getByText("8 characters", { exact: false })).toBeVisible();
});

test("[AC-003][NFR-004] a password without a digit shows the password rules", async ({ page }) => {
  const suffix = uniqueSuffix();

  await page.goto("/login");
  await page.getByRole("tab", { name: "Register as a patient" }).click();
  await page.getByLabel("Full name").fill(`QA E2E No Digit ${suffix}`);
  await page.getByLabel("Email").fill(`qa.e2e.${suffix}@example.test`);
  await page.getByLabel("Password", { exact: true }).fill("onlyletters");
  await page.getByLabel("Confirm password").fill("onlyletters");
  await page.getByRole("button", { name: "Create account" }).click();

  await expect(page.getByText("number", { exact: false })).toBeVisible();
});
