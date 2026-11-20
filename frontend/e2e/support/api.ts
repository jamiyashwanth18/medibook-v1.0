import type { APIRequestContext } from "@playwright/test";

// The backend's own base URL for the duration of the E2E run. Playwright's webServer
// config boots it on 127.0.0.1:8000 (see playwright.config.ts); a deployed run points
// E2E_API_BASE_URL at the real thing instead.
export const API_BASE_URL = process.env.E2E_API_BASE_URL ?? "http://127.0.0.1:8000";

export function uniqueSuffix(): string {
  return crypto.randomUUID().slice(0, 8);
}

export async function apiRegisterPatient(
  request: APIRequestContext,
  opts: { name?: string; email?: string; password?: string } = {},
): Promise<{ email: string; password: string; name: string }> {
  const suffix = uniqueSuffix();
  const email = opts.email ?? `qa.e2e.${suffix}@example.test`;
  const password = opts.password ?? "Abcdef12";
  const name = opts.name ?? `QA E2E Patient ${suffix}`;
  const response = await request.post(`${API_BASE_URL}/auth/register`, {
    data: { name, email, password },
  });
  if (!response.ok()) {
    throw new Error(`register failed: ${response.status()} ${await response.text()}`);
  }
  return { email, password, name };
}

export async function apiLogin(
  request: APIRequestContext,
  identifier: string,
  password: string,
): Promise<string> {
  const response = await request.post(`${API_BASE_URL}/auth/login`, {
    data: { identifier, password },
  });
  if (!response.ok()) {
    throw new Error(`login failed: ${response.status()} ${await response.text()}`);
  }
  const body = await response.json();
  return body.token as string;
}

export async function apiCreateSpecialization(
  request: APIRequestContext,
  adminToken: string,
): Promise<string> {
  const suffix = uniqueSuffix();
  const response = await request.post(`${API_BASE_URL}/specializations`, {
    headers: { Authorization: `Bearer ${adminToken}` },
    data: { name: `QA E2E Specialization ${suffix}` },
  });
  if (!response.ok()) {
    throw new Error(`create specialization failed: ${response.status()} ${await response.text()}`);
  }
  const body = await response.json();
  return body.id as string;
}

export async function apiCreateDoctor(
  request: APIRequestContext,
  adminToken: string,
  specializationId: string,
): Promise<{ id: string; email: string; password: string }> {
  const suffix = uniqueSuffix();
  const email = `qa.e2e.doctor.${suffix}@example.test`;
  const password = "Abcdef12";
  const response = await request.post(`${API_BASE_URL}/doctors`, {
    headers: { Authorization: `Bearer ${adminToken}` },
    data: {
      name: `Dr QA E2E ${suffix}`,
      contact_email: email,
      specialization_ids: [specializationId],
      password,
    },
  });
  if (!response.ok()) {
    throw new Error(`create doctor failed: ${response.status()} ${await response.text()}`);
  }
  const body = await response.json();
  return { id: body.id as string, email, password };
}
