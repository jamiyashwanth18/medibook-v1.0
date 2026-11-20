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
  Textarea,
  Label,
  Select,
  Table,
  THead,
  TBody,
  TR,
  TH,
  TD,
  Avatar,
  Separator,
  Empty,
} = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Filter } = Icons;

const NOW_STAMP = "2026-11-20T11:45";

const STATUS_ORDER = ["booked", "confirmed", "completed", "cancelled", "no-show"];

const STATUS_ICON = {
  booked: Icons.Clock,
  confirmed: Icons.Check,
  completed: Icons.CheckCircle,
  cancelled: Icons.X,
  "no-show": Icons.AlertCircle,
};

// semantic hues, kept muted so they sit inside the botanical palette:
// sage = a consultation that went well, clay = something the doctor must notice.
const SAGE = "#5a6f4e";
const CLAY = "#8f4a2c";

const SEED_APPOINTMENTS = [
  // --- today, already seen ---
  {
    id: "a-5095",
    patient_id: "p-204",
    patient_name: "Harish Nair",
    date: "2026-11-20",
    start: "08:30",
    end: "09:00",
    status: "completed",
    record: {
      notes: "annual review. fasting sugar 112 mg/dl, hba1c 5.9%. weight steady at 78 kg.",
      diagnosis: "pre-diabetes",
      prescription: "no medication. 30-minute walk daily, repeat hba1c in three months.",
      updated_at: "20 nov 2026, 09:04",
    },
  },
  {
    id: "a-5096",
    patient_id: "p-231",
    patient_name: "Tanvi Shah",
    date: "2026-11-20",
    start: "16:30",
    end: "17:00",
    status: "booked",
    record: null,
  },
  // --- sat 21 nov ---
  {
    id: "a-5102",
    patient_id: "p-118",
    patient_name: "Fatima Sheikh",
    date: "2026-11-21",
    start: "09:00",
    end: "09:30",
    status: "confirmed",
    record: null,
  },
  {
    id: "a-5103",
    patient_id: "p-141",
    patient_name: "Ravi Kumar",
    date: "2026-11-21",
    start: "09:30",
    end: "10:00",
    status: "booked",
    record: null,
  },
  {
    id: "a-5104",
    patient_id: "p-087",
    patient_name: "Arjun Menon",
    date: "2026-11-21",
    start: "10:00",
    end: "10:30",
    status: "confirmed",
    record: null,
  },
  {
    id: "a-5105",
    patient_id: "p-176",
    patient_name: "Neha Gupta",
    date: "2026-11-21",
    start: "11:00",
    end: "11:30",
    status: "booked",
    record: null,
  },
  {
    id: "a-5106",
    patient_id: "p-092",
    patient_name: "Joseph D'Souza",
    date: "2026-11-21",
    start: "11:30",
    end: "12:00",
    status: "cancelled",
    record: null,
  },
  {
    id: "a-5107",
    patient_id: "p-163",
    patient_name: "Lakshmi Iyer",
    date: "2026-11-21",
    start: "15:00",
    end: "15:30",
    status: "booked",
    record: null,
  },
  // --- next week ---
  {
    id: "a-5110",
    patient_id: "p-210",
    patient_name: "Imran Qureshi",
    date: "2026-11-23",
    start: "10:00",
    end: "10:30",
    status: "booked",
    record: null,
  },
  {
    id: "a-5111",
    patient_id: "p-129",
    patient_name: "Sandhya Pillai",
    date: "2026-11-23",
    start: "10:30",
    end: "11:00",
    status: "confirmed",
    record: null,
  },
  {
    id: "a-5115",
    patient_id: "p-188",
    patient_name: "Vikram Sethi",
    date: "2026-11-24",
    start: "16:00",
    end: "16:30",
    status: "booked",
    record: null,
  },
  // --- past ---
  {
    id: "a-5088",
    patient_id: "p-073",
    patient_name: "Ananya Rao",
    date: "2026-11-19",
    start: "09:30",
    end: "10:00",
    status: "completed",
    record: {
      notes:
        "three-week dry cough, worse at night. chest clear on auscultation, no fever, spo2 98% on room air.",
      diagnosis: "post-viral cough, resolving",
      prescription:
        "levocetirizine 5 mg at night for five days. steam inhalation twice daily. review if the cough passes ten days.",
      updated_at: "19 nov 2026, 10:06",
    },
  },
  {
    id: "a-5089",
    patient_id: "p-155",
    patient_name: "Dinesh Patel",
    date: "2026-11-19",
    start: "10:00",
    end: "10:30",
    status: "no-show",
    record: null,
  },
  {
    id: "a-5090",
    patient_id: "p-101",
    patient_name: "Meena Krishnan",
    date: "2026-11-19",
    start: "14:00",
    end: "14:30",
    status: "completed",
    record: {
      notes:
        "follow-up for hypertension. bp 138/86 seated, left arm. reports occasional evening headaches.",
      diagnosis: "stage 1 hypertension, partially controlled",
      prescription:
        "continue amlodipine 5 mg once daily. home bp log twice a day for two weeks. review 4 dec.",
      updated_at: "19 nov 2026, 14:28",
    },
  },
  {
    id: "a-5081",
    patient_id: "p-134",
    patient_name: "Sameer Kulkarni",
    date: "2026-11-18",
    start: "11:00",
    end: "11:30",
    status: "completed",
    record: {
      notes:
        "right ankle pain after a fall on the stairs on 16 nov. mild lateral swelling, full weight bearing possible, no bony tenderness.",
      diagnosis: "grade 1 lateral ankle sprain",
      prescription:
        "rest, ice fifteen minutes thrice daily, crepe bandage. paracetamol 500 mg as needed, maximum three a day.",
      updated_at: "18 nov 2026, 11:31",
    },
  },
  {
    id: "a-5082",
    patient_id: "p-197",
    patient_name: "Priya Balakrishnan",
    date: "2026-11-18",
    start: "11:30",
    end: "12:00",
    status: "cancelled",
    record: null,
  },
];

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function tint(hex, alpha) {
  const h = String(hex).replace("#", "");
  const n = parseInt(
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h,
    16,
  );
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

function longDate(iso) {
  const d = new Date(iso + "T00:00:00");
  const month = MONTHS[d.getMonth()];
  return `${DAYS[d.getDay()]} ${d.getDate()} ${month.charAt(0).toUpperCase() + month.slice(1)} ${d.getFullYear()}`;
}

function shortDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return `${String(d.getDate()).padStart(2, "0")} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export default function Screen() {
  const navigate = useNavigate();
  const ink = brand.primaryColor;
  const gold = brand.accentColor;
  const neutral = brand.neutralColor;
  const canvas = brand.backgroundColor;

  const [appointments, setAppointments] = React.useState(SEED_APPOINTMENTS);
  const [tab, setTab] = React.useState("upcoming");
  const [dateFilter, setDateFilter] = React.useState("2026-11-21");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [selectedId, setSelectedId] = React.useState("a-5103");

  const [statusDraft, setStatusDraft] = React.useState("booked");
  const [statusSaving, setStatusSaving] = React.useState(false);
  const [statusNote, setStatusNote] = React.useState(null);

  const [draft, setDraft] = React.useState({ notes: "", diagnosis: "", prescription: "" });
  const [recordSaving, setRecordSaving] = React.useState(false);
  const [recordError, setRecordError] = React.useState(null);
  const [recordNote, setRecordNote] = React.useState(null);

  const timers = React.useRef([]);
  React.useEffect(() => () => timers.current.forEach((t) => clearTimeout(t)), []);
  const later = (fn, ms) => {
    timers.current.push(setTimeout(fn, ms));
  };

  const selected = appointments.find((a) => a.id === selectedId) || null;

  const selectAppointment = (a) => {
    setSelectedId(a.id);
    setStatusDraft(a.status);
    setStatusNote(null);
    setRecordError(null);
    setRecordNote(null);
    setDraft({
      notes: a.record ? a.record.notes : "",
      diagnosis: a.record ? a.record.diagnosis : "",
      prescription: a.record ? a.record.prescription : "",
    });
  };

  const isPast = (a) => `${a.date}T${a.end}` < NOW_STAMP;

  const dateOptions = React.useMemo(() => {
    const seen = [];
    appointments.forEach((a) => {
      if (seen.indexOf(a.date) === -1) seen.push(a.date);
    });
    return seen.sort();
  }, [appointments]);

  const visible = React.useMemo(() => {
    const rows = appointments
      .filter((a) => (tab === "upcoming" ? !isPast(a) : isPast(a)))
      .filter((a) => dateFilter === "any" || a.date === dateFilter)
      .filter((a) => statusFilter === "all" || a.status === statusFilter);
    rows.sort((x, y) => {
      const kx = `${x.date}T${x.start}`;
      const ky = `${y.date}T${y.start}`;
      return tab === "upcoming" ? kx.localeCompare(ky) : ky.localeCompare(kx);
    });
    return rows;
  }, [appointments, tab, dateFilter, statusFilter]);

  const statusChip = (status, size) => {
    const Icon = STATUS_ICON[status];
    const palette = {
      booked: { fg: ink, bg: tint(ink, 0.09) },
      confirmed: { fg: SAGE, bg: tint(SAGE, 0.13) },
      completed: { fg: ink, bg: tint(gold, 0.26) },
      cancelled: { fg: ink, bg: tint(neutral, 0.22) },
      "no-show": { fg: CLAY, bg: tint(CLAY, 0.13) },
    }[status];
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full font-medium whitespace-nowrap ${
          size === "lg" ? "px-4 py-1.5 text-sm" : "px-3 py-1 text-xs"
        }`}
        style={{ backgroundColor: palette.bg, color: palette.fg, letterSpacing: "0.01em" }}
      >
        <Icon className={size === "lg" ? "h-4 w-4" : "h-3.5 w-3.5"} aria-hidden="true" />
        {status}
      </span>
    );
  };

  const saveStatus = () => {
    if (!selected) return;
    if (statusDraft === selected.status) {
      setStatusNote({
        tone: "info",
        text: `${selected.patient_name.toLowerCase()} is already marked ${selected.status}. nothing to save.`,
      });
      return;
    }
    setStatusSaving(true);
    setStatusNote(null);
    later(() => {
      const next = statusDraft;
      setAppointments((prev) =>
        prev.map((a) => (a.id === selected.id ? { ...a, status: next } : a)),
      );
      setStatusSaving(false);
      setStatusNote({
        tone: "success",
        text:
          next === "cancelled"
            ? `saved. ${selected.patient_name.toLowerCase()} is now cancelled and the ${selected.start} slot is back in your available list.`
            : `saved. ${selected.patient_name.toLowerCase()} is now ${next} — the patient and the front desk see this straight away.`,
      });
    }, 650);
  };

  const saveRecord = () => {
    if (!selected) return;
    if (!draft.diagnosis.trim()) {
      setRecordError(
        "a diagnosis is needed before this record can be filed. your notes and prescription are still here.",
      );
      setRecordNote(null);
      return;
    }
    setRecordError(null);
    setRecordSaving(true);
    later(() => {
      setAppointments((prev) =>
        prev.map((a) =>
          a.id === selected.id
            ? {
                ...a,
                record: {
                  notes: draft.notes.trim(),
                  diagnosis: draft.diagnosis.trim(),
                  prescription: draft.prescription.trim(),
                  updated_at: "20 nov 2026, 11:52",
                },
              }
            : a,
        ),
      );
      setRecordSaving(false);
      setRecordNote(
        selected.record
          ? `record updated for ${selected.patient_name.toLowerCase()} — the change is in the audit trail as consultation_record.update.`
          : `record filed for ${selected.patient_name.toLowerCase()} — it now shows in their own records, and the entry is in the audit trail.`,
      );
    }, 800);
  };

  const resetFilters = () => {
    setDateFilter("any");
    setStatusFilter("all");
  };

  const cancelledVisit = selected && selected.status === "cancelled";
  const selectedOutOfView = selected && visible.indexOf(selected) === -1;

  const panelSurface = { backgroundColor: tint(ink, 0.05) };
  const hairline = `1px solid ${tint(ink, 0.12)}`;

  const pillButton = (active) => ({
    backgroundColor: active ? tint(gold, 0.26) : "transparent",
    color: ink,
    borderRadius: "999px",
    boxShadow: active ? `inset 0 -2px 0 0 ${gold}` : "none",
  });

  const labelStyle = {
    fontFamily: brand.fontBody,
    color: ink,
    fontSize: "12px",
    letterSpacing: "0.09em",
    textTransform: "uppercase",
    fontWeight: 600,
  };

  const fieldStyle = {
    backgroundColor: canvas,
    color: ink,
    border: hairline,
    fontFamily: brand.fontBody,
  };

  const headingStyle = { fontFamily: brand.fontHeading, fontStyle: "italic", color: ink };

  return (
    <div
      className="min-h-full w-full px-6 pb-20 pt-10 sm:px-10"
      style={{ backgroundColor: canvas, color: ink, fontFamily: brand.fontBody }}
    >
      <style>{`
        .atrium-focus:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px ${canvas}, 0 0 0 4px ${ink};
        }
        @keyframes atrium-rise {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .atrium-rise { animation: atrium-rise .3s ease both; }
        @media (prefers-reduced-motion: reduce) {
          .atrium-rise { animation: none !important; }
          * { transition: none !important; }
        }
      `}</style>

      <div className="mx-auto w-full max-w-6xl">
        {/* b-0-0 page title */}
        <header data-wf="b-0-0" className="mb-10">
          <h1 className="text-[34px] leading-tight sm:text-[40px]" style={headingStyle}>
            My schedule
          </h1>
          <p
            className="mt-3 max-w-[62ch] text-[15px] leading-relaxed"
            style={{ color: tint(ink, 0.78) }}
          >
            dr. anjali rao · general medicine · 30-minute slots. everything you have been booked
            for, and the consultation record for each visit.
          </p>
        </header>

        {/* b-1-0 filter bar */}
        <section
          data-wf="b-1-0"
          aria-labelledby="filters-heading"
          className="mb-10 rounded-[24px] px-6 py-6 sm:px-8"
          style={panelSurface}
        >
          <h2 id="filters-heading" className="sr-only">
            Filter my appointments
          </h2>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
              <div className="flex flex-col gap-2">
                <Label htmlFor="filter-date" style={labelStyle}>
                  Date
                </Label>
                <Select
                  id="filter-date"
                  data-wf="i-1-0-0"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="atrium-focus h-11 min-w-[200px] rounded-full px-5 text-[15px]"
                  style={{ ...fieldStyle, fontVariantNumeric: "tabular-nums" }}
                >
                  <option value="any">any date</option>
                  {dateOptions.map((d) => (
                    <option key={d} value={d}>
                      {shortDate(d)}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="filter-status" style={labelStyle}>
                  Status
                </Label>
                <Select
                  id="filter-status"
                  data-wf="i-1-0-1"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="atrium-focus h-11 min-w-[180px] rounded-full px-5 text-[15px]"
                  style={fieldStyle}
                >
                  <option value="all">all statuses</option>
                  {STATUS_ORDER.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Icons.Filter
                className="hidden h-4 w-4 sm:block"
                aria-hidden="true"
                style={{ color: tint(ink, 0.55) }}
              />
              <div
                role="tablist"
                aria-label="Time range"
                className="flex items-center gap-1 rounded-full p-1"
                style={{ backgroundColor: tint(ink, 0.07) }}
              >
                <button
                  type="button"
                  role="tab"
                  id="tab-upcoming"
                  aria-selected={tab === "upcoming"}
                  aria-controls="appointments-panel"
                  data-wf="i-1-0-2"
                  onClick={() => setTab("upcoming")}
                  className="atrium-focus h-11 px-6 text-[15px] font-medium transition-colors"
                  style={pillButton(tab === "upcoming")}
                >
                  Upcoming
                </button>
                <button
                  type="button"
                  role="tab"
                  id="tab-past"
                  aria-selected={tab === "past"}
                  aria-controls="appointments-panel"
                  data-wf="i-1-0-3"
                  onClick={() => setTab("past")}
                  className="atrium-focus h-11 px-6 text-[15px] font-medium transition-colors"
                  style={pillButton(tab === "past")}
                >
                  Past
                </button>
              </div>
            </div>
          </div>

          <p
            className="mt-5 flex items-center gap-2 text-[13px]"
            style={{ color: tint(ink, 0.62) }}
          >
            <Icons.Clock className="h-3.5 w-3.5" aria-hidden="true" />
            <span style={{ fontVariantNumeric: "tabular-nums" }}>
              refreshed 11:45 ist · reload the page to pull in bookings made since then
            </span>
          </p>
        </section>

        {/* b-2-0 table */}
        <section
          data-wf="b-2-0"
          id="appointments-panel"
          role="tabpanel"
          aria-labelledby={tab === "upcoming" ? "tab-upcoming" : "tab-past"}
          className="mb-14"
        >
          <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="text-[24px]" style={headingStyle}>
              My appointments ({visible.length})
            </h2>
            <p className="text-[13px]" style={{ color: tint(ink, 0.62) }}>
              {tab === "upcoming"
                ? "upcoming visits, earliest first"
                : "past visits, most recent first"}
            </p>
          </div>

          {visible.length === 0 ? (
            <div className="rounded-[24px] px-6 py-10" style={panelSurface}>
              <Empty
                title="nothing in this view yet"
                description={
                  tab === "past"
                    ? "no past visits match this day and status. try another date, or switch back to upcoming."
                    : "no booked visits match this day and status. try another date, or switch to past to see earlier consultations."
                }
                action={
                  <Button
                    type="button"
                    onClick={resetFilters}
                    className="atrium-focus h-11 rounded-full px-6 text-[15px] font-medium"
                    style={{ backgroundColor: ink, color: canvas, borderRadius: "999px" }}
                  >
                    clear the filters
                  </Button>
                }
              />
            </div>
          ) : (
            <div className="overflow-hidden rounded-[24px]" style={panelSurface}>
              <Table
                className="w-full"
                style={{ fontVariantNumeric: "tabular-nums", borderCollapse: "collapse" }}
              >
                <THead>
                  <TR style={{ borderBottom: `1px solid ${tint(ink, 0.16)}` }}>
                    <TH
                      data-wf="i-2-0-0"
                      className="px-6 py-4 text-left"
                      style={labelStyle}
                      scope="col"
                    >
                      Patient
                    </TH>
                    <TH
                      data-wf="i-2-0-1"
                      className="px-6 py-4 text-left"
                      style={labelStyle}
                      scope="col"
                    >
                      Date
                    </TH>
                    <TH
                      data-wf="i-2-0-2"
                      className="px-6 py-4 text-left"
                      style={labelStyle}
                      scope="col"
                    >
                      Time
                    </TH>
                    <TH
                      data-wf="i-2-0-3"
                      className="px-6 py-4 text-left"
                      style={labelStyle}
                      scope="col"
                    >
                      Status
                    </TH>
                    <TH
                      data-wf="i-2-0-4"
                      className="px-6 py-4 text-left"
                      style={labelStyle}
                      scope="col"
                    >
                      Consultation record
                    </TH>
                  </TR>
                </THead>
                <TBody>
                  {visible.map((a, i) => {
                    const isSelected = a.id === selectedId;
                    return (
                      <TR
                        key={`${tab}-${dateFilter}-${statusFilter}-${a.id}`}
                        className="atrium-rise transition-colors"
                        style={{
                          borderBottom: i === visible.length - 1 ? "none" : hairline,
                          backgroundColor: isSelected ? tint(gold, 0.16) : "transparent",
                          boxShadow: isSelected ? `inset 3px 0 0 0 ${gold}` : "none",
                          animationDelay: `${Math.min(i, 8) * 35}ms`,
                        }}
                      >
                        <TD className="px-6 py-4">
                          <button
                            type="button"
                            onClick={() => selectAppointment(a)}
                            aria-pressed={isSelected}
                            className="atrium-focus flex items-center gap-3 rounded-full py-1 pr-3 text-left"
                            style={{ color: ink }}
                          >
                            <Avatar name={a.patient_name} className="h-9 w-9 shrink-0" />
                            <span className="text-[15px] font-medium">{a.patient_name}</span>
                            {isSelected ? (
                              <span
                                className="text-[12px] italic"
                                style={{ color: tint(ink, 0.65) }}
                              >
                                open below
                              </span>
                            ) : null}
                          </button>
                        </TD>
                        <TD className="px-6 py-4 text-[15px]" style={{ color: tint(ink, 0.85) }}>
                          {shortDate(a.date)}
                        </TD>
                        <TD className="px-6 py-4 text-[15px]" style={{ color: tint(ink, 0.85) }}>
                          {a.start} – {a.end}
                        </TD>
                        <TD className="px-6 py-4">{statusChip(a.status)}</TD>
                        <TD className="px-6 py-4">
                          {a.record ? (
                            <span
                              className="inline-flex items-center gap-2 text-[14px]"
                              style={{ color: ink }}
                            >
                              <Icons.FileText className="h-4 w-4" aria-hidden="true" />
                              written · {a.record.updated_at}
                            </span>
                          ) : a.status === "cancelled" || a.status === "no-show" ? (
                            <span className="text-[14px]" style={{ color: tint(ink, 0.6) }}>
                              none — visit did not take place
                            </span>
                          ) : (
                            <span className="text-[14px]" style={{ color: tint(ink, 0.6) }}>
                              not started
                            </span>
                          )}
                        </TD>
                      </TR>
                    );
                  })}
                </TBody>
              </Table>
            </div>
          )}
        </section>

        {/* arched consultation panel: b-3-0 → b-7-1 */}
        {selected ? (
          <div
            className="overflow-hidden px-6 pb-10 pt-12 sm:px-12 sm:pt-16"
            style={{
              backgroundColor: tint(ink, 0.06),
              borderRadius: "220px 220px 24px 24px",
              borderTop: `1px solid ${tint(gold, 0.55)}`,
            }}
          >
            {/* b-3-0 appointment card */}
            <section data-wf="b-3-0" className="mx-auto max-w-3xl text-center">
              <span
                className="inline-flex items-center gap-2 rounded-full px-5 py-1.5 text-[12px] font-semibold"
                style={{
                  backgroundColor: tint(gold, 0.26),
                  color: ink,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                <Icons.Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                selected visit
              </span>
              <h2 className="mt-5 text-[26px] leading-snug sm:text-[30px]" style={headingStyle}>
                {selected.patient_name} — {longDate(selected.date)},{" "}
                <span style={{ fontVariantNumeric: "tabular-nums" }}>
                  {selected.start} – {selected.end}
                </span>{" "}
                — status: {selected.status}
              </h2>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                {statusChip(selected.status, "lg")}
                <span className="text-[13px]" style={{ color: tint(ink, 0.65) }}>
                  appointment {selected.id} · patient {selected.patient_id} · in person, consulting
                  room 2
                </span>
              </div>
              {selectedOutOfView ? (
                <p
                  className="mx-auto mt-6 max-w-[60ch] rounded-[20px] px-5 py-3 text-[14px]"
                  style={{ backgroundColor: tint(neutral, 0.2), color: ink }}
                >
                  heads up — this visit sits outside the filters you have set above, so it is no
                  longer in the list.
                </p>
              ) : null}
            </section>

            <div className="mx-auto mt-10 max-w-4xl">
              <div style={{ color: tint(ink, 0.16) }}>
                <Separator />
              </div>
            </div>

            {/* Row 5: b-4-0 status form + b-4-1 save button */}
            <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 items-end gap-6 sm:grid-cols-12">
              <section data-wf="b-4-0" className="sm:col-span-8">
                <h3 className="text-[20px]" style={headingStyle}>
                  Update status
                </h3>
                <p className="mt-2 text-[14px]" style={{ color: tint(ink, 0.7) }}>
                  marking a visit cancelled puts its slot back into your availability.
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <Label htmlFor="appointment-status" style={labelStyle}>
                    Status
                  </Label>
                  <Select
                    id="appointment-status"
                    data-wf="i-4-0-0"
                    value={statusDraft}
                    onChange={(e) => {
                      setStatusDraft(e.target.value);
                      setStatusNote(null);
                    }}
                    disabled={statusSaving}
                    className="atrium-focus h-12 w-full rounded-full px-5 text-[15px] disabled:opacity-60"
                    style={fieldStyle}
                  >
                    {STATUS_ORDER.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </Select>
                </div>
              </section>

              <div data-wf="b-4-1-wrap" className="sm:col-span-4">
                <Button
                  type="button"
                  data-wf="b-4-1"
                  onClick={saveStatus}
                  disabled={statusSaving}
                  className="atrium-focus h-12 w-full px-6 text-[15px] font-semibold transition-opacity disabled:opacity-70"
                  style={{ backgroundColor: tint(ink, 0.12), color: ink, borderRadius: "999px" }}
                >
                  {statusSaving ? "saving status…" : "Save status"}
                </Button>
              </div>
            </div>

            {statusNote ? (
              <div className="mx-auto mt-5 max-w-4xl">
                <p
                  role="status"
                  className="atrium-rise flex items-start gap-3 rounded-[20px] px-5 py-4 text-[14px] leading-relaxed"
                  style={{
                    backgroundColor:
                      statusNote.tone === "success" ? tint(SAGE, 0.14) : tint(neutral, 0.2),
                    color: ink,
                  }}
                >
                  {statusNote.tone === "success" ? (
                    <Icons.CheckCircle
                      className="mt-0.5 h-4 w-4 shrink-0"
                      aria-hidden="true"
                      style={{ color: SAGE }}
                    />
                  ) : (
                    <Icons.AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  )}
                  <span>{statusNote.text}</span>
                </p>
              </div>
            ) : null}

            {/* Row 6: b-5-0 consultation record */}
            <section data-wf="b-5-0" className="mx-auto mt-12 max-w-4xl">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="text-[20px]" style={headingStyle}>
                  Consultation record
                </h3>
                <p className="text-[13px]" style={{ color: tint(ink, 0.65) }}>
                  {selected.record
                    ? `last saved ${selected.record.updated_at}`
                    : "no record filed for this visit yet"}
                </p>
              </div>

              {cancelledVisit ? (
                <p
                  className="mt-4 flex items-start gap-3 rounded-[20px] px-5 py-4 text-[14px] leading-relaxed"
                  style={{ backgroundColor: tint(CLAY, 0.1), color: ink }}
                >
                  <Icons.AlertCircle
                    className="mt-0.5 h-4 w-4 shrink-0"
                    aria-hidden="true"
                    style={{ color: CLAY }}
                  />
                  <span>
                    this visit is cancelled, so its record is read-only. if the consultation did
                    happen, set the status to completed above and the fields open again.
                  </span>
                </p>
              ) : (
                <p
                  className="mt-3 max-w-[70ch] text-[14px] leading-relaxed"
                  style={{ color: tint(ink, 0.72) }}
                >
                  {selected.patient_name.toLowerCase()} can read this in their own records — write
                  it so it is useful to them as well as to you.
                </p>
              )}

              <div className="mt-6 grid grid-cols-1 gap-6">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="record-notes" style={labelStyle}>
                    Notes
                  </Label>
                  <Textarea
                    id="record-notes"
                    data-wf="i-5-0-0"
                    rows={4}
                    value={draft.notes}
                    disabled={cancelledVisit || recordSaving}
                    onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
                    placeholder="what the patient described, what you observed on examination"
                    className="atrium-focus w-full rounded-[20px] px-5 py-4 text-[15px] leading-relaxed disabled:opacity-60"
                    style={fieldStyle}
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="record-diagnosis" style={labelStyle}>
                      Diagnosis
                    </Label>
                    <Textarea
                      id="record-diagnosis"
                      data-wf="i-5-0-1"
                      rows={3}
                      value={draft.diagnosis}
                      disabled={cancelledVisit || recordSaving}
                      aria-invalid={recordError ? true : undefined}
                      aria-describedby={recordError ? "record-error" : undefined}
                      onChange={(e) => {
                        setDraft({ ...draft, diagnosis: e.target.value });
                        if (recordError) setRecordError(null);
                      }}
                      placeholder="e.g. acute viral pharyngitis"
                      className="atrium-focus w-full rounded-[20px] px-5 py-4 text-[15px] leading-relaxed disabled:opacity-60"
                      style={{
                        ...fieldStyle,
                        border: recordError ? `1px solid ${CLAY}` : fieldStyle.border,
                      }}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="record-prescription" style={labelStyle}>
                      Prescription
                    </Label>
                    <Textarea
                      id="record-prescription"
                      data-wf="i-5-0-2"
                      rows={3}
                      value={draft.prescription}
                      disabled={cancelledVisit || recordSaving}
                      onChange={(e) => setDraft({ ...draft, prescription: e.target.value })}
                      placeholder="medicine, dose, duration, and when to come back"
                      className="atrium-focus w-full rounded-[20px] px-5 py-4 text-[15px] leading-relaxed disabled:opacity-60"
                      style={fieldStyle}
                    />
                  </div>
                </div>
              </div>

              {recordError ? (
                <p
                  id="record-error"
                  role="alert"
                  className="atrium-rise mt-5 flex items-start gap-3 rounded-[20px] px-5 py-4 text-[14px] leading-relaxed"
                  style={{ backgroundColor: tint(CLAY, 0.1), color: ink }}
                >
                  <Icons.AlertCircle
                    className="mt-0.5 h-4 w-4 shrink-0"
                    aria-hidden="true"
                    style={{ color: CLAY }}
                  />
                  <span>{recordError}</span>
                </p>
              ) : null}

              {recordNote ? (
                <p
                  role="status"
                  className="atrium-rise mt-5 flex items-start gap-3 rounded-[20px] px-5 py-4 text-[14px] leading-relaxed"
                  style={{ backgroundColor: tint(SAGE, 0.14), color: ink }}
                >
                  <Icons.CheckCircle
                    className="mt-0.5 h-4 w-4 shrink-0"
                    aria-hidden="true"
                    style={{ color: SAGE }}
                  />
                  <span>{recordNote}</span>
                </p>
              ) : null}
            </section>

            {/* b-6-0 audit note */}
            <p
              data-wf="b-6-0"
              className="mx-auto mt-8 max-w-4xl rounded-[20px] px-5 py-4 text-[14px] leading-relaxed"
              style={{ backgroundColor: tint(neutral, 0.16), color: tint(ink, 0.88) }}
            >
              <Icons.FileText className="mr-2 inline h-4 w-4 align-[-2px]" aria-hidden="true" />
              Text only — file attachments are not available in this version. Every view and edit of
              a record is written to the audit trail.
            </p>

            {/* Row 8: b-7-0 primary save, b-7-1 availability */}
            <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
              <Button
                type="button"
                data-wf="b-7-0"
                onClick={saveRecord}
                disabled={cancelledVisit || recordSaving}
                className="atrium-focus h-14 w-full px-8 text-[16px] font-semibold transition-opacity disabled:opacity-60"
                style={{ backgroundColor: ink, color: canvas, borderRadius: "999px" }}
              >
                {recordSaving ? "saving record…" : "Save consultation record"}
              </Button>

              <Button
                type="button"
                data-wf="b-7-1"
                onClick={() => navigate("doctor-availability")}
                className="atrium-focus h-14 w-full px-8 text-[16px] font-medium"
                style={{
                  backgroundColor: "transparent",
                  color: ink,
                  border: `1px solid ${tint(ink, 0.35)}`,
                  borderRadius: "999px",
                }}
              >
                Set working hours and time off
                <Icons.ChevronRight
                  className="ml-2 inline h-4 w-4 align-[-2px]"
                  aria-hidden="true"
                />
              </Button>
            </div>
          </div>
        ) : (
          <div
            className="px-6 py-16 text-center"
            style={{ backgroundColor: tint(ink, 0.06), borderRadius: "220px 220px 24px 24px" }}
          >
            <Empty
              title="pick a visit to open it"
              description="choose a patient from the list above to update the status of their appointment and write the consultation record."
            />
          </div>
        )}
      </div>
    </div>
  );
}
