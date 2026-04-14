import React from 'react';
import { Stethoscope, AlertCircle } from 'lucide-react';
import SummaryCard from './SummaryCard';
import SectionHeader from './SectionHeader';
import StatusBadge from './StatusBadge';

const DiagnosesCard = ({ diagnoses }) => (
  <SummaryCard>
    <SectionHeader 
      title="Active Diagnoses" 
      icon={Stethoscope} 
      actionText="Manage" 
      iconColor="text-purple-500"
    />
    <div className="space-y-5">
      {diagnoses?.map((item, idx) => (
        <div key={idx} className={`flex justify-between items-start group ${idx > 0 ? 'border-t border-gray-100 pt-5' : ''}`}>
          <div className="flex gap-3">
            <div className="mt-1 text-purple-400 group-hover:text-purple-600 transition-colors">
              <AlertCircle size={18} />
            </div>
            <div>
              <h5 className="font-bold text-gray-800 text-sm">{item.title}</h5>
              <div className="flex gap-2 text-xs text-gray-400 mt-1">
                <span>ICD-10: {item.icd}</span>
                <span>•</span>
                <span>Diagnosed: {item.date}</span>
              </div>
            </div>
          </div>
          <StatusBadge type={item.type}>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</StatusBadge>
        </div>
      ))}
    </div>
  </SummaryCard>
);

export default DiagnosesCard;
