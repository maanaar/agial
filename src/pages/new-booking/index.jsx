import { useState } from 'react'
import { TopBar } from '../opd-dashboard/TopBar'
import { BookingSummary } from './BookingSummary'

// ── service category tabs ────────────────────────────────────────

const CATEGORIES = [
  {
    key: 'opd',
    label: 'OPD Clinic',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        <circle cx="12" cy="10" r="4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v4M9 18h6" />
      </svg>
    ),
  },
  {
    key: 'lab',
    label: 'Lab Services',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v11.5A4.5 4.5 0 0013.5 19h0A4.5 4.5 0 0018 14.5V3M9 3h9M9 7h9" />
      </svg>
    ),
  },
  {
    key: 'radiology',
    label: 'Radiology',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8M8 12h8" />
      </svg>
    ),
  },
  {
    key: 'operations',
    label: 'Operations',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
]

// ── mock data per category ────────────────────────────────────────

const DATA = {
  opd: {
    specialties: ['Internal Medicine', 'Cardiology', 'Dermatology', 'Pediatrics', 'Ophthalmology', 'Orthopedics', 'Neurology', 'Gynecology'],
    doctors: {
      'Internal Medicine': ['Dr. Hassan Ali', 'Dr. Layla Nasser'],
      Cardiology:          ['Dr. Khalid Hassan', 'Dr. Sarah Jenkins'],
      Dermatology:         ['Dr. Rania Mostafa'],
      Pediatrics:          ['Dr. Omar Farouk', 'Dr. Hana Zaki'],
      Ophthalmology:       ['Dr. Hana Zaki'],
      Orthopedics:         ['Dr. Amr Sayed'],
      Neurology:           ['Dr. Tarek Adel'],
      Gynecology:          ['Dr. Sarah Jenkins'],
    },
    fee: 150,
    duration: '30 Min',
  },
  lab: {
    specialties: ['Complete Blood Count', 'Lipid Profile', 'Liver Function', 'Kidney Function', 'Thyroid Panel', 'HbA1c', 'Urine Analysis'],
    doctors: {},
    fee: 80,
    duration: '15 Min',
  },
  radiology: {
    specialties: ['X-Ray', 'Ultrasound', 'CT Scan', 'MRI', 'Mammography', 'DEXA Scan'],
    doctors: {
      'X-Ray':       ['Dr. Wael Ibrahim'],
      Ultrasound:    ['Dr. Wael Ibrahim', 'Dr. Nadia Saleh'],
      'CT Scan':     ['Dr. Nadia Saleh'],
      MRI:           ['Dr. Nadia Saleh'],
      Mammography:   ['Dr. Nadia Saleh'],
      'DEXA Scan':   ['Dr. Wael Ibrahim'],
    },
    fee: 200,
    duration: '45 Min',
  },
  operations: {
    specialties: ['Appendectomy', 'Laparoscopy', 'Hernia Repair', 'Cesarean Section', 'Cholecystectomy', 'Tonsillectomy'],
    doctors: {
      Appendectomy:        ['Dr. Khaled Samir'],
      Laparoscopy:         ['Dr. Khaled Samir', 'Dr. Sarah Jenkins'],
      'Hernia Repair':     ['Dr. Khaled Samir'],
      'Cesarean Section':  ['Dr. Sarah Jenkins'],
      Cholecystectomy:     ['Dr. Khaled Samir'],
      Tonsillectomy:       ['Dr. Tarek Adel'],
    },
    fee: 500,
    duration: '2 Hrs',
  },
}

const SOURCES = ['Walk-in', 'Phone Call', 'WhatsApp Omni-channel', 'Website', 'Referral', 'Insurance']

const TIME_SLOTS = [
  '08:00 AM','08:30 AM','09:00 AM','09:30 AM','10:00 AM','10:30 AM',
  '11:00 AM','11:30 AM','12:00 PM','12:30 PM','01:00 PM','01:30 PM',
  '02:00 PM','02:30 PM','03:00 PM','03:30 PM','04:00 PM','04:30 PM',
]

// ── small helpers ────────────────────────────────────────────────

function Label({ children, required }) {
  return (
    <label className="block text-sm font-medium text-gray-600 mb-1.5">
      {children}{required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
  )
}

function Select({ value, onChange, options, placeholder }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-teal-300 pr-9"
      >
        <option value="">{placeholder}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  )
}

function Input({ value, onChange, placeholder, type = 'text', icon }) {
  return (
    <div className="relative">
      {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>}
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-300 ${icon ? 'pl-9' : ''}`}
      />
    </div>
  )
}

// ── main component ────────────────────────────────────────────────

const MOCK_USER = { name: 'Eng. Ahmed X', role: 'CRM Specialist', lab_reqs: 4, pharmacy: 9 }

export function NewBooking({ onCancel }) {
  const [category, setCategory]   = useState('opd')
  const [patientName, setPatientName] = useState('')
  const [phone, setPhone]         = useState('')
  const [specialty, setSpecialty] = useState('')
  const [doctor, setDoctor]       = useState('')
  const [date, setDate]           = useState('')
  const [timeSlot, setTimeSlot]   = useState('')
  const [source, setSource]       = useState('')
  const [notes, setNotes]         = useState('')

  const catData = DATA[category]
  const doctors = specialty && catData.doctors[specialty] ? catData.doctors[specialty] : []
  const label   = category === 'opd' ? 'Clinic / Department' :
                  category === 'lab' ? 'Test Type' :
                  category === 'radiology' ? 'Scan Type' : 'Procedure'
  const drLabel = category === 'operations' ? 'Surgeon' : 'Doctor'

  // reset dependent fields when category changes
  function handleCategory(key) {
    setCategory(key)
    setSpecialty('')
    setDoctor('')
    setTimeSlot('')
  }

  function handleSpecialty(val) {
    setSpecialty(val)
    setDoctor('')
  }

  const summary = {
    patientName, phone,
    specialty, doctor, date, timeSlot,
    fee: catData.fee,
    duration: catData.duration,
    category: CATEGORIES.find(c => c.key === category)?.label,
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <TopBar user={MOCK_USER} />

      <main className="flex-1 p-6 flex flex-col gap-6">

        {/* Page header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-teal-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                <path strokeLinecap="round" d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">New Appointment Booking</h1>
              <p className="text-sm text-gray-400">Create a new booking for OPD, Lab, Radiology, or Operations</p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="px-5 py-2 border border-gray-200 bg-white text-gray-600 text-sm rounded-xl hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>

        {/* Two-column layout */}
        <div className="flex gap-6 items-start">

          {/* ── Left form ── */}
          <div className="flex-1 min-w-0 flex flex-col gap-5">

            {/* Patient Information */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-gray-800">Patient Information</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label required>Patient Name</Label>
                  <Input
                    value={patientName}
                    onChange={setPatientName}
                    placeholder="Full name"
                    icon={
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                    }
                  />
                </div>
                <div>
                  <Label required>Phone Number</Label>
                  <Input
                    value={phone}
                    onChange={setPhone}
                    placeholder="+20 100 000 0000"
                    type="tel"
                    icon={
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                      </svg>
                    }
                  />
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-5">
              <h2 className="text-base font-semibold text-gray-800">Booking Details</h2>

              {/* Service category tabs */}
              <div>
                <Label>Service Category</Label>
                <div className="grid grid-cols-4 gap-3">
                  {CATEGORIES.map(cat => {
                    const active = category === cat.key
                    return (
                      <button
                        key={cat.key}
                        onClick={() => handleCategory(cat.key)}
                        className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 text-sm font-medium transition-all
                          ${active
                            ? 'border-amber-400 bg-amber-50 text-amber-600'
                            : 'border-gray-200 bg-white text-gray-400 hover:border-gray-300 hover:text-gray-600'
                          }`}
                      >
                        <span className={active ? 'text-amber-500' : 'text-gray-300'}>{cat.icon}</span>
                        {cat.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Dynamic fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label required>{label}</Label>
                  <Select
                    value={specialty}
                    onChange={handleSpecialty}
                    options={catData.specialties}
                    placeholder={`Select ${label.toLowerCase()}…`}
                  />
                </div>

                {/* Doctor — hide for lab (no referral doctor) */}
                {category !== 'lab' && (
                  <div>
                    <Label>{drLabel}</Label>
                    <Select
                      value={doctor}
                      onChange={setDoctor}
                      options={doctors}
                      placeholder={specialty ? `Select ${drLabel.toLowerCase()}…` : `Choose ${label.toLowerCase()} first`}
                    />
                  </div>
                )}

                <div>
                  <Label required>Appointment Date</Label>
                  <Input
                    value={date}
                    onChange={setDate}
                    type="date"
                  />
                </div>

                {category === 'opd' && (
                  <div>
                    <Label required>Source of Business</Label>
                    <Select
                      value={source}
                      onChange={setSource}
                      options={SOURCES}
                      placeholder="Select source…"
                    />
                  </div>
                )}
              </div>

              {/* Time slots */}
              {date && (
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
                            : 'border-gray-200 text-gray-600 hover:border-teal-300 hover:text-teal-600'
                          }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}

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
                    'Follow-up on previous lab results…'
                  }
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-300 resize-none"
                />
              </div>
            </div>
          </div>

          {/* ── Booking Summary ── */}
          <BookingSummary summary={summary} />
        </div>
      </main>
    </div>
  )
}
