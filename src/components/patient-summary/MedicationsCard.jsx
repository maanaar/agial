import React from 'react';
import { Plus, Pill } from 'lucide-react';
import SummaryCard from './SummaryCard';
import SectionHeader from './SectionHeader';
import StatusBadge from './StatusBadge';

const MedicationsCard = () => (
  <SummaryCard>
    <SectionHeader 
      title="Active Medications" 
      icon={Pill} 
      actionText="View All" 
      iconColor="text-emerald-500"
    />
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <div className="mt-1 p-1 bg-emerald-50 text-emerald-500 rounded">
            <Plus size={16} />
          </div>
          <div>
            <h5 className="font-bold text-gray-800 text-sm">Amlodipine 5mg Tablet</h5>
            <p className="text-gray-500 text-xs mt-0.5">1 tablet PO once daily</p>
            <div className="flex gap-2 text-xs text-gray-400 mt-1 font-medium">
              <span>Prescribed: 01 Mar 2026 • Dr. Ahmed Anwar</span>
            </div>
          </div>
        </div>
        <StatusBadge type="active">Active</StatusBadge>
      </div>

      <div className="flex justify-between items-start border-t border-gray-50 pt-5">
        <div className="flex gap-3">
          <div className="mt-1 p-1 bg-emerald-50 text-emerald-500 rounded">
            <Pill size={16} />
          </div>
          <div>
            <h5 className="font-bold text-gray-800 text-sm">Vitamin D3 1000 IU Capsule</h5>
            <p className="text-gray-500 text-xs mt-0.5">1 capsule PO once daily</p>
            <div className="flex gap-2 text-xs text-gray-400 mt-1 font-medium">
              <span>Prescribed: 10 Jan 2026 • Dr. Ahmed Anwar</span>
            </div>
          </div>
        </div>
        <StatusBadge type="active">Active</StatusBadge>
      </div>
    </div>
  </SummaryCard>
);

export default MedicationsCard;
