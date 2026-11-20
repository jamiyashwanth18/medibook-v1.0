// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Label,
  Select,
  Table,
  THead,
  TBody,
  TR,
  TH,
  TD,
  Separator,
  Empty,
} = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { ArrowLeft, ArrowRight } = Icons;

const NOW_ISO = "2026-11-20T12:00";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const CLAY = "#a4542f";
const LEAF = "#4c6b4c";

const hexToRgba = (hex, alpha) => {
  const h = String(hex || "#000000").replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const n = parseInt(full, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
};

const APPOINTMENTS = [
  {
    id: "apt-2411",
    doctor: "Dr. Anjali Rao",
    specialization: "General Medicine",
    slot_start: "2026-11-21T09:30",
    slot_end: "2026-11-21T09:50",
    status: "booked",
    room: "consulting room 2, ground floor",
  },
  {
    id: "apt-2412",
    doctor: "Dr. Vikram Shetty",
    specialization: "Orthopaedics",
    slot_start: "2026-11-24T11:00",
    slot_end: "2026-11-24T11:20",
    status: "confirmed",
    room: "consulting room 7, first floor",
  },
  {
    id: "apt-2413",
    doctor: "Dr. Leela Krishnan",
    specialization: "Dermatology",
    slot_start: "2026-12-03T16:15",
    slot_end: "2026-12-03T16:35",
    status: "booked",
    room: "consulting room 4, ground floor",
  },
  {
    id: "apt-1102",
    doctor: "Dr. Meera Iyer",
    specialization: "ENT",
    slot_start: "2026-11-02T10:00",
    slot_end: "2026-11-02T10:20",
    status: "completed",
    room: "consulting room 5, ground floor",
  },
  {
    id: "apt-1027",
    doctor: "Dr. Anjali Rao",
    specialization: "General Medicine",
    slot_start: "2026-10-27T09:00",
    slot_end: "2026-10-27T09:20",
    status: "completed",
    room: "consulting room 2, ground floor",
  },
  {
    id: "apt-1019",
    doctor: "Dr. Sanjay Menon",
    specialization: "Cardiology",
    slot_start: "2026-10-19T15:30",
    slot_end: "2026-10-19T15:50",
    status: "cancelled",
    room: "consulting room 9, first floor",
  },
  {
    id: "apt-1006",
    doctor: "Dr. Vikram Shetty",
    specialization: "Orthopaedics",
    slot_start: "2026-10-06T12:00",
    slot_end: "2026-10-06T12:20",
    status: "completed",
    room: "consulting room 7, first floor",
  },
  {
    id: "apt-0928",
    doctor: "Dr. Priya Nandakumar",
    specialization: "Endocrinology",
    slot_start: "2026-09-28T08:45",
    slot_end: "2026-09-28T09:05",
    status: "no-show",
    room: "consulting room 3, ground floor",
  },
  {
    id: "apt-0914",
    doctor: "Dr. Meera Iyer",
    specialization: "ENT",
    slot_start: "2026-09-14T10:30",
    slot_end: "2026-09-14T10:50",
    status: "completed",
    room: "consulting room 5, ground floor",
  },
  {
    id: "apt-0902",
    doctor: "Dr. Rohit Deshpande",
    specialization: "Gastroenterology",
    slot_start: "2026-09-02T17:00",
    slot_end: "2026-09-02T17:20",
    status: "cancelled",
    room: "consulting room 8, first floor",
  },
  {
    id: "apt-0821",
    doctor: "Dr. Leela Krishnan",
    specialization: "Dermatology",
    slot_start: "2026-08-21T14:00",
    slot_end: "2026-08-21T14:20",
    status: "completed",
    room: "consulting room 4, ground floor",
  },
];

const CONSULTATION_RECORDS = {
  "apt-1102": {
    diagnosis: "Seasonal allergic rhinitis",
    notes: "Symptoms for three weeks, no fever.",
    prescription: "Cetirizine 10 mg at night for 5 days; review if symptoms persist.",
    updated_at: "2026-11-02T11:12",
  },
  "apt-1027": {
    diagnosis: "Acute viral pharyngitis",
    notes:
      "Sore throat for four days, 37.8 °C at the visit, throat red with no exudate, neck nodes not enlarged.",
    prescription:
      "Paracetamol 500 mg three times a day for 3 days; warm saline gargles twice daily; return if the fever crosses 38.5 °C.",
    updated_at: "2026-10-27T10:05",
  },
  "apt-0914": {
    diagnosis: "Impacted cerumen, left ear",
    notes:
      "Blocked hearing on the left for nine days. Canal cleared by irrigation in clinic; drum intact afterwards.",
    prescription:
      "Olive oil ear drops, two drops at night for 5 days if wax returns. No further medication needed.",
    updated_at: "2026-09-14T11:02",
  },
  "apt-0821": {
    diagnosis: "Mild facial acne vulgaris",
    notes:
      "Comedones on forehead and chin, no scarring. Discussed cleansing routine and avoiding heavy sunscreen.",
    prescription:
      "Adapalene 0.1% gel at night, alternate nights for the first two weeks; non-comedogenic moisturiser each morning; review in 6 weeks.",
    updated_at: "2026-08-21T15:10",
  },
};

const STATUS_META = {
  booked: { label: "booked", color: "#8a6d1f", bg: "rgba(181, 150, 74, 0.18)" },
  confirmed: { label: "confirmed", color: LEAF, bg: "rgba(76, 107, 76, 0.14)" },
  completed: { label: "completed", color: "#46412f", bg: "rgba(70, 65, 47, 0.10)" },
  cancelled: { label: "cancelled", color: CLAY, bg: "rgba(164, 84, 47, 0.14)" },
  "no-show": { label: "no-show", color: "#7c6a4a", bg: "rgba(151, 145, 127, 0.20)" },
};

const toDate = (iso) => new Date(iso.split("T")[0] + "T00:00:00");
const fmtLongDate = (iso) => {
  const d = toDate(iso);
  return `${WEEKDAYS[d.getDay()]} ${String(d.getDate()).padStart(2, "0")} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
};
const fmtShortDate = (iso) => {
  const d = toDate(iso);
  return `${String(d.getDate()).padStart(2, "0")} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
};
const fmtTime = (iso) => iso.split("T")[1].slice(0, 5);
const initialsOf = (name) =>
  name
    .replace(/^Dr\.\s*/, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

export default function Screen() {
  const navigate = useNavigate();
  const ink = brand.primaryColor;
  const accent = brand.accentColor;
  const neutral = brand.neutralColor;
  const hairline = hexToRgba(ink, 0.14);
  const panel = "#fffdf6";
  const softTint = hexToRgba(ink, 0.06);

  const [tab, setTab] = React.useState("upcoming");
  const [appointments, setAppointments] = React.useState(APPOINTMENTS);
  const [selUpcoming, setSelUpcoming] = React.useState("apt-2411");
  const [selPast, setSelPast] = React.useState("apt-1102");
  const [notice, setNotice] = React.useState({
    kind: "booked",
    head: "Appointment booked — Dr. Anjali Rao, Fri 21 Nov 2026, 09:30.",
    body: "Status: booked. Confirmations are shown here in the app only.",
  });
  const [cancelling, setCancelling] = React.useState(false);
  const [syncState, setSyncState] = React.useState("idle");
  const [syncedAt, setSyncedAt] = React.useState("12:04");

  const timers = React.useRef([]);

  React.useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const later = (fn, ms) => {
    const t = setTimeout(fn, ms);
    timers.current.push(t);
  };

  const upcoming = appointments
    .filter((a) => a.slot_start > NOW_ISO && (a.status === "booked" || a.status === "confirmed"))
    .sort((a, b) => a.slot_start.localeCompare(b.slot_start));
  const past = appointments
    .filter((a) => !(a.slot_start > NOW_ISO && (a.status === "booked" || a.status === "confirmed")))
    .sort((a, b) => b.slot_start.localeCompare(a.slot_start));

  const rows = tab === "upcoming" ? upcoming : past;
  const selectedId = tab === "upcoming" ? selUpcoming : selPast;
  const selected = rows.find((a) => a.id === selectedId) || null;

  const canReschedule = tab === "upcoming" && !!selected;
  const canCancel =
    !!selected &&
    selected.slot_start > NOW_ISO &&
    (selected.status === "booked" || selected.status === "confirmed");

  const recordAppt =
    past.find((a) => a.id === selPast) || past.find((a) => a.id === "apt-1102") || past[0] || null;
  const record = recordAppt ? CONSULTATION_RECORDS[recordAppt.id] : null;

  function cancelSelected() {
    if (!selected || cancelling) return;
    const target = selected;
    setCancelling(true);
    later(() => {
      setAppointments((list) =>
        list.map((a) => (a.id === target.id ? { ...a, status: "cancelled" } : a)),
      );
      setCancelling(false);
      setSelUpcoming("");
      setSelPast(target.id);
      setNotice({
        kind: "cancelled",
        head: `Appointment cancelled — ${target.doctor}, ${fmtLongDate(target.slot_start)}, ${fmtTime(target.slot_start)}.`,
        body: "Status: cancelled. The slot is back in the doctor’s availability and no email or SMS was sent.",
      });
    }, 750);
  }

  function onTabKey(e) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    setTab((t) => (t === "upcoming" ? "past" : "upcoming"));
  }

  const noticeTone =
    notice.kind === "cancelled"
      ? { border: hexToRgba(CLAY, 0.35), bg: hexToRgba(CLAY, 0.08), color: CLAY, Icon: Icons.X }
      : {
          border: hexToRgba(accent, 0.45),
          bg: hexToRgba(accent, 0.12),
          color: "#7a6324",
          Icon: Icons.CheckCircle,
        };

  const tabBtn = (key, label, count) => {
    const active = tab === key;
    return (
      <button
        type="button"
        role="tab"
        id={`tab-${key}`}
        aria-selected={active}
        aria-controls="appointments-panel"
        tabIndex={active ? 0 : -1}
        data-wf={key === "upcoming" ? "i-2-0-0" : "i-2-0-1"}
        onClick={() => setTab(key)}
        onKeyDown={onTabKey}
        className="inline-flex min-h-[44px] items-center gap-2 rounded-full px-6 text-[15px] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        style={{
          backgroundColor: active ? ink : "transparent",
          color: active ? brand.backgroundColor : ink,
          fontWeight: active ? 600 : 500,
          outlineColor: accent,
        }}
      >
        <span>{label}</span>
        <span
          className="rounded-full px-2 py-[2px] text-[12px]"
          style={{
            fontVariantNumeric: "tabular-nums",
            backgroundColor: active ? hexToRgba(brand.backgroundColor, 0.22) : hexToRgba(ink, 0.09),
            color: active ? brand.backgroundColor : hexToRgba(ink, 0.8),
          }}
        >
          {count}
        </span>
      </button>
    );
  };

  const StatusTag = ({ status }) => {
    const meta = STATUS_META[status];
    const Glyph =
      status === "confirmed"
        ? Icons.CheckCircle
        : status === "completed"
          ? Icons.Check
          : status === "cancelled"
            ? Icons.X
            : status === "no-show"
              ? Icons.AlertCircle
              : Icons.Clock;
    return (
      <span
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-medium"
        style={{ backgroundColor: meta.bg, color: meta.color }}
      >
        <Glyph className="h-3.5 w-3.5" aria-hidden="true" />
        {meta.label}
      </span>
    );
  };

  const ArchTile = ({ name, dim }) => (
    <span
      aria-hidden="true"
      className="flex h-11 w-9 shrink-0 items-end justify-center pb-1.5 text-[12px] font-semibold tracking-wide"
      style={{
        backgroundColor: dim ? hexToRgba(neutral, 0.22) : hexToRgba(accent, 0.22),
        color: dim ? hexToRgba(ink, 0.65) : "#6f5a1e",
        borderTopLeftRadius: "999px",
        borderTopRightRadius: "999px",
        borderBottomLeftRadius: "6px",
        borderBottomRightRadius: "6px",
      }}
    >
      {initialsOf(name)}
    </span>
  );

  const actionBtnBase =
    "w-full min-h-[48px] rounded-full px-6 text-[15px] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed";

  return (
    <div
      className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-8"
      style={{ backgroundColor: brand.backgroundColor, color: ink, fontFamily: brand.fontBody }}
    >
      <style>{`
        @keyframes atrium-rise { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        @keyframes atrium-fade { from { opacity: 0; } to { opacity: 1; } }
        .atrium-rise { animation: atrium-rise .32s ease-out both; }
        .atrium-fade { animation: atrium-fade .3s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .atrium-rise, .atrium-fade { animation: none !important; }
          * { transition-duration: .01ms !important; }
        }
      `}</style>

      {/* Row 1 — page title */}
      <header data-wf="b-0-0" className="mb-6">
        <p
          className="text-[13px] lowercase tracking-[0.18em]"
          style={{ color: hexToRgba(ink, 0.6) }}
        >
          meera prasad · patient
        </p>
        <h1
          className="mt-2 text-[34px] leading-tight sm:text-[40px]"
          style={{ fontFamily: brand.fontHeading, fontStyle: "italic", fontWeight: 600 }}
        >
          My appointments
        </h1>
      </header>

      {/* Row 2 — in-app confirmation */}
      <section
        data-wf="b-1-0"
        key={notice.head}
        aria-live="polite"
        className="atrium-rise mb-8 flex items-start gap-4 p-5 sm:p-6"
        style={{
          backgroundColor: noticeTone.bg,
          border: `1px solid ${noticeTone.border}`,
          borderRadius: brand.radius,
        }}
      >
        <span
          className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center"
          style={{
            backgroundColor: hexToRgba(panel, 0.9),
            color: noticeTone.color,
            borderTopLeftRadius: "999px",
            borderTopRightRadius: "999px",
            borderBottomLeftRadius: "8px",
            borderBottomRightRadius: "8px",
          }}
        >
          <noticeTone.Icon className="h-4 w-4" aria-hidden="true" />
        </span>
        <p className="text-[15px] leading-relaxed">
          <span className="font-semibold">{notice.head}</span>{" "}
          <span style={{ color: hexToRgba(ink, 0.78) }}>{notice.body}</span>
        </p>
      </section>

      {/* Row 3 — tabs */}
      <div
        data-wf="b-2-0"
        role="tablist"
        aria-label="Appointment lists"
        className="mb-6 inline-flex flex-wrap gap-1 p-1"
        style={{ backgroundColor: softTint, borderRadius: "999px" }}
      >
        {tabBtn("upcoming", "Upcoming", upcoming.length)}
        {tabBtn("past", "Past", past.length)}
      </div>

      {/* Row 4 — table */}
      <section
        data-wf="b-3-0"
        id="appointments-panel"
        role="tabpanel"
        tabIndex={-1}
        aria-labelledby={`tab-${tab}`}
        className="overflow-hidden"
        style={{
          backgroundColor: panel,
          border: `1px solid ${hairline}`,
          borderRadius: brand.radius,
        }}
      >
        <div
          className="flex flex-wrap items-end justify-between gap-3 px-6 pt-6 pb-4 sm:px-8"
          style={{ borderBottom: `1px solid ${hairline}` }}
        >
          <div>
            <h2
              className="text-[21px]"
              style={{ fontFamily: brand.fontHeading, fontStyle: "italic", fontWeight: 600 }}
            >
              {tab === "upcoming" ? "Upcoming appointments" : "Past appointments"}
            </h2>
            <p className="mt-1 text-[13px] lowercase" style={{ color: hexToRgba(ink, 0.62) }}>
              {tab === "upcoming"
                ? "choose one to reschedule or cancel · all visits are in person"
                : "choose a completed visit to read its consultation record"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {syncState === "error" && (
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px]"
                style={{ backgroundColor: hexToRgba(neutral, 0.22), color: hexToRgba(ink, 0.8) }}
              >
                <Icons.AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                showing the {syncedAt} list
              </span>
            )}
          </div>
        </div>

        {syncState === "error" && (
          <p
            className="atrium-fade px-6 py-4 text-[14px] sm:px-8"
            style={{
              backgroundColor: hexToRgba(CLAY, 0.07),
              color: CLAY,
              borderBottom: `1px solid ${hairline}`,
            }}
          >
            we couldn’t reach the clinic schedule just now, so this list is still the one from{" "}
            {syncedAt}. nothing you booked has been lost — reload the page in a moment.
          </p>
        )}

        {syncState === "loading" ? (
          <div className="px-6 py-8 sm:px-8" aria-live="polite">
            <p className="sr-only">loading your appointments</p>
            {[0, 1, 2].map((i) => (
              <div key={i} className="mb-4 flex items-center gap-4 last:mb-0">
                <div
                  className="h-11 w-9 rounded-t-full"
                  style={{ backgroundColor: hexToRgba(ink, 0.07) }}
                />
                <div className="flex-1">
                  <div
                    className="h-3 w-1/3 rounded-full"
                    style={{ backgroundColor: hexToRgba(ink, 0.09) }}
                  />
                  <div
                    className="mt-2 h-3 w-1/5 rounded-full"
                    style={{ backgroundColor: hexToRgba(ink, 0.06) }}
                  />
                </div>
                <div
                  className="h-6 w-24 rounded-full"
                  style={{ backgroundColor: hexToRgba(ink, 0.07) }}
                />
              </div>
            ))}
          </div>
        ) : rows.length === 0 ? (
          <div className="px-6 py-10 sm:px-8">
            <Empty
              title="nothing booked yet"
              description="your next visit will appear here the moment it is booked. use ‘book a new appointment’ below to search by disease, symptom or specialization."
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table className="w-full" style={{ fontVariantNumeric: "tabular-nums" }}>
              <THead>
                <TR style={{ borderBottom: `1px solid ${hairline}` }}>
                  <TH className="px-6 py-3 text-left sm:pl-8" style={{ width: "44px" }}>
                    <span className="sr-only">Select appointment</span>
                  </TH>
                  <TH
                    data-wf="i-3-0-0"
                    className="px-4 py-3 text-left text-[12px] lowercase tracking-[0.14em]"
                    style={{ color: hexToRgba(ink, 0.6), fontWeight: 600 }}
                  >
                    Doctor
                  </TH>
                  <TH
                    data-wf="i-3-0-1"
                    className="px-4 py-3 text-left text-[12px] lowercase tracking-[0.14em]"
                    style={{ color: hexToRgba(ink, 0.6), fontWeight: 600 }}
                  >
                    Specialization
                  </TH>
                  <TH
                    data-wf="i-3-0-2"
                    className="px-4 py-3 text-left text-[12px] lowercase tracking-[0.14em]"
                    style={{ color: hexToRgba(ink, 0.6), fontWeight: 600 }}
                  >
                    Date
                  </TH>
                  <TH
                    data-wf="i-3-0-3"
                    className="px-4 py-3 text-left text-[12px] lowercase tracking-[0.14em]"
                    style={{ color: hexToRgba(ink, 0.6), fontWeight: 600 }}
                  >
                    Time
                  </TH>
                  <TH
                    data-wf="i-3-0-4"
                    className="px-4 py-3 pr-6 text-left text-[12px] lowercase tracking-[0.14em] sm:pr-8"
                    style={{ color: hexToRgba(ink, 0.6), fontWeight: 600 }}
                  >
                    Status
                  </TH>
                </TR>
              </THead>
              <TBody>
                {rows.map((a) => {
                  const isSel = a.id === selectedId;
                  const dim = a.status === "cancelled" || a.status === "no-show";
                  const hasRecord = !!CONSULTATION_RECORDS[a.id];
                  return (
                    <TR
                      key={a.id}
                      className="atrium-rise transition-colors duration-200"
                      style={{
                        borderBottom: `1px solid ${hairline}`,
                        backgroundColor: isSel ? hexToRgba(accent, 0.09) : "transparent",
                        boxShadow: isSel ? `inset 3px 0 0 0 ${accent}` : "none",
                      }}
                    >
                      <TD className="px-6 py-4 align-middle sm:pl-8">
                        <input
                          type="radio"
                          name={`appointment-${tab}`}
                          id={`pick-${a.id}`}
                          checked={isSel}
                          onChange={() =>
                            tab === "upcoming" ? setSelUpcoming(a.id) : setSelPast(a.id)
                          }
                          className="h-5 w-5 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                          style={{ accentColor: ink, outlineColor: accent }}
                        />
                        <Label htmlFor={`pick-${a.id}`} className="sr-only">
                          Select {a.doctor}, {fmtLongDate(a.slot_start)} at {fmtTime(a.slot_start)}
                        </Label>
                      </TD>
                      <TD className="px-4 py-4 align-middle">
                        <span className="flex items-center gap-3">
                          <ArchTile name={a.doctor} dim={dim} />
                          <span>
                            <Label
                              htmlFor={`pick-${a.id}`}
                              className="block cursor-pointer text-[15px] font-semibold"
                            >
                              {a.doctor}
                            </Label>
                            <span
                              className="mt-0.5 flex items-center gap-1.5 text-[12px] lowercase"
                              style={{ color: hexToRgba(ink, 0.58) }}
                            >
                              {hasRecord ? (
                                <>
                                  <Icons.FileText className="h-3 w-3" aria-hidden="true" />
                                  consultation record available
                                </>
                              ) : (
                                a.room
                              )}
                            </span>
                          </span>
                        </span>
                      </TD>
                      <TD
                        className="px-4 py-4 align-middle text-[14px]"
                        style={{ color: hexToRgba(ink, 0.82) }}
                      >
                        {a.specialization}
                      </TD>
                      <TD className="whitespace-nowrap px-4 py-4 align-middle text-[14px]">
                        {fmtLongDate(a.slot_start)}
                      </TD>
                      <TD className="whitespace-nowrap px-4 py-4 align-middle text-[14px]">
                        {fmtTime(a.slot_start)}–{fmtTime(a.slot_end)}
                      </TD>
                      <TD className="px-4 py-4 pr-6 align-middle sm:pr-8">
                        <StatusTag status={a.status} />
                      </TD>
                    </TR>
                  );
                })}
              </TBody>
            </Table>
          </div>
        )}
      </section>

      {/* Row 5 — actions */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div data-wf="b-4-0">
          <Button
            onClick={() => navigate("find-doctors")}
            disabled={!canReschedule}
            aria-describedby="action-help"
            className={actionBtnBase}
            style={{
              backgroundColor: "transparent",
              color: canReschedule ? ink : hexToRgba(ink, 0.42),
              border: `1px solid ${canReschedule ? hexToRgba(ink, 0.45) : hairline}`,
              outlineColor: accent,
            }}
          >
            Reschedule
          </Button>
          <p
            className="mt-2 px-2 text-center text-[12px] lowercase"
            style={{ color: hexToRgba(ink, 0.55) }}
          >
            pick another slot
          </p>
        </div>

        <div data-wf="b-4-1">
          <Button
            onClick={cancelSelected}
            disabled={!canCancel || cancelling}
            aria-busy={cancelling}
            aria-describedby="action-help"
            className={actionBtnBase + " disabled:opacity-75"}
            style={{
              backgroundColor: canCancel ? hexToRgba(CLAY, 0.08) : "transparent",
              color: canCancel ? CLAY : hexToRgba(ink, 0.42),
              border: `1px solid ${canCancel ? hexToRgba(CLAY, 0.4) : hairline}`,
              outlineColor: accent,
            }}
          >
            {cancelling ? "releasing the slot…" : "Cancel appointment"}
          </Button>
          <p
            className="mt-2 px-2 text-center text-[12px] lowercase"
            style={{ color: hexToRgba(ink, 0.55) }}
          >
            frees the slot straight away
          </p>
        </div>

        <div data-wf="b-4-2">
          <Button
            onClick={() => navigate("find-doctors")}
            className={actionBtnBase + " font-semibold"}
            style={{ backgroundColor: ink, color: brand.backgroundColor, outlineColor: accent }}
          >
            <span className="inline-flex items-center justify-center gap-2">
              <Icons.Plus className="h-4 w-4" aria-hidden="true" />
              Book a new appointment
            </span>
          </Button>
          <p
            className="mt-2 px-2 text-center text-[12px] lowercase"
            style={{ color: hexToRgba(ink, 0.55) }}
          >
            search by disease, symptom or specialization
          </p>
        </div>
      </div>

      {/* Row 6 — rules copy */}
      <div data-wf="b-5-0" className="mt-5 space-y-2" id="action-help">
        {canCancel && (
          <p className="text-[13px] lowercase" style={{ color: hexToRgba(ink, 0.6) }}>
            cancelling frees {selected.doctor.replace(/^Dr\.\s*/, "dr. ")}’s{" "}
            {fmtTime(selected.slot_start)} slot on {fmtShortDate(selected.slot_start)} for another
            patient — you can book again at any time.
          </p>
        )}
        {!canCancel && selected && (
          <p className="text-[13px] lowercase" style={{ color: CLAY }}>
            {selected.doctor}’s visit on {fmtShortDate(selected.slot_start)} is{" "}
            {STATUS_META[selected.status].label} — it can no longer be cancelled or rescheduled.
          </p>
        )}
        {!selected && rows.length > 0 && (
          <p className="text-[13px] lowercase" style={{ color: hexToRgba(ink, 0.6) }}>
            select an appointment above to reschedule or cancel it.
          </p>
        )}
        <p className="text-[14px] leading-relaxed" style={{ color: hexToRgba(ink, 0.72) }}>
          Cancelled appointments release their slot. Completed or cancelled appointments can no
          longer be cancelled.
        </p>
      </div>

      <div className="my-10" style={{ color: hairline }}>
        <Separator />
      </div>

      {/* Row 7 — consultation record card */}
      <Card
        data-wf="b-6-0"
        className="overflow-hidden"
        style={{
          backgroundColor: panel,
          border: `1px solid ${hairline}`,
          borderRadius: brand.radius,
        }}
      >
        <CardHeader
          className="px-6 pt-7 pb-4 sm:px-8"
          style={{ borderBottom: `1px solid ${hairline}` }}
        >
          <div className="flex items-start gap-4">
            {recordAppt && (
              <ArchTile name={recordAppt.doctor} dim={recordAppt.status !== "completed"} />
            )}
            <div className="min-w-0">
              <CardTitle
                className="text-[21px] leading-snug"
                style={{ fontFamily: brand.fontHeading, fontStyle: "italic", fontWeight: 600 }}
              >
                {recordAppt
                  ? `Consultation record — ${recordAppt.doctor}, ${fmtShortDate(recordAppt.slot_start)}, status: ${STATUS_META[recordAppt.status].label}`
                  : "Consultation record"}
              </CardTitle>
              <CardDescription
                className="mt-1.5 text-[13px] lowercase"
                style={{ color: hexToRgba(ink, 0.62) }}
              >
                {tab === "upcoming"
                  ? "from your most recent completed visit · only you and your doctor can open this"
                  : "only you and the doctor who wrote it can open this record"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        {/* Row 8 — record body */}
        <CardContent data-wf="b-7-0" className="px-6 py-7 sm:px-8">
          {record ? (
            <dl className="atrium-fade space-y-6">
              {[
                ["Diagnosis", record.diagnosis],
                ["Notes", record.notes],
                ["Prescription", record.prescription],
              ].map(([term, value]) => (
                <div key={term} className="sm:grid sm:grid-cols-[150px_1fr] sm:gap-6">
                  <dt
                    className="text-[12px] lowercase tracking-[0.14em]"
                    style={{ color: hexToRgba(ink, 0.6), fontWeight: 600 }}
                  >
                    {term}
                  </dt>
                  <dd className="mt-1 max-w-[68ch] text-[15px] leading-relaxed sm:mt-0">{value}</dd>
                </div>
              ))}
            </dl>
          ) : recordAppt && recordAppt.status === "completed" ? (
            <Empty
              title="notes not published yet"
              description={`${recordAppt.doctor} hasn’t published the record for ${fmtShortDate(recordAppt.slot_start)} yet. notes, diagnosis and prescription usually appear within a day of the visit.`}
            />
          ) : recordAppt ? (
            <Empty
              title="no consultation record"
              description={`this visit on ${fmtShortDate(recordAppt.slot_start)} was ${STATUS_META[recordAppt.status].label}, so nothing was recorded. records are written only when a consultation takes place.`}
            />
          ) : (
            <Empty
              title="no past visits yet"
              description="once you have been seen at the clinic, the diagnosis, notes and prescription from each visit will be kept here."
            />
          )}

          {record && (
            <p className="mt-7 text-[12px] lowercase" style={{ color: hexToRgba(ink, 0.55) }}>
              written by {recordAppt.doctor} · last updated {fmtShortDate(record.updated_at)} at{" "}
              {fmtTime(record.updated_at)}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
