import { useState, useEffect } from 'react';
import { TriangleAlert } from 'lucide-react';
import { User } from 'lucide-react';
import { Stethoscope } from 'lucide-react';
import { Activity } from 'lucide-react';
import { History, Paperclip } from 'lucide-react';
import { Pill } from 'lucide-react';
import { FileUser } from 'lucide-react';
import { usePatient } from '../context/PatientContext';

/* ── Top Nav ── */
function TopNav({ dept }) {
  return (
    <nav className="bg-white border-b border-gray-200 py-3 px-6 h-13 flex items-center gap-2 text-sm text-gray-500 sticky top-0 z-10">
      <span className="text-gray-500">{dept || 'OPD'}</span>
      <span className="text-gray-300">›</span>
      <span className="text-gray-900 font-medium">Medical Desktop</span>
    </nav>
  );
}

/* ── Page Header ── */
function PageHeader() {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-5">
      <h1 className="text-2xl font-semibold text-slate-900 tracking-tight mb-1">
        Patient Info
      </h1>
      <div className="flex justify-between">
        <p className="text-sm text-gray-500 leading-relaxed max-w-xl">
          A unified clinical overview combining consultation, medications, vitals,
          diagnostic requests, and recent visit history for quick doctor review.
        </p>
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <div className="flex items-center gap-2 bg-slate-50 border ms-5 border-gray-200 rounded-lg px-3 py-2 flex-1 min-w-[350px] max-w-xs">
            <span className="text-gray-400 text-sm"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B9BFC1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg></span>
            <input
              className="bg-transparent border-none outline-none text-sm text-gray-500 w-full placeholder:text-gray-400"
              placeholder="Search medication, note, request…"
            />
          </div>
          <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium border border-gray-200 bg-white text-gray-700 hover:bg-slate-50 transition-colors whitespace-nowrap cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B9BFC1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"/><rect x="6" y="14" width="12" height="8" rx="1"/></svg> Print Summary
          </button>
          <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium bg-[#197F86] text-white hover:bg-teal-600 transition-colors whitespace-nowrap cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/></svg> Export PDF
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Stat Strip ── */
function StatStrip({ medications = [], diagnostics = [], visits = [], vitals = [] }) {
  const activeMeds = medications.filter(m => m.status === 'active');
  const latestBP = vitals.find(v => v.label === 'Blood Pressure');
  const pendingReqs = diagnostics.filter(d => d.status === 'pending');

  const stats = [
    {
      label: 'Active Medications',
      value: String(activeMeds.length || medications.length || '—'),
      sub: activeMeds.slice(0, 2).map(m => m.name).join(', ') || 'No medications on record',
      valueColor: 'text-slate-900',
    },
    {
      label: 'Latest Blood Pressure',
      value: latestBP?.value || '—',
      sub: latestBP ? `Recorded ${latestBP.date}` : 'No vitals recorded',
      subColor: 'text-[#0F4B50]',
    },
    {
      label: 'Open Requests',
      value: String(pendingReqs.length || '—'),
      sub: pendingReqs.length ? `${pendingReqs.length} pending result(s)` : 'No pending requests',
      badge: pendingReqs.length ? 'Pending' : null,
    },
    {
      label: 'Recent Visits',
      value: String(visits.length || '—'),
      sub: visits[0] ? `Last encounter on ${visits[0].date}` : 'No visit history',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <div key={i} className="bg-[#E9F7F7] border border-gray-200 rounded-xl p-4">
          <p className="text-[14px] uppercase tracking-wide text-gray-400 font-medium mb-2">{s.label}</p>
          <p className={`text-[23px] font-bold leading-none ${s.valueColor || 'text-slate-900'}`}>{s.value}</p>
          <p className={`text-[15] mt-1.5 ${s.subColor || 'text-[#0F4B50]'}`}>{s.sub}</p>
        </div>
      ))}
    </div>
  );
}

/* ── Reusable Card ── */
function Card({ children, className = '' }) {
  return (
    <div className={`bg-white border border-gray-200 rounded-xl overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

function CardHeader({ title, icon, iconBg, badge, badgeClass }) {
  return (
    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
      <div className="flex items-center gap-2 text-lg font-semibold text-slate-900">
        <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm ${iconBg}`}>{icon}</span>
        {title}
      </div>
      {badge && (
        <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium border ${badgeClass}`}>{badge}</span>
      )}
    </div>
  );
}

/* ── Clinical Alerts ── */
function ClinicalAlerts({ note }) {
  return (
    <Card>
      <CardHeader
        icon={<TriangleAlert size={23} color="#7a5100" />}
        iconBg="bg-orange-50"
        title="Clinical Alerts & Sticky Notes"
        badge="Needs attention"
        badgeClass="bg-orange-50 text-orange-700 border-orange-200"
      />
      <div className="p-5">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2.5 mb-3">
          <span className="text-base flex-shrink-0 mt-0.5"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7a5100" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"/><path d="M15 3v5a1 1 0 0 0 1 1h5"/></svg></span>
          <div className="text-sm text-amber-900 leading-relaxed">
            {note || 'No clinical notes on record.'}
          </div>
        </div>
      </div>
    </Card>
  );
}

/* ── Patient Overview ── */
function PatientOverview({ patient }) {
  const fields = [
    { label: 'MRN',        value: patient?.mrn || '—' },
    { label: 'Gender',     value: patient?.gender || '—' },
    { label: 'Age',        value: patient?.age ? `${patient.age} yrs` : '—' },
    { label: 'Department', value: patient?.department || '—' },
    { label: 'Name (AR)',  value: patient?.nameAr || '—' },
  ];

  return (
    <Card>
      <CardHeader icon={<User size={23} color="#197F86" />} iconBg="" title="Patient Overview" />
      <div className="p-5">
        <p className="text-lg font-semibold text-slate-900 mb-3">{patient?.name || '—'}</p>
        <div className="grid grid-cols-2 gap-3">
          {fields.map((f, i) => (
            <div key={i}>
              <p className="text-[14px] uppercase tracking-wide text-gray-400 font-medium mb-1">{f.label}</p>
              <p className="text-[15px] font-medium text-slate-900">{f.value}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

/* ── Consultation Overview ── */
function ConsultationOverview({ data }) {
  const diagnosis = data?.diagnoses?.[0];
  const clinicalNotes = data?.clinicalNotes || '';
  const visit = data?.visits?.[0];

  return (
    <Card>
      <CardHeader
        icon={<Stethoscope size={23} color="#197F86" />}
        iconBg=""
        title="Consultation Overview"
        badge="Current encounter"
        badgeClass="bg-green-50 text-green-700"
      />
      <div className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3">
          <div>
            <p className="text-[14px] uppercase tracking-wide text-gray-400 font-medium mb-1">Primary Diagnosis</p>
            <span className="inline-block text-[15px] text-slate-900 px-2 py-1 font-medium mt-0.5">
              {diagnosis ? `${diagnosis.icd} · ${diagnosis.title}` : '—'}
            </span>
          </div>
          <div>
            <p className="text-[14px] uppercase tracking-wide text-gray-400 font-medium mb-1">Attending Doctor</p>
            <p className="text-[15px] font-medium text-slate-900">{visit?.doctor || '—'}</p>
          </div>
          <div>
            <p className="text-[14px] uppercase tracking-wide text-gray-400 font-medium mb-1">Department</p>
            <p className="text-[15px] font-medium text-slate-900">{visit?.title || '—'}</p>
          </div>
          <div>
            <p className="text-[14px] uppercase tracking-wide text-gray-400 font-medium mb-1">Visit Type</p>
            <p className="text-[15px] font-medium text-slate-900">{visit?.type || 'Outpatient'}</p>
          </div>
        </div>
        {clinicalNotes && (
          <div className="mt-4 pt-3 border-t border-slate-100">
            <p className="text-[14px] uppercase tracking-wide text-gray-400 font-medium mb-2">Clinical Notes</p>
            <p className="text-[15px] text-gray-600 leading-relaxed bg-slate-50 border border-slate-100 rounded-lg p-3">
              {clinicalNotes}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}

/* ── Latest Vitals ── */
function LatestVitals({ vitals: apiVitals }) {
  const UNIT_MAP = { pressure: 'mmHg', heart: 'bpm', temp: '°C', wind: '%' };

  const vitals = apiVitals?.length
    ? apiVitals.map(v => ({
        label: v.label,
        value: String(v.value),
        unit: v.unit || UNIT_MAP[v.type] || '',
        status: v.status || 'Normal',
        statusCls: v.status === 'High' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700',
        dot: v.status === 'High' ? 'bg-red-500' : 'bg-green-500',
        valCls: v.status === 'High' ? 'text-red-600' : 'text-slate-900',
      }))
    : [
        { label: 'Blood Pressure', value: '—', unit: 'mmHg', status: 'N/A', statusCls: 'bg-gray-50 text-gray-400', dot: 'bg-gray-300', valCls: 'text-slate-900' },
        { label: 'Heart Rate',     value: '—', unit: 'bpm',  status: 'N/A', statusCls: 'bg-gray-50 text-gray-400', dot: 'bg-gray-300', valCls: 'text-slate-900' },
        { label: 'Temperature',    value: '—', unit: '°C',   status: 'N/A', statusCls: 'bg-gray-50 text-gray-400', dot: 'bg-gray-300', valCls: 'text-slate-900' },
        { label: 'SpO₂',           value: '—', unit: '%',    status: 'N/A', statusCls: 'bg-gray-50 text-gray-400', dot: 'bg-gray-300', valCls: 'text-slate-900' },
      ];

  return (
    <Card>
      <CardHeader
        icon={<Activity size={23} color="#197F86" />}
        iconBg=""
        title="Latest Vital Signs"
        badge="From last visit"
        badgeClass="bg-blue-50 text-blue-700 border-blue-200"
      />
      <div className="p-5">
        <div className="grid grid-cols-2 gap-3">
          {vitals.map((v, i) => (
            <div key={i} className="bg-[#F6F7F8] border border-slate-100 rounded-xl p-3">
              <p className="text-[14px] uppercase tracking-wide text-gray-400 font-medium mb-1">{v.label}</p>
              <p className={`text-xl font-semibold font-mono leading-none ${v.valCls}`}>
                {v.value}
                <span className="text-xs text-gray-400 font-normal ml-0.5">{v.unit}</span>
              </p>
              <span className={`inline-flex items-center gap-1 text-[13px] font-medium mt-1.5 px-1.5 py-0.5 rounded-full ${v.statusCls}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${v.dot}`}></span>
                {v.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

const MedicationItem = ({ name, instruction, status, tags }) => (
  <div className="bg-slate-50/50 p-4 rounded-lg border border-slate-100 relative">
    <div className="flex justify-between items-start mb-1">
      <h3 className="font-bold text-slate-800 text-sm md:text-base">{name}</h3>
      <span className="text-[13px] uppercase tracking-wider text-slate-400 font-medium">{status}</span>
    </div>
    <p className="text-slate-500 text-xs md:text-sm mb-3">{instruction}</p>
    <div className="flex flex-wrap gap-2">
      {tags.map(tag => (
        <span key={tag} className={`px-2 py-1 rounded text-[11px] font-medium ${tag.includes('Started') ? 'bg-emerald-100 text-emerald-700' : 'bg-cyan-50 text-cyan-700'}`}>
          {tag}
        </span>
      ))}
    </div>
  </div>
);

const VisitItem = ({ date, dept, doctor, reason, badges = [] }) => (
  <div className="border-b border-slate-50 last:border-0 pb-4 last:pb-0">
    <div className="flex justify-between items-start mb-1">
      <div className="text-sm font-bold text-slate-700 flex items-center gap-2">
        {date} <span className="text-slate-300">•</span> {dept}
      </div>
      <div className="text-xs text-slate-400">{doctor}</div>
    </div>
    <p className="text-sm text-slate-500 mb-3">{reason}</p>
    <div className="flex flex-wrap gap-2">
      {badges.map(b => (
        <span key={b} className="px-2 py-1 bg-teal-50 text-teal-600 rounded text-[11px] font-medium border border-teal-100">{b}</span>
      ))}
    </div>
  </div>
);

const RequestItem = ({ title, date, priority, status }) => (
  <div className="p-4 flex justify-between items-center group hover:bg-slate-50 transition-colors">
    <div className="space-y-1">
      <h4 className="text-sm font-bold text-slate-700 leading-none">{title}</h4>
      <p className="text-[11px] text-slate-400">{date} • Priority: {priority}</p>
    </div>
    <span className={`text-xs font-medium ${status === 'pending' ? 'text-slate-300' : 'text-emerald-500'}`}>
      {status === 'pending' ? 'Pending' : 'Completed'}
    </span>
  </div>
);

const FileItem = ({ title, desc }) => (
  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
    <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-400">
      <Paperclip size={16} />
    </div>
    <div className="flex-1">
      <div className="flex justify-between">
        <h4 className="text-sm font-semibold text-slate-700">{title}</h4>
        <span className="text-[10px] text-slate-400 font-bold">PDF</span>
      </div>
      <p className="text-[11px] text-slate-400">{desc}</p>
    </div>
  </div>
);

function Dashboard({ medications = [], visits = [], diagnostics = [] }) {
  const medItems = medications.length
    ? medications.map(m => ({
        name: m.name,
        instruction: m.instructions || '',
        status: m.status || 'Active',
        tags: [m.date ? `Started ${m.date}` : null, m.doctor || null].filter(Boolean),
      }))
    : [
        { name: 'No medications on record', instruction: '', status: '', tags: [] },
      ];

  const visitItems = visits.length
    ? visits.map(v => ({
        date: v.date,
        dept: v.title,
        doctor: v.doctor,
        reason: '',
        badges: [v.type || 'Outpatient'],
      }))
    : [];

  const completedDiag = diagnostics.filter(d => d.status !== 'pending');

  return (
    <div className="font-sans">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white border-gray-200 rounded-xl shadow-sm border overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white">
              <div className="flex items-center gap-2 font-semibold">
                <Pill size={23} color="#197F86" />
                <h2>Medication Record</h2>
              </div>
              <span className="text-xs text-slate-400">Active treatment</span>
            </div>
            <div className="p-4 space-y-4">
              {medItems.map((m, i) => (
                <MedicationItem key={i} {...m} />
              ))}
            </div>
          </section>

          {visitItems.length > 0 && (
            <section className="bg-white border-gray-200 rounded-xl shadow-sm border overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                <div className="flex items-center gap-2 text-slate-900 font-semibold">
                  <History size={23} color="#197F86" />
                  <h2>Recent Visit History</h2>
                </div>
                <span className="text-xs text-slate-400">Last {visitItems.length} encounter(s)</span>
              </div>
              <div className="p-4 space-y-6">
                {visitItems.map((v, i) => (
                  <VisitItem key={i} {...v} />
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="space-y-6">
          <section className="bg-white border-gray-200 rounded-xl shadow-sm border overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-2 text-slate-900 font-semibold">
                <FileUser size={23} color="#197F86" />
                <h2>Diagnostic Requests</h2>
              </div>
              <span className="text-xs text-slate-400 font-medium">Pending & recent</span>
            </div>
            <div className="divide-y divide-slate-50">
              {diagnostics.length
                ? diagnostics.map((d, i) => (
                    <RequestItem key={i} title={d.title} date={d.date} priority="Routine" status={d.status} />
                  ))
                : <p className="p-4 text-sm text-slate-400 italic">No diagnostic requests on record.</p>
              }
            </div>
          </section>

          {completedDiag.length > 0 && (
            <section className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex items-center gap-2 text-slate-900 font-semibold">
                <Paperclip size={23} color="#197F86" />
                <h2>Attachments & Results</h2>
              </div>
              <div className="p-2 space-y-1">
                {completedDiag.map((d, i) => (
                  <FileItem key={i} title={d.title} desc={`Completed ${d.date}`} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Root export ── */
export default function PatientInfo() {
  const { patient } = usePatient();
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!patient?.id) return;
    setLoading(true);
    fetch(`/agial/patient/${patient.id}/summary`, { credentials: 'include' })
      .then(r => r.ok ? r.json() : null)
      .then(d => { setApiData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [patient?.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-8">
      <TopNav dept={patient?.department} />
      <PageHeader />
      <div className="mx-auto px-4 sm:px-5 pt-5 flex flex-col gap-4">
        <StatStrip
          medications={apiData?.medications || []}
          diagnostics={apiData?.diagnostics || []}
          visits={apiData?.visits || []}
          vitals={apiData?.vitals || []}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ClinicalAlerts note={patient?.note || apiData?.clinicalNotes} />
          <PatientOverview patient={patient} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ConsultationOverview data={apiData} />
          <LatestVitals vitals={apiData?.vitals} />
        </div>
        <Dashboard
          medications={apiData?.medications || []}
          visits={apiData?.visits || []}
          diagnostics={apiData?.diagnostics || []}
        />
      </div>
    </div>
  );
}
