import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";

import { clearSessionToken, setSessionToken } from "@/lib/api";
import { AuthProvider, RequireAuth, type Role } from "@/lib/auth";

function jsonResponse(status: number, body: unknown) {
  return { ok: status >= 200 && status < 300, status, json: async () => body };
}

function renderGuarded(initialPath: string, roles?: Role[]) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <AuthProvider>
        <Routes>
          <Route
            path="/secret"
            element={
              <RequireAuth roles={roles}>
                <p>secret data</p>
              </RequireAuth>
            }
          />
          <Route path="/login" element={<p>login screen</p>} />
        </Routes>
      </AuthProvider>
    </MemoryRouter>,
  );
}

describe("RequireAuth", () => {
  afterEach(() => {
    clearSessionToken();
    vi.unstubAllGlobals();
  });

  it("[AC-008] redirects an unauthenticated visitor to login", async () => {
    renderGuarded("/secret");
    await waitFor(() => expect(screen.getByText("login screen")).toBeInTheDocument());
  });

  it("[AC-010] lets a patient into a patient-only route", async () => {
    setSessionToken("tok-patient");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        jsonResponse(200, {
          id: "u1",
          name: "P",
          email: "p@x.com",
          phone: null,
          role: "patient",
          is_active: true,
        }),
      ),
    );
    renderGuarded("/secret", ["patient"]);
    await waitFor(() => expect(screen.getByText("secret data")).toBeInTheDocument());
  });

  it("[AC-011] denies a patient reaching a doctor-only route", async () => {
    setSessionToken("tok-patient");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        jsonResponse(200, {
          id: "u1",
          name: "P",
          email: "p@x.com",
          phone: null,
          role: "patient",
          is_active: true,
        }),
      ),
    );
    renderGuarded("/secret", ["doctor"]);
    await waitFor(() => expect(screen.getByText(/access denied/i)).toBeInTheDocument());
    expect(screen.queryByText("secret data")).not.toBeInTheDocument();
  });

  it("[AC-012] a 401 on a protected call clears the token and sends the user back to login", async () => {
    setSessionToken("tok-stale");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(jsonResponse(401, { detail: "Invalid credentials" })),
    );
    renderGuarded("/secret", ["patient"]);
    await waitFor(() => expect(screen.getByText("login screen")).toBeInTheDocument());
    expect(localStorage.getItem("session_token")).toBeNull();
  });
});
