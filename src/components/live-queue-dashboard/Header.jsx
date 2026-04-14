import React from 'react';
import { Activity, Calendar, RefreshCcw } from 'lucide-react';

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#FDEF86] flex items-center justify-center shadow-sm">
          <Activity size={24} className="text-teal-700" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Live Queue Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Real-time patient flow and department status • Last updated: Just now
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-sm">
          <Calendar size={16} className="text-gray-500" />
          <span>Today, 12 Apr</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors shadow-sm text-sm">
          <RefreshCcw size={16} />
          <span>Refresh Queue</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
