import React from 'react';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';

const QueueFilters = ({ tabs }) => {
  return (
    <div className="flex flex-col border-b border-gray-100">
      {/* Tabs */}
      <div className="flex items-center gap-8 px-6 pt-4 pb-0 overflow-x-auto">
        {tabs.map((tab, idx) => (
          <button 
            key={idx} 
            className={`pb-3 font-semibold text-sm whitespace-nowrap border-b-2 transition-colors ${
              tab.active ? 'border-teal-500 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label} {tab.count !== undefined && `(${tab.count})`}
          </button>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between p-4 px-6 gap-4 border-t border-gray-100">
        <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
          <div className="relative max-w-sm w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search patient, token..." 
              className="bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full pl-9 p-2 hover:border-gray-300 transition-colors"
            />
          </div>

          <div className="relative">
            <select className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2 pr-8 appearance-none hover:border-gray-300 transition-colors cursor-pointer font-medium">
              <option>All Sources</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div className="relative">
            <select className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2 pr-8 appearance-none hover:border-gray-300 transition-colors cursor-pointer font-medium">
              <option>Any Status</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-sm whitespace-nowrap">
          <SlidersHorizontal size={14} />
          <span>More Filters</span>
        </button>
      </div>
    </div>
  );
};

export default QueueFilters;
