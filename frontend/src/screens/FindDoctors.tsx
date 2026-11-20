// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Input, Label, Select, Badge, Avatar, Separator, Empty } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const {
  Search,
  Check,
  X,
  ChevronRight,
  Calendar,
  Clock,
  Filter,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  CheckCircle,
} = Icons;

// ---------------------------------------------------------------------------
// Atrium Clinic — reference data (stands in for the API responses this screen
// would read: GET /specializations, GET /disease-mappings, GET /doctors/search,
// GET /doctors/{id}/slots)
// ---------------------------------------------------------------------------

const SPECIALIZATIONS = [
  { id: 1, name: "Cardiology", is_active: true },
  { id: 2, name: "General Medicine", is_active: true },
  { id: 3, name: "Neurology", is_active: true },
  { id: 4, name: "Dermatology", is_active: true },
  { id: 5, name: "Orthopaedics", is_active: true },
  { id: 6, name: "Paediatrics", is_active: true },
  { id: 7, name: "ENT", is_active: true },
];

const DISEASE_MAPPINGS = [
  {
    id: "map_01",
    term: "chest pain",
    term_type: "symptom",
    is_active: true,
    specializations: ["Cardiology", "General Medicine"],
  },
  {
    id: "map_02",
    term: "palpitations",
    term_type: "symptom",
    is_active: true,
    specializations: ["Cardiology"],
  },
  {
    id: "map_03",
    term: "breathlessness",
    term_type: "symptom",
    is_active: true,
    specializations: ["Cardiology", "General Medicine"],
  },
  {
    id: "map_04",
    term: "hypertension",
    term_type: "disease",
    is_active: true,
    specializations: ["Cardiology"],
  },
  {
    id: "map_05",
    term: "migraine",
    term_type: "disease",
    is_active: true,
    specializations: ["Neurology"],
  },
  {
    id: "map_06",
    term: "dizziness",
    term_type: "symptom",
    is_active: true,
    specializations: ["Neurology", "General Medicine"],
  },
  {
    id: "map_07",
    term: "fever",
    term_type: "symptom",
    is_active: true,
    specializations: ["General Medicine"],
  },
  {
    id: "map_08",
    term: "skin rash",
    term_type: "symptom",
    is_active: true,
    specializations: ["Dermatology"],
  },
  {
    id: "map_09",
    term: "eczema",
    term_type: "disease",
    is_active: true,
    specializations: ["Dermatology"],
  },
  {
    id: "map_10",
    term: "knee pain",
    term_type: "symptom",
    is_active: true,
    specializations: ["Orthopaedics"],
  },
  {
    id: "map_11",
    term: "back pain",
    term_type: "symptom",
    is_active: true,
    specializations: ["Orthopaedics"],
  },
  {
    id: "map_12",
    term: "sore throat",
    term_type: "symptom",
    is_active: true,
    specializations: ["ENT", "General Medicine"],
  },
  {
    id: "map_13",
    term: "ear pain",
    term_type: "symptom",
    is_active: true,
    specializations: ["ENT"],
  },
  {
    id: "map_14",
    term: "child fever",
    term_type: "symptom",
    is_active: true,
    specializations: ["Paediatrics"],
  },
];

// Seven bookable days, starting at the date the patient landed on.
const DATES = [
  { key: "2026-11-21", wd: "Fri", label: "Fri 21 Nov 2026", short: "Fri 21 Nov" },
  { key: "2026-11-22", wd: "Sat", label: "Sat 22 Nov 2026", short: "Sat 22 Nov" },
  { key: "2026-11-23", wd: "Sun", label: "Sun 23 Nov 2026", short: "Sun 23 Nov" },
  { key: "2026-11-24", wd: "Mon", label: "Mon 24 Nov 2026", short: "Mon 24 Nov" },
  { key: "2026-11-25", wd: "Tue", label: "Tue 25 Nov 2026", short: "Tue 25 Nov" },
  { key: "2026-11-26", wd: "Wed", label: "Wed 26 Nov 2026", short: "Wed 26 Nov" },
  { key: "2026-11-27", wd: "Thu", label: "Thu 27 Nov 2026", short: "Thu 27 Nov" },
];

const DOCTORS = [
  {
    id: "doc_104",
    name: "Dr. Anjali Rao",
    specializations: ["Cardiology"],
    slot_duration_minutes: 30,
    is_active: true,
    room: "Wing B · Room 204",
    note: "14 yrs · interventional cardiology",
    languages: "english, hindi, kannada",
    rules: {
      Fri: [
        ["09:00", "12:00"],
        ["16:00", "17:00"],
      ],
      Sat: [["09:00", "11:00"]],
      Mon: [["10:00", "13:00"]],
      Wed: [["09:00", "12:00"]],
      Thu: [
        ["09:00", "11:30"],
        ["15:00", "16:30"],
      ],
    },
    booked: {
      "2026-11-21": ["10:00", "10:30", "11:30", "16:00"],
      "2026-11-22": ["10:00"],
      "2026-11-24": ["11:00"],
      "2026-11-26": ["09:00", "09:30"],
    },
    timeOff: [{ date: "2026-11-25", reason: "cardiology conference, chennai" }],
  },
  {
    id: "doc_117",
    name: "Dr. Vikram Nair",
    specializations: ["Cardiology"],
    slot_duration_minutes: 30,
    is_active: true,
    room: "Wing B · Room 209",
    note: "9 yrs · heart failure clinic",
    languages: "english, malayalam, tamil",
    rules: {
      Fri: [
        ["08:30", "10:30"],
        ["15:00", "16:00"],
      ],
      Tue: [["09:00", "12:00"]],
      Wed: [["14:00", "17:00"]],
      Thu: [["09:00", "11:00"]],
    },
    booked: {
      "2026-11-21": ["08:30", "09:30"],
      "2026-11-25": ["10:00", "10:30"],
    },
    timeOff: [],
  },
  {
    id: "doc_131",
    name: "Dr. Meera Iyer",
    specializations: ["General Medicine"],
    slot_duration_minutes: 30,
    is_active: true,
    room: "Ground floor · Room 12",
    note: "11 yrs · internal medicine",
    languages: "english, tamil, hindi",
    rules: {
      Fri: [
        ["09:30", "12:30"],
        ["17:00", "19:00"],
      ],
      Sat: [["10:00", "13:00"]],
      Mon: [["09:00", "12:00"]],
      Tue: [["09:00", "12:00"]],
      Wed: [["09:00", "11:00"]],
      Thu: [["16:00", "19:00"]],
    },
    booked: {
      // fully booked on the 21st — a real Friday at a busy clinic
      "2026-11-21": [
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "17:00",
        "17:30",
        "18:00",
        "18:30",
      ],
      "2026-11-24": ["09:00", "09:30"],
      "2026-11-27": ["16:00"],
    },
    timeOff: [],
  },
  {
    id: "doc_142",
    name: "Dr. Rohan Desai",
    specializations: ["Neurology"],
    slot_duration_minutes: 30,
    is_active: true,
    room: "Wing C · Room 301",
    note: "16 yrs · headache and epilepsy",
    languages: "english, gujarati, hindi",
    rules: { Fri: [["11:00", "13:00"]], Mon: [["09:00", "12:00"]], Wed: [["15:00", "18:00"]] },
    booked: { "2026-11-21": ["11:30"] },
    timeOff: [],
  },
  {
    id: "doc_155",
    name: "Dr. Farah Siddiqui",
    specializations: ["Dermatology"],
    slot_duration_minutes: 30,
    is_active: true,
    room: "Wing A · Room 108",
    note: "7 yrs · paediatric and adult skin",
    languages: "english, urdu, hindi",
    rules: { Sat: [["09:00", "12:00"]], Tue: [["10:00", "13:00"]], Thu: [["09:00", "11:00"]] },
    booked: { "2026-11-22": ["09:00"] },
    timeOff: [],
  },
  {
    id: "doc_163",
    name: "Dr. Sanjay Menon",
    specializations: ["Paediatrics"],
    slot_duration_minutes: 30,
    is_active: true,
    room: "Ground floor · Room 04",
    note: "18 yrs · newborn and child health",
    languages: "english, malayalam",
    rules: { Fri: [["09:00", "11:00"]], Mon: [["14:00", "17:00"]] },
    booked: { "2026-11-21": ["09:00", "09:30"] },
    timeOff: [],
  },
  {
    id: "doc_171",
    name: "Dr. Imran Qureshi",
    specializations: ["Orthopaedics"],
    slot_duration_minutes: 30,
    is_active: true,
    room: "Wing A · Room 115",
    note: "12 yrs · knee and spine",
    languages: "english, hindi",
    rules: { Fri: [["14:00", "17:00"]], Wed: [["09:00", "12:00"]] },
    booked: { "2026-11-21": ["14:00", "15:30"] },
    timeOff: [],
  },
  {
    id: "doc_179",
    name: "Dr. Priya Balan",
    specializations: ["ENT"],
    slot_duration_minutes: 30,
    is_active: true,
    room: "Wing C · Room 310",
    note: "10 yrs · ear, nose and throat",
    languages: "english, tamil",
    rules: { Fri: [["10:00", "12:00"]], Thu: [["14:00", "16:00"]] },
    booked: {},
    timeOff: [],
  },
  {
    // deactivated by an admin — never appears in patient search
    id: "doc_188",
    name: "Dr. Leela Krishnan",
    specializations: ["General Medicine"],
    slot_duration_minutes: 30,
    is_active: false,
    room: "—",
    note: "left the clinic, sep 2026",
    languages: "english",
    rules: {},
    booked: {},
    timeOff: [],
  },
];

// The slot another patient is racing us for — used to demonstrate the
// server-side transactional lock rejecting the second booking.
const CONTESTED_SLOT = "doc_104|2026-11-21|16:30";

export default function Screen() {
  const navigate = useNavigate();
  // ----- colour helpers, all derived from the brand roles --------------------
  const hexToRgba = (hex, a) => {
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
    return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
  };
  const ink = brand.primaryColor;
  const cream = brand.backgroundColor;
  const accent = brand.accentColor;
  const soft = (a) => hexToRgba(ink, a);
  const gold = (a) => hexToRgba(accent, a);

  const css = `
.atrium :focus-visible { outline: 2px solid ${accent}; outline-offset: 3px; }
.atrium-rise { animation: atrium-rise .3s cubic-bezier(.2,.7,.3,1) both; }
@keyframes atrium-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
.atrium-veil { animation: atrium-fade .18s ease-out both; }
@keyframes atrium-fade { from { opacity: 0; } to { opacity: 1; } }
.atrium-dialog { animation: atrium-pop .24s cubic-bezier(.2,.7,.3,1) both; }
@keyframes atrium-pop { from { opacity: 0; transform: translateY(14px) scale(.985); } to { opacity: 1; transform: none; } }
.atrium-breathe { animation: atrium-breathe 1.6s ease-in-out infinite; }
@keyframes atrium-breathe { 0%,100% { opacity: .35; } 50% { opacity: .7; } }
.atrium-slot { transition: background-color .18s ease, transform .18s ease, box-shadow .18s ease; }
.atrium-slot:hover:not(:disabled) { transform: translateY(-2px); }
.atrium-card { transition: box-shadow .2s ease, transform .2s ease; }
.atrium-card:hover { transform: translateY(-2px); }
@media (prefers-reduced-motion: reduce) {
  .atrium *, .atrium-dialog, .atrium-veil, .atrium-rise, .atrium-breathe { animation: none !important; transition: none !important; transform: none !important; }
}
`;

  // ----- state ---------------------------------------------------------------
  const [query, setQuery] = React.useState("chest pain");
  const [submitted, setSubmitted] = React.useState("chest pain");
  const [status, setStatus] = React.useState("results"); // results | searching
  const [formError, setFormError] = React.useState("");
  const [specFilter, setSpecFilter] = React.useState("all");
  const [dateKey, setDateKey] = React.useState(DATES[0].key);
  const [week, setWeek] = React.useState(false);
  const [chosenDoctor, setChosenDoctor] = React.useState("doc_104");
  const [takenSince, setTakenSince] = React.useState([]); // slots gone while we browsed
  const [contestedHit, setContestedHit] = React.useState(false);
  const [refreshedOnce, setRefreshedOnce] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [lastChecked, setLastChecked] = React.useState("09:42");
  const [notice, setNotice] = React.useState(null);
  const [pending, setPending] = React.useState(null); // slot awaiting confirmation
  const [modalState, setModalState] = React.useState("idle"); // idle | holding | error | success
  const [booking, setBooking] = React.useState(null);

  const timers = React.useRef([]);
  React.useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const defer = (fn, ms) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
  };

  // ----- slot maths ----------------------------------------------------------
  const toMin = (t) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };
  const toHHMM = (m) =>
    String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0");

  const timeOffFor = (doc, date) => doc.timeOff.find((t) => t.date === date.key) || null;

  const slotsFor = (doc, date) => {
    if (timeOffFor(doc, date)) return [];
    const ranges = doc.rules[date.wd] || [];
    const out = [];
    ranges.forEach(([s, e]) => {
      for (
        let t = toMin(s);
        t + doc.slot_duration_minutes <= toMin(e);
        t += doc.slot_duration_minutes
      ) {
        const start = toHHMM(t);
        const key = `${doc.id}|${date.key}|${start}`;
        const alreadyBooked =
          (doc.booked[date.key] || []).includes(start) || takenSince.includes(key);
        if (!alreadyBooked) {
          out.push({ key, start, end: toHHMM(t + doc.slot_duration_minutes), date });
        }
      }
    });
    return out;
  };

  // ----- the static disease → specialization lookup (no AI, no ML) -----------
  const resolve = (raw) => {
    const q = raw.trim().toLowerCase();
    if (!q) return { kind: "none", specs: [] };
    const exactMap = DISEASE_MAPPINGS.find((m) => m.is_active && m.term === q);
    if (exactMap)
      return { kind: "mapping", specs: exactMap.specializations, term_type: exactMap.term_type };
    const spec = SPECIALIZATIONS.find((s) => s.is_active && s.name.toLowerCase() === q);
    if (spec) return { kind: "specialization", specs: [spec.name] };
    const looseMap = DISEASE_MAPPINGS.find(
      (m) => m.is_active && (m.term.includes(q) || q.includes(m.term)),
    );
    if (looseMap)
      return { kind: "mapping", specs: looseMap.specializations, term_type: looseMap.term_type };
    const looseSpec = SPECIALIZATIONS.find(
      (s) => s.is_active && q.length >= 3 && s.name.toLowerCase().includes(q),
    );
    if (looseSpec) return { kind: "specialization", specs: [looseSpec.name] };
    return { kind: "none", specs: [] };
  };

  const match = React.useMemo(() => resolve(submitted), [submitted]);

  const matchedDoctors = React.useMemo(
    () =>
      DOCTORS.filter(
        (d) =>
          d.is_active &&
          d.specializations.some((s) => match.specs.includes(s)) &&
          (specFilter === "all" || d.specializations.includes(specFilter)),
      ),
    [match, specFilter],
  );

  const activeDate = DATES.find((d) => d.key === dateKey) || DATES[0];
  const range = week ? DATES : [activeDate];

  const openCount = (doc) => range.reduce((n, d) => n + slotsFor(doc, d).length, 0);

  const nextOpen = (doc) => {
    for (const d of DATES) {
      const s = slotsFor(doc, d);
      if (s.length) return `${d.short} · ${s[0].start}`;
    }
    return null;
  };

  const doctor = matchedDoctors.find((d) => d.id === chosenDoctor) || matchedDoctors[0] || null;

  const groups = doctor
    ? range
        .map((d) => ({ date: d, slots: slotsFor(doctor, d) }))
        .filter((g) => !week || g.slots.length)
    : [];
  const visibleSlots = groups.reduce((n, g) => n + g.slots.length, 0);

  const filterOptions = match.specs.length
    ? match.specs
    : SPECIALIZATIONS.filter((s) => s.is_active).map((s) => s.name);

  // ----- actions -------------------------------------------------------------
  const onSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (q.length < 2) {
      setFormError(
        'type at least two letters — try a symptom like "chest pain", or a specialization like "cardiology".',
      );
      return;
    }
    setFormError("");
    setNotice(null);
    setStatus("searching");
    defer(() => {
      setSubmitted(q);
      setSpecFilter("all");
      setStatus("results");
      const next = resolve(q);
      const first = DOCTORS.find(
        (d) => d.is_active && d.specializations.some((s) => next.specs.includes(s)),
      );
      setChosenDoctor(first ? first.id : null);
    }, 620);
  };

  const refreshAvailability = () => {
    setRefreshing(true);
    defer(() => {
      setRefreshing(false);
      setLastChecked(refreshedOnce ? "09:51" : "09:47");
      if (!refreshedOnce) {
        setRefreshedOnce(true);
        setTakenSince((t) =>
          t.includes("doc_104|2026-11-21|11:00") ? t : [...t, "doc_104|2026-11-21|11:00"],
        );
        setNotice({
          tone: "stale",
          text: "11:00 – 11:30 with Dr. Anjali Rao was taken by another patient while this page was open. the list below is up to date.",
        });
      } else {
        setNotice({
          tone: "calm",
          text: "nothing changed — every slot below was still open a moment ago.",
        });
      }
    }, 560);
  };

  const dialogRef = React.useRef(null);
  const triggerRef = React.useRef(null);

  const openConfirm = (slot, el) => {
    triggerRef.current = el || null;
    setPending({ ...slot, doctor });
    setModalState("idle");
  };

  const closeModal = () => {
    if (modalState === "holding") return;
    setPending(null);
    setModalState("idle");
    if (triggerRef.current && typeof triggerRef.current.focus === "function") {
      triggerRef.current.focus();
    }
  };

  const confirmBooking = () => {
    if (modalState === "success") {
      navigate("my-appointments");
      return;
    }
    if (modalState === "error") {
      closeModal();
      return;
    }
    setModalState("holding");
    defer(() => {
      if (pending.key === CONTESTED_SLOT && !contestedHit) {
        setContestedHit(true);
        setTakenSince((t) => (t.includes(pending.key) ? t : [...t, pending.key]));
        setModalState("error");
        return;
      }
      setTakenSince((t) => (t.includes(pending.key) ? t : [...t, pending.key]));
      setBooking({
        ref: "APT-2026-0481",
        doctor: pending.doctor.name,
        specialization: pending.doctor.specializations[0],
        date: pending.date.label,
        time: `${pending.start} – ${pending.end}`,
        status: "booked",
      });
      setModalState("success");
    }, 760);
  };

  React.useEffect(() => {
    if (!pending) return undefined;
    if (dialogRef.current) dialogRef.current.focus();
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  const trapTab = (e) => {
    if (e.key !== "Tab" || !dialogRef.current) return;
    const nodes = dialogRef.current.querySelectorAll(
      'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  // ----- shared styles -------------------------------------------------------
  const num = { fontVariantNumeric: "tabular-nums" };
  const label = "text-[12px] tracking-[0.14em] lowercase";
  const panel = {
    backgroundColor: soft(0.05),
    borderRadius: brand.radius,
  };
  const pill = "rounded-full px-5 py-3 text-[15px]";
  const primaryBtn = {
    backgroundColor: ink,
    color: cream,
    borderRadius: "999px",
  };
  const quietBtn = {
    backgroundColor: "transparent",
    color: ink,
    borderRadius: "999px",
    boxShadow: `inset 0 0 0 1px ${soft(0.22)}`,
  };

  const SpecBadge = ({ children }) => (
    <Badge
      className="rounded-full px-3 py-1 text-[12px] font-medium"
      style={{ backgroundColor: gold(0.18), color: ink, border: "none" }}
    >
      {children}
    </Badge>
  );

  // ---------------------------------------------------------------------------
  return (
    <div
      className="atrium min-h-full w-full"
      style={{ backgroundColor: cream, color: ink, fontFamily: brand.fontBody }}
    >
      <style>{css}</style>

      <div className="mx-auto w-full max-w-6xl px-6 py-12 md:px-10 md:py-16">
        {/* ---------- row 1 · page title ---------- */}
        <header data-wf="b-0-0" className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-9">
            <p className={label} style={{ color: soft(0.62) }}>
              atrium clinic · in-person consultations
            </p>
            <h1
              className="mt-3 text-[34px] leading-tight md:text-[40px]"
              style={{ fontFamily: brand.fontHeading, fontStyle: "italic", fontWeight: 600 }}
            >
              Find a doctor
            </h1>
            <p
              className="mt-4 max-w-[64ch] text-[16px] leading-relaxed"
              style={{ color: soft(0.72) }}
            >
              search by what you are feeling, or by the specialization you already know. booked
              slots are hidden, so everything shown here is open right now.
            </p>
          </div>
        </header>

        {/* ---------- row 2 · search ---------- */}
        <form onSubmit={onSearch} className="mt-10 grid grid-cols-12 items-end gap-4">
          <div className="col-span-12 sm:col-span-9">
            <Label htmlFor="doctor-search" className={label} style={{ color: soft(0.62) }}>
              search by disease, symptom or specialization
            </Label>
            <div className="relative mt-2">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2"
                style={{ color: soft(0.5) }}
              />
              <Input
                id="doctor-search"
                data-wf="b-1-0"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (formError) setFormError("");
                }}
                placeholder="Disease, symptom or specialization — e.g. chest pain"
                aria-describedby={formError ? "search-error" : "search-hint"}
                aria-invalid={formError ? "true" : undefined}
                className="h-14 w-full rounded-full border-0 pl-14 pr-6 text-[16px]"
                style={{
                  backgroundColor: cream,
                  color: ink,
                  boxShadow: `inset 0 0 0 1px ${formError ? accent : soft(0.2)}`,
                }}
              />
            </div>
            {formError ? (
              <p
                id="search-error"
                className="mt-2 flex items-start gap-2 pl-2 text-[13px]"
                style={{ color: soft(0.85) }}
              >
                <AlertCircle aria-hidden="true" className="mt-[2px] h-4 w-4 shrink-0" />
                <span>{formError}</span>
              </p>
            ) : (
              <p id="search-hint" className="mt-2 pl-5 text-[13px]" style={{ color: soft(0.58) }}>
                matched from the clinic's own disease directory — people, not algorithms, keep it up
                to date.
              </p>
            )}
          </div>
          <div className="col-span-12 sm:col-span-3">
            <Button
              type="submit"
              data-wf="b-1-1"
              disabled={status === "searching"}
              className="h-14 w-full gap-2 text-[15px] font-semibold"
              style={{ ...primaryBtn, opacity: status === "searching" ? 0.72 : 1 }}
            >
              <Search aria-hidden="true" className="h-4 w-4" />
              {status === "searching" ? "Searching…" : "Search"}
            </Button>
          </div>
        </form>

        {/* ---------- row 3 · filters ---------- */}
        <div
          data-wf="b-2-0"
          className="mt-6 flex flex-wrap items-end gap-x-6 gap-y-4 px-6 py-5"
          style={panel}
        >
          <div className="min-w-[200px]">
            <Label htmlFor="spec-filter" className={label} style={{ color: soft(0.62) }}>
              specialization
            </Label>
            <Select
              id="spec-filter"
              data-wf="i-2-0-0"
              value={specFilter}
              onChange={(e) => setSpecFilter(e.target.value)}
              className="mt-2 h-12 w-full rounded-full border-0 px-5 text-[15px]"
              style={{
                backgroundColor: cream,
                color: ink,
                boxShadow: `inset 0 0 0 1px ${soft(0.18)}`,
              }}
            >
              <option value="all">All matching specializations</option>
              {filterOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </div>

          <div className="min-w-[200px]">
            <Label htmlFor="date-filter" className={label} style={{ color: soft(0.62) }}>
              date
            </Label>
            <Select
              id="date-filter"
              data-wf="i-2-0-1"
              value={dateKey}
              disabled={week}
              onChange={(e) => setDateKey(e.target.value)}
              className="mt-2 h-12 w-full rounded-full border-0 px-5 text-[15px]"
              style={{
                backgroundColor: cream,
                color: ink,
                boxShadow: `inset 0 0 0 1px ${soft(0.18)}`,
                opacity: week ? 0.55 : 1,
                ...num,
              }}
            >
              {DATES.map((d) => (
                <option key={d.key} value={d.key}>
                  {d.label}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <span className={label + " block"} style={{ color: soft(0.62) }}>
              range
            </span>
            <button
              type="button"
              data-wf="i-2-0-2"
              aria-pressed={week}
              onClick={() => setWeek((w) => !w)}
              className={"mt-2 inline-flex h-12 items-center gap-2 font-medium " + pill}
              style={{
                backgroundColor: week ? ink : cream,
                color: week ? cream : ink,
                boxShadow: week ? "none" : `inset 0 0 0 1px ${soft(0.18)}`,
              }}
            >
              <Filter aria-hidden="true" className="h-4 w-4" />
              Next 7 days
              {week ? <Check aria-hidden="true" className="h-4 w-4" /> : null}
            </button>
          </div>

          <p
            className="ml-auto max-w-[30ch] text-[13px] leading-relaxed"
            style={{ color: soft(0.6) }}
          >
            {week
              ? "browsing fri 21 – thu 27 nov. the date filter is paused."
              : `showing availability for ${activeDate.label.toLowerCase()}.`}
          </p>
        </div>

        {/* ---------- searching ---------- */}
        {status === "searching" ? (
          <section className="mt-10" aria-live="polite">
            <p className="text-[15px]" style={{ color: soft(0.7) }}>
              looking through the clinic directory for “{query.trim()}”…
            </p>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="atrium-breathe h-[320px] rounded-t-full"
                  style={{
                    backgroundColor: soft(0.08),
                    borderBottomLeftRadius: brand.radius,
                    borderBottomRightRadius: brand.radius,
                    animationDelay: `${i * 0.18}s`,
                  }}
                />
              ))}
            </div>
          </section>
        ) : null}

        {/* ---------- row 4 · lookup result line ---------- */}
        {status === "results" && match.specs.length ? (
          <p
            data-wf="b-3-0"
            aria-live="polite"
            className="mt-10 max-w-[70ch] text-[18px] leading-relaxed"
            style={{ fontFamily: brand.fontHeading, fontStyle: "italic" }}
          >
            {match.kind === "mapping"
              ? `“${submitted}” maps to ${match.specs.join(" and ")}.`
              : `“${submitted}” is a specialization in our directory.`}{" "}
            <span style={num}>{matchedDoctors.length}</span>{" "}
            {matchedDoctors.length === 1 ? "active doctor" : "active doctors"} found.
            {specFilter !== "all" ? ` Filtered to ${specFilter}.` : ""}
          </p>
        ) : null}

        {/* ---------- row 5 · matching doctors ---------- */}
        {status === "results" && matchedDoctors.length ? (
          <section data-wf="b-4-0" className="mt-8" aria-labelledby="matching-doctors">
            <h2
              id="matching-doctors"
              className="text-[22px]"
              style={{ fontFamily: brand.fontHeading, fontStyle: "italic", fontWeight: 600 }}
            >
              Matching doctors
            </h2>

            <ul className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              {matchedDoctors.map((d, i) => {
                const count = openCount(d);
                const selected = doctor && doctor.id === d.id;
                const off = !week ? timeOffFor(d, activeDate) : null;
                return (
                  <li key={d.id} className="atrium-rise" style={{ animationDelay: `${i * 0.05}s` }}>
                    <div
                      className="atrium-card flex h-full flex-col items-center rounded-t-full px-6 pb-6 pt-10 text-center"
                      style={{
                        backgroundColor: selected ? gold(0.12) : soft(0.05),
                        borderBottomLeftRadius: brand.radius,
                        borderBottomRightRadius: brand.radius,
                        boxShadow: selected
                          ? `inset 0 0 0 2px ${accent}`
                          : `inset 0 0 0 1px ${soft(0.1)}`,
                      }}
                    >
                      <Avatar name={d.name} className="h-16 w-16" />
                      <h3
                        className="mt-4 text-[20px] leading-snug"
                        style={{
                          fontFamily: brand.fontHeading,
                          fontStyle: "italic",
                          fontWeight: 600,
                        }}
                      >
                        {d.name}
                      </h3>
                      <div className="mt-3 flex flex-wrap justify-center gap-2">
                        {d.specializations.map((s) => (
                          <SpecBadge key={s}>{s}</SpecBadge>
                        ))}
                      </div>
                      <p className="mt-3 text-[13px]" style={{ color: soft(0.62) }}>
                        {d.note}
                      </p>

                      <div className="my-5 w-full" style={{ color: soft(0.12) }}>
                        <Separator />
                      </div>

                      <dl className="w-full space-y-2 text-[14px]">
                        <div className="flex items-center justify-between gap-3">
                          <dt style={{ color: soft(0.6) }}>slot length</dt>
                          <dd style={num}>{d.slot_duration_minutes} min slots</dd>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <dt style={{ color: soft(0.6) }}>room</dt>
                          <dd>{d.room}</dd>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <dt style={{ color: soft(0.6) }}>open slots</dt>
                          <dd style={num}>
                            {count > 0
                              ? `${count} ${week ? "in 7 days" : "on " + activeDate.short.toLowerCase()}`
                              : "none"}
                          </dd>
                        </div>
                      </dl>

                      {count === 0 ? (
                        <p
                          className="mt-4 flex items-start gap-2 text-left text-[13px] leading-relaxed"
                          style={{ color: soft(0.68) }}
                        >
                          <AlertCircle aria-hidden="true" className="mt-[2px] h-4 w-4 shrink-0" />
                          <span>
                            {off
                              ? `on time off — ${off.reason}.`
                              : `fully booked on ${activeDate.short.toLowerCase()}.`}
                            {nextOpen(d)
                              ? ` next open: ${nextOpen(d)}.`
                              : " no open slots this week."}
                          </span>
                        </p>
                      ) : null}

                      <Button
                        type="button"
                        data-wf={`i-4-0-${i}`}
                        disabled={count === 0}
                        aria-pressed={selected}
                        aria-label={`View open slots for ${d.name}`}
                        onClick={() => setChosenDoctor(d.id)}
                        className="mt-6 h-12 w-full gap-2 text-[15px] font-semibold"
                        style={
                          count === 0
                            ? { ...quietBtn, opacity: 0.5, cursor: "not-allowed" }
                            : selected
                              ? primaryBtn
                              : quietBtn
                        }
                      >
                        {selected ? (
                          <>
                            <Check aria-hidden="true" className="h-4 w-4" />
                            Showing slots
                          </>
                        ) : (
                          <>
                            View open slots
                            <ChevronRight aria-hidden="true" className="h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}

        {/* ---------- row 6 · available slots ---------- */}
        {status === "results" && doctor ? (
          <section
            data-wf="b-5-0"
            className="mt-10 px-6 py-8 md:px-10"
            style={panel}
            aria-labelledby="slots-heading"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2
                id="slots-heading"
                className="text-[22px] leading-snug"
                style={{ fontFamily: brand.fontHeading, fontStyle: "italic", fontWeight: 600 }}
              >
                Available slots — {doctor.name},{" "}
                <span style={num}>{week ? "next 7 days" : activeDate.label}</span>
              </h2>
              <p className="text-[14px]" style={{ color: soft(0.62), ...num }}>
                {visibleSlots} open · {doctor.slot_duration_minutes} min each · in-person
              </p>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px]">
              <span className="inline-flex items-center gap-2" style={{ color: soft(0.6) }}>
                <Clock aria-hidden="true" className="h-4 w-4" />
                <span style={num}>availability checked at {lastChecked}</span> · booked slots are
                hidden
              </span>
              <button
                type="button"
                onClick={refreshAvailability}
                disabled={refreshing}
                className="rounded-full px-4 py-2 text-[13px] font-medium underline underline-offset-4"
                style={{ color: ink, opacity: refreshing ? 0.6 : 1 }}
              >
                {refreshing ? "checking the register…" : "refresh availability"}
              </button>
            </div>

            {notice ? (
              <p
                aria-live="polite"
                className="mt-4 flex items-start gap-3 rounded-[20px] px-5 py-4 text-[14px] leading-relaxed"
                style={{
                  backgroundColor: notice.tone === "stale" ? gold(0.16) : soft(0.07),
                  color: soft(0.9),
                }}
              >
                {notice.tone === "stale" ? (
                  <AlertCircle aria-hidden="true" className="mt-[2px] h-[18px] w-[18px] shrink-0" />
                ) : (
                  <CheckCircle aria-hidden="true" className="mt-[2px] h-[18px] w-[18px] shrink-0" />
                )}
                <span>{notice.text}</span>
              </p>
            ) : null}

            {booking ? (
              <div
                aria-live="polite"
                className="atrium-rise mt-4 rounded-[20px] px-5 py-4"
                style={{ backgroundColor: cream, boxShadow: `inset 0 0 0 1px ${soft(0.16)}` }}
              >
                <p className="flex items-start gap-3 text-[14px] leading-relaxed">
                  <CheckCircle aria-hidden="true" className="mt-[2px] h-[18px] w-[18px] shrink-0" />
                  <span>
                    <strong className="font-semibold">Appointment booked.</strong> {booking.doctor},{" "}
                    <span style={num}>
                      {booking.date}, {booking.time}
                    </span>
                    . reference <span style={num}>{booking.ref}</span> · status{" "}
                    <span className="font-semibold">{booking.status}</span>. shown here in the app —
                    no email or sms is sent in this version.
                  </span>
                </p>
                <button
                  type="button"
                  onClick={() => navigate("my-appointments")}
                  className="mt-3 rounded-full text-[14px] font-semibold underline underline-offset-4"
                  style={{ color: ink }}
                >
                  view my appointments
                </button>
              </div>
            ) : null}

            {visibleSlots === 0 ? (
              <div
                className="mt-6 rounded-[20px] px-6 py-8 text-center"
                style={{ backgroundColor: cream }}
              >
                <p
                  className="text-[16px]"
                  style={{ fontFamily: brand.fontHeading, fontStyle: "italic" }}
                >
                  {timeOffFor(doctor, activeDate)
                    ? `${doctor.name} is on time off that day`
                    : `${doctor.name} is fully booked on ${activeDate.short.toLowerCase()}`}
                </p>
                <p
                  className="mx-auto mt-2 max-w-[52ch] text-[14px] leading-relaxed"
                  style={{ color: soft(0.66) }}
                >
                  {timeOffFor(doctor, activeDate)
                    ? `reason on file: ${timeOffFor(doctor, activeDate).reason}. `
                    : "every slot is taken. "}
                  {nextOpen(doctor)
                    ? `the next open slot is ${nextOpen(doctor)} — switch the date, or turn on next 7 days.`
                    : "try another doctor from the list above."}
                </p>
              </div>
            ) : (
              <div className="mt-6 space-y-7">
                {groups.map((g) => (
                  <div key={g.date.key}>
                    {week ? (
                      <h3 className={label + " mb-3"} style={{ color: soft(0.62), ...num }}>
                        {g.date.label.toLowerCase()}
                      </h3>
                    ) : null}
                    <ul className="flex flex-wrap gap-3">
                      {g.slots.map((s, i) => {
                        const idx =
                          groups
                            .slice(0, groups.indexOf(g))
                            .reduce((n, prev) => n + prev.slots.length, 0) + i;
                        const isPending = pending && pending.key === s.key;
                        return (
                          <li
                            key={s.key}
                            className="atrium-rise"
                            style={{ animationDelay: `${idx * 0.03}s` }}
                          >
                            <button
                              type="button"
                              data-wf={idx < 4 ? `i-5-0-${idx}` : undefined}
                              onClick={(e) => openConfirm(s, e.currentTarget)}
                              aria-label={`Book ${s.start} to ${s.end} with ${doctor.name} on ${g.date.label}`}
                              className="atrium-slot flex min-w-[148px] flex-col items-start rounded-full px-6 py-4"
                              style={{
                                backgroundColor: isPending ? ink : cream,
                                color: isPending ? cream : ink,
                                boxShadow: isPending ? "none" : `inset 0 0 0 1px ${soft(0.16)}`,
                              }}
                            >
                              <span className="text-[16px] font-semibold" style={num}>
                                {s.start} – {s.end}
                              </span>
                              <span
                                className="text-[12px]"
                                style={{ color: isPending ? gold(0.95) : soft(0.6) }}
                              >
                                {doctor.slot_duration_minutes} min · in-person
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </section>
        ) : null}

        {/* ---------- row 7 · nothing matched ---------- */}
        {status === "results" && !matchedDoctors.length ? (
          <section data-wf="b-6-0" className="mt-10 px-6 py-10" style={panel}>
            <svg
              aria-hidden="true"
              viewBox="0 0 96 110"
              className="mx-auto h-[110px] w-24"
              fill="none"
            >
              <path
                d="M8 108V48a40 40 0 0 1 80 0v60"
                stroke={soft(0.28)}
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path d="M48 104V68" stroke={accent} strokeWidth="2" strokeLinecap="round" />
              <path
                d="M48 78c-9 0-15-6-15-14 9 0 15 6 15 14Zm0-6c0-8 6-14 15-14 0 8-6 14-15 14Z"
                fill={gold(0.55)}
              />
            </svg>
            <Empty
              className="mt-2"
              title={
                match.specs.length
                  ? "no doctors under that filter"
                  : "nothing in the directory matches that"
              }
              description={
                match.specs.length
                  ? `No active doctors in ${specFilter} for “${submitted}”. Clear the specialization filter to see every matching doctor.`
                  : `No matching doctors found for “${submitted}”. Try another term or search by specialization.`
              }
              action={
                match.specs.length ? (
                  <Button
                    type="button"
                    onClick={() => setSpecFilter("all")}
                    className="h-12 px-6 text-[15px] font-semibold"
                    style={primaryBtn}
                  >
                    Clear specialization filter
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={() => {
                      setQuery("General Medicine");
                      setSubmitted("General Medicine");
                      setSpecFilter("all");
                      setChosenDoctor("doc_131");
                    }}
                    className="h-12 px-6 text-[15px] font-semibold"
                    style={primaryBtn}
                  >
                    Browse General Medicine
                  </Button>
                )
              }
            />
            <p
              className="mx-auto mt-4 max-w-[54ch] text-center text-[13px] leading-relaxed"
              style={{ color: soft(0.6) }}
            >
              our directory maps everyday terms — chest pain, migraine, knee pain, sore throat — to
              the right specialization. if yours is missing, the front desk can add it.
            </p>
          </section>
        ) : null}
      </div>

      {/* ---------- rows 8–10 · confirm booking ---------- */}
      {pending ? (
        <div
          className="atrium-veil fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
          style={{ backgroundColor: hexToRgba(ink, 0.45) }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            data-wf="b-7-0"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            tabIndex={-1}
            onKeyDown={trapTab}
            className="atrium-dialog w-full max-w-lg px-7 pb-8 pt-9 sm:px-9"
            style={{
              backgroundColor: cream,
              borderRadius: "28px",
              boxShadow: `0 24px 60px ${hexToRgba(ink, 0.28)}`,
              outline: "none",
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div
                className="flex h-14 w-11 items-end justify-center pb-2"
                style={{
                  backgroundColor: gold(0.2),
                  borderRadius: "999px 999px 10px 10px",
                }}
              >
                {modalState === "success" ? (
                  <CheckCircle aria-hidden="true" className="h-5 w-5" />
                ) : modalState === "error" ? (
                  <AlertCircle aria-hidden="true" className="h-5 w-5" />
                ) : (
                  <Calendar aria-hidden="true" className="h-5 w-5" />
                )}
              </div>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close without booking"
                disabled={modalState === "holding"}
                className="rounded-full p-2"
                style={{ color: soft(0.7), opacity: modalState === "holding" ? 0.4 : 1 }}
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>

            <h2
              id="confirm-title"
              className="mt-4 text-[24px] leading-snug"
              style={{ fontFamily: brand.fontHeading, fontStyle: "italic", fontWeight: 600 }}
            >
              {modalState === "success"
                ? "Booking confirmed"
                : modalState === "error"
                  ? "That slot has just gone"
                  : "Confirm booking"}
            </h2>

            <p className="mt-2 text-[15px] leading-relaxed" style={{ color: soft(0.72) }}>
              {modalState === "success"
                ? `we have held ${pending.start} – ${pending.end} for you. reference ${
                    booking ? booking.ref : ""
                  }, status booked.`
                : modalState === "error"
                  ? "another patient confirmed this slot a moment before you. nothing was charged and nothing was booked — pick another time below and we will hold it."
                  : "one patient per slot. we will hold this time the moment you confirm."}
            </p>

            <dl
              className="mt-6 space-y-3 rounded-[20px] px-6 py-5 text-[15px]"
              style={{ backgroundColor: soft(0.06) }}
            >
              <div className="flex items-baseline justify-between gap-4">
                <dt style={{ color: soft(0.6) }}>doctor</dt>
                <dd className="text-right font-semibold">{pending.doctor.name}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt style={{ color: soft(0.6) }}>specialization</dt>
                <dd className="text-right">{pending.doctor.specializations.join(", ")}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt style={{ color: soft(0.6) }}>date</dt>
                <dd className="text-right" style={num}>
                  {pending.date.label}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt style={{ color: soft(0.6) }}>time</dt>
                <dd className="text-right font-semibold" style={num}>
                  {pending.start} – {pending.end}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt style={{ color: soft(0.6) }}>visit</dt>
                <dd className="text-right">
                  in-person · {pending.doctor.room} · {pending.doctor.slot_duration_minutes} min
                </dd>
              </div>
              {modalState === "success" ? (
                <div className="flex items-baseline justify-between gap-4">
                  <dt style={{ color: soft(0.6) }}>status</dt>
                  <dd className="text-right">
                    <Badge
                      className="rounded-full px-3 py-1 text-[12px] font-semibold"
                      style={{ backgroundColor: gold(0.22), color: ink, border: "none" }}
                    >
                      booked
                    </Badge>
                  </dd>
                </div>
              ) : null}
            </dl>

            {/* row 9 · the slot-locking note */}
            <p
              data-wf="b-8-0"
              className="mt-5 flex items-start gap-3 text-[13px] leading-relaxed"
              style={{ color: soft(0.68) }}
            >
              <Clock aria-hidden="true" className="mt-[2px] h-4 w-4 shrink-0" />
              <span>
                Booked slots are hidden and refresh on reload. If another patient takes this slot
                first, the booking is rejected and you are asked to pick another slot.
              </span>
            </p>

            {/* row 10 · actions */}
            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-12">
              <div className="sm:col-span-6">
                <Button
                  type="button"
                  data-wf="b-9-0"
                  onClick={confirmBooking}
                  disabled={modalState === "holding"}
                  className="h-13 w-full gap-2 py-4 text-[15px] font-semibold"
                  style={{ ...primaryBtn, opacity: modalState === "holding" ? 0.72 : 1 }}
                >
                  {modalState === "holding" ? (
                    <>
                      <Clock aria-hidden="true" className="h-4 w-4 atrium-breathe" />
                      Holding your slot…
                    </>
                  ) : modalState === "success" ? (
                    <>
                      View my appointments
                      <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </>
                  ) : modalState === "error" ? (
                    <>
                      Pick another slot
                      <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <Check aria-hidden="true" className="h-4 w-4" />
                      Confirm booking
                    </>
                  )}
                </Button>
              </div>
              <div className="sm:col-span-6">
                <Button
                  type="button"
                  data-wf="b-9-1"
                  onClick={closeModal}
                  disabled={modalState === "holding"}
                  className="h-13 w-full gap-2 py-4 text-[15px] font-semibold"
                  style={{ ...quietBtn, opacity: modalState === "holding" ? 0.5 : 1 }}
                >
                  <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                  Back to slots
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
