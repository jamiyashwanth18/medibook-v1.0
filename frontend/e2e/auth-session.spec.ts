import { expect, test } from "@playwright/test";

import { apiRegisterPatient } from "./support/api";

async function signIn(page: import("@playwright/test").Page, identifier: string, password: string) {
  await page.goto("/login");
  await page.getByLabel("Email or phone").fill(identifier);
  await page.getByLabel("Password", { exact: true }).fill(password);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).not.toHaveURL(/\/login/);
}

// [AC-006] After logout the user is back at login.
test("[AC-006] signing out returns the user to the sign-in screen", async ({ page, request }) => {
  const patient = await apiRegisterPatient(request);
  await signIn(page, patient.email, patient.password);

  await page.getByRole("link", { name: "Sign out" }).click();
  await expect(page).toHaveURL(/\/login/);
});

// [AC-012] Opening a protected URL directly, with no session, redirects to login.
test("[AC-012] opening a protected URL directly with no session redirects to login", async ({
  page,
}) => {
  await page.goto("/find-doctors");
  await expect(page).toHaveURL(/\/login/);
});

test("[AC-012] opening the admin console directly with no session redirects to login", async ({
  page,
}) => {
  await page.goto("/admin");
  await expect(page).toHaveURL(/\/login/);
});
