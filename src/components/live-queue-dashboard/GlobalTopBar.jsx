import React from 'react';
import { Search, Bell } from 'lucide-react';

const GlobalTopBar = ({ data }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      {/* Left Search */}
      <div className="relative w-96">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input 
          type="text" 
          placeholder="Search token, MRN, or phone..." 
          className="bg-gray-50 border border-transparent text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 p-2"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 text-sm text-gray-600 font-medium">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span>Lab Wait: <span className="text-gray-900 font-bold">{data.labWait}</span></span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            <span>Pharmacy Wait: <span className="text-gray-900 font-bold">{data.pharmacyWait}</span></span>
          </div>
        </div>

        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-3 border-l border-gray-200 pl-6">
          <div className="text-right">
            <div className="text-sm font-bold text-gray-800">{data.user.name}</div>
            <div className="text-xs text-gray-500">{data.user.role}</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border border-gray-100 flex-shrink-0 flex items-center justify-center">
            <svg viewBox="0 0 36 36" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" width="40" height="40" className="opacity-80">
              <mask id="mask__beam" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
                <rect width="36" height="36" rx="72" fill="#FFFFFF"></rect>
              </mask>
              <g mask="url(#mask__beam)">
                <rect width="36" height="36" fill="#e9ecef"></rect>
                <rect x="0" y="0" width="36" height="36" transform="translate(7 -1) rotate(195 18 18) scale(1.1)" fill="#ced4da" rx="6"></rect>
                <g transform="translate(3 -4) rotate(5 18 18)">
                  <path d="M15 19c2 1 4 1 6 0" stroke="#868e96" fill="none" strokeLinecap="round"></path>
                  <rect x="10" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#868e96"></rect>
                  <rect x="24" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#868e96"></rect>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};

export default GlobalTopBar;
