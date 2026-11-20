import { expect, test } from "@playwright/test";

import { apiRegisterPatient } from "./support/api";

// [AC-005] A wrong password shows one generic message, with no hint of which field was wrong.
test("[AC-005] a wrong password shows one generic 'Invalid credentials' message", async ({
  page,
  request,
}) => {
  const patient = await apiRegisterPatient(request);

  await page.goto("/login");
  await page.getByLabel("Email or phone").fill(patient.email);
  await page.getByLabel("Password", { exact: true }).fill("WrongPassword9");
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page.getByText("Invalid credentials", { exact: true })).toBeVisible();
  // No field-specific hint alongside it: the identifier field is not singled out.
  await expect(page.getByText("email is incorrect", { exact: false })).toHaveCount(0);
  await expect(page.getByText("password is incorrect", { exact: false })).toHaveCount(0);
});
