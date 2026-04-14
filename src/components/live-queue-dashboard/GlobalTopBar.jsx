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
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border border-gray-100 flex-shrink-0">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default GlobalTopBar;
