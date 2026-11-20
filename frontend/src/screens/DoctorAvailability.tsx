// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Input, Label, Select, Badge, Table, THead, TBody, TR, TH, TD, Empty } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Check, ChevronRight, Clock, Trash, AlertCircle, CheckCircle } = Icons;

const SLOT_MINUTES = 30;

const WEEKDAYS = [
  { v: 1, label: "Monday", short: "Mon" },
  { v: 2, label: "Tuesday", short: "Tue" },
  { v: 3, label: "Wednesday", short: "Wed" },
  { v: 4, label: "Thursday", short: "Thu" },
  { v: 5, label: "Friday", short: "Fri" },
  { v: 6, label: "Saturday", short: "Sat" },
  { v: 7, label: "Sunday", short: "Sun" },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const INITIAL_RULES = [
  { id: "rule_311", weekday: 1, start_time: "09:00", end_time: "13:00" },
  { id: "rule_312", weekday: 1, start_time: "15:00", end_time: "18:00" },
  { id: "rule_318", weekday: 2, start_time: "09:00", end_time: "13:00" },
  { id: "rule_319", weekday: 2, start_time: "15:00", end_time: "18:00" },
  { id: "rule_324", weekday: 3, start_time: "10:00", end_time: "14:00" },
  { id: "rule_330", weekday: 4, start_time: "09:00", end_time: "12:30" },
  { id: "rule_336", weekday: 5, start_time: "09:00", end_time: "13:00" },
  { id: "rule_341", weekday: 6, start_time: "09:30", end_time: "12:00" },
];

const INITIAL_TIME_OFF = [
  {
    id: "off_21",
    start_at: "2026-11-30T13:00",
    end_at: "2026-11-30T18:00",
    reason: "Clinic deep-clean, afternoon",
  },
  {
    id: "off_22",
    start_at: "2026-12-24T00:00",
    end_at: "2026-12-26T23:59",
    reason: "Family wedding in Kochi",
  },
  {
    id: "off_23",
    start_at: "2027-01-15T00:00",
    end_at: "2027-01-17T23:59",
    reason: "IMA conference, Hyderabad",
  },
];

const BOOKED_APPOINTMENTS = [
  { id: "apt_4115", patient: "Meera Nair", start: "2026-11-27T09:30", status: "confirmed" },
  { id: "apt_4123", patient: "Arjun Pillai", start: "2026-11-30T15:00", status: "booked" },
  { id: "apt_4140", patient: "Fatima Sheikh", start: "2026-12-02T16:00", status: "booked" },
  { id: "apt_4192", patient: "Ravi Kumar", start: "2026-12-24T10:00", status: "confirmed" },
  { id: "apt_4207", patient: "Sara Thomas", start: "2026-12-25T11:30", status: "booked" },
  { id: "apt_4166", patient: "Joseph D'Cruz", start: "2027-01-16T10:30", status: "booked" },
];

function hexToRgba(hex, alpha) {
  const h = String(hex).replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
}

function toMinutes(t) {
  const parts = String(t).split(":");
  return Number(parts[0]) * 60 + Number(parts[1] || 0);
}

function pad2(n) {
  return n < 10 ? "0" + n : String(n);
}

function dayName(v) {
  const d = WEEKDAYS.find((w) => w.v === v);
  return d ? d.label : "";
}

function fmtDateTime(iso) {
  const d = new Date(iso);
  return d.getDate() + " " + MONTHS[d.getMonth()] + " " + d.getFullYear() + ", " + pad2(d.getHours()) + ":" + pad2(d.getMinutes());
}

function fmtDayTime(iso) {
  const d = new Date(iso);
  return d.getDate() + " " + MONTHS[d.getMonth()] + " " + pad2(d.getHours()) + ":" + pad2(d.getMinutes());
}

function fmtSpan(startIso, endIso) {
  const a = new Date(startIso);
  const b = new Date(endIso);
  if (a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()) {
    if (a.getDate() === b.getDate()) {
      return a.getDate() + " " + MONTHS[a.getMonth()] + " " + a.getFullYear();
    }
    return a.getDate() + " – " + b.getDate() + " " + MONTHS[a.getMonth()] + " " + a.getFullYear();
  }
  return (
    a.getDate() + " " + MONTHS[a.getMonth()] + (a.getFullYear() !== b.getFullYear() ? " " + a.getFullYear() : "") +
    " – " + b.getDate() + " " + MONTHS[b.getMonth()] + " " + b.getFullYear()
  );
}

function conflictsFor(block) {
  const s = new Date(block.start_at).getTime();
  const e = new Date(block.end_at).getTime();
  return BOOKED_APPOINTMENTS.filter((a) => {
    const t = new Date(a.start).getTime();
    return t >= s && t < e && a.status !== "cancelled";
  });
}

export default function Screen() {
  const navigate = useNavigate();
  const ink = brand.primaryColor;
  const cream = brand.backgroundColor;
  const accent = brand.accentColor;

  const surface = hexToRgba(ink, 0.05);
  const surfaceDeep = hexToRgba(ink, 0.09);
  const hair = hexToRgba(ink, 0.12);
  const muted = hexToRgba(ink, 0.78);

  const [rules, setRules] = React.useState(INITIAL_RULES);
  const [timeOff, setTimeOff] = React.useState(INITIAL_TIME_OFF);

  const [hoursDraft, setHoursDraft] = React.useState({ weekday: "", start_time: "", end_time: "" });
  const [hoursError, setHoursError] = React.useState("");
  const [hoursSaving, setHoursSaving] = React.useState(false);
  const [hoursNote, setHoursNote] = React.useState("last saved today at 09:12");

  const [offDraft, setOffDraft] = React.useState({ start_at: "", end_at: "", reason: "" });
  const [offError, setOffError] = React.useState("");
  const [offSaving, setOffSaving] = React.useState(false);
  const [offNote, setOffNote] = React.useState("");

  const [confirmRule, setConfirmRule] = React.useState(null);
  const [confirmOff, setConfirmOff] = React.useState(null);
  const [focusBlock, setFocusBlock] = React.useState("off_22");

  const timers = React.useRef([]);
  const idSeed = React.useRef(400);

  React.useEffect(() => {
    return () => {
      timers.current.forEach((t) => clearTimeout(t));
      timers.current = [];
    };
  }, []);

  React.useEffect(() => {
    if (!confirmRule && !confirmOff) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setConfirmRule(null);
        setConfirmOff(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [confirmRule, confirmOff]);

  const defer = (fn) => {
    const t = setTimeout(fn, 700);
    timers.current.push(t);
  };

  const sortedRules = React.useMemo(
    () =>
      rules.slice().sort((a, b) => (a.weekday - b.weekday) || (toMinutes(a.start_time) - toMinutes(b.start_time))),
    [rules]
  );

  const minutesByDay = React.useMemo(() => {
    const map = {};
    WEEKDAYS.forEach((d) => {
      map[d.v] = 0;
    });
    rules.forEach((r) => {
      map[r.weekday] += Math.max(0, toMinutes(r.end_time) - toMinutes(r.start_time));
    });
    return map;
  }, [rules]);

  const totalSlots = React.useMemo(
    () => rules.reduce((sum, r) => sum + Math.floor(Math.max(0, toMinutes(r.end_time) - toMinutes(r.start_time)) / SLOT_MINUTES), 0),
    [rules]
  );

  const maxDayMinutes = Math.max(60, ...WEEKDAYS.map((d) => minutesByDay[d.v]));

  const conflictBlocks = React.useMemo(
    () => timeOff.map((b) => ({ block: b, hits: conflictsFor(b) })).filter((x) => x.hits.length > 0),
    [timeOff]
  );

  const focused =
    conflictBlocks.find((c) => c.block.id === focusBlock) || conflictBlocks[0] || null;
  const others = conflictBlocks.filter((c) => !focused || c.block.id !== focused.block.id);

  function submitHours(e) {
    e.preventDefault();
    const { weekday, start_time, end_time } = hoursDraft;
    if (!weekday) {
      setHoursError("Choose a weekday before saving. Slots are generated per day of the week.");
      return;
    }
    if (!start_time || !end_time) {
      setHoursError("Enter both a start time and an end time so the block has a length to divide into slots.");
      return;
    }
    const wd = Number(weekday);
    const s = toMinutes(start_time);
    const en = toMinutes(end_time);
    if (en <= s) {
      setHoursError(
        dayName(wd) + " " + start_time + " – " + end_time + " ends before it starts. Set an end time later than the start time."
      );
      return;
    }
    const clash = rules.find((r) => r.weekday === wd && s < toMinutes(r.end_time) && en > toMinutes(r.start_time));
    if (clash) {
      setHoursError(
        dayName(wd) + " " + start_time + " – " + end_time + " overlaps " + clash.start_time + " – " + clash.end_time +
          ". Fix the overlapping range before saving."
      );
      return;
    }
    setHoursError("");
    setHoursSaving(true);
    defer(() => {
      idSeed.current += 1;
      setRules((prev) => prev.concat([{ id: "rule_" + idSeed.current, weekday: wd, start_time, end_time }]));
      setHoursSaving(false);
      setHoursDraft({ weekday: "", start_time: "", end_time: "" });
      setHoursNote(
        "saved — " + dayName(wd) + " " + start_time + " – " + end_time + " added. future slots updated, booked appointments untouched."
      );
    });
  }

  function submitTimeOff(e) {
    e.preventDefault();
    const { start_at, end_at, reason } = offDraft;
    if (!start_at || !end_at) {
      setOffError("Enter a start and an end for the time off so we know which slots to withhold.");
      return;
    }
    if (new Date(end_at).getTime() <= new Date(start_at).getTime()) {
      setOffError("The end of your time off must come after the start.");
      return;
    }
    setOffError("");
    setOffSaving(true);
    defer(() => {
      idSeed.current += 1;
      const block = {
        id: "off_" + idSeed.current,
        start_at,
        end_at,
        reason: reason.trim() || "Personal time off",
      };
      setTimeOff((prev) => prev.concat([block]));
      setOffSaving(false);
      setOffDraft({ start_at: "", end_at: "", reason: "" });
      const hits = conflictsFor(block);
      setFocusBlock(hits.length ? block.id : focusBlock);
      setOffNote(
        hits.length
          ? "saved — no new slots will generate for " + fmtSpan(block.start_at, block.end_at) + ". check the warning below: " +
            hits.length + " booked appointment" + (hits.length === 1 ? "" : "s") + " already sit inside it."
          : "saved — no slots will generate for " + fmtSpan(block.start_at, block.end_at) + ". nothing was already booked in it."
      );
    });
  }

  function removeRule(id) {
    setRules((prev) => prev.filter((r) => r.id !== id));
    setConfirmRule(null);
    setHoursNote("removed a working-hours block. future slots updated.");
  }

  function removeOff(id) {
    setTimeOff((prev) => prev.filter((b) => b.id !== id));
    setConfirmOff(null);
    setOffNote("time off removed. slots for that period will generate again.");
  }

  const panelArch = {
    backgroundColor: surface,
    border: "1px solid " + hair,
    borderRadius: "96px 96px " + brand.radius + " " + brand.radius,
  };
  const panelSoft = {
    backgroundColor: surface,
    border: "1px solid " + hair,
    borderRadius: brand.radius,
  };
  const fieldStyle = {
    backgroundColor: cream,
    border: "1px solid " + hair,
    borderRadius: "999px",
    color: ink,
    height: "48px",
    paddingLeft: "20px",
    paddingRight: "16px",
    width: "100%",
    fontFamily: brand.fontBody,
  };
  const labelStyle = { color: muted, fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase" };
  const primaryBtn = {
    backgroundColor: ink,
    color: cream,
    borderRadius: "999px",
    height: "56px",
    width: "100%",
    fontFamily: brand.fontBody,
    fontSize: "15px",
    letterSpacing: "0.01em",
  };
  const quietBtn = {
    backgroundColor: "transparent",
    color: ink,
    border: "1px solid " + hair,
    borderRadius: "999px",
    height: "40px",
    padding: "0 18px",
    fontSize: "13px",
  };

  const css =
    ".atrium-row{animation:atrium-in .34s cubic-bezier(.22,.61,.36,1) both}" +
    "@keyframes atrium-in{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}" +
    ".atrium-fade{animation:atrium-fade .3s ease-out both}" +
    "@keyframes atrium-fade{from{opacity:0}to{opacity:1}}" +
    ".atrium-focus:focus-visible{outline:2px solid " + ink + ";outline-offset:3px;box-shadow:0 0 0 6px " + hexToRgba(accent, 0.3) + "}" +
    ".atrium-ghost:hover{background-color:" + hexToRgba(ink, 0.07) + "}" +
    ".atrium-primary:hover{background-color:" + hexToRgba(ink, 0.86) + "}" +
    ".atrium-primary:disabled{opacity:.55;cursor:progress}" +
    ".atrium-tab tbody tr:last-child{border-bottom:0}" +
    "@media (prefers-reduced-motion:reduce){.atrium-row,.atrium-fade{animation:none}.atrium-bar{transition:none!important}}";

  return (
    <div
      className="min-h-full w-full px-5 py-10 sm:px-8 lg:px-12"
      style={{ backgroundColor: cream, color: ink, fontFamily: brand.fontBody }}
    >
      <style>{css}</style>

      <div className="mx-auto w-full max-w-5xl">
        {/* b-0-0 page title */}
        <header data-wf="b-0-0" className="mb-6">
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
            <div>
              <p style={{ ...labelStyle, letterSpacing: "0.16em" }}>dr. anita rao · general medicine</p>
              <h1
                className="mt-3 text-[34px] leading-tight sm:text-[40px]"
                style={{ fontFamily: brand.fontHeading, fontStyle: "italic", fontWeight: 600 }}
              >
                My availability
              </h1>
            </div>
            <p
              className="flex items-center gap-2 text-[13px]"
              style={{ color: muted, backgroundColor: surfaceDeep, borderRadius: "999px", padding: "8px 16px" }}
            >
              <Clock aria-hidden="true" className="h-4 w-4" style={{ color: accent }} />
              <span style={{ fontVariantNumeric: "tabular-nums" }}>
                slot preview refreshed 11:42 — reflects bookings at last page load
              </span>
            </p>
          </div>
        </header>

        {/* b-1-0 intro text */}
        <p
          data-wf="b-1-0"
          className="mb-10 max-w-[68ch] text-[16px] leading-relaxed"
          style={{ color: muted }}
        >
          Bookable slots are generated in 30-minute blocks from your weekly hours. Changes apply to future slots only
          and never move appointments already booked.
        </p>

        {/* b-2-0 recurring weekly hours */}
        <section data-wf="b-2-0" style={panelArch} className="mb-8 px-6 pb-8 pt-10 sm:px-10">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="text-[24px]" style={{ fontFamily: brand.fontHeading, fontStyle: "italic", fontWeight: 600 }}>
              Recurring weekly hours
            </h2>
            <p className="text-[13px]" style={{ color: muted, fontVariantNumeric: "tabular-nums" }}>
              {rules.length} block{rules.length === 1 ? "" : "s"} · {totalSlots} slots a week
            </p>
          </div>

          {/* signature: arch chart of the generated week */}
          <ul className="mt-6 flex items-end gap-2 sm:gap-4" aria-label="Slots generated per weekday">
            {WEEKDAYS.map((d) => {
              const mins = minutesByDay[d.v];
              const slots = Math.floor(mins / SLOT_MINUTES);
              const h = mins === 0 ? 10 : Math.max(22, Math.round((mins / maxDayMinutes) * 76));
              return (
                <li key={d.v} className="flex flex-1 flex-col items-center gap-2">
                  <span aria-hidden="true" className="text-[11px]" style={{ color: muted, fontVariantNumeric: "tabular-nums" }}>
                    {slots || "–"}
                  </span>
                  <div
                    aria-hidden="true"
                    className="atrium-bar w-full"
                    style={{
                      height: h + "px",
                      backgroundColor: mins ? hexToRgba(accent, 0.85) : hexToRgba(ink, 0.1),
                      borderRadius: "999px 999px 5px 5px",
                      transition: "height .35s cubic-bezier(.22,.61,.36,1)",
                    }}
                  />
                  <span aria-hidden="true" className="text-[12px]" style={{ color: muted }}>
                    {d.short}
                  </span>
                  <span className="sr-only">
                    {d.label}: {slots} bookable slots
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-8" style={{ borderTop: "1px solid " + hair }} />

          {sortedRules.length === 0 ? (
            <div className="pt-6">
              <Empty
                title="No weekly hours set yet"
                description="Add a weekday with a start and an end time below. We'll divide each block into 30-minute slots patients can book."
              />
            </div>
          ) : (
            <Table className="atrium-tab mt-2 w-full text-left" style={{ fontVariantNumeric: "tabular-nums" }}>
              <THead>
                <TR style={{ borderBottom: "1px solid " + hair }}>
                  <TH data-wf="i-2-0-0" scope="col" className="py-4 pr-4 text-[12px] font-semibold uppercase tracking-[0.08em]" style={{ color: muted }}>
                    Weekday
                  </TH>
                  <TH data-wf="i-2-0-1" scope="col" className="py-4 pr-4 text-[12px] font-semibold uppercase tracking-[0.08em]" style={{ color: muted }}>
                    Start time
                  </TH>
                  <TH data-wf="i-2-0-2" scope="col" className="py-4 pr-4 text-[12px] font-semibold uppercase tracking-[0.08em]" style={{ color: muted }}>
                    End time
                  </TH>
                  <TH scope="col" className="py-4 text-right text-[12px] font-semibold uppercase tracking-[0.08em]" style={{ color: muted }}>
                    Slots
                  </TH>
                </TR>
              </THead>
              <TBody>
                {sortedRules.map((r) => {
                  const mins = toMinutes(r.end_time) - toMinutes(r.start_time);
                  const slots = Math.floor(mins / SLOT_MINUTES);
                  if (confirmRule === r.id) {
                    return (
                      <TR key={r.id} className="atrium-fade" style={{ borderBottom: "1px solid " + hair, backgroundColor: hexToRgba(accent, 0.12) }}>
                        <TD colSpan={4} className="py-4">
                          <div className="flex flex-wrap items-center justify-between gap-4">
                            <span className="text-[14px]">
                              Remove {dayName(r.weekday)} {r.start_time} – {r.end_time}? Future slots in this block stop
                              generating; booked appointments stay.
                            </span>
                            <span className="flex gap-3">
                              <button type="button" className="atrium-focus atrium-ghost" style={quietBtn} onClick={() => setConfirmRule(null)}>
                                Keep it
                              </button>
                              <button
                                type="button"
                                className="atrium-focus"
                                style={{ ...quietBtn, backgroundColor: ink, color: cream, border: "1px solid " + ink }}
                                onClick={() => removeRule(r.id)}
                              >
                                Remove block
                              </button>
                            </span>
                          </div>
                        </TD>
                      </TR>
                    );
                  }
                  return (
                    <TR key={r.id} className="atrium-row" style={{ borderBottom: "1px solid " + hair }}>
                      <TD className="py-4 pr-4 text-[15px]">{dayName(r.weekday)}</TD>
                      <TD className="py-4 pr-4 text-[15px]">{r.start_time}</TD>
                      <TD className="py-4 pr-4 text-[15px]">{r.end_time}</TD>
                      <TD className="py-4 text-right">
                        <span className="inline-flex items-center gap-3">
                          <span className="text-[14px]" style={{ color: muted }}>
                            {slots}
                          </span>
                          <button
                            type="button"
                            aria-label={"Remove " + dayName(r.weekday) + " " + r.start_time + " to " + r.end_time}
                            className="atrium-focus atrium-ghost inline-flex h-11 w-11 items-center justify-center"
                            style={{ borderRadius: "999px", color: ink }}
                            onClick={() => setConfirmRule(r.id)}
                          >
                            <Trash aria-hidden="true" className="h-4 w-4" />
                          </button>
                        </span>
                      </TD>
                    </TR>
                  );
                })}
              </TBody>
            </Table>
          )}
        </section>

        {/* b-3-0 / b-3-1 add working hours */}
        <form onSubmit={submitHours} className="mb-6 grid grid-cols-12 gap-6">
          <div data-wf="b-3-0" className="col-span-12 lg:col-span-9" style={panelSoft}>
            <fieldset className="px-6 py-7 sm:px-8">
              <legend className="px-1 text-[20px]" style={{ fontFamily: brand.fontHeading, fontStyle: "italic", fontWeight: 600 }}>
                Add working hours
              </legend>
              <div className="mt-5 grid gap-5 sm:grid-cols-3">
                <div>
                  <Label htmlFor="wh-weekday" style={labelStyle}>
                    Weekday
                  </Label>
                  <Select
                    id="wh-weekday"
                    data-wf="i-3-0-0"
                    className="atrium-focus mt-2"
                    style={fieldStyle}
                    value={hoursDraft.weekday}
                    onChange={(e) => setHoursDraft({ ...hoursDraft, weekday: e.target.value })}
                  >
                    <option value="">Choose a day</option>
                    {WEEKDAYS.map((d) => (
                      <option key={d.v} value={d.v}>
                        {d.label}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <Label htmlFor="wh-start" style={labelStyle}>
                    Start time
                  </Label>
                  <Input
                    id="wh-start"
                    data-wf="i-3-0-1"
                    type="time"
                    step="1800"
                    className="atrium-focus mt-2"
                    style={{ ...fieldStyle, fontVariantNumeric: "tabular-nums" }}
                    value={hoursDraft.start_time}
                    onChange={(e) => setHoursDraft({ ...hoursDraft, start_time: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="wh-end" style={labelStyle}>
                    End time
                  </Label>
                  <Input
                    id="wh-end"
                    data-wf="i-3-0-2"
                    type="time"
                    step="1800"
                    className="atrium-focus mt-2"
                    style={{ ...fieldStyle, fontVariantNumeric: "tabular-nums" }}
                    value={hoursDraft.end_time}
                    onChange={(e) => setHoursDraft({ ...hoursDraft, end_time: e.target.value })}
                  />
                </div>
              </div>
              <p className="mt-4 text-[13px]" style={{ color: muted }}>
                blocks repeat every week until you change them. a 09:00 – 13:00 block makes eight 30-minute slots.
              </p>
            </fieldset>
          </div>

          <div data-wf="b-3-1" className="col-span-12 flex items-end lg:col-span-3">
            <Button
              type="submit"
              data-wf="b-3-1-btn"
              className="atrium-focus atrium-primary"
              style={primaryBtn}
              disabled={hoursSaving}
              aria-busy={hoursSaving}
            >
              {hoursSaving ? "saving…" : "Save weekly hours"}
            </Button>
          </div>
        </form>

        {/* b-4-0 validation / slot summary line */}
        <div data-wf="b-4-0" className="mb-12">
          {hoursError ? (
            <p
              role="alert"
              className="atrium-fade flex items-start gap-3 px-6 py-4 text-[15px]"
              style={{
                backgroundColor: hexToRgba(accent, 0.18),
                border: "1px solid " + hexToRgba(ink, 0.18),
                borderRadius: brand.radius,
              }}
            >
              <AlertCircle aria-hidden="true" className="mt-[2px] h-5 w-5 shrink-0" />
              <span>
                <span className="font-semibold">Overlap. </span>
                {hoursError}
              </span>
            </p>
          ) : (
            <p className="flex items-start gap-3 text-[14px]" style={{ color: muted }}>
              <CheckCircle aria-hidden="true" className="mt-[2px] h-4 w-4 shrink-0" style={{ color: accent }} />
              <span style={{ fontVariantNumeric: "tabular-nums" }}>
                {totalSlots} bookable 30-minute slots generate each week from these hours — {hoursNote}
              </span>
            </p>
          )}
        </div>

        {/* b-5-0 time off table */}
        <section data-wf="b-5-0" style={panelArch} className="mb-8 px-6 pb-8 pt-10 sm:px-10">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="text-[24px]" style={{ fontFamily: brand.fontHeading, fontStyle: "italic", fontWeight: 600 }}>
              Time off
            </h2>
            <p className="text-[13px]" style={{ color: muted }}>
              no slots generate inside these periods
            </p>
          </div>

          {timeOff.length === 0 ? (
            <div className="pt-6">
              <Empty
                title="No time off booked"
                description="Your week generates slots as scheduled. Add a date and time below when you need the diary closed — a conference, leave, or a half day."
              />
            </div>
          ) : (
            <Table className="atrium-tab mt-6 w-full text-left" style={{ fontVariantNumeric: "tabular-nums" }}>
              <THead>
                <TR style={{ borderBottom: "1px solid " + hair }}>
                  <TH data-wf="i-5-0-0" scope="col" className="py-4 pr-4 text-[12px] font-semibold uppercase tracking-[0.08em]" style={{ color: muted }}>
                    Starts
                  </TH>
                  <TH data-wf="i-5-0-1" scope="col" className="py-4 pr-4 text-[12px] font-semibold uppercase tracking-[0.08em]" style={{ color: muted }}>
                    Ends
                  </TH>
                  <TH data-wf="i-5-0-2" scope="col" className="py-4 pr-4 text-[12px] font-semibold uppercase tracking-[0.08em]" style={{ color: muted }}>
                    Reason
                  </TH>
                  <TH scope="col" className="py-4 text-right text-[12px] font-semibold uppercase tracking-[0.08em]" style={{ color: muted }}>
                    Conflicts
                  </TH>
                </TR>
              </THead>
              <TBody>
                {timeOff.map((b) => {
                  const hits = conflictsFor(b);
                  if (confirmOff === b.id) {
                    return (
                      <TR key={b.id} className="atrium-fade" style={{ borderBottom: "1px solid " + hair, backgroundColor: hexToRgba(accent, 0.12) }}>
                        <TD colSpan={4} className="py-4">
                          <div className="flex flex-wrap items-center justify-between gap-4">
                            <span className="text-[14px]">
                              Remove time off for {fmtSpan(b.start_at, b.end_at)}? Slots will generate again for that
                              period.
                            </span>
                            <span className="flex gap-3">
                              <button type="button" className="atrium-focus atrium-ghost" style={quietBtn} onClick={() => setConfirmOff(null)}>
                                Keep it
                              </button>
                              <button
                                type="button"
                                className="atrium-focus"
                                style={{ ...quietBtn, backgroundColor: ink, color: cream, border: "1px solid " + ink }}
                                onClick={() => removeOff(b.id)}
                              >
                                Remove time off
                              </button>
                            </span>
                          </div>
                        </TD>
                      </TR>
                    );
                  }
                  return (
                    <TR key={b.id} className="atrium-row" style={{ borderBottom: "1px solid " + hair }}>
                      <TD className="py-4 pr-4 text-[15px]">{fmtDateTime(b.start_at)}</TD>
                      <TD className="py-4 pr-4 text-[15px]">{fmtDateTime(b.end_at)}</TD>
                      <TD className="py-4 pr-4 text-[15px]" style={{ color: muted }}>
                        {b.reason}
                      </TD>
                      <TD className="py-4 text-right">
                        <span className="inline-flex items-center gap-3">
                          {hits.length ? (
                            <Badge
                              className="inline-flex items-center gap-1 px-3 py-1 text-[12px]"
                              style={{
                                backgroundColor: hexToRgba(accent, 0.22),
                                color: ink,
                                borderRadius: "999px",
                                border: "1px solid " + hexToRgba(ink, 0.16),
                              }}
                            >
                              <AlertCircle aria-hidden="true" className="h-3.5 w-3.5" />
                              {hits.length} booked
                            </Badge>
                          ) : (
                            <span className="text-[13px]" style={{ color: muted }}>
                              Clear
                            </span>
                          )}
                          <button
                            type="button"
                            aria-label={"Remove time off " + fmtSpan(b.start_at, b.end_at)}
                            className="atrium-focus atrium-ghost inline-flex h-11 w-11 items-center justify-center"
                            style={{ borderRadius: "999px", color: ink }}
                            onClick={() => setConfirmOff(b.id)}
                          >
                            <Trash aria-hidden="true" className="h-4 w-4" />
                          </button>
                        </span>
                      </TD>
                    </TR>
                  );
                })}
              </TBody>
            </Table>
          )}
        </section>

        {/* b-6-0 / b-6-1 add time off */}
        <form onSubmit={submitTimeOff} className="mb-6 grid grid-cols-12 gap-6">
          <div data-wf="b-6-0" className="col-span-12 lg:col-span-9" style={panelSoft}>
            <fieldset className="px-6 py-7 sm:px-8">
              <legend className="px-1 text-[20px]" style={{ fontFamily: brand.fontHeading, fontStyle: "italic", fontWeight: 600 }}>
                Add time off
              </legend>
              <div className="mt-5 grid gap-5 sm:grid-cols-3">
                <div>
                  <Label htmlFor="to-start" style={labelStyle}>
                    Start date and time
                  </Label>
                  <Input
                    id="to-start"
                    data-wf="i-6-0-0"
                    type="datetime-local"
                    className="atrium-focus mt-2"
                    style={{ ...fieldStyle, fontVariantNumeric: "tabular-nums" }}
                    value={offDraft.start_at}
                    onChange={(e) => setOffDraft({ ...offDraft, start_at: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="to-end" style={labelStyle}>
                    End date and time
                  </Label>
                  <Input
                    id="to-end"
                    data-wf="i-6-0-1"
                    type="datetime-local"
                    className="atrium-focus mt-2"
                    style={{ ...fieldStyle, fontVariantNumeric: "tabular-nums" }}
                    value={offDraft.end_at}
                    onChange={(e) => setOffDraft({ ...offDraft, end_at: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="to-reason" style={labelStyle}>
                    Reason
                  </Label>
                  <Input
                    id="to-reason"
                    data-wf="i-6-0-2"
                    type="text"
                    placeholder="Ward rounds at Lotus Hospital"
                    className="atrium-focus mt-2"
                    style={fieldStyle}
                    value={offDraft.reason}
                    onChange={(e) => setOffDraft({ ...offDraft, reason: e.target.value })}
                  />
                </div>
              </div>
              {offError ? (
                <p
                  role="alert"
                  className="atrium-fade mt-4 flex items-start gap-2 text-[14px]"
                  style={{ color: ink }}
                >
                  <AlertCircle aria-hidden="true" className="mt-[2px] h-4 w-4 shrink-0" />
                  <span>
                    <span className="font-semibold">Check the dates. </span>
                    {offError}
                  </span>
                </p>
              ) : offNote ? (
                <p role="status" className="atrium-fade mt-4 flex items-start gap-2 text-[14px]" style={{ color: muted }}>
                  <Check aria-hidden="true" className="mt-[2px] h-4 w-4 shrink-0" style={{ color: accent }} />
                  <span>{offNote}</span>
                </p>
              ) : (
                <p className="mt-4 text-[13px]" style={{ color: muted }}>
                  the reason stays private to you and the front desk — patients only see the time as unavailable.
                </p>
              )}
            </fieldset>
          </div>

          <div data-wf="b-6-1" className="col-span-12 flex items-end lg:col-span-3">
            <Button
              type="submit"
              data-wf="b-6-1-btn"
              className="atrium-focus atrium-primary"
              style={primaryBtn}
              disabled={offSaving}
              aria-busy={offSaving}
            >
              {offSaving ? "saving…" : "Save time off"}
            </Button>
          </div>
        </form>

        {/* b-7-0 conflict warning card */}
        <Card
          data-wf="b-7-0"
          className="mb-4 overflow-hidden"
          style={{
            backgroundColor: focused ? hexToRgba(accent, 0.16) : surface,
            border: "1px solid " + (focused ? hexToRgba(ink, 0.2) : hair),
            borderRadius: brand.radius,
          }}
        >
          <CardHeader className="px-6 pt-7 sm:px-8">
            <CardTitle
              className="flex items-start gap-3 text-[19px] leading-snug"
              style={{ fontFamily: brand.fontHeading, fontStyle: "italic", fontWeight: 600 }}
            >
              {focused ? (
                <AlertCircle aria-hidden="true" className="mt-[3px] h-5 w-5 shrink-0" />
              ) : (
                <CheckCircle aria-hidden="true" className="mt-[3px] h-5 w-5 shrink-0" style={{ color: accent }} />
              )}
              <span>
                {focused
                  ? "Warning: " +
                    focused.hits.length +
                    " booked appointment" +
                    (focused.hits.length === 1 ? "" : "s") +
                    " fall inside " +
                    fmtSpan(focused.block.start_at, focused.block.end_at) +
                    " — " +
                    focused.hits.map((a) => a.patient + ", " + fmtDayTime(a.start)).join("; ")
                  : "No booked appointments fall inside your time off"}
              </span>
            </CardTitle>
            <CardDescription className="pt-2 text-[14px]" style={{ color: muted }}>
              {focused
                ? "These appointments were booked before the time off was saved, so they stay in your schedule. Move or cancel them there — this page never changes a booked appointment."
                : "Every time-off period you have saved is clear of bookings. New slots simply stop generating for those dates."}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 sm:px-8">
            {focused && others.length > 0 ? (
              <p className="text-[13px]" style={{ color: muted, fontVariantNumeric: "tabular-nums" }}>
                also overlapping:{" "}
                {others
                  .map(
                    (o) =>
                      fmtSpan(o.block.start_at, o.block.end_at) +
                      " — " +
                      o.hits.map((a) => a.patient + ", " + fmtDayTime(a.start)).join(", ")
                  )
                  .join(" · ")}
              </p>
            ) : null}
          </CardContent>
          <CardFooter className="px-6 pb-7 pt-5 sm:px-8">
            <Button
              type="button"
              className="atrium-focus atrium-primary"
              style={{ ...primaryBtn, width: "auto", height: "48px", padding: "0 28px" }}
              onClick={() => navigate("doctor-schedule")}
            >
              <span className="inline-flex items-center gap-2">
                Review in my schedule
                <ChevronRight aria-hidden="true" className="h-4 w-4" />
              </span>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
