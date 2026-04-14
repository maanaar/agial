import React from 'react';
import { Stethoscope, FileText, Activity } from 'lucide-react';
import SummaryCard from './SummaryCard';
import SectionHeader from './SectionHeader';
import StatusBadge from './StatusBadge';

const DiagnosticsCard = () => (
  <SummaryCard>
    <SectionHeader 
      title="Recent Diagnostics" 
      icon={Stethoscope} 
      actionText="Lab Results" 
      iconColor="text-blue-500"
    />
    <div className="space-y-5">
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <div className="mt-1 text-gray-400">
            <FileText size={18} />
          </div>
          <div>
            <h5 className="font-bold text-gray-800 text-sm">Comprehensive Metabolic Panel</h5>
            <div className="text-xs text-gray-400 mt-1">Requested: 01 Mar 2026</div>
          </div>
        </div>
        <StatusBadge type="pending">Pending</StatusBadge>
      </div>

      <div className="flex justify-between items-start border-t border-gray-50 pt-5">
        <div className="flex gap-3">
          <div className="mt-1 text-blue-400">
            <Activity size={18} />
          </div>
          <div>
            <h5 className="font-bold text-gray-800 text-sm">Electrocardiogram (ECG)</h5>
            <div className="text-xs text-gray-400 mt-1">Performed: 15 Feb 2026</div>
          </div>
        </div>
        <StatusBadge type="final">Final</StatusBadge>
      </div>

      <div className="flex justify-between items-start border-t border-gray-50 pt-5">
        <div className="flex gap-3">
          <div className="mt-1 text-gray-400">
            <FileText size={18} />
          </div>
          <div>
            <h5 className="font-bold text-gray-800 text-sm">Complete Blood Count (CBC)</h5>
            <div className="text-xs text-gray-400 mt-1">Performed: 10 Jan 2026</div>
          </div>
        </div>
        <StatusBadge type="final">Final</StatusBadge>
      </div>
    </div>
  </SummaryCard>
);

export default DiagnosticsCard;
