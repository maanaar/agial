import React from 'react';
import { Activity, Heart, Thermometer, Wind, TrendingUp } from 'lucide-react';
import SummaryCard from './SummaryCard';
import SectionHeader from './SectionHeader';

const VitalsCard = () => (
  <SummaryCard>
    <SectionHeader 
      title="Latest Vital Signs" 
      icon={Activity} 
      actionText="View Flowsheet" 
      iconColor="text-pink-500"
    />
    <div className="grid grid-cols-2 gap-4">
      <div className="p-4 rounded-xl bg-gray-50 border border-transparent hover:border-gray-200 transition-all">
        <div className="flex items-center gap-2 text-gray-400 text-xs font-medium mb-2 uppercase tracking-tight">
          <Activity size={14} className="text-blue-500" />
          Blood Pressure
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-gray-800">142/90</span>
          <span className="text-gray-400 text-xs">mmHg</span>
        </div>
        <div className="mt-2 text-[11px] font-bold text-red-500 flex items-center gap-1">
          <TrendingUp size={12} />
          <span>High (01 Mar 2026)</span>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-gray-50 border border-transparent hover:border-gray-200 transition-all">
        <div className="flex items-center gap-2 text-gray-400 text-xs font-medium mb-2 uppercase tracking-tight">
          <Heart size={14} className="text-red-500" />
          Heart Rate
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-gray-800">82</span>
          <span className="text-gray-400 text-xs">bpm</span>
        </div>
        <div className="mt-2 text-[11px] font-medium text-gray-400">
          Normal (01 Mar 2026)
        </div>
      </div>

      <div className="p-4 rounded-xl bg-gray-50 border border-transparent hover:border-gray-200 transition-all">
        <div className="flex items-center gap-2 text-gray-400 text-xs font-medium mb-2 uppercase tracking-tight">
          <Thermometer size={14} className="text-yellow-500" />
          Temperature
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-gray-800">37.1</span>
          <span className="text-gray-400 text-xs">°C</span>
        </div>
        <div className="mt-2 text-[11px] font-medium text-gray-400">
          Normal (01 Mar 2026)
        </div>
      </div>

      <div className="p-4 rounded-xl bg-gray-50 border border-transparent hover:border-gray-200 transition-all">
        <div className="flex items-center gap-2 text-gray-400 text-xs font-medium mb-2 uppercase tracking-tight">
          <Wind size={14} className="text-blue-400" />
          SpO2
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-gray-800">98</span>
          <span className="text-gray-400 text-xs">%</span>
        </div>
        <div className="mt-2 text-[11px] font-medium text-gray-400">
          Normal (01 Mar 2026)
        </div>
      </div>
    </div>
  </SummaryCard>
);

export default VitalsCard;
