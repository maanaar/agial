import React from 'react';
import { AlertCircle, ShieldAlert } from 'lucide-react';
import SummaryCard from './SummaryCard';
import SectionHeader from './SectionHeader';
import StatusBadge from './StatusBadge';

const AllergiesCard = ({ allergies }) => (
  <SummaryCard>
    <SectionHeader 
      title="Allergies & Alerts" 
      icon={AlertCircle} 
      actionText="Update" 
      iconColor="text-red-500"
    />
    <div className="space-y-6">
      {allergies?.map((item, idx) => (
        <div key={idx} className={`flex justify-between items-start ${idx > 0 ? 'border-t border-gray-50 pt-5' : ''}`}>
          <div className="flex gap-3">
            <div className={`mt-1 p-1 rounded ${item.type === 'drug' ? 'bg-red-50 text-red-500' : 'bg-yellow-50 text-yellow-600'}`}>
              <ShieldAlert size={16} />
            </div>
            <div>
              <h5 className="font-bold text-gray-800 text-sm uppercase tracking-wide">{item.name}</h5>
              <p className="text-gray-500 text-xs mt-1">
                <span className="font-semibold text-gray-600">Reaction:</span> {item.reaction}
              </p>
              <p className="text-xs mt-0.5">
                <span className="text-gray-400">Severity:</span> <span className={`${item.severity === 'High' ? 'text-red-500' : 'text-orange-500'} font-bold`}>{item.severity}</span>
              </p>
            </div>
          </div>
          <StatusBadge type={item.type}>{item.type === 'drug' ? 'Drug Allergy' : 'Environment'}</StatusBadge>
        </div>
      ))}
    </div>
  </SummaryCard>
);

export default AllergiesCard;
