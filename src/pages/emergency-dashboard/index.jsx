import { useState, useEffect } from 'react'
import { TopBar }    from '../opd-dashboard/TopBar'
import { TriageRow } from './TriageRow'

// ── dev mock ────────────────────────────────────────────────────

const DEV_MOCK = {
  user: { name: 'Eng. Ahmed X', role: 'CRM Specialist', lab_reqs: 4, pharmacy: 9 },
  date: new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
  stats: {
    total_patients:   23,
    patients_delta:   '+3 in last hour',
    avg_wait_mins:    17,
    wait_delta:       '-4 mins',
    critical_count:   5,
    critical_note:    '2 Trauma',
    available_beds:   6,
    total_beds:       24,
    beds_note:        'High Occupancy',
  },
  queue: [
    { id: 1, level: 'L1', name: 'أحمد محمود السيد',    gender_note: 'Male, 42',   elapsed: '8m elapsed',     bed: 'Trauma 1',     doctor: 'د/بهاء حماد',       triage_category: 'Resuscitation', status_label: 'CPR in Progress',    status_type: 'critical' },
    { id: 2, level: 'L1', name: 'سارة علي حسن',        gender_note: 'Female, 28', elapsed: '15m elapsed',    bed: 'Trauma 2',     doctor: 'د/بهاء حماد',       triage_category: 'Resuscitation', status_label: 'Intubated',          status_type: 'critical' },
    { id: 3, level: 'L2', name: 'محمد عبد الرحمن',     gender_note: 'Male, 65',   elapsed: '31m elapsed',    bed: 'ER-02',        doctor: 'د/حسام عزب',        triage_category: 'Emergent',      status_label: 'Awaiting CT Scan',   status_type: 'warning'  },
    { id: 4, level: 'L2', name: 'فاطمة خالد إبراهيم',  gender_note: 'Female, 34', elapsed: '44m elapsed',    bed: 'ER-05',        doctor: 'د/ايمان ابراهيم',   triage_category: 'Emergent',      status_label: 'OB Emergency',       status_type: 'warning'  },
    { id: 5, level: 'L2', name: 'خالد مصطفى عمر',      gender_note: 'Male, 55',   elapsed: '52m elapsed',    bed: 'ER-07',        doctor: 'د/حسام عزب',        triage_category: 'Emergent',      status_label: 'Awaiting ECG',       status_type: 'warning'  },
    { id: 6, level: 'L3', name: 'منى سعيد توفيق',      gender_note: 'Female, 29', elapsed: '1h 5m elapsed',  bed: 'ER-09',        doctor: 'د/ريهام مصطفى',     triage_category: 'Urgent',        status_label: 'Lab Results Ready',  status_type: 'info'     },
    { id: 7, level: 'L3', name: 'عمر طارق عبد الله',   gender_note: 'Male, 19',   elapsed: '38m elapsed',    bed: 'Waiting Area', doctor: null,                 triage_category: 'Urgent',        status_label: 'To Be Seen',         status_type: 'warning'  },
    { id: 8, level: 'L3', name: 'نور الدين رمضان',      gender_note: 'Male, 8',    elapsed: '22m elapsed',    bed: 'ER-11',        doctor: 'د/حلمى عبدالستار',  triage_category: 'Urgent',        status_label: 'Pediatric Assessment',status_type: 'info'    },
    { id: 9, level: 'L4', name: 'هند عبد العزيز',       gender_note: 'Female, 41', elapsed: '1h 20m elapsed', bed: 'ER-13',        doctor: 'د/رانيا ابراهيم',   triage_category: 'Semi-Urgent',   status_label: 'Vitals Stable',      status_type: 'info'     },
  ],
  staff: [
    { id: 1, name: 'د/بهاء حماد',       role: 'Attending / Trauma',    status: 'busy',      avatar: null },
    { id: 2, name: 'د/حسام عزب',        role: 'ER Physician',          status: 'busy',      avatar: null },
    { id: 3, name: 'د/ايمان ابراهيم',   role: 'OB/GYN Emergency',      status: 'available', avatar: null },
    { id: 4, name: 'د/حلمى عبدالستار',  role: 'Pediatric ER',          status: 'available', avatar: null },
    { id: 5, name: 'أ/ سمر محمد',       role: 'Charge Nurse',          status: 'available', avatar: null },
    { id: 6, name: 'أ/ هبة إبراهيم',    role: 'Triage Nurse',          status: 'busy',      avatar: null },
  ],
  arrivals: [
    { id: 1, label: 'Ambulance 17',  eta: '4 mins',  note: 'RTA — 2 casualties, suspected spinal trauma. Prepare Trauma Bay 2.' },
    { id: 2, label: 'Ambulance 31',  eta: '12 mins', note: 'Pregnant female, 36 weeks, severe abdominal pain. Alert OB team.' },
  ],
}

// ── stat card ───────────────────────────────────────────────────

function StatCard({ label, main, mainClass = 'text-gray-800', sub, subClass = 'text-green-500', accent }) {
  return (
    <div className={`bg-white rounded-2xl p-5 shadow-sm flex flex-col gap-1 ${accent ? 'border-l-4 border-red-500' : 'border border-gray-100'}`}>
      <span className="text-sm text-gray-400">{label}</span>
      <span className={`text-3xl font-bold ${mainClass}`}>{main}</span>
      {sub && <span className={`text-xs font-medium ${subClass}`}>{sub}</span>}
    </div>
  )
}

// ── staff dot ───────────────────────────────────────────────────

function StatusDot({ status }) {
  const color = status === 'available' ? 'bg-green-400' : status === 'busy' ? 'bg-orange-400' : 'bg-gray-300'
  return <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${color}`} />
}

function AvatarCircle({ name }) {
  const initials = name.split(' ').map(w => w[0]).slice(0, 2).join('')
  return (
    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
      {initials}
    </div>
  )
}

// ── main component ──────────────────────────────────────────────

export function EmergencyDashboard() {
  const [data, setData]     = useState(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/agial/emergency/dashboard', { credentials: 'include' })
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then(d => { setData(d); setLoading(false) })
      .catch(() => { setData(DEV_MOCK); setLoading(false) })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <svg className="w-8 h-8 animate-spin text-gray-300" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
        </svg>
      </div>
    )
  }

  const { user, stats, queue, staff, arrivals } = data

  const visible = search.trim()
    ? queue.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.bed?.toLowerCase().includes(search.toLowerCase()))
    : queue

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <TopBar user={user} />

      <main className="flex-1 p-6 flex flex-col gap-6">

        {/* Page header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-red-500 rounded-2xl flex items-center justify-center flex-shrink-0">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Emergency Department</h1>
              <p className="text-sm text-gray-400">Real-time ER status, patient triage, and bed management</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-200 bg-white text-gray-600 text-sm rounded-lg hover:bg-gray-50">
              Triage Guidelines
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              New Walk-in Patient
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total ER Patients"
            main={stats.total_patients}
            sub={stats.patients_delta}
            subClass="text-green-500"
          />
          <StatCard
            label="Avg Wait Time (L3-L5)"
            main={`${stats.avg_wait_mins} mins`}
            sub={stats.wait_delta}
            subClass="text-green-500"
          />
          <StatCard
            label="Critical (L1 & L2)"
            main={stats.critical_count}
            mainClass="text-red-600"
            sub={stats.critical_note}
            subClass="text-red-500"
            accent
          />
          <StatCard
            label="Available ER Beds"
            main={`${stats.available_beds} / ${stats.total_beds}`}
            sub={stats.beds_note}
            subClass="text-orange-500"
          />
        </div>

        {/* Main content */}
        <div className="flex gap-6 items-start">

          {/* Triage queue */}
          <div className="flex-1 min-w-0 bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <h2 className="text-base font-semibold text-gray-800">Active Triage Queue</h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search ER..."
                    className="pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg w-44 focus:outline-none focus:ring-2 focus:ring-red-200"
                  />
                </div>
                <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 text-sm text-gray-600 rounded-lg hover:bg-gray-50">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
                  </svg>
                  Filter
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {visible.map(p => <TriageRow key={p.id} patient={p} />)}
              {visible.length === 0 && (
                <p className="text-center text-sm text-gray-400 py-8">No patients match your search.</p>
              )}
            </div>
          </div>

          {/* Right sidebar */}
          <div className="w-72 flex-shrink-0 flex flex-col gap-4">

            {/* On-call staff */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-3">
              <h2 className="text-base font-semibold text-gray-800">On-Call Staff (Shift B)</h2>
              <div className="flex flex-col gap-3">
                {staff.map(s => (
                  <div key={s.id} className="flex items-center gap-3">
                    <AvatarCircle name={s.name} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{s.name}</p>
                      <p className="text-xs text-gray-400">{s.role}</p>
                    </div>
                    <StatusDot status={s.status} />
                  </div>
                ))}
              </div>
              <button className="w-full mt-1 py-2 border border-gray-200 text-sm text-gray-600 rounded-lg hover:bg-gray-50">
                View Full Roster
              </button>
            </div>

            {/* Expected arrivals */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-800">Expected Arrivals</h2>
                {arrivals.length > 0 && (
                  <span className="text-xs font-semibold bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                    {arrivals.length} Alert
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-3">
                {arrivals.map(a => (
                  <div key={a.id} className="bg-red-50 rounded-xl p-3 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                        </svg>
                        <span className="text-sm font-semibold text-red-600">{a.label}</span>
                      </div>
                      <span className="text-xs text-gray-500">ETA: {a.eta}</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{a.note}</p>
                  </div>
                ))}
                {arrivals.length === 0 && (
                  <p className="text-sm text-gray-400 text-center py-3">No expected arrivals.</p>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}
