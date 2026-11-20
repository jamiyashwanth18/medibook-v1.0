// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Input, Label, Select, Table, THead, TBody, TR, TH, TD, Avatar, Empty } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Plus, Check, X, Home, FileText, Clock, Edit, Filter, ArrowLeft, ArrowRight, AlertCircle, CheckCircle } = Icons;

const ink = brand.primaryColor;
const gold = brand.accentColor;
const cream = brand.backgroundColor;

const rgba = (hex, a) => {
  const h = String(hex).replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
};
const T = (a) => rgba(ink, a);
const G = (a) => rgba(gold, a);

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const fmtDate = (iso) => {
  const p = String(iso).split('-');
  return `${Number(p[2])} ${MONTHS[Number(p[1]) - 1]} ${p[0]}`;
};
const addMinutes = (t, m) => {
  const p = t.split(':').map(Number);
  const tot = p[0] * 60 + p[1] + m;
  return `${String(Math.floor(tot / 60)).padStart(2, '0')}:${String(tot % 60).padStart(2, '0')}`;
};

const OPEN_DAYS = ['2026-11-21', '2026-11-23', '2026-11-24'];

const TABS = [
  { key: 'doctors', label: 'Doctors', wf: 'i-1-0-0' },
  { key: 'specializations', label: 'Specializations', wf: 'i-1-0-1' },
  { key: 'mappings', label: 'Disease mappings', wf: 'i-1-0-2' },
  { key: 'appointments', label: 'Appointments', wf: 'i-1-0-3' },
  { key: 'audit', label: 'Audit trail', wf: 'i-1-0-4' },
];

const SPEC_SEED = [
  { id: 's1', name: 'Cardiology', is_active: true },
  { id: 's2', name: 'Dermatology', is_active: true },
  { id: 's3', name: 'Pediatrics', is_active: true },
  { id: 's4', name: 'Orthopaedics', is_active: true },
  { id: 's5', name: 'ENT', is_active: true },
  { id: 's6', name: 'Neurology', is_active: true },
  { id: 's7', name: 'Gynaecology', is_active: true },
  { id: 's8', name: 'General Medicine', is_active: true },
  { id: 's9', name: 'Ophthalmology', is_active: false },
];

const DOCTOR_SEED = [
  ['d1', 'Dr. Anjali Rao', ['Cardiology'], 'anjali.rao@lotuspark.clinic', '+91 98450 11234', 30, true],
  ['d2', 'Dr. Vikram Menon', ['Dermatology'], 'vikram.menon@lotuspark.clinic', '+91 98451 20987', 20, true],
  ['d3', 'Dr. Priya Shankar', ['Pediatrics'], 'priya.shankar@lotuspark.clinic', '+91 98860 44120', 15, true],
  ['d4', 'Dr. Rohit Deshmukh', ['Orthopaedics'], 'rohit.deshmukh@lotuspark.clinic', '+91 99000 71245', 30, true],
  ['d5', 'Dr. Farah Qureshi', ['ENT'], 'farah.qureshi@lotuspark.clinic', '+91 98806 33471', 20, true],
  ['d6', 'Dr. Sandeep Iyer', ['Neurology'], 'sandeep.iyer@lotuspark.clinic', '+91 94480 55210', 45, true],
  ['d7', 'Dr. Meera Nambiar', ['Gynaecology'], 'meera.nambiar@lotuspark.clinic', '+91 98191 67304', 30, true],
  ['d8', 'Dr. Arjun Kulkarni', ['General Medicine'], 'arjun.kulkarni@lotuspark.clinic', '+91 90080 12876', 15, true],
  ['d9', 'Dr. Leela Varghese', ['Ophthalmology'], 'leela.varghese@lotuspark.clinic', '+91 98457 90012', 20, true],
  ['d10', 'Dr. Tanvi Bhatt', ['Dermatology', 'General Medicine'], 'tanvi.bhatt@lotuspark.clinic', '+91 99720 18450', 20, true],
  ['d11', 'Dr. Imran Shaikh', ['General Medicine'], 'imran.shaikh@lotuspark.clinic', '+91 97400 65231', 30, true],
  ['d12', 'Dr. Kavya Reddy', ['Pediatrics'], 'kavya.reddy@lotuspark.clinic', '+91 90350 77108', 15, false],
  ['d13', 'Dr. Nikhil Jain', ['Orthopaedics'], 'nikhil.jain@lotuspark.clinic', '+91 98202 41359', 30, true],
  ['d14', 'Dr. Suresh Pillai', ['Cardiology'], 'suresh.pillai@lotuspark.clinic', '+91 98840 22617', 30, false],
].map((d) => ({
  id: d[0], name: d[1], specializations: d[2], contact_email: d[3],
  contact_phone: d[4], slot_duration_minutes: d[5], is_active: d[6],
}));

const MAPPING_SEED = [
  ['chest pain', 'symptom', ['Cardiology', 'General Medicine'], true],
  ['palpitations', 'symptom', ['Cardiology'], true],
  ['hypertension', 'disease', ['Cardiology'], true],
  ['high cholesterol', 'disease', ['Cardiology'], true],
  ['breathlessness on exertion', 'symptom', ['Cardiology', 'General Medicine'], true],
  ['acne', 'disease', ['Dermatology'], true],
  ['eczema', 'disease', ['Dermatology'], true],
  ['hair fall', 'symptom', ['Dermatology'], true],
  ['psoriasis', 'disease', ['Dermatology'], true],
  ['skin rash', 'symptom', ['Dermatology'], true],
  ['fungal infection', 'disease', ['Dermatology'], false],
  ['child fever', 'symptom', ['Pediatrics', 'General Medicine'], true],
  ['measles', 'disease', ['Pediatrics'], true],
  ['chickenpox', 'disease', ['Pediatrics'], true],
  ['colic in infants', 'symptom', ['Pediatrics'], true],
  ['back pain', 'symptom', ['Orthopaedics', 'General Medicine'], true],
  ['fracture', 'disease', ['Orthopaedics'], true],
  ['knee pain', 'symptom', ['Orthopaedics'], true],
  ['arthritis', 'disease', ['Orthopaedics'], true],
  ['frozen shoulder', 'disease', ['Orthopaedics'], true],
  ['sore throat', 'symptom', ['ENT'], true],
  ['sinusitis', 'disease', ['ENT'], true],
  ['tonsillitis', 'disease', ['ENT'], true],
  ['ear ache', 'symptom', ['ENT'], true],
  ['vertigo', 'symptom', ['ENT', 'Neurology'], true],
  ['hearing loss', 'symptom', ['ENT'], true],
  ['migraine', 'disease', ['Neurology'], true],
  ['seizures', 'symptom', ['Neurology'], true],
  ['numbness in limbs', 'symptom', ['Neurology'], true],
  ['epilepsy', 'disease', ['Neurology'], true],
  ['tremor', 'symptom', ['Neurology'], false],
  ['irregular periods', 'symptom', ['Gynaecology'], true],
  ['pcos', 'disease', ['Gynaecology'], true],
  ['pregnancy care', 'disease', ['Gynaecology'], true],
  ['pelvic pain', 'symptom', ['Gynaecology'], true],
  ['diabetes', 'disease', ['General Medicine'], true],
  ['thyroid disorder', 'disease', ['General Medicine'], true],
  ['viral fever', 'symptom', ['General Medicine'], true],
  ['anaemia', 'disease', ['General Medicine'], true],
  ['fatigue', 'symptom', ['General Medicine'], true],
  ['blurred vision', 'symptom', ['Ophthalmology'], true],
  ['cataract', 'disease', ['Ophthalmology'], true],
].map((m, i) => ({ id: `m${i + 1}`, term: m[0], term_type: m[1], specs: m[2], is_active: m[3] }));

const APPT_SEED = [
  ['Nandita Krishnan', 'd1', '2026-11-18', '09:00', 'completed', 'patient'],
  ['Rahul Sethi', 'd8', '2026-11-18', '09:30', 'completed', 'front desk · Ravi K'],
  ['Aisha Mirza', 'd3', '2026-11-18', '10:15', 'no-show', 'patient'],
  ['Joseph Mathew', 'd4', '2026-11-18', '11:00', 'completed', 'patient'],
  ['Deepa Nair', 'd2', '2026-11-18', '14:00', 'cancelled', 'patient'],
  ['Karan Malhotra', 'd6', '2026-11-18', '15:00', 'completed', 'front desk · Ravi K'],
  ['Sunita Devi', 'd8', '2026-11-19', '09:15', 'completed', 'front desk · Ravi K'],
  ['Yusuf Khan', 'd5', '2026-11-19', '10:00', 'completed', 'patient'],
  ['Pooja Agarwal', 'd7', '2026-11-19', '11:30', 'completed', 'patient'],
  ['Harish Gowda', 'd13', '2026-11-19', '12:00', 'no-show', 'patient'],
  ['Ananya Bose', 'd1', '2026-11-19', '16:00', 'completed', 'front desk · Ravi K'],
  ['Mohit Chawla', 'd10', '2026-11-19', '17:00', 'cancelled', 'front desk · Ravi K'],
  ['Revathi Subramanian', 'd1', '2026-11-20', '09:00', 'completed', 'patient'],
  ['Gautam Rao', 'd1', '2026-11-20', '09:30', 'completed', 'front desk · Ravi K'],
  ['Shreya Pillai', 'd3', '2026-11-20', '10:00', 'confirmed', 'patient'],
  ['Zainab Ansari', 'd6', '2026-11-20', '11:00', 'confirmed', 'patient'],
  ['Aditya Verma', 'd9', '2026-11-20', '11:40', 'booked', 'patient'],
  ['Lakshmi Iyer', 'd8', '2026-11-20', '14:15', 'booked', 'front desk · Ravi K'],
  ['Vivek Tandon', 'd4', '2026-11-20', '15:00', 'cancelled', 'patient'],
  ['Preeti Das', 'd2', '2026-11-20', '16:20', 'booked', 'patient'],
  ['Omar Sheikh', 'd1', '2026-11-21', '09:00', 'booked', 'patient'],
  ['Neha Kulkarni', 'd1', '2026-11-21', '09:30', 'booked', 'front desk · Ravi K'],
  ['Siddharth Menon', 'd1', '2026-11-21', '10:30', 'confirmed', 'patient'],
  ['Ritu Bansal', 'd1', '2026-11-21', '11:00', 'booked', 'patient'],
  ['Manish Thakur', 'd2', '2026-11-21', '10:00', 'booked', 'patient'],
  ['Kavitha Rajan', 'd3', '2026-11-21', '10:45', 'booked', 'front desk · Ravi K'],
  ['Arnav Dutta', 'd5', '2026-11-21', '12:00', 'confirmed', 'patient'],
  ['Faisal Rahman', 'd7', '2026-11-21', '15:30', 'booked', 'patient'],
  ['Divya Sharma', 'd11', '2026-11-21', '16:00', 'booked', 'patient'],
  ['Tarun Mehra', 'd4', '2026-11-23', '09:30', 'booked', 'front desk · Ravi K'],
  ['Ishita Banerjee', 'd6', '2026-11-23', '10:00', 'booked', 'patient'],
  ['Rakesh Yadav', 'd8', '2026-11-23', '11:15', 'booked', 'patient'],
  ['Alka Saxena', 'd9', '2026-11-23', '14:00', 'booked', 'front desk · Ravi K'],
  ['Devika Menon', 'd10', '2026-11-23', '15:20', 'booked', 'patient'],
  ['Sameer Qadri', 'd1', '2026-11-24', '09:00', 'booked', 'patient'],
  ['Bhavana Rao', 'd3', '2026-11-24', '10:15', 'booked', 'front desk · Ravi K'],
  ['Nitin Joshi', 'd13', '2026-11-24', '11:30', 'booked', 'patient'],
].map((a, i) => ({
  id: `AP-${4101 + i}`, patient: a[0], doctorId: a[1], date: a[2],
  time: a[3], status: a[4], created_by: a[5],
}));

const AUDIT_SEED = [
  ['20 Nov 2026', '16:04', 'Dr. Anjali Rao', 'viewed', 'consultation_record', 'CR-2026-0481'],
  ['20 Nov 2026', '15:48', 'Dr. Anjali Rao', 'updated', 'consultation_record', 'CR-2026-0481'],
  ['20 Nov 2026', '14:21', 'Nandita Krishnan (patient)', 'viewed', 'consultation_record', 'CR-2026-0477'],
  ['20 Nov 2026', '12:55', 'Dr. Arjun Kulkarni', 'created', 'consultation_record', 'CR-2026-0480'],
  ['20 Nov 2026', '11:32', 'Ravi Kuruvilla (admin)', 'viewed', 'consultation_record', 'CR-2026-0479'],
  ['20 Nov 2026', '10:07', 'Dr. Priya Shankar', 'created', 'consultation_record', 'CR-2026-0478'],
  ['19 Nov 2026', '17:40', 'Dr. Sandeep Iyer', 'updated', 'consultation_record', 'CR-2026-0472'],
  ['19 Nov 2026', '16:12', 'Dr. Vikram Menon', 'viewed', 'consultation_record', 'CR-2026-0469'],
  ['19 Nov 2026', '09:58', 'Ravi Kuruvilla (admin)', 'viewed', 'consultation_record', 'CR-2026-0465'],
  ['18 Nov 2026', '18:03', 'Dr. Rohit Deshmukh', 'created', 'consultation_record', 'CR-2026-0461'],
].map((a, i) => ({
  id: `AL-${2210 - i}`, day: a[0], at: a[1], actor: a[2], action: a[3], entity: a[4], record: a[5],
}));

const STATUS_META = {
  booked: { word: 'booked', icon: 'Clock', bg: G(0.13), ring: G(0.55) },
  confirmed: { word: 'confirmed', icon: 'CheckCircle', bg: G(0.3), ring: G(0.75) },
  completed: { word: 'completed', icon: 'Check', bg: T(0.12), ring: T(0.22) },
  cancelled: { word: 'cancelled', icon: 'X', bg: 'transparent', ring: T(0.28) },
  'no-show': { word: 'no-show', icon: 'AlertCircle', bg: 'transparent', ring: T(0.28) },
};

const ACTION_ICON = { viewed: 'FileText', created: 'Plus', updated: 'Edit' };

const KEYFRAMES = `
@keyframes atriumRise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
@keyframes atriumRow { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
@keyframes atriumBreathe { 0%,100% { opacity: .35; } 50% { opacity: .8; } }
.atrium-rise { animation: atriumRise 240ms cubic-bezier(.22,.8,.3,1) both; }
.atrium-row { animation: atriumRow 300ms cubic-bezier(.22,.8,.3,1) both; }
.atrium-breathe { animation: atriumBreathe 1.3s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .atrium-rise, .atrium-row, .atrium-breathe { animation: none !important; }
  * { transition-duration: 0.01ms !important; }
}`;

const FOCUS = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--canvas)]';

const Arch = ({ size = 'md' }) => (
  <span
    aria-hidden="true"
    className="inline-block shrink-0"
    style={{
      width: size === 'sm' ? 20 : 30,
      height: size === 'sm' ? 12 : 17,
      borderRadius: '999px 999px 2px 2px',
      border: `1.5px solid ${gold}`,
      borderBottom: 'none',
    }}
  />
);

const Panel = ({ wf, title, caption, right, children, className = '' }) => (
  <section
    data-wf={wf}
    className={`overflow-hidden ${className}`}
    style={{
      backgroundColor: T(0.045),
      border: `1px solid ${T(0.1)}`,
      borderRadius: '72px 72px 28px 28px',
    }}
  >
    <div className="flex flex-wrap items-end justify-between gap-4 px-6 pb-5 pt-10 md:px-10 md:pt-12">
      <div>
        <div className="flex items-center gap-3">
          <Arch />
          <h2 className="text-[22px] italic leading-tight md:text-[25px]" style={{ fontFamily: brand.fontHeading }}>
            {title}
          </h2>
        </div>
        {caption ? (
          <p className="mt-2 pl-[42px] text-[13px]" style={{ color: T(0.62) }}>{caption}</p>
        ) : null}
      </div>
      {right}
    </div>
    <div className="px-4 pb-8 md:px-8">{children}</div>
  </section>
);

const TogglePill = ({ on, onClick, onWord, offWord, ariaLabel }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={on}
    aria-label={ariaLabel}
    className={`inline-flex h-10 items-center gap-1.5 rounded-full px-3.5 text-[12.5px] font-medium transition-colors ${FOCUS}`}
    style={{
      backgroundColor: on ? G(0.22) : 'transparent',
      border: `1px solid ${on ? G(0.6) : T(0.2)}`,
      color: on ? ink : T(0.68),
    }}
  >
    {on ? <Icons.Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Icons.X className="h-3.5 w-3.5" aria-hidden="true" />}
    {on ? onWord : offWord}
  </button>
);

const StatusTag = ({ status }) => {
  const meta = STATUS_META[status] || STATUS_META.booked;
  const Ico = Icons[meta.icon];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12.5px] font-medium"
      style={{
        backgroundColor: meta.bg,
        border: `1px ${status === 'no-show' ? 'dashed' : 'solid'} ${meta.ring}`,
        color: status === 'cancelled' || status === 'no-show' ? T(0.7) : ink,
      }}
    >
      <Ico className="h-3.5 w-3.5" aria-hidden="true" />
      {meta.word}
    </span>
  );
};

const SpecTag = ({ name, active }) => (
  <span
    className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px]"
    style={{ backgroundColor: active ? T(0.07) : 'transparent', border: `1px ${active ? 'solid' : 'dashed'} ${T(0.18)}`, color: active ? ink : T(0.6) }}
  >
    {name}{active ? '' : ' · hidden'}
  </span>
);

const thCls = 'whitespace-nowrap px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em]';
const tdCls = 'px-4 py-4 text-[14px] align-middle';
const inputStyle = { borderRadius: 999, backgroundColor: cream, border: `1px solid ${T(0.18)}`, color: ink, height: 46, paddingLeft: 18, paddingRight: 18, width: '100%' };

export default function Screen() {
  const navigate = useNavigate();
  const [tab, setTab] = React.useState('doctors');
  const [doctors, setDoctors] = React.useState(DOCTOR_SEED);
  const [specs, setSpecs] = React.useState(SPEC_SEED);
  const [mappings, setMappings] = React.useState(MAPPING_SEED);
  const [appts, setAppts] = React.useState(APPT_SEED);
  const [audit] = React.useState(AUDIT_SEED);

  const [note, setNote] = React.useState(null);

  const [fDoctor, setFDoctor] = React.useState('d1');
  const [fPatient, setFPatient] = React.useState('any');
  const [fDate, setFDate] = React.useState('2026-11-21');
  const [fStatus, setFStatus] = React.useState('booked');
  const [loading, setLoading] = React.useState(false);
  const [synced, setSynced] = React.useState('14:32');

  const firstFilterPass = React.useRef(true);

  React.useEffect(() => {
    if (firstFilterPass.current) { firstFilterPass.current = false; return undefined; }
    setLoading(true);
    const id = setTimeout(() => { setLoading(false); setSynced('just now'); }, 650);
    return () => clearTimeout(id);
  }, [fDoctor, fPatient, fDate, fStatus]);

  const activeSpecs = specs.filter((s) => s.is_active);
  const doctorById = (id) => doctors.find((d) => d.id === id) || doctors[0];
  const specDoctorCount = (name) => doctors.filter((d) => d.specializations.indexOf(name) > -1).length;

  const patientOptions = React.useMemo(() => {
    const set = {};
    appts.forEach((a) => { set[a.patient] = true; });
    return Object.keys(set).sort();
  }, [appts]);

  const filtered = appts.filter((a) => (
    (fDoctor === 'any' || a.doctorId === fDoctor)
    && (fPatient === 'any' || a.patient === fPatient)
    && (fDate === '' || a.date === fDate)
    && (fStatus === 'any' || a.status === fStatus)
  ));

  const selectedVisible = filtered.length ? filtered[0] : null;
  const locked = selectedVisible && (selectedVisible.status === 'completed' || selectedVisible.status === 'cancelled');

  const slotGrid = (doctor, date) => {
    const taken = {};
    appts.forEach((a) => {
      if (a.doctorId === doctor.id && a.date === date && a.status !== 'cancelled') taken[a.time] = a.patient;
    });
    const out = [];
    let t = '09:00';
    while (t < '13:00') {
      out.push({ time: t, taken: taken[t] || null });
      t = addMinutes(t, doctor.slot_duration_minutes);
    }
    return out;
  };

  const onTabKey = (e, idx) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft' && e.key !== 'Home' && e.key !== 'End') return;
    e.preventDefault();
    let n = idx;
    if (e.key === 'ArrowRight') n = (idx + 1) % TABS.length;
    if (e.key === 'ArrowLeft') n = (idx - 1 + TABS.length) % TABS.length;
    if (e.key === 'Home') n = 0;
    if (e.key === 'End') n = TABS.length - 1;
    setTab(TABS[n].key);
    const el = document.getElementById(`tab-${TABS[n].key}`);
    if (el) el.focus();
  };

  const confirmReschedule = () => {
    if (!selectedVisible || locked) return;
    const doc = doctorById(selectedVisible.doctorId);
    let target = null;
    for (let i = 0; i < OPEN_DAYS.length && !target; i += 1) {
      const free = slotGrid(doc, OPEN_DAYS[i]).filter((s) => !s.taken)[0];
      if (free) target = { date: OPEN_DAYS[i], time: free.time };
    }
    if (!target) {
      setNote({
        tone: 'bad',
        text: `${doc.name} has no open slot left this week, so ${selectedVisible.patient} stays on ${fmtDate(selectedVisible.date)} at ${selectedVisible.time}. ask the doctor to open extra hours, then try again.`,
      });
      return;
    }
    const old = `${fmtDate(selectedVisible.date)}, ${selectedVisible.time}`;
    setAppts(appts.map((a) => (a.id === selectedVisible.id
      ? { ...a, date: target.date, time: target.time, status: 'booked', created_by: 'front desk · Ravi K' }
      : a)));
    setNote({
      tone: 'good',
      text: `${selectedVisible.patient} moved to ${fmtDate(target.date)} at ${target.time}, the next open slot with ${doc.name}. the ${old} slot is back in availability. the patient sees this in the app — no email or sms is sent in this version.`,
    });
  };

  const confirmCancel = () => {
    if (!selectedVisible || locked) return;
    setAppts(appts.map((a) => (a.id === selectedVisible.id ? { ...a, status: 'cancelled' } : a)));
    setNote({ tone: 'good', text: `${selectedVisible.patient}’s appointment on ${fmtDate(selectedVisible.date)} at ${selectedVisible.time} is cancelled and the slot is released.` });
  };

  const primaryBtn = `inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-5 text-[14.5px] font-semibold transition-transform duration-150 active:scale-[.98] ${FOCUS}`;
  const quietBtn = `inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-5 text-[14.5px] font-medium transition-colors duration-150 ${FOCUS}`;
  const primaryStyle = { backgroundColor: ink, color: cream, boxShadow: `0 0 0 4px ${G(0.22)}` };
  const quietStyle = { backgroundColor: cream, color: ink, border: `1px solid ${T(0.18)}` };

  const actionButton = (wf, label, active, onClick) => (
    <button
      type="button"
      data-wf={wf}
      onClick={onClick}
      className={active ? primaryBtn : quietBtn}
      style={active ? primaryStyle : quietStyle}
    >
      {wf !== 'b-2-3' ? <Icons.Plus className="h-4 w-4" aria-hidden="true" /> : <Icons.Calendar className="h-4 w-4" aria-hidden="true" />}
      {label}
    </button>
  );

  const fieldLabel = (htmlFor, text) => (
    <Label htmlFor={htmlFor} className="mb-2 block text-[12.5px] font-semibold tracking-wide" style={{ color: T(0.68) }}>{text}</Label>
  );

  return (
    <div
      className="mx-auto w-full max-w-[1200px] px-4 pb-28 pt-8 md:px-8"
      style={{ '--ring': gold, '--canvas': cream, color: ink, fontFamily: brand.fontBody, fontVariantNumeric: 'tabular-nums' }}
    >
      <style>{KEYFRAMES}</style>

      <div data-wf="b-0-0" className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[34px] italic leading-[1.1] md:text-[40px]" style={{ fontFamily: brand.fontHeading }}>
            Admin console
          </h1>
          <p className="mt-3 max-w-[62ch] text-[14.5px] leading-relaxed" style={{ color: T(0.66) }}>
            lotus park clinic, bengaluru · signed in as ravi kuruvilla, administrator · all times ist
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12.5px]" style={{ border: `1px solid ${T(0.16)}`, color: T(0.66) }}>
          <Icons.Clock className="h-3.5 w-3.5" aria-hidden="true" />
          clinic data synced {synced}
        </span>
      </div>

      {note ? (
        <div
          role="status"
          aria-live="polite"
          className="atrium-rise mt-6 flex items-start gap-3 px-6 py-4"
          style={note.tone === 'bad'
            ? { backgroundColor: T(0.07), border: `1px solid ${T(0.24)}`, borderRadius: 28 }
            : { backgroundColor: G(0.14), border: `1px solid ${G(0.45)}`, borderRadius: 28 }}
        >
          {note.tone === 'bad'
            ? <Icons.AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" style={{ color: ink }} />
            : <Icons.CheckCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" style={{ color: ink }} />}
          <p className="flex-1 text-[14px] leading-relaxed">{note.text}</p>
        </div>
      ) : null}

      <div
        data-wf="b-1-0"
        role="tablist"
        aria-label="Admin sections"
        className="mt-8 flex flex-wrap gap-2 rounded-full p-2"
        style={{ backgroundColor: T(0.06), border: `1px solid ${T(0.1)}` }}
      >
        {TABS.map((t, i) => {
          const on = tab === t.key;
          return (
            <button
              key={t.key}
              id={`tab-${t.key}`}
              data-wf={t.wf}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls={`panel-${t.key}`}
              tabIndex={on ? 0 : -1}
              onKeyDown={(e) => onTabKey(e, i)}
              onClick={() => setTab(t.key)}
              className={`h-11 rounded-full px-5 text-[14px] transition-colors duration-150 ${FOCUS}`}
              style={on
                ? { backgroundColor: ink, color: cream, fontWeight: 600 }
                : { color: T(0.72), border: `1px solid ${T(0.14)}` }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-12 gap-4">
        <div className="col-span-12 sm:col-span-6 lg:col-span-3">
          {actionButton('b-2-0', 'Add doctor', tab === 'doctors', () => {
            setTab('doctors');
            setNote({ tone: 'good', text: 'the roster is open below. a new doctor needs a name, one contact route and a specialization before patients can find them.' });
          })}
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-3">
          {actionButton('b-2-1', 'Add specialization', tab === 'specializations', () => {
            setTab('specializations');
            setNote({ tone: 'good', text: 'specializations are open below. names must be unique, and a deactivated one stays linked to the doctors already using it.' });
          })}
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-3">
          {actionButton('b-2-2', 'Add patient', tab === 'appointments', () => {
            setTab('appointments');
            setNote({ tone: 'good', text: 'a patient record is created at the point of booking — open “book for a patient” to enter their name and email or phone, then pick a slot.' });
          })}
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-3">
          {actionButton('b-2-3', 'Book for a patient', false, () => navigate('find-doctors'))}
        </div>
      </div>

      <div className="mt-8">
        {tab === 'doctors' ? (
          <div id="panel-doctors" role="tabpanel" aria-labelledby="tab-doctors" className="grid grid-cols-12 gap-6">
            <Panel
              wf="b-3-0"
              className="col-span-12"
              title={`Doctors (${doctors.length})`}
              caption={`${doctors.filter((d) => d.is_active).length} active in patient search · deactivating hides a doctor and stops new bookings`}
            >
              <div className="overflow-x-auto">
                <Table className="w-full min-w-[900px] border-collapse">
                  <THead>
                    <TR style={{ borderBottom: `1px solid ${T(0.14)}` }}>
                      <TH data-wf="i-3-0-0" className={thCls} style={{ color: T(0.62) }}>Name</TH>
                      <TH data-wf="i-3-0-1" className={thCls} style={{ color: T(0.62) }}>Specializations</TH>
                      <TH data-wf="i-3-0-2" className={thCls} style={{ color: T(0.62) }}>Contact email</TH>
                      <TH data-wf="i-3-0-3" className={thCls} style={{ color: T(0.62) }}>Contact phone</TH>
                      <TH data-wf="i-3-0-4" className={thCls} style={{ color: T(0.62) }}>Slot duration</TH>
                      <TH data-wf="i-3-0-5" className={thCls} style={{ color: T(0.62) }}>Active</TH>
                    </TR>
                  </THead>
                  <TBody>
                    {doctors.map((d) => (
                      <TR key={d.id} className={d.fresh ? 'atrium-row' : ''} style={{ borderBottom: `1px solid ${T(0.1)}`, opacity: d.is_active ? 1 : 0.72 }}>
                        <TD className={tdCls}>
                          <span className="flex items-center gap-3">
                            <Avatar name={d.name} className="h-9 w-9" />
                            <span className="font-semibold">{d.name}</span>
                          </span>
                        </TD>
                        <TD className={tdCls}>
                          <span className="flex flex-wrap gap-1.5">
                            {d.specializations.map((s) => (
                              <SpecTag key={s} name={s} active={activeSpecs.some((x) => x.name === s)} />
                            ))}
                          </span>
                        </TD>
                        <TD className={tdCls} style={{ color: T(0.72) }}>{d.contact_email}</TD>
                        <TD className={tdCls} style={{ color: T(0.72) }}>{d.contact_phone}</TD>
                        <TD className={tdCls}>{d.slot_duration_minutes} min</TD>
                        <TD className={tdCls}>
                          <TogglePill
                            on={d.is_active}
                            onWord="active"
                            offWord="deactivated"
                            ariaLabel={`${d.is_active ? 'Deactivate' : 'Reactivate'} ${d.name}`}
                            onClick={() => {
                              setDoctors(doctors.map((x) => (x.id === d.id ? { ...x, is_active: !x.is_active } : x)));
                              setNote({
                                tone: 'good',
                                text: d.is_active
                                  ? `${d.name} is deactivated — hidden from patient search, no new slots generated. booked appointments are untouched.`
                                  : `${d.name} is back in patient search. existing weekly hours apply from the next slot run.`,
                              });
                            }}
                          />
                        </TD>
                      </TR>
                    ))}
                  </TBody>
                </Table>
              </div>
            </Panel>
          </div>
        ) : null}

        {tab === 'specializations' ? (
          <div id="panel-specializations" role="tabpanel" aria-labelledby="tab-specializations" className="grid grid-cols-12 gap-6">
            <Panel
              wf="b-4-0"
              className="col-span-12 lg:col-span-6"
              title={`Specializations (${specs.length})`}
              caption="used by doctor profiles, disease mappings and patient search"
            >
              <div className="overflow-x-auto">
                <Table className="w-full min-w-[420px] border-collapse">
                  <THead>
                    <TR style={{ borderBottom: `1px solid ${T(0.14)}` }}>
                      <TH data-wf="i-4-0-0" className={thCls} style={{ color: T(0.62) }}>Name</TH>
                      <TH data-wf="i-4-0-1" className={thCls} style={{ color: T(0.62) }}>Doctors</TH>
                      <TH data-wf="i-4-0-2" className={thCls} style={{ color: T(0.62) }}>Active</TH>
                    </TR>
                  </THead>
                  <TBody>
                    {specs.map((s) => (
                      <TR key={s.id} className={s.fresh ? 'atrium-row' : ''} style={{ borderBottom: `1px solid ${T(0.1)}` }}>
                        <TD className={`${tdCls} font-semibold`}>{s.name}</TD>
                        <TD className={tdCls} style={{ color: T(0.72) }}>{specDoctorCount(s.name)}</TD>
                        <TD className={tdCls}>
                          <TogglePill
                            on={s.is_active}
                            onWord="active"
                            offWord="hidden"
                            ariaLabel={`${s.is_active ? 'Deactivate' : 'Reactivate'} the ${s.name} specialization`}
                            onClick={() => {
                              setSpecs(specs.map((x) => (x.id === s.id ? { ...x, is_active: !x.is_active } : x)));
                              setNote({
                                tone: 'good',
                                text: s.is_active
                                  ? `“${s.name}” is hidden from new selections. the ${specDoctorCount(s.name)} doctor(s) already linked to it keep the link.`
                                  : `“${s.name}” is selectable again for doctors and mappings.`,
                              });
                            }}
                          />
                        </TD>
                      </TR>
                    ))}
                  </TBody>
                </Table>
              </div>
            </Panel>

            <div
              data-wf="b-5-0"
              className="col-span-12 flex items-start gap-4 px-6 py-6 md:px-10"
              style={{ backgroundColor: T(0.06), border: `1px solid ${T(0.12)}`, borderRadius: 28 }}
            >
              <Icons.AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" style={{ color: gold }} />
              <p className="max-w-[80ch] text-[14px] leading-relaxed">
                Duplicate name rejected: &ldquo;Cardiology&rdquo; already exists. Deactivated entries stay linked to existing doctors and mappings but are hidden from new selections.
              </p>
            </div>
          </div>
        ) : null}

        {tab === 'mappings' ? (
          <div id="panel-mappings" role="tabpanel" aria-labelledby="tab-mappings" className="grid grid-cols-12 gap-6">
            <Panel
              wf="b-4-1"
              className="col-span-12 lg:col-span-6"
              title={`Disease and symptom mappings (${mappings.length})`}
              caption="a plain lookup table — patient search reads these rows and nothing else"
            >
              <div className="max-h-[560px] overflow-auto pr-1">
                <Table className="w-full min-w-[520px] border-collapse">
                  <THead>
                    <TR style={{ borderBottom: `1px solid ${T(0.14)}` }}>
                      <TH data-wf="i-4-1-0" className={thCls} style={{ color: T(0.62) }}>Term</TH>
                      <TH data-wf="i-4-1-1" className={thCls} style={{ color: T(0.62) }}>Term type</TH>
                      <TH data-wf="i-4-1-2" className={thCls} style={{ color: T(0.62) }}>Specializations</TH>
                      <TH data-wf="i-4-1-3" className={thCls} style={{ color: T(0.62) }}>Active</TH>
                    </TR>
                  </THead>
                  <TBody>
                    {mappings.map((m) => (
                      <TR key={m.id} className={m.fresh ? 'atrium-row' : ''} style={{ borderBottom: `1px solid ${T(0.1)}` }}>
                        <TD className={`${tdCls} font-semibold`}>{m.term}</TD>
                        <TD className={tdCls}>
                          <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px]" style={{ border: `1px solid ${T(0.18)}`, color: T(0.7) }}>
                            {m.term_type === 'disease' ? <Icons.Package className="h-3 w-3" aria-hidden="true" /> : <Icons.Bell className="h-3 w-3" aria-hidden="true" />}
                            {m.term_type}
                          </span>
                        </TD>
                        <TD className={tdCls}>
                          <span className="flex flex-wrap gap-1.5">
                            {m.specs.map((s) => <SpecTag key={s} name={s} active={activeSpecs.some((x) => x.name === s)} />)}
                          </span>
                        </TD>
                        <TD className={tdCls}>
                          <TogglePill
                            on={m.is_active}
                            onWord="in search"
                            offWord="retired"
                            ariaLabel={`${m.is_active ? 'Retire' : 'Restore'} the mapping for ${m.term}`}
                            onClick={() => {
                              setMappings(mappings.map((x) => (x.id === m.id ? { ...x, is_active: !x.is_active } : x)));
                              setNote({ tone: 'good', text: m.is_active ? `“${m.term}” no longer returns doctors in patient search.` : `“${m.term}” is back in patient search.` });
                            }}
                          />
                        </TD>
                      </TR>
                    ))}
                  </TBody>
                </Table>
              </div>
            </Panel>
          </div>
        ) : null}

        {tab === 'appointments' ? (
          <div id="panel-appointments" role="tabpanel" aria-labelledby="tab-appointments" className="grid grid-cols-12 gap-6">
            <section
              data-wf="b-6-0"
              className="col-span-12 px-6 py-7 md:px-10"
              style={{ backgroundColor: T(0.06), border: `1px solid ${T(0.12)}`, borderRadius: 28 }}
            >
              <div className="flex items-center gap-2">
                <Icons.Filter className="h-4 w-4" aria-hidden="true" style={{ color: gold }} />
                <h2 className="text-[16px] font-semibold tracking-wide">Filter the clinic schedule</h2>
              </div>
              <div className="mt-5 grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-3">
                  {fieldLabel('f-doctor', 'Doctor')}
                  <Select id="f-doctor" data-wf="i-6-0-0" value={fDoctor} onChange={(e) => setFDoctor(e.target.value)} style={inputStyle}>
                    {doctors.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </Select>
                </div>
                <div className="col-span-12 md:col-span-3">
                  {fieldLabel('f-patient', 'Patient')}
                  <Select id="f-patient" data-wf="i-6-0-1" value={fPatient} onChange={(e) => setFPatient(e.target.value)} style={inputStyle}>
                    <option value="any">any patient</option>
                    {patientOptions.map((p) => <option key={p} value={p}>{p}</option>)}
                  </Select>
                </div>
                <div className="col-span-12 md:col-span-3">
                  {fieldLabel('f-date', 'Date')}
                  <Input id="f-date" data-wf="i-6-0-2" type="date" value={fDate} onChange={(e) => setFDate(e.target.value)} style={inputStyle} />
                </div>
                <div className="col-span-12 md:col-span-3">
                  {fieldLabel('f-status', 'Status')}
                  <Select id="f-status" data-wf="i-6-0-3" value={fStatus} onChange={(e) => setFStatus(e.target.value)} style={inputStyle}>
                    <option value="booked">booked</option>
                    <option value="confirmed">confirmed</option>
                    <option value="completed">completed</option>
                    <option value="cancelled">cancelled</option>
                    <option value="no-show">no-show</option>
                  </Select>
                </div>
              </div>
              <p className="mt-5 text-[13px]" style={{ color: T(0.64) }}>
                {filtered.length} of {appts.length} appointments match. set a filter back to “any” to widen the list.
              </p>
            </section>

            <Panel
              wf="b-7-0"
              className="col-span-12"
              title={`All appointments (${appts.length})`}
              caption="the first match is the one the actions below work on — narrow the filters to reach another"
              right={(
                <span
                  aria-live="polite"
                  className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[12.5px]"
                  style={{ border: `1px solid ${T(0.16)}`, color: T(0.66) }}
                >
                  <Icons.Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {loading ? 're-checking open slots…' : `synced ${synced}`}
                </span>
              )}
            >
              <div className="overflow-x-auto">
                <Table className="w-full min-w-[920px] border-collapse">
                  <THead>
                    <TR style={{ borderBottom: `1px solid ${T(0.14)}` }}>
                      <TH data-wf="i-7-0-0" className={thCls} style={{ color: T(0.62) }}>Patient</TH>
                      <TH data-wf="i-7-0-1" className={thCls} style={{ color: T(0.62) }}>Doctor</TH>
                      <TH data-wf="i-7-0-2" className={thCls} style={{ color: T(0.62) }}>Date</TH>
                      <TH data-wf="i-7-0-3" className={thCls} style={{ color: T(0.62) }}>Time</TH>
                      <TH data-wf="i-7-0-4" className={thCls} style={{ color: T(0.62) }}>Status</TH>
                      <TH data-wf="i-7-0-5" className={thCls} style={{ color: T(0.62) }}>Booked by</TH>
                    </TR>
                  </THead>
                  <TBody>
                    {loading ? [0, 1, 2, 3].map((i) => (
                      <TR key={`sk${i}`} style={{ borderBottom: `1px solid ${T(0.1)}` }}>
                        <TD className={tdCls} colSpan={6}>
                          <span className="atrium-breathe block h-5 rounded-full" style={{ backgroundColor: T(0.12) }} />
                        </TD>
                      </TR>
                    )) : filtered.map((a) => {
                      const doc = doctorById(a.doctorId);
                      const on = selectedVisible && selectedVisible.id === a.id;
                      return (
                        <TR
                          key={a.id}
                          style={{
                            borderBottom: `1px solid ${T(0.1)}`,
                            backgroundColor: on ? G(0.12) : 'transparent',
                            boxShadow: on ? `inset 3px 0 0 ${gold}` : 'none',
                          }}
                        >
                          <TD className={tdCls}>
                            <span
                              className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-left"
                              style={{
                                backgroundColor: on ? G(0.2) : 'transparent',
                                border: `1px solid ${on ? G(0.6) : T(0.16)}`,
                                color: ink,
                              }}
                            >
                              <span className="font-semibold">{a.patient}</span>
                              <span className="text-[12px] font-normal" style={{ color: T(0.58) }}>{a.id}</span>
                              {on ? (
                                <span className="inline-flex items-center gap-1 text-[12px] font-medium">
                                  <Icons.Check className="h-3.5 w-3.5" aria-hidden="true" />
                                  selected
                                </span>
                              ) : null}
                            </span>
                          </TD>
                          <TD className={tdCls} style={{ color: T(0.78) }}>{doc.name}</TD>
                          <TD className={tdCls}>{fmtDate(a.date)}</TD>
                          <TD className={tdCls}>{a.time} – {addMinutes(a.time, doc.slot_duration_minutes)}</TD>
                          <TD className={tdCls}><StatusTag status={a.status} /></TD>
                          <TD className={tdCls} style={{ color: T(0.66) }}>{a.created_by}</TD>
                        </TR>
                      );
                    })}
                  </TBody>
                </Table>
              </div>

              {!loading && filtered.length === 0 ? (
                <div className="atrium-rise px-2 py-6">
                  <Empty
                    title="nothing booked against those filters"
                    description="no appointment matches this doctor, patient, date and status together. widen the date, or try another status."
                  />
                </div>
              ) : null}
            </Panel>

            <div className="col-span-12 md:col-span-6">
              <button
                type="button"
                data-wf="b-8-0"
                disabled={!selectedVisible || locked}
                onClick={confirmReschedule}
                className={primaryBtn}
                style={!selectedVisible || locked
                  ? { backgroundColor: T(0.1), color: T(0.5), border: `1px solid ${T(0.14)}`, cursor: 'not-allowed' }
                  : primaryStyle}
              >
                <Icons.Calendar className="h-4 w-4" aria-hidden="true" />
                Reschedule appointment
              </button>
            </div>
            <div className="col-span-12 md:col-span-6">
              <button
                type="button"
                data-wf="b-8-1"
                disabled={!selectedVisible || locked}
                onClick={confirmCancel}
                className={quietBtn}
                style={!selectedVisible || locked
                  ? { backgroundColor: 'transparent', color: T(0.5), border: `1px dashed ${T(0.2)}`, cursor: 'not-allowed' }
                  : quietStyle}
              >
                <Icons.X className="h-4 w-4" aria-hidden="true" />
                Cancel appointment
              </button>
            </div>
            <p className="col-span-12 -mt-2 max-w-[80ch] text-[13px] leading-relaxed" style={{ color: T(0.62) }}>
              {!selectedVisible
                ? 'no appointment matches these filters, so there is nothing to act on yet. widen the date or the status above.'
                : locked
                  ? `${selectedVisible.patient}’s visit is ${selectedVisible.status} — completed and cancelled appointments cannot be changed from here.`
                  : `acting on ${selectedVisible.patient} · ${doctorById(selectedVisible.doctorId).name} · ${fmtDate(selectedVisible.date)} ${selectedVisible.time}. rescheduling moves them into the doctor’s next open slot and frees the old one; cancelling releases the slot straight away.`}
            </p>
          </div>
        ) : null}

        {tab === 'audit' ? (
          <div id="panel-audit" role="tabpanel" aria-labelledby="tab-audit" className="grid grid-cols-12 gap-6">
            <Panel
              wf="b-9-0"
              className="col-span-12"
              title="Consultation record audit trail"
              caption="who read or changed a clinical record, and when · administrators only, retained in-country"
            >
              <div className="overflow-x-auto">
                <Table className="w-full min-w-[820px] border-collapse">
                  <THead>
                    <TR style={{ borderBottom: `1px solid ${T(0.14)}` }}>
                      <TH data-wf="i-9-0-0" className={thCls} style={{ color: T(0.62) }}>When</TH>
                      <TH data-wf="i-9-0-1" className={thCls} style={{ color: T(0.62) }}>Actor</TH>
                      <TH data-wf="i-9-0-2" className={thCls} style={{ color: T(0.62) }}>Action</TH>
                      <TH data-wf="i-9-0-3" className={thCls} style={{ color: T(0.62) }}>Entity type</TH>
                      <TH data-wf="i-9-0-4" className={thCls} style={{ color: T(0.62) }}>Record id</TH>
                    </TR>
                  </THead>
                  <TBody>
                    {audit.map((e) => {
                      const Ico = Icons[ACTION_ICON[e.action] || 'FileText'];
                      return (
                        <TR key={e.id} className={e.fresh ? 'atrium-row' : ''} style={{ borderBottom: `1px solid ${T(0.1)}` }}>
                          <TD className={tdCls}>
                            <span className="font-semibold">{e.at}</span>
                            <span className="ml-2" style={{ color: T(0.6) }}>{e.day}</span>
                          </TD>
                          <TD className={tdCls}>{e.actor}</TD>
                          <TD className={tdCls}>
                            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12.5px]" style={{ backgroundColor: e.action === 'viewed' ? 'transparent' : G(0.16), border: `1px solid ${e.action === 'viewed' ? T(0.2) : G(0.5)}` }}>
                              <Ico className="h-3.5 w-3.5" aria-hidden="true" />
                              {e.action}
                            </span>
                          </TD>
                          <TD className={tdCls} style={{ color: T(0.7) }}>{e.entity}</TD>
                          <TD className={tdCls}>{e.record}</TD>
                        </TR>
                      );
                    })}
                  </TBody>
                </Table>
              </div>
              <p className="mt-6 max-w-[78ch] px-4 text-[13px] leading-relaxed" style={{ color: T(0.62) }}>
                entries are written by the server on every read and every change, and cannot be edited from this console.
                doctors see only the records they are party to; patients see only their own.
              </p>
            </Panel>
          </div>
        ) : null}
      </div>
    </div>
  );
}
