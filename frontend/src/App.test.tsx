import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";

import App from "./App";
import { clearSessionToken, setSessionToken } from "@/lib/api";

function jsonResponse(status: number, body: unknown) {
  return { ok: status >= 200 && status < 300, status, json: async () => body };
}

describe("App", () => {
  afterEach(() => {
    clearSessionToken();
    vi.unstubAllGlobals();
  });

  it("[AC-012] an unauthenticated visitor to a protected page is redirected to sign in, not shown the page", async () => {
    render(
      <MemoryRouter initialEntries={["/find-doctors"]}>
        <App />
      </MemoryRouter>,
    );
    await waitFor(() => expect(screen.getByText("Sign in to MediBook")).toBeInTheDocument());
    expect(screen.queryByText("Find a doctor")).not.toBeInTheDocument();
  });

  it("[AC-008] renders a screen inside the app shell and shows its menu for an authenticated session", async () => {
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
    render(
      <MemoryRouter initialEntries={["/find-doctors"]}>
        <App />
      </MemoryRouter>,
    );
    // getAllByText, not getByText: the page may repeat its menu item's text.
    await waitFor(() => expect(screen.getAllByText("Find a doctor").length).toBeGreaterThan(0));
  });
});
