import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TopBar } from '../opd-dashboard/TopBar'
import { BookingSummary } from './BookingSummary'

// ── service tabs ──────────────────────────────────────────────────

const CATEGORIES = [
  { key: 'opd',        label: 'OPD Clinic',    icon: <StethIcon /> },
  { key: 'lab',        label: 'Lab Services',   icon: <FlaskIcon /> },
  { key: 'radiology',  label: 'Radiology',      icon: <ScanIcon /> },
  { key: 'operations', label: 'Operations',     icon: <PulseIcon /> },
]

function StethIcon() {
  return (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v7a3 3 0 006 0V3M6 3h12M12 13v3m0 0a4 4 0 004 4H8a4 4 0 004-4z"/>
    </svg>
  )
}
function FlaskIcon() {
  return (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v8L4.5 19.5A1 1 0 005.4 21h13.2a1 1 0 00.9-1.5L15 11V3M9 3h6M9 3H7M15 3h2"/>
    </svg>
  )
}
function ScanIcon() {
  return (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/>
      <line x1="12" y1="3" x2="12" y2="7"/><line x1="12" y1="17" x2="12" y2="21"/>
      <line x1="3" y1="12" x2="7" y2="12"/><line x1="17" y1="12" x2="21" y2="12"/>
    </svg>
  )
}
function PulseIcon() {
  return (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  )
}

// ── time slots ────────────────────────────────────────────────────

const TIME_SLOTS = [
  '08:00 AM','08:30 AM','09:00 AM','09:30 AM','10:00 AM','10:30 AM',
  '11:00 AM','11:30 AM','12:00 PM','12:30 PM','01:00 PM','01:30 PM',
  '02:00 PM','02:30 PM','03:00 PM','03:30 PM','04:00 PM','04:30 PM',
]

// ── Agial demo data (mirrors real DB) ───────────────────────────

const DEMO_OPTIONS = {
  clinics: [
    { id: 9,   name: 'Internal Medicine',        clinic_type: 'OPD' },
    { id: 17,  name: 'Obstetrics & Gynecology',  clinic_type: 'OPD' },
    { id: 18,  name: 'Dermatology',              clinic_type: 'OPD' },
    { id: 194, name: 'Pediatric',                clinic_type: 'OPD' },
    { id: 13,  name: 'Ophthalmology',            clinic_type: 'OPD' },
    { id: 20,  name: 'Ultrasound',               clinic_type: 'OPD' },
    { id: 19,  name: 'Pain Medicine',            clinic_type: 'OPD' },
    { id: 16,  name: 'Breastfeeding',            clinic_type: 'OPD' },
    { id: 15,  name: 'Nutrition',                clinic_type: 'OPD' },
    { id: 14,  name: 'Audiology',                clinic_type: 'OPD' },
    { id: 21,  name: 'Breast Oncology',          clinic_type: 'OPD' },
    { id: 61,  name: 'Psychiatric',              clinic_type: 'OPD' },
    { id: 12,  name: 'Behavior Medicine',        clinic_type: 'OPD' },
    { id: 74,  name: 'Emergency Clinic',         clinic_type: 'OPD' },
    { id: 201, name: 'Gynecological Oncology',   clinic_type: 'OPD' },
  ],
  doctors: {
    9:   [{ id: 513, name: 'د/حسام عزب' },   { id: 512, name: 'د/ تامر حسنى' }],
    17:  [{ id: 509, name: 'د/ايمان ابراهيم' }, { id: 516, name: 'د/خالد عطا' }, { id: 519, name: 'د/رانا علاء' }, { id: 524, name: 'د/زياد منصور' }, { id: 525, name: 'د/سارة الغريب' }],
    18:  [{ id: 508, name: 'د/امل سمير' }],
    194: [{ id: 515, name: 'د/حلمى عبدالستار' }, { id: 518, name: 'د/دينا الجوهري' }],
    13:  [{ id: 540, name: 'د/سها يوسف' }],
    20:  [{ id: 524, name: 'د/زياد منصور' }, { id: 517, name: 'د/ نهله فراويله' }],
    19:  [{ id: 541, name: 'د/محمد ابراهيم' }],
    16:  [{ id: 521, name: 'د/ريهام سعيد' }, { id: 526, name: 'د/ساره نجيب' }],
    15:  [{ id: 523, name: 'د/ريهام مصطفى' }],
    14:  [{ id: 520, name: 'د/رانيا ابراهيم' }],
    21:  [{ id: 525, name: 'د/سارة الغريب' }],
    61:  [{ id: 510, name: 'د/بسمة ادم' }],
    12:  [{ id: 542, name: 'د/محمد فؤاد' }],
    74:  [{ id: 511, name: 'د/بهاء حماد' }],
    201: [{ id: 519, name: 'د/رانا علاء' }],
  },
}

const SOURCES = ['Walk-in','Phone Call','WhatsApp Omni-channel','Website','Referral','Insurance']

const MOCK_USER = { name: 'Eng. Ahmed X', role: 'CRM Specialist', lab_reqs: 4, pharmacy: 9 }

// ── small ui pieces ───────────────────────────────────────────────

function Label({ children, required }) {
  return (
    <label className="block text-sm font-medium text-gray-600 mb-1.5">
      {children}{required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
  )
}

function TextInput({ value, onChange, placeholder, type = 'text', prefix }) {
  return (
    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-teal-300 bg-white">
      {prefix && <span className="pl-3 text-gray-400 text-sm flex-shrink-0">{prefix}</span>}
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-3 py-2.5 text-sm text-gray-700 bg-transparent focus:outline-none"
      />
    </div>
  )
}

function SelectInput({ value, onChange, options, placeholder, disabled }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
        className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-teal-300 pr-9 disabled:bg-gray-50 disabled:text-gray-400"
      >
        <option value="">{placeholder}</option>
        {options.map(o => (
          <option key={typeof o === 'string' ? o : o.id} value={typeof o === 'string' ? o : o.id}>
            {typeof o === 'string' ? o : o.name}
          </option>
        ))}
      </select>
      <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
      </svg>
    </div>
  )
}

// ── main ──────────────────────────────────────────────────────────

export function NewBooking() {
  const navigate = useNavigate()

  // remote data
  const [options, setOptions] = useState(DEMO_OPTIONS)

  // form state
  const [category,    setCategory]    = useState('opd')
  const [patientName, setPatientName] = useState('')
  const [phone,       setPhone]       = useState('')
  const [clinicId,    setClinicId]    = useState('')
  const [doctorId,    setDoctorId]    = useState('')
  const [apptDate,    setApptDate]    = useState('')
  const [timeSlot,    setTimeSlot]    = useState('')
  const [source,      setSource]      = useState('')
  const [notes,       setNotes]       = useState('')

  // fetch options from Odoo, fall back to Agial demo data
  useEffect(() => {
    fetch('/agial/booking/options', { credentials: 'include' })
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d && d.clinics?.length) setOptions(d) })
      .catch(() => {})
  }, [])

  function handleCategory(key) {
    setCategory(key)
    setClinicId('')
    setDoctorId('')
    setTimeSlot('')
  }

  function handleClinic(val) {
    setClinicId(val)
    setDoctorId('')
  }

  // Which clinics/doctors to show per tab
  const clinicTypeMap = { opd: 'OPD', lab: 'OPD', radiology: 'OPD', operations: 'OPD' }
  const filteredClinics = options.clinics.filter(c => c.clinic_type === clinicTypeMap[category])
  const availableDoctors = clinicId && options.doctors[clinicId] ? options.doctors[clinicId] : []

  const specialtyLabel = category === 'lab' ? 'Test Type' : category === 'radiology' ? 'Scan Type' : category === 'operations' ? 'Procedure' : 'Specialty / Clinic'
  const doctorLabel    = category === 'operations' ? 'Surgeon' : 'Doctor'

  const selectedClinic = filteredClinics.find(c => String(c.id) === String(clinicId))
  const selectedDoctor = availableDoctors.find(d => String(d.id) === String(doctorId))

  const summary = {
    patientName, phone,
    specialty: selectedClinic?.name || '',
    doctor:    selectedDoctor?.name || '',
    date:      apptDate,
    timeSlot,
    fee:       category === 'lab' ? 80 : category === 'radiology' ? 200 : category === 'operations' ? 500 : 150,
    duration:  category === 'lab' ? '15 Min' : category === 'radiology' ? '45 Min' : category === 'operations' ? '2 Hrs' : '30 Min',
    category:  CATEGORIES.find(c => c.key === category)?.label,
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <TopBar user={MOCK_USER} />

      <main className="p-6 flex flex-col gap-5">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-teal-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
                <path strokeLinecap="round" d="M8 14h.01M12 14h.01M16 14h.01"/>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">New Appointment Booking</h1>
              <p className="text-sm text-gray-400">Create a new booking for OPD, Lab, Radiology, or Operations</p>
            </div>
          </div>
          <button onClick={() => navigate(-1)} className="px-5 py-2 border border-gray-200 bg-white text-gray-600 text-sm rounded-xl hover:bg-gray-50">
            Cancel
          </button>
        </div>

        {/* Body */}
        <div className="flex gap-5 items-start">

          {/* ── Left ── */}
          <div className="flex-1 min-w-0 flex flex-col gap-5">

            {/* Patient Information */}
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h2 className="text-sm font-semibold text-gray-700 mb-4">Patient Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label required>Patient Name</Label>
                  <TextInput value={patientName} onChange={setPatientName} placeholder="Full name" prefix={
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  }/>
                </div>
                <div>
                  <Label required>Phone Number</Label>
                  <TextInput value={phone} onChange={setPhone} placeholder="+20 100 000 0000" type="tel" prefix={
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  }/>
                </div>
              </div>
            </section>

            {/* Service Category */}
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h2 className="text-sm font-semibold text-gray-700 mb-4">Service Category</h2>
              <div className="grid grid-cols-4 gap-3">
                {CATEGORIES.map(cat => {
                  const active = category === cat.key
                  return (
                    <button
                      key={cat.key}
                      onClick={() => handleCategory(cat.key)}
                      className={`flex flex-col items-center justify-center gap-2 py-4 px-2 rounded-2xl border-2 text-sm font-medium transition-all
                        ${active ? 'border-amber-400 bg-amber-50 text-amber-600' : 'border-gray-200 bg-white text-gray-400 hover:border-gray-300 hover:text-gray-600'}`}
                    >
                      <span className={active ? 'text-amber-500' : 'text-gray-300'}>{cat.icon}</span>
                      {cat.label}
                    </button>
                  )
                })}
              </div>
            </section>

            {/* Booking Fields */}
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-4">
              <h2 className="text-sm font-semibold text-gray-700">Booking Details</h2>

              <div className="grid grid-cols-2 gap-4">
                {/* Specialty / Clinic */}
                <div>
                  <Label required>{specialtyLabel}</Label>
                  <SelectInput
                    value={clinicId}
                    onChange={handleClinic}
                    options={filteredClinics}
                    placeholder={`Select ${specialtyLabel.toLowerCase()}…`}
                  />
                </div>

                {/* Doctor */}
                <div>
                  <Label>{doctorLabel}</Label>
                  <SelectInput
                    value={doctorId}
                    onChange={setDoctorId}
                    options={availableDoctors}
                    placeholder={clinicId ? `Select ${doctorLabel.toLowerCase()}…` : 'Select clinic first'}
                    disabled={!clinicId}
                  />
                </div>

                {/* Appointment Date */}
                <div>
                  <Label required>Appointment Date</Label>
                  <input
                    type="date"
                    value={apptDate}
                    onChange={e => { setApptDate(e.target.value); setTimeSlot('') }}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-teal-300"
                  />
                </div>

                {/* Source of Business (OPD only) */}
                {category === 'opd' && (
                  <div>
                    <Label>Source of Business</Label>
                    <SelectInput value={source} onChange={setSource} options={SOURCES} placeholder="Select source…"/>
                  </div>
                )}
              </div>

              {/* Time Slot */}
              <div>
                <Label required>Time Slot</Label>
                <div className="flex flex-wrap gap-2">
                  {TIME_SLOTS.map(t => (
                    <button
                      key={t}
                      onClick={() => setTimeSlot(t)}
                      className={`px-3 py-1.5 text-xs rounded-lg border transition-all
                        ${timeSlot === t
                          ? 'bg-teal-600 border-teal-600 text-white font-semibold'
                          : 'border-gray-200 text-gray-500 hover:border-teal-300 hover:text-teal-600'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <Label>Visit Reason / Notes</Label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder={
                    category === 'lab'        ? 'Clinical indication or previous results…' :
                    category === 'radiology'  ? 'Clinical indication or referral notes…' :
                    category === 'operations' ? 'Pre-op notes or special requirements…' :
                    'Follow-up on previous results or visit reason…'
                  }
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-300 resize-none"
                />
              </div>
            </section>
          </div>

          {/* ── Summary ── */}
          <BookingSummary summary={summary} />
        </div>
      </main>
    </div>
  )
}
