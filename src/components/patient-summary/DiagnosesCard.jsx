import React from 'react';
import { FileText, AlertCircle } from 'lucide-react';
import SummaryCard from './SummaryCard';
import SectionHeader from './SectionHeader';
import StatusBadge from './StatusBadge';

const DiagnosesCard = () => (
  <SummaryCard>
    <SectionHeader 
      title="Active Diagnoses" 
      icon={FileText} 
      actionText="Manage" 
      iconColor="text-purple-500"
    />
    <div className="space-y-5">
      <div className="flex justify-between items-start group">
        <div className="flex gap-3">
          <div className="mt-1 text-purple-400 group-hover:text-purple-600 transition-colors">
            <AlertCircle size={18} />
          </div>
          <div>
            <h5 className="font-bold text-gray-800 text-sm">Essential (primary) hypertension</h5>
            <div className="flex gap-2 text-xs text-gray-400 mt-1">
              <span>ICD-10: I10</span>
              <span>•</span>
              <span>Diagnosed: 01 Mar 2026</span>
            </div>
          </div>
        </div>
        <StatusBadge type="chronic">Chronic</StatusBadge>
      </div>

      <div className="flex justify-between items-start group border-t border-gray-100 pt-5">
        <div className="flex gap-3">
          <div className="mt-1 text-purple-400 group-hover:text-purple-600 transition-colors">
            <AlertCircle size={18} />
          </div>
          <div>
            <h5 className="font-bold text-gray-800 text-sm">Palpitations</h5>
            <div className="flex gap-2 text-xs text-gray-400 mt-1">
              <span>ICD-10: R00.2</span>
              <span>•</span>
              <span>Diagnosed: 15 Feb 2026</span>
            </div>
          </div>
        </div>
        <StatusBadge type="resolved">Resolved</StatusBadge>
      </div>
    </div>
  </SummaryCard>
);

export default DiagnosesCard;
