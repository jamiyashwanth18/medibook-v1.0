import { expect, test } from "@playwright/test";

import { apiRegisterPatient, uniqueSuffix } from "./support/api";

const VIEWPORTS = [
  { name: "phone", width: 360, height: 740 },
  { name: "desktop", width: 1440, height: 900 },
];

async function assertNoHorizontalScroll(page: import("@playwright/test").Page) {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(overflow).toBe(false);
}

for (const viewport of VIEWPORTS) {
  test(`[NFR-010] register flow fits at ${viewport.name} with no horizontal scroll`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    const suffix = uniqueSuffix();

    await page.goto("/login");
    await page.getByRole("tab", { name: "Register as a patient" }).click();
    await page.getByLabel("Full name").fill(`QA E2E Responsive ${suffix}`);
    await page.getByLabel("Email").fill(`qa.e2e.${suffix}@example.test`);
    await page.getByLabel("Password", { exact: true }).fill("Abcdef12");
    await page.getByLabel("Confirm password").fill("Abcdef12");

    await assertNoHorizontalScroll(page);
  });

  test(`[NFR-010] login flow fits at ${viewport.name} with no horizontal scroll`, async ({
    page,
    request,
  }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    const patient = await apiRegisterPatient(request);

    await page.goto("/login");
    await page.getByLabel("Email or phone").fill(patient.email);
    await page.getByLabel("Password", { exact: true }).fill(patient.password);

    await assertNoHorizontalScroll(page);

    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page).not.toHaveURL(/\/login/);
    await assertNoHorizontalScroll(page);
  });
}
