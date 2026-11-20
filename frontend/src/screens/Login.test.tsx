import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";

import { clearSessionToken } from "@/lib/api";
import { AuthProvider } from "@/lib/auth";
import Login from "@/screens/Login";

function jsonResponse(status: number, body: unknown) {
  return { ok: status >= 200 && status < 300, status, json: async () => body };
}

function renderLogin() {
  return render(
    <MemoryRouter initialEntries={["/login"]}>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </MemoryRouter>,
  );
}

describe("Login screen", () => {
  afterEach(() => {
    clearSessionToken();
    vi.unstubAllGlobals();
  });

  it("[AC-004] signs in and stores the returned token", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        jsonResponse(200, {
          token: "opaque-token",
          expires_at: "2026-11-20T00:00:00Z",
          user: {
            id: "u1",
            name: "Pat",
            email: "pat@x.com",
            phone: null,
            role: "patient",
            is_active: true,
          },
        }),
      ),
    );

    renderLogin();

    fireEvent.change(screen.getByLabelText(/email or phone/i), {
      target: { value: "pat@x.com" },
    });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: "Secret123" } });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(localStorage.getItem("session_token")).toBe("opaque-token");
    });
  });

  it("[AC-005] shows one generic message on a 401, with no field hint", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(jsonResponse(401, { detail: "Invalid credentials" })),
    );

    renderLogin();

    fireEvent.change(screen.getByLabelText(/email or phone/i), {
      target: { value: "pat@x.com" },
    });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: "wrong-pass1" } });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("Invalid credentials");
    });
  });

  it("[AC-002] a 409 on register keeps the entered data and shows an inline message", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(jsonResponse(409, { detail: "Email or phone already in use" })),
    );

    renderLogin();
    fireEvent.click(screen.getByRole("tab", { name: /register/i }));

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: "Pat Patient" } });
    fireEvent.change(screen.getByLabelText(/^email$/i), { target: { value: "pat@x.com" } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: "Secret123" } });
    fireEvent.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(/already in use/i);
    });
    expect(screen.getByLabelText(/full name/i)).toHaveValue("Pat Patient");
    expect(screen.getByLabelText(/^email$/i)).toHaveValue("pat@x.com");
  });

  it("[AC-003] a 422 renders the password rules returned by the API", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        jsonResponse(422, {
          detail: [{ msg: "Password must be at least 8 characters with a letter and a digit." }],
        }),
      ),
    );

    renderLogin();
    fireEvent.click(screen.getByRole("tab", { name: /register/i }));

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: "Pat Patient" } });
    fireEvent.change(screen.getByLabelText(/^email$/i), { target: { value: "pat@x.com" } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: "longenough1" } });
    fireEvent.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(/at least 8 characters/i);
    });
  });

  it("[AC-001] on 201 the registration form switches to sign-in", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(jsonResponse(201, { user_id: "u2", role: "patient" })),
    );

    renderLogin();
    fireEvent.click(screen.getByRole("tab", { name: /register/i }));

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: "Pat Patient" } });
    fireEvent.change(screen.getByLabelText(/^email$/i), { target: { value: "pat@x.com" } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: "Secret123" } });
    fireEvent.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() => {
      expect(screen.getByRole("tab", { name: /sign in/i })).toHaveAttribute(
        "aria-selected",
        "true",
      );
    });
    expect(screen.getByLabelText(/email or phone/i)).toHaveValue("pat@x.com");
  });
});
