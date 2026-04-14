export function TopBar({ user = {} }) {
  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-100 flex-shrink-0">
      {/* Patient search */}
      <div className="relative w-72">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8" />
          <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Search patients, MRN, or phone..."
          className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-300"
        />
      </div>

      {/* Right section */}
      <div className="flex items-center gap-5">
        {/* Notification badges */}
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
            Lab Req: <strong className="text-gray-800">{user.lab_reqs ?? 0}</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-orange-400 inline-block" />
            Pharmacy: <strong className="text-gray-800">{user.pharmacy ?? 0}</strong>
          </span>
        </div>

        {/* Bell */}
        <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 flex-shrink-0">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>

        {/* User */}
        <div className="flex items-center gap-2">
          <img
            src={user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'U')}&size=40&background=0ea5e9&color=fff`}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'U')}&size=40&background=0ea5e9&color=fff`
            }}
          />
          <div className="text-sm leading-tight">
            <p className="font-semibold text-gray-800">{user.name || 'User'}</p>
            <p className="text-xs text-gray-400">{user.role || ''}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
