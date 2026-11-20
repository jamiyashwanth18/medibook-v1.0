// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Check, X, Clock, ArrowLeft, ArrowRight, AlertCircle, CheckCircle } = Icons;

const PRODUCT = "MediBook";
const TITLE = "Sign in to MediBook";
const tint = (pct) => `color-mix(in srgb, ${brand.primaryColor} ${pct}%, ${brand.backgroundColor})`;

// identifiers the clinic's directory already holds (users.email / users.phone)
const REGISTERED_IDENTIFIERS = [
  "anita.rao@medibook.in",
  "+91 98450 22714",
  "dr.ravi.menon@medibook.in",
  "frontdesk@medibook.in",
];

// accounts this preview will let through (patients of the Indiranagar clinic)
const PREVIEW_PATIENTS = ["anita.rao@medibook.in", "+91 98450 22714"];

const TABS = [
  { key: "signin", label: "Sign in", wf: "i-1-0-0" },
  { key: "register", label: "Register as a patient", wf: "i-1-0-1" },
];

export default function Screen() {
  const navigate = useNavigate();
  const [tab, setTab] = React.useState("signin");

  const [identifier, setIdentifier] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [signInError, setSignInError] = React.useState(false);

  const [fullName, setFullName] = React.useState("");
  const [regEmail, setRegEmail] = React.useState("");
  const [regPhone, setRegPhone] = React.useState("");
  const [regPassword, setRegPassword] = React.useState("");
  const [regConfirm, setRegConfirm] = React.useState("");
  const [regError, setRegError] = React.useState("");

  const [pending, setPending] = React.useState(null);
  const [success, setSuccess] = React.useState(null);

  const tabRefs = React.useRef({});

  const rules = {
    length: regPassword.length >= 10,
    letter: /[A-Za-z]/.test(regPassword),
    number: /[0-9]/.test(regPassword),
    symbol: /[^A-Za-z0-9]/.test(regPassword),
  };
  const passwordOk = rules.length && rules.letter && rules.number && rules.symbol;

  React.useEffect(() => {
    if (!pending) return undefined;
    const timer = setTimeout(() => {
      if (pending === "signin") {
        const id = identifier.trim().toLowerCase();
        const known = PREVIEW_PATIENTS.some((v) => v.toLowerCase() === id);
        if (!known || password.length < 10) {
          setSignInError(true);
          setPending(null);
          return;
        }
        setSignInError(false);
        setPending(null);
        setSuccess({ kind: "signin", who: identifier.trim() });
        navigate("find-doctors");
        return;
      }

      const email = regEmail.trim().toLowerCase();
      const phone = regPhone.trim().toLowerCase();
      const taken = REGISTERED_IDENTIFIERS.some(
        (v) => (email && v.toLowerCase() === email) || (phone && v.toLowerCase() === phone)
      );
      if (!fullName.trim()) {
        setRegError("name");
      } else if (!email && !phone) {
        setRegError("identifier");
      } else if (taken) {
        setRegError("duplicate");
      } else if (!passwordOk) {
        setRegError("password");
      } else if (regPassword !== regConfirm) {
        setRegError("confirm");
      } else {
        setRegError("");
        setPending(null);
        setSuccess({ kind: "register", who: fullName.trim() });
        navigate("find-doctors");
        return;
      }
      setPending(null);
    }, 650);
    return () => clearTimeout(timer);
  }, [pending]);

  const pill = { borderRadius: 999, border: 0, backgroundColor: tint(8), color: brand.primaryColor };
  const pillInvalid = { ...pill, boxShadow: `inset 0 0 0 2px ${brand.accentColor}` };
  const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
  const labelCls = "block pl-4 text-xs lowercase";
  const labelStyle = { color: brand.neutralColor };

  const switchTab = (key) => {
    setTab(key);
    setSignInError(false);
    setRegError("");
  };

  const onTabKeys = (event) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const index = TABS.findIndex((t) => t.key === tab);
    const next = TABS[(index + (event.key === "ArrowRight" ? 1 : TABS.length - 1)) % TABS.length];
    switchTab(next.key);
    const node = tabRefs.current[next.key];
    if (node) node.focus();
  };

  return (
    <div
      className="flex min-h-screen flex-col"
      style={{ color: brand.primaryColor, fontFamily: brand.fontBody, backgroundColor: brand.backgroundColor }}
    >
      <style>{`
        @keyframes atriumRise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .atrium-rise { animation: atriumRise .32s ease-out both; }
        @media (prefers-reduced-motion: reduce) { .atrium-rise { animation: none; } }
      `}</style>

      <header className="px-10 py-5" style={{ backgroundColor: tint(10) }}>
        <p className="text-lg italic" style={{ fontFamily: brand.fontHeading }}>{PRODUCT}</p>
      </header>

      <div className="flex flex-1 items-start justify-center px-6 py-12">
        <main
          className="w-full max-w-md px-9 pb-9 pt-16 text-center"
          style={{ backgroundColor: tint(6), borderRadius: "170px 170px 24px 24px" }}
        >
          <h1 data-wf="b-0-0" className="text-3xl italic" style={{ fontFamily: brand.fontHeading }}>
            {TITLE}
          </h1>
          <p className="mt-2 text-sm lowercase" style={{ color: brand.neutralColor }}>
            one account for patients, doctors and the front desk
          </p>

          <div
            data-wf="b-1-0"
            role="tablist"
            aria-label="Sign in or register"
            onKeyDown={onTabKeys}
            className="mx-auto mt-8 flex w-full gap-1 p-1"
            style={{ borderRadius: 999, backgroundColor: tint(8) }}
          >
            {TABS.map((t) => {
              const selected = tab === t.key;
              return (
                <button
                  key={t.key}
                  data-wf={t.wf}
                  ref={(node) => { tabRefs.current[t.key] = node; }}
                  id={`tab-${t.key}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls={`panel-${t.key}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => switchTab(t.key)}
                  className={`flex-1 px-4 py-3 text-sm transition-all ${focus} ${selected ? "italic font-semibold" : ""}`}
                  style={{
                    borderRadius: 999,
                    outlineColor: brand.primaryColor,
                    backgroundColor: selected ? brand.backgroundColor : "transparent",
                    color: selected ? brand.primaryColor : brand.neutralColor,
                    fontFamily: selected ? brand.fontHeading : brand.fontBody,
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          {success ? (
            <div role="status" className="atrium-rise mt-10 text-left">
              <p className="flex items-center gap-2 text-xl italic" style={{ fontFamily: brand.fontHeading }}>
                <CheckCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                {success.kind === "signin" ? "You are in." : "Your patient account is ready."}
              </p>
              <p className="mt-2 text-sm lowercase" style={{ color: brand.neutralColor }}>
                {success.kind === "signin"
                  ? `signed in as ${success.who} — opening find a doctor`
                  : `welcome, ${success.who} — opening find a doctor so you can book your first visit`}
              </p>
            </div>
          ) : tab === "signin" ? (
            <div id="panel-signin" role="tabpanel" aria-labelledby="tab-signin" tabIndex={-1} className="atrium-rise">
              <form
                data-wf="b-2-0"
                className="mt-8 space-y-4 text-left"
                aria-labelledby="signin-heading"
                onSubmit={(e) => { e.preventDefault(); setSignInError(false); setPending("signin"); }}
              >
                <h2 id="signin-heading" className="pl-4 text-lg italic" style={{ fontFamily: brand.fontHeading }}>
                  Sign in
                </h2>

                <div className="space-y-1">
                  <label htmlFor="at-identifier" className={labelCls} style={labelStyle}>Email or phone</label>
                  <input
                    id="at-identifier"
                    data-wf="i-2-0-0"
                    type="text"
                    required
                    autoComplete="username"
                    inputMode="email"
                    disabled={!!pending}
                    aria-invalid={signInError || undefined}
                    aria-describedby="signin-feedback"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="anita.rao@medibook.in"
                    className={`h-12 w-full px-5 text-sm outline-none transition-shadow disabled:opacity-60 ${focus}`}
                    style={{ ...(signInError ? pillInvalid : pill), outlineColor: brand.primaryColor, fontVariantNumeric: "tabular-nums" }}
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="at-password" className={labelCls} style={labelStyle}>Password</label>
                  <input
                    id="at-password"
                    data-wf="i-2-0-1"
                    type="password"
                    required
                    autoComplete="current-password"
                    disabled={!!pending}
                    aria-invalid={signInError || undefined}
                    aria-describedby="signin-feedback"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`h-12 w-full px-5 text-sm outline-none transition-shadow disabled:opacity-60 ${focus}`}
                    style={{ ...(signInError ? pillInvalid : pill), outlineColor: brand.primaryColor }}
                  />
                </div>

                <div className="grid items-center gap-4 pt-1 sm:grid-cols-2">
                  <button
                    data-wf="b-3-0"
                    type="submit"
                    disabled={!!pending}
                    className={`h-12 w-full text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-70 ${focus}`}
                    style={{ borderRadius: 999, backgroundColor: brand.accentColor, color: brand.backgroundColor, outlineColor: brand.primaryColor }}
                  >
                    {pending === "signin" ? "Signing in…" : "Sign in"}
                  </button>

                  <div data-wf="b-3-1" id="signin-feedback" aria-live="polite" className="text-left text-xs leading-relaxed">
                    {signInError ? (
                      <p className="atrium-rise flex items-start gap-2 font-semibold" style={{ color: brand.primaryColor }}>
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>Email/phone or password is incorrect.</span>
                      </p>
                    ) : (
                      <p className="flex items-start gap-2 lowercase" style={{ color: brand.neutralColor }}>
                        <Clock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>Please sign in to continue — every page needs an account.</span>
                      </p>
                    )}
                    {signInError ? (
                      <p className="mt-2 lowercase" style={{ color: brand.neutralColor }}>
                        your details are still here — check them and try again. sessions end after a quiet spell, so this can
                        happen on a page you left open.
                      </p>
                    ) : null}
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <div id="panel-register" role="tabpanel" aria-labelledby="tab-register" tabIndex={-1} className="atrium-rise">
              <form
                data-wf="b-4-0"
                className="mt-8 space-y-4 text-left"
                aria-labelledby="register-heading"
                onSubmit={(e) => { e.preventDefault(); setRegError(""); setPending("register"); }}
              >
                <h2 id="register-heading" className="pl-4 text-lg italic" style={{ fontFamily: brand.fontHeading }}>
                  Create a patient account
                </h2>

                <div className="space-y-1">
                  <label htmlFor="at-name" className={labelCls} style={labelStyle}>Full name</label>
                  <input
                    id="at-name"
                    data-wf="i-4-0-0"
                    type="text"
                    required
                    autoComplete="name"
                    disabled={!!pending}
                    aria-invalid={regError === "name" || undefined}
                    aria-describedby="register-feedback"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Anita Rao"
                    className={`h-12 w-full px-5 text-sm outline-none transition-shadow disabled:opacity-60 ${focus}`}
                    style={{ ...(regError === "name" ? pillInvalid : pill), outlineColor: brand.primaryColor }}
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="at-reg-email" className={labelCls} style={labelStyle}>Email</label>
                  <input
                    id="at-reg-email"
                    data-wf="i-4-0-1"
                    type="email"
                    autoComplete="email"
                    disabled={!!pending}
                    aria-invalid={regError === "duplicate" || regError === "identifier" || undefined}
                    aria-describedby="register-feedback"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="you@example.in"
                    className={`h-12 w-full px-5 text-sm outline-none transition-shadow disabled:opacity-60 ${focus}`}
                    style={{ ...(regError === "duplicate" || regError === "identifier" ? pillInvalid : pill), outlineColor: brand.primaryColor }}
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="at-reg-phone" className={labelCls} style={labelStyle}>Phone</label>
                  <input
                    id="at-reg-phone"
                    data-wf="i-4-0-2"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    disabled={!!pending}
                    aria-invalid={regError === "duplicate" || regError === "identifier" || undefined}
                    aria-describedby="register-feedback"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+91 98450 00000"
                    className={`h-12 w-full px-5 text-sm outline-none transition-shadow disabled:opacity-60 ${focus}`}
                    style={{
                      ...(regError === "duplicate" || regError === "identifier" ? pillInvalid : pill),
                      outlineColor: brand.primaryColor,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  />
                  <p className="pl-4 pt-1 text-xs lowercase" style={{ color: brand.neutralColor }}>
                    give an email or a phone number — either one can sign you in
                  </p>
                </div>

                <div className="space-y-1">
                  <label htmlFor="at-reg-password" className={labelCls} style={labelStyle}>Password</label>
                  <input
                    id="at-reg-password"
                    data-wf="i-4-0-3"
                    type="password"
                    required
                    autoComplete="new-password"
                    disabled={!!pending}
                    aria-invalid={regError === "password" || undefined}
                    aria-describedby="register-feedback"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className={`h-12 w-full px-5 text-sm outline-none transition-shadow disabled:opacity-60 ${focus}`}
                    style={{ ...(regError === "password" ? pillInvalid : pill), outlineColor: brand.primaryColor }}
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="at-reg-confirm" className={labelCls} style={labelStyle}>Confirm password</label>
                  <input
                    id="at-reg-confirm"
                    data-wf="i-4-0-4"
                    type="password"
                    required
                    autoComplete="new-password"
                    disabled={!!pending}
                    aria-invalid={regError === "confirm" || undefined}
                    aria-describedby="register-feedback"
                    value={regConfirm}
                    onChange={(e) => setRegConfirm(e.target.value)}
                    className={`h-12 w-full px-5 text-sm outline-none transition-shadow disabled:opacity-60 ${focus}`}
                    style={{ ...(regError === "confirm" ? pillInvalid : pill), outlineColor: brand.primaryColor }}
                  />
                </div>
              </form>

              <div data-wf="b-5-0" id="register-feedback" aria-live="polite" className="mt-5 text-left text-xs leading-relaxed">
                <p style={{ color: brand.neutralColor }}>
                  Password must be at least 10 characters and include a letter, a number and a symbol.
                </p>
                <ul className="mt-2 space-y-1">
                  {[
                    { key: "length", text: "at least 10 characters", ok: rules.length },
                    { key: "letter", text: "one letter", ok: rules.letter },
                    { key: "number", text: "one number", ok: rules.number },
                    { key: "symbol", text: "one symbol", ok: rules.symbol },
                  ].map((r) => (
                    <li key={r.key} className="flex items-center gap-2 lowercase" style={{ color: r.ok ? brand.primaryColor : brand.neutralColor }}>
                      {r.ok ? <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> : <X className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
                      <span>{r.text}{r.ok ? " — met" : " — not yet"}</span>
                    </li>
                  ))}
                </ul>

                {regError === "duplicate" ? (
                  <p className="atrium-rise mt-3 flex items-start gap-2 font-semibold" style={{ color: brand.primaryColor }}>
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>This email or phone is already registered.</span>
                  </p>
                ) : null}
                {regError === "identifier" ? (
                  <p className="atrium-rise mt-3 flex items-start gap-2 font-semibold" style={{ color: brand.primaryColor }}>
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Add an email or a phone number so we can reach you about your visit.</span>
                  </p>
                ) : null}
                {regError === "name" ? (
                  <p className="atrium-rise mt-3 flex items-start gap-2 font-semibold" style={{ color: brand.primaryColor }}>
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Tell us the name the clinic should call you by.</span>
                  </p>
                ) : null}
                {regError === "password" ? (
                  <p className="atrium-rise mt-3 flex items-start gap-2 font-semibold" style={{ color: brand.primaryColor }}>
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>That password does not meet the rules above yet.</span>
                  </p>
                ) : null}
                {regError === "confirm" ? (
                  <p className="atrium-rise mt-3 flex items-start gap-2 font-semibold" style={{ color: brand.primaryColor }}>
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>The two passwords do not match.</span>
                  </p>
                ) : null}
              </div>

              <button
                data-wf="b-6-0"
                type="button"
                disabled={!!pending}
                onClick={() => { setRegError(""); setPending("register"); }}
                className={`mt-5 h-12 w-full text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-70 ${focus}`}
                style={{ borderRadius: 999, backgroundColor: brand.accentColor, color: brand.backgroundColor, outlineColor: brand.primaryColor }}
              >
                {pending === "register" ? "Creating your account…" : "Create account"}
              </button>
            </div>
          )}

          <p className="mt-7 text-xs lowercase" style={{ color: brand.neutralColor }}>
            your health details stay on indian servers and are only ever shown to you and the doctor you book.
          </p>
        </main>
      </div>
    </div>
  );
}
