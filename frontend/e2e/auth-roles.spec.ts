import { expect, test } from "@playwright/test";

import { adminCredentials } from "./support/admin";
import { apiCreateDoctor, apiCreateSpecialization, apiLogin, apiRegisterPatient } from "./support/api";

// [AC-010] Signing in as the bootstrap admin reaches the admin dashboard.
test("[AC-010] signing in as the admin reaches the admin dashboard", async ({ page }) => {
  const { email, password } = adminCredentials();

  await page.goto("/login");
  await page.getByLabel("Email or phone").fill(email);
  await page.getByLabel("Password", { exact: true }).fill(password);
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page).toHaveURL(/\/admin/);
});

// [AC-010] A patient navigating to the admin URL is denied.
test("[AC-010] a patient navigating to the admin URL is denied", async ({ page, request }) => {
  const patient = await apiRegisterPatient(request);

  await page.goto("/login");
  await page.getByLabel("Email or phone").fill(patient.email);
  await page.getByLabel("Password", { exact: true }).fill(patient.password);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).not.toHaveURL(/\/login/);

  await page.goto("/admin");
  await expect(page).not.toHaveURL(/\/admin/);
});

// [AC-011] A patient navigating to a doctor-only URL is denied.
test("[AC-011] a patient navigating to the doctor schedule URL is denied", async ({
  page,
  request,
}) => {
  const patient = await apiRegisterPatient(request);

  await page.goto("/login");
  await page.getByLabel("Email or phone").fill(patient.email);
  await page.getByLabel("Password", { exact: true }).fill(patient.password);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).not.toHaveURL(/\/login/);

  await page.goto("/doctor-schedule");
  await expect(page).not.toHaveURL(/\/doctor-schedule/);
});

// [AC-011] A doctor signing in does not land on, and cannot reach, the admin dashboard.
test("[AC-011] a doctor cannot reach the admin dashboard", async ({ page, request }) => {
  const { email: adminEmail, password: adminPassword } = adminCredentials();
  const adminToken = await apiLogin(request, adminEmail, adminPassword);
  const specializationId = await apiCreateSpecialization(request, adminToken);
  const doctor = await apiCreateDoctor(request, adminToken, specializationId);

  await page.goto("/login");
  await page.getByLabel("Email or phone").fill(doctor.email);
  await page.getByLabel("Password", { exact: true }).fill(doctor.password);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).not.toHaveURL(/\/login/);

  await page.goto("/admin");
  await expect(page).not.toHaveURL(/\/admin/);
});
