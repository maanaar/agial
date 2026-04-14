import React from 'react';
import { Pill, Percent, Link } from 'lucide-react';
import SummaryCard from './SummaryCard';
import SectionHeader from './SectionHeader';
import StatusBadge from './StatusBadge';

const MedicationsCard = ({ medications }) => (
  <SummaryCard>
    <SectionHeader 
      title="Active Medications" 
      icon={Link} 
      actionText="View All" 
      iconColor="text-emerald-500"
    />
    <div className="space-y-6">
      {medications?.map((item, idx) => (
        <div key={idx} className={`flex justify-between items-start ${idx > 0 ? 'border-t border-gray-50 pt-5' : ''}`}>
          <div className="flex gap-3">
            <div className="mt-1 text-emerald-500 font-medium">
              {item.iconType === 'percent' ? <Percent size={18} /> : <Pill size={18} />}
            </div>

            <div>
              <h5 className="font-bold text-gray-800 text-sm">{item.name}</h5>
              <p className="text-gray-500 text-xs mt-0.5">{item.instructions}</p>
              <div className="flex gap-2 text-xs text-gray-400 mt-1 font-medium">
                <span>Prescribed: {item.date} • {item.doctor}</span>
              </div>
            </div>
          </div>
          <StatusBadge type={item.status}>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</StatusBadge>
        </div>
      ))}
    </div>
  </SummaryCard>
);

export default MedicationsCard;
