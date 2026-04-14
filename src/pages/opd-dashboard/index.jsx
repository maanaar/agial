import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TopBar }     from './TopBar'
import { StatsCard }  from './StatsCard'
import { ClinicCard } from './ClinicCard'
import { FilterTabs } from './FilterTabs'

// ── SVG icons for the stats cards ──────────────────────────────

function ActivityIcon() {
  return (
    <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  )
}

function DoctorIcon() {
  return (
    <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function QueueIcon() {
  return (
    <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8"  y1="2" x2="8"  y2="6" />
      <line x1="3"  y1="10" x2="21" y2="10" />
    </svg>
  )
}

// ── dev mock (used when Odoo is not reachable) ──────────────────

const DEV_MOCK = {
  user: { name: 'Eng. Ahmed X', role: 'CRM Specialist', lab_reqs: 4, pharmacy: 9 },
  date: new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
  total_capacity: 190,
  stats: { active_clinics: 14, doctors_on_duty: 17, waiting_queue: 38, today_appointments: 124 },
  clinics: [
    { id: 9,   name: 'Internal Medicine',        clinic_color: 2,  status: 'High Demand',  doctor: { name: 'د/حسام عزب',     avatar: null }, waiting: 11, today_appointments: 22, capacity: 20 },
    { id: 17,  name: 'Obstetrics & Gynecology',  clinic_color: 5,  status: 'Open',         doctor: { name: 'د/ايمان ابراهيم', avatar: null }, waiting: 7,  today_appointments: 18, capacity: 20 },
    { id: 18,  name: 'Dermatology',              clinic_color: 8,  status: 'Open',         doctor: { name: 'د/امل سمير',      avatar: null }, waiting: 4,  today_appointments: 14, capacity: 15 },
    { id: 194, name: 'Pediatric',                clinic_color: 3,  status: 'Open',         doctor: { name: 'د/حلمى عبدالستار',avatar: null }, waiting: 6,  today_appointments: 16, capacity: 20 },
    { id: 13,  name: 'Ophthalmology',            clinic_color: 9,  status: 'Open',         doctor: { name: 'د/سها يوسف',      avatar: null }, waiting: 3,  today_appointments: 10, capacity: 15 },
    { id: 20,  name: 'Ultrasound',               clinic_color: 6,  status: 'Open',         doctor: { name: 'د/زياد منصور',    avatar: null }, waiting: 5,  today_appointments: 12, capacity: 15 },
    { id: 19,  name: 'Pain Medicine',            clinic_color: 4,  status: 'Closing Soon', doctor: { name: 'د/محمد ابراهيم',  avatar: null }, waiting: 2,  today_appointments: 8,  capacity: 10 },
    { id: 16,  name: 'Breastfeeding',            clinic_color: 1,  status: 'Open',         doctor: { name: 'د/ريهام سعيد',    avatar: null }, waiting: 3,  today_appointments: 9,  capacity: 12 },
    { id: 15,  name: 'Nutrition',                clinic_color: 7,  status: 'Open',         doctor: { name: 'د/ريهام مصطفى',   avatar: null }, waiting: 2,  today_appointments: 7,  capacity: 12 },
    { id: 14,  name: 'Audiology',                clinic_color: 10, status: 'Closing Soon', doctor: { name: 'د/رانيا ابراهيم', avatar: null }, waiting: 1,  today_appointments: 5,  capacity: 10 },
    { id: 21,  name: 'Breast Oncology',          clinic_color: 11, status: 'Open',         doctor: { name: 'د/سارة الغريب',   avatar: null }, waiting: 2,  today_appointments: 6,  capacity: 10 },
    { id: 61,  name: 'Psychiatric',              clinic_color: 2,  status: 'Open',         doctor: { name: 'د/بسمة ادم',      avatar: null }, waiting: 1,  today_appointments: 5,  capacity: 10 },
    { id: 12,  name: 'Behavior Medicine',        clinic_color: 4,  status: 'Closing Soon', doctor: { name: 'د/محمد فؤاد',     avatar: null }, waiting: 1,  today_appointments: 4,  capacity: 8  },
    { id: 11,  name: 'Anesthesia',               clinic_color: 6,  status: 'Closed',       doctor: { name: 'د/طارق سعيد',     avatar: null }, waiting: 0,  today_appointments: 4,  capacity: 8  },
    { id: 5,   name: 'Bariatrician',             clinic_color: 3,  status: 'Closed',       doctor: { name: 'د/خالد عطا',      avatar: null }, waiting: 0,  today_appointments: 3,  capacity: 8  },
    { id: 201, name: 'Gynecological Oncology',   clinic_color: 9,  status: 'Closed',       doctor: { name: 'د/رانا علاء',     avatar: null }, waiting: 0,  today_appointments: 1,  capacity: 8  },
  ],
}

// ── filter definitions ──────────────────────────────────────────

const FILTER_KEYS = ['all', 'Open', 'Closing Soon', 'Closed']

function buildTabs(clinics) {
  const counts = { all: clinics.length }
  FILTER_KEYS.slice(1).forEach((k) => {
    counts[k] = clinics.filter((c) => c.status === k).length
  })
  return [
    { key: 'all',          label: 'All Clinics',   count: counts.all },
    { key: 'Open',         label: 'Open',          count: counts['Open'] },
    { key: 'Closing Soon', label: 'Closing Soon',  count: counts['Closing Soon'] },
    { key: 'Closed',       label: 'Closed',        count: counts['Closed'] },
  ]
}

// ── main component ──────────────────────────────────────────────

export function OpdDashboard() {
  const navigate = useNavigate()
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)
  const [activeTab, setActiveTab] = useState('all')
  const [search, setSearch]   = useState('')

  useEffect(() => {
    fetch('/agial/opd/dashboard', { credentials: 'include' })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((d) => { setData(d); setLoading(false) })
      .catch(() => {
        // Dev fallback: mock data when Odoo is not running
        setData(DEV_MOCK)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <svg className="w-8 h-8 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <span className="text-sm">Loading dashboard…</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-red-100 text-center max-w-sm">
          <p className="text-red-500 font-semibold mb-1">Failed to load dashboard</p>
          <p className="text-sm text-gray-400">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-teal-600 text-white text-sm rounded-full hover:bg-teal-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  const { user, date, total_capacity, stats, clinics } = data

  // Filter clinics
  let visible = clinics
  if (activeTab !== 'all') {
    visible = visible.filter((c) => c.status === activeTab)
  }
  if (search.trim()) {
    const q = search.toLowerCase()
    visible = visible.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.doctor?.name?.toLowerCase().includes(q)
    )
  }

  const tabs = buildTabs(clinics)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <TopBar user={user} />

      <main className="flex-1 overflow-auto p-6 flex flex-col gap-6">

        {/* Page header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">OPD Clinics Dashboard</h1>
              <p className="text-sm text-gray-400">
                Today: {date}
                {total_capacity > 0 && (
                  <span className="ml-2">· Total Capacity: {total_capacity} Patients</span>
                )}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 bg-white text-gray-600 text-sm rounded-lg hover:bg-gray-50">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export Report
            </button>
            <button
              onClick={() => navigate('/new-booking')}
              className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white text-sm rounded-lg hover:bg-teal-700"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              New Booking
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard icon={<ActivityIcon />} label="Active Clinics"       value={stats.active_clinics}     iconBg="bg-blue-50" />
          <StatsCard icon={<DoctorIcon />}   label="Doctors on Duty"      value={stats.doctors_on_duty}    iconBg="bg-green-50" />
          <StatsCard icon={<QueueIcon />}    label="Waiting Queue"        value={stats.waiting_queue}      iconBg="bg-orange-50" />
          <StatsCard icon={<CalendarIcon />} label="Today's Appointments" value={stats.today_appointments} iconBg="bg-purple-50" />
        </div>

        {/* Filter tabs */}
        <FilterTabs
          tabs={tabs}
          active={activeTab}
          onChange={setActiveTab}
          search={search}
          onSearch={setSearch}
        />

        {/* Clinics grid */}
        {visible.length === 0 ? (
          <div className="flex-1 flex items-center justify-center py-16 text-gray-400 text-sm">
            No clinics match the selected filter.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {visible.map((clinic) => (
              <ClinicCard key={clinic.id} clinic={clinic} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
