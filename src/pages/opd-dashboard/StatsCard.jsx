export function StatsCard({ icon, label, value, iconBg }) {
  return (
    <div className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm border border-gray-100">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${iconBg}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 leading-tight">{label}</p>
        <p className="text-3xl font-bold text-gray-800 leading-tight">{value}</p>
      </div>
    </div>
  )
}
