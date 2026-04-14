const LEVEL_STYLES = {
  L1: { bg: 'bg-red-50',    border: 'border-red-400',   badge: 'bg-red-500 text-white',    icon: 'text-red-500' },
  L2: { bg: 'bg-orange-50', border: 'border-orange-400', badge: 'bg-orange-500 text-white', icon: 'text-orange-500' },
  L3: { bg: 'bg-amber-50',  border: 'border-amber-400',  badge: 'bg-amber-500 text-white',  icon: 'text-amber-500' },
  L4: { bg: 'bg-green-50',  border: 'border-green-400',  badge: 'bg-green-500 text-white',  icon: 'text-green-500' },
  L5: { bg: 'bg-gray-50',   border: 'border-gray-300',   badge: 'bg-gray-400 text-white',   icon: 'text-gray-400' },
}

const TRIAGE_BADGE = {
  Resuscitation: 'bg-red-100 text-red-700',
  Emergent:      'bg-orange-100 text-orange-700',
  Urgent:        'bg-amber-100 text-amber-700',
  'Semi-Urgent': 'bg-blue-100 text-blue-700',
  'Non-Urgent':  'bg-gray-100 text-gray-600',
}

function LevelIcon({ level }) {
  if (level === 'L1') return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2a1 1 0 01.894.553l9 18A1 1 0 0121 22H3a1 1 0 01-.894-1.447l9-18A1 1 0 0112 2zm0 3.236L4.618 20h14.764L12 5.236zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z"/>
    </svg>
  )
  if (level === 'L2') return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    </svg>
  )
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  )
}

export function TriageRow({ patient }) {
  const s = LEVEL_STYLES[patient.level] || LEVEL_STYLES.L5
  const badgeCls = TRIAGE_BADGE[patient.triage_category] || 'bg-gray-100 text-gray-600'

  const statusColor =
    patient.status_type === 'critical' ? 'text-red-600' :
    patient.status_type === 'warning'  ? 'text-orange-500' :
    patient.status_type === 'info'     ? 'text-blue-500' :
    'text-gray-500'

  return (
    <div className={`flex items-center gap-4 p-4 rounded-xl border-l-4 ${s.bg} ${s.border}`}>
      {/* Level badge */}
      <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${s.badge} flex flex-col items-center justify-center gap-0.5`}>
        <span className="text-xs font-bold leading-none">{patient.level}</span>
        <span className={`${s.icon.replace(/text-\S+/, 'text-white')} opacity-80`}>
          <LevelIcon level={patient.level} />
        </span>
      </div>

      {/* Patient info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-gray-800">{patient.name}</span>
          {patient.gender_note && (
            <span className="text-sm text-orange-500">({patient.gender_note})</span>
          )}
        </div>
        <div className="flex items-center gap-4 mt-1 text-xs text-gray-400 flex-wrap">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            {patient.elapsed}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {patient.bed}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {patient.doctor || 'Unassigned'}
          </span>
        </div>
      </div>

      {/* Right side */}
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${badgeCls}`}>
            {patient.triage_category}
          </span>
          {patient.status_label && (
            <span className={`text-xs font-semibold ${statusColor}`}>{patient.status_label}</span>
          )}
        </div>
        {patient.doctor ? (
          <button className="text-xs px-3 py-1.5 border border-gray-200 bg-white rounded-lg text-gray-600 hover:bg-gray-50">
            View Chart
          </button>
        ) : (
          <button className="text-xs px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Assign Doctor
          </button>
        )}
      </div>
    </div>
  )
}
