import React from "react";

import { ApiError, apiFetch } from "@/lib/api";
import { type Role, useAuth } from "@/lib/auth";
import { Icons } from "@/lib/icons";
import { useNavigate } from "@/lib/navigate";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "@/lib/ui";

const ROLE_HOME: Record<Role, string> = {
  patient: "find-doctors",
  doctor: "doctor-schedule",
  admin: "admin",
};

type Tab = "signin" | "register";

interface RegisterResponse {
  user_id: string;
  role: Role;
}

function passwordRules(password: string) {
  return {
    length: password.length >= 8,
    letter: /[A-Za-z]/.test(password),
    digit: /[0-9]/.test(password),
  };
}

function formatDetail(detail: unknown): string {
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) {
    return detail
      .map((item) =>
        item && typeof item === "object" && "msg" in item
          ? String((item as { msg: unknown }).msg)
          : String(item),
      )
      .join(" ");
  }
  return "That password does not meet the rules above.";
}

type RegisterError =
  | { kind: "identifier" }
  | { kind: "duplicate" }
  | { kind: "password"; text: string }
  | { kind: "other"; text: string }
  | null;

export default function Screen() {
  const { login, message, clearMessage } = useAuth();
  const navigate = useNavigate();

  const [tab, setTab] = React.useState<Tab>("signin");

  const [identifier, setIdentifier] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [signInError, setSignInError] = React.useState(false);
  const [signInBusy, setSignInBusy] = React.useState(false);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [regPassword, setRegPassword] = React.useState("");
  const [regError, setRegError] = React.useState<RegisterError>(null);
  const [regBusy, setRegBusy] = React.useState(false);
  const [registered, setRegistered] = React.useState(false);

  const rules = passwordRules(regPassword);
  const passwordOk = rules.length && rules.letter && rules.digit;

  async function onSignIn(e: React.FormEvent) {
    e.preventDefault();
    setSignInError(false);
    setSignInBusy(true);
    try {
      const user = await login(identifier, password);
      navigate(ROLE_HOME[user.role]);
    } catch {
      setSignInError(true);
    } finally {
      setSignInBusy(false);
    }
  }

  async function onRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() && !phone.trim()) {
      setRegError({ kind: "identifier" });
      return;
    }
    if (!passwordOk) {
      setRegError({
        kind: "password",
        text: "Use at least 8 characters with a letter and a digit.",
      });
      return;
    }
    setRegError(null);
    setRegBusy(true);
    try {
      await apiFetch<RegisterResponse>("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email: email.trim() || null,
          phone: phone.trim() || null,
          password: regPassword,
        }),
      });
      setRegistered(true);
      setIdentifier(email.trim() || phone.trim());
      setPassword("");
      setTab("signin");
    } catch (err) {
      if (err instanceof ApiError && err.status === 409) {
        setRegError({ kind: "duplicate" });
      } else if (err instanceof ApiError && err.status === 422) {
        setRegError({ kind: "password", text: formatDetail(err.detail) });
      } else {
        setRegError({ kind: "other", text: "Something went wrong. Please try again." });
      }
    } finally {
      setRegBusy(false);
    }
  }

  function switchTab(next: Tab) {
    setTab(next);
    setSignInError(false);
    setRegError(null);
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4 py-10"
      style={{ backgroundColor: "var(--brand-background)" }}
    >
      <div className="w-full max-w-sm">
        <p
          className="mb-4 text-center text-lg font-semibold"
          style={{ fontFamily: "var(--brand-font-heading)" }}
        >
          MediBook
        </p>

        {message ? (
          <div
            role="status"
            className="mb-4 flex items-start gap-2 rounded-[var(--brand-radius)] border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800"
          >
            <Icons.AlertCircle size={16} className="mt-0.5 shrink-0" />
            <span className="flex-1">{message}</span>
            <button type="button" onClick={clearMessage} aria-label="Dismiss">
              <Icons.X size={14} />
            </button>
          </div>
        ) : null}

        <Card>
          <CardHeader>
            <CardTitle>
              {tab === "signin" ? "Sign in to MediBook" : "Create a patient account"}
            </CardTitle>
            <div
              role="tablist"
              aria-label="Sign in or register"
              className="mt-3 flex gap-1 rounded-full bg-slate-100 p-1"
            >
              <button
                type="button"
                role="tab"
                aria-selected={tab === "signin"}
                onClick={() => switchTab("signin")}
                className={`flex-1 rounded-full px-3 py-2 text-sm font-medium ${
                  tab === "signin" ? "bg-white shadow-sm" : "text-slate-500"
                }`}
              >
                Sign in
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === "register"}
                onClick={() => switchTab("register")}
                className={`flex-1 rounded-full px-3 py-2 text-sm font-medium ${
                  tab === "register" ? "bg-white shadow-sm" : "text-slate-500"
                }`}
              >
                Register as a patient
              </button>
            </div>
          </CardHeader>

          <CardContent>
            {tab === "signin" ? (
              <form onSubmit={onSignIn} className="space-y-4" aria-label="Sign in">
                {registered ? (
                  <p className="rounded-[var(--brand-radius)] bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                    Account created. Sign in with your new password.
                  </p>
                ) : null}
                <div className="space-y-1">
                  <Label htmlFor="login-identifier">Email or phone</Label>
                  <Input
                    id="login-identifier"
                    type="text"
                    required
                    autoComplete="username"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {signInError ? (
                  <p role="alert" className="text-sm font-medium text-red-700">
                    Invalid credentials
                  </p>
                ) : null}
                <Button type="submit" disabled={signInBusy} className="w-full">
                  {signInBusy ? "Signing in…" : "Sign in"}
                </Button>
              </form>
            ) : (
              <form onSubmit={onRegister} className="space-y-4" aria-label="Register">
                <div className="space-y-1">
                  <Label htmlFor="reg-name">Full name</Label>
                  <Input
                    id="reg-name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="reg-email">Email</Label>
                  <Input
                    id="reg-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={
                      regError?.kind === "identifier" || regError?.kind === "duplicate"
                        ? true
                        : undefined
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="reg-phone">Phone</Label>
                  <Input
                    id="reg-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    aria-invalid={
                      regError?.kind === "identifier" || regError?.kind === "duplicate"
                        ? true
                        : undefined
                    }
                  />
                  <p className="text-xs text-slate-500">
                    Give an email or a phone number -- either can sign you in.
                  </p>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="reg-password">Password</Label>
                  <Input
                    id="reg-password"
                    type="password"
                    required
                    autoComplete="new-password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    aria-invalid={regError?.kind === "password" ? true : undefined}
                  />
                  <ul className="mt-1 space-y-0.5 text-xs text-slate-500">
                    <li>{rules.length ? "✓" : "•"} at least 8 characters</li>
                    <li>{rules.letter ? "✓" : "•"} at least one letter</li>
                    <li>{rules.digit ? "✓" : "•"} at least one digit</li>
                  </ul>
                </div>

                {regError?.kind === "identifier" ? (
                  <p role="alert" className="text-sm font-medium text-red-700">
                    Add an email or a phone number so you can sign in.
                  </p>
                ) : null}
                {regError?.kind === "duplicate" ? (
                  <p role="alert" className="text-sm font-medium text-red-700">
                    That email or phone is already in use.
                  </p>
                ) : null}
                {regError?.kind === "password" ? (
                  <p role="alert" className="text-sm font-medium text-red-700">
                    {regError.text}
                  </p>
                ) : null}
                {regError?.kind === "other" ? (
                  <p role="alert" className="text-sm font-medium text-red-700">
                    {regError.text}
                  </p>
                ) : null}

                <Button type="submit" disabled={regBusy} className="w-full">
                  {regBusy ? "Creating account…" : "Create account"}
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter>
            <p className="text-xs text-slate-500">
              Your health details stay private and are only shown to you and your doctor.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
