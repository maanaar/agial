import React from 'react';
import { Calendar, User, ShieldAlert } from 'lucide-react';
import SummaryCard from './SummaryCard';
import SectionHeader from './SectionHeader';

const VisitsCard = () => (
  <SummaryCard>
    <SectionHeader 
      title="Recent Visits" 
      icon={Calendar} 
      actionText="View Timeline" 
      iconColor="text-orange-500"
    />
    <div className="space-y-6">
      <div className="flex gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
          <User size={20} />
        </div>
        <div>
          <h5 className="font-bold text-gray-800 text-sm">Internal Medicine Consultation</h5>
          <p className="text-gray-500 text-xs mt-0.5 font-semibold">Dr. Ahmed Anwar</p>
          <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
            <span>01 Mar 2026, 09:15 AM</span>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <span>Outpatient</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4 border-t border-gray-50 pt-5">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-400">
          <ShieldAlert size={20} />
        </div>
        <div>
          <h5 className="font-bold text-gray-800 text-sm">Emergency Admission</h5>
          <p className="text-gray-500 text-xs mt-0.5 font-semibold">Dr. Sarah Mahmoud</p>
          <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
            <span>15 Feb 2026, 11:30 AM</span>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <span>Emergency Clinic</span>
          </div>
        </div>
      </div>
    </div>
  </SummaryCard>
);

export default VisitsCard;
