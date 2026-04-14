import React from 'react';
import QueueFilters from './QueueFilters';
import QueueRow from './QueueRow';

const QueueTable = ({ tabs, queueData }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
      <QueueFilters tabs={tabs} />

      <div className="w-full overflow-x-auto">
        <div className="min-w-[1000px]">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 border-b border-gray-100 py-3 px-6 bg-white text-xs font-bold text-gray-400">
            <div className="col-span-1">Token</div>
            <div className="col-span-2">Patient Info</div>
            <div className="col-span-2">Department & Provider</div>
            <div className="col-span-2">Source</div>
            <div className="col-span-1">Arrival</div>
            <div className="col-span-1">Wait Time</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-2 text-right">Action</div>
          </div>

          {/* Table Body */}
          <div className="flex flex-col">
            {queueData.map((item) => (
              <QueueRow key={item.id} item={item} />
            ))}
            {queueData.length === 0 && (
              <div className="py-12 text-center text-gray-500 text-sm">
                No patients in queue matching criteria
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueueTable;
