function Row({ icon, primary, secondary }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5 text-gray-400">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-800">{primary || <span className="text-gray-300 font-normal">—</span>}</p>
        <p className="text-xs text-gray-400">{secondary}</p>
      </div>
    </div>
  )
}

export function BookingSummary({ summary }) {
  const { patientName, phone, specialty, doctor, date, timeSlot, fee, duration, category } = summary

  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : null

  const dateLabel = formattedDate && timeSlot ? `${formattedDate}, ${timeSlot}` : formattedDate || timeSlot || null

  return (
    <div className="w-72 flex-shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-5 sticky top-6">
      <h2 className="text-base font-semibold text-gray-800">Booking Summary</h2>

      {/* Info rows */}
      <div className="flex flex-col gap-4">
        <Row
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          }
          primary={patientName || null}
          secondary={phone || 'Patient Account'}
        />
        <Row
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          }
          primary={specialty || null}
          secondary={doctor || category || 'Service'}
        />
        <Row
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          }
          primary={dateLabel}
          secondary={duration ? `${duration} Duration` : 'Duration'}
        />
      </div>

      <div className="border-t border-gray-100 pt-4 flex flex-col gap-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Consultation Fee</span>
          <span className="text-gray-700 font-medium">${fee?.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Discount (None)</span>
          <span className="text-gray-500">$0.00</span>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
        <span className="font-semibold text-gray-800">Total</span>
        <span className="text-xl font-bold text-teal-600">${fee?.toFixed(2)}</span>
      </div>

      <button
        className={`w-full py-3 rounded-xl text-white text-sm font-semibold transition-all
          ${patientName && phone && specialty && (timeSlot || true)
            ? 'bg-teal-600 hover:bg-teal-700'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
      >
        Confirm Booking
      </button>
    </div>
  )
}
