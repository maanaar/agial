import React from 'react';
import { AlertCircle, ShieldAlert } from 'lucide-react';
import SummaryCard from './SummaryCard';
import SectionHeader from './SectionHeader';
import StatusBadge from './StatusBadge';

const AllergiesCard = () => (
  <SummaryCard>
    <SectionHeader 
      title="Allergies & Alerts" 
      icon={AlertCircle} 
      actionText="Update" 
      iconColor="text-red-500"
    />
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <div className="mt-1 p-1 bg-red-50 text-red-500 rounded">
            <ShieldAlert size={16} />
          </div>
          <div>
            <h5 className="font-bold text-gray-800 text-sm uppercase tracking-wide">Penicillin</h5>
            <p className="text-gray-500 text-xs mt-1">
              <span className="font-semibold text-gray-600">Reaction:</span> Hives, Anaphylaxis
            </p>
            <p className="text-xs mt-0.5">
              <span className="text-gray-400">Severity:</span> <span className="text-red-500 font-bold">High</span>
            </p>
          </div>
        </div>
        <StatusBadge type="drug">Drug Allergy</StatusBadge>
      </div>

      <div className="flex justify-between items-start border-t border-gray-50 pt-5">
        <div className="flex gap-3">
          <div className="mt-1 p-1 bg-yellow-50 text-yellow-600 rounded">
            <ShieldAlert size={16} />
          </div>
          <div>
            <h5 className="font-bold text-gray-800 text-sm uppercase tracking-wide">Latex</h5>
            <p className="text-gray-500 text-xs mt-1">
              <span className="font-semibold text-gray-600">Reaction:</span> Contact Dermatitis
            </p>
            <p className="text-xs mt-0.5">
              <span className="text-gray-400">Severity:</span> <span className="text-orange-500 font-bold">Moderate</span>
            </p>
          </div>
        </div>
        <StatusBadge type="environment">Environment</StatusBadge>
      </div>
    </div>
  </SummaryCard>
);

export default AllergiesCard;
