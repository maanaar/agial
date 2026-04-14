export function FilterTabs({ tabs, active, onChange, search, onSearch }) {
  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <div className="flex gap-2 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
              active === tab.key
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8" />
          <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Find clinic or doctor..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="pl-9 pr-4 py-1.5 text-sm border border-gray-200 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-teal-300 w-52"
        />
      </div>
    </div>
  )
}
