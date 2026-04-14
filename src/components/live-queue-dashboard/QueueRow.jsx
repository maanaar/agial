import React from 'react';
import Badge, { SourceBadge } from './Badge';

const QueueRow = ({ item }) => {
  return (
    <div className="grid grid-cols-12 gap-4 border-b border-gray-100 py-4 px-6 items-center hover:bg-gray-50 transition-colors">
      <div className="col-span-1 text-[13px] font-mono tracking-tight font-bold text-gray-900">
        {item.token}
      </div>
      
      <div className="col-span-2">
        <div className="text-sm font-bold text-gray-900">{item.patientName}</div>
        <div className="text-xs text-gray-400 mt-0.5">{item.mrn}</div>
      </div>

      <div className="col-span-2">
        <div className="text-sm font-bold text-gray-900">{item.dept}</div>
        <div className="text-xs text-gray-400 mt-0.5">{item.provider}</div>
      </div>

      <div className="col-span-2 flex items-center">
        <SourceBadge source={item.source} />
      </div>

      <div className="col-span-1 text-sm font-medium text-gray-900">
        {item.arrival}
      </div>

      <div className="col-span-1 text-sm font-medium">
        <span className={item.waitTimeColor === 'red' ? 'text-red-100' : item.waitTimeColor === 'yellow' ? 'text-yellow-100' : item.waitTimeColor === 'green' ? 'text-green-100' : 'text-gray-400' /* Actually image has wait times with very light colors like fff0f0? Wait. No, red wait time looks like faint red text over white. We'll use text-red-500/yellow-500/green-500 but very faint in the image? Actually it's red-100 in the image, very light text? Let's use standard colors with opacity or light variants */}
          style={{ color: item.waitTimeColor === 'red' ? '#fee2e2' : item.waitTimeColor === 'yellow' ? '#fef08a' : item.waitTimeColor === 'green' ? '#bbf7d0' : '#9ca3af' }}
        >
          {item.waitTime}
        </span>
      </div>

      <div className="col-span-1">
        <Badge type={item.statusType}>{item.status}</Badge>
      </div>

      <div className="col-span-2 flex justify-end">
        {item.actionType === 'primary' ? (
          <button className="px-4 py-1.5 bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold rounded transition-colors">
            {item.actionText}
          </button>
        ) : (
          <button className="px-4 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold rounded transition-colors">
            {item.actionText}
          </button>
        )}
      </div>
    </div>
  );
};

export default QueueRow;
