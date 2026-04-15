import { useNavigate } from 'react-router-dom'
import { flushSync } from 'react-dom'
import { usePatient } from '../../context/PatientContext'

// Background colors mapped from Odoo's clinic_color field (1–11)
const COLOR_MAP = [
  'bg-amber-400',   // 1
  'bg-rose-400',    // 2
  'bg-purple-400',  // 3
  'bg-teal-500',    // 4
  'bg-blue-400',    // 5
  'bg-green-400',   // 6
  'bg-orange-400',  // 7
  'bg-indigo-400',  // 8
  'bg-pink-400',    // 9
  'bg-cyan-400',    // 10
  'bg-lime-500',    // 11
]

const STATUS_STYLE = {
  Open:          'bg-green-100 text-green-700',
  'Closing Soon':'bg-orange-100 text-orange-600',
  Closed:        'bg-gray-100 text-gray-400',
  'High Demand': 'bg-red-100 text-red-600',
}

function CrossIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export function ClinicCard({ clinic }) {
  const navigate = useNavigate()
  const { setPatient } = usePatient()

  const {
    id, name, color, status, doctor,
    waiting_queue, today_appointments,
    capacity_max, capacity_used,
    patients = [],
  } = clinic

  const isHighDemand = status === 'High Demand'
  const pct = capacity_max > 0 ? Math.min(100, Math.round((capacity_used / capacity_max) * 100)) : 0
  const bgColor = COLOR_MAP[(color - 1) % COLOR_MAP.length] || 'bg-teal-500'

  const barColor =
    pct >= 90 ? 'bg-red-500' :
    pct >= 70 ? 'bg-orange-400' :
    'bg-teal-500'

  const doctorImg = doctor?.image
    ? doctor.image
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor?.name || 'D')}&size=40&background=94a3b8&color=fff`

  function openConsultation(p) {
    flushSync(() => setPatient(p))
    navigate('/consultationform')
  }

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${bgColor}`}>
            <CrossIcon />
          </div>
          <span className="font-semibold text-gray-800 leading-tight">{name}</span>
        </div>
        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap ${STATUS_STYLE[status] || STATUS_STYLE.Open}`}>
          {status}
        </span>
      </div>

      {/* Doctor */}
      {doctor ? (
        <div className="flex items-center gap-3">
          <img
            src={doctorImg}
            alt={doctor.name}
            className="w-9 h-9 rounded-full object-cover flex-shrink-0"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name || 'D')}&size=40&background=94a3b8&color=fff`
            }}
          />
          <div className="leading-tight">
            <p className="text-sm font-medium text-gray-800">{doctor.name}</p>
            <p className="text-xs text-gray-400">{doctor.title || 'Doctor'}</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <p className="text-sm text-gray-400 italic">No doctor assigned</p>
        </div>
      )}

      {/* Waiting queue */}
      <div className={`rounded-xl p-3 ${isHighDemand ? 'bg-red-50' : 'bg-gray-50'}`}>
        <p className={`text-xs font-bold tracking-widest uppercase mb-1 ${isHighDemand ? 'text-red-400' : 'text-gray-400'}`}>
          Waiting Queue
        </p>
        <p className={`text-lg font-bold ${isHighDemand ? 'text-red-600' : 'text-gray-800'}`}>
          {waiting_queue}{' '}
          <span className="text-sm font-normal text-gray-500">Pts</span>
        </p>
      </div>

      {/* Today appointments */}
      <div>
        <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-0.5">Today's Appointments</p>
        <p className="font-bold text-gray-800">{today_appointments}</p>
      </div>

      {/* Capacity bar */}
      <div>
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Capacity Status</span>
          <span>{capacity_used}/{capacity_max}</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1.5">
          <div
            className={`h-1.5 rounded-full transition-all ${barColor}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Waiting patients */}
      <div className="border-t border-gray-100 pt-3 flex flex-col gap-1.5">
        <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">Waiting Patients</p>
        {patients.map((p, i) => (
          <button
            key={i}
            onClick={() => openConsultation(p)}
            className="flex items-center justify-between w-full px-3 py-2 rounded-xl bg-gray-50 hover:bg-teal-50 hover:border-teal-200 border border-transparent transition-all text-left group"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 text-xs font-semibold flex-shrink-0">
                {p.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-800 group-hover:text-teal-700">{p.name}</p>
                <p className="text-[10px] text-gray-400">{p.mrn}</p>
              </div>
            </div>
            <span className="text-[10px] text-gray-400">{p.wait}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
