import React from 'react';
import { Stethoscope, FileText, Activity } from 'lucide-react';
import SummaryCard from './SummaryCard';
import SectionHeader from './SectionHeader';
import StatusBadge from './StatusBadge';

const DiagnosticsCard = ({ diagnostics }) => (
  <SummaryCard>
    <SectionHeader 
      title="Recent Diagnostics" 
      icon={Stethoscope} 
      actionText="Lab Results" 
      iconColor="text-blue-500"
    />
    <div className="space-y-5">
      {diagnostics?.map((item, idx) => (
        <div key={idx} className={`flex justify-between items-start ${idx > 0 ? 'border-t border-gray-50 pt-5' : ''}`}>
          <div className="flex gap-3">
            <div className="mt-1 text-gray-400">
              {item.type === 'file' ? <FileText size={18} /> : <Activity size={18} className="text-blue-400" />}
            </div>
            <div>
              <h5 className="font-bold text-gray-800 text-sm">{item.title}</h5>
              <div className="text-xs text-gray-400 mt-1">
                {item.status === 'pending' ? 'Requested: ' : 'Performed: '}
                {item.date}
              </div>
            </div>
          </div>
          <StatusBadge type={item.status}>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</StatusBadge>
        </div>
      ))}
    </div>
  </SummaryCard>
);

export default DiagnosticsCard;
