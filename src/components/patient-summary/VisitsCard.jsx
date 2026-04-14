import React from 'react';
import { Calendar, User, ShieldAlert } from 'lucide-react';
import SummaryCard from './SummaryCard';
import SectionHeader from './SectionHeader';

const VisitsCard = ({ visits }) => (
  <SummaryCard>
    <SectionHeader 
      title="Recent Visits" 
      icon={Calendar} 
      actionText="View Timeline" 
      iconColor="text-orange-500"
    />
    <div className="space-y-6">
      {visits?.map((item, idx) => (
        <div key={idx} className={`flex gap-4 ${idx > 0 ? 'border-t border-gray-50 pt-5' : ''}`}>
          <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${item.iconType === 'user' ? 'bg-blue-50 text-blue-500' : 'bg-red-50 text-red-400'}`}>
            {item.iconType === 'user' ? <User size={20} /> : <ShieldAlert size={20} />}
          </div>
          <div>
            <h5 className="font-bold text-gray-800 text-sm">{item.title}</h5>
            <p className="text-gray-500 text-xs mt-0.5 font-semibold">{item.doctor}</p>
            <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
              <span>{item.date}</span>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span>{item.type}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </SummaryCard>
);

export default VisitsCard;
