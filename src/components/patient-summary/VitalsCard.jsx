import React from 'react';
import { HeartPulse, Activity, Heart, Thermometer, Wind, TrendingUp } from 'lucide-react';
import SummaryCard from './SummaryCard';
import SectionHeader from './SectionHeader';

const VitalItem = ({ data }) => {
  const icons = {
    pressure: { icon: Activity, color: 'text-blue-500' },
    heart: { icon: Heart, color: 'text-red-500' },
    temp: { icon: Thermometer, color: 'text-yellow-500' },
    wind: { icon: Wind, color: 'text-blue-400' }
  };

  const { icon: Icon, color } = icons[data.type] || icons.pressure;

  return (
    <div className="p-4 rounded-xl bg-gray-50 border border-transparent hover:border-gray-200 transition-all">
      <div className="flex items-center gap-2 text-gray-400 text-xs font-medium mb-2 uppercase tracking-tight">
        <Icon size={14} className={color} />
        {data.label}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-gray-800">{data.value}</span>
        <span className="text-gray-400 text-xs">{data.unit}</span>
      </div>
      <div className={`mt-2 text-[11px] font-bold flex items-center gap-1 ${data.status === 'High' ? 'text-red-500' : 'text-gray-400 font-medium'}`}>
        {data.status === 'High' && <TrendingUp size={12} />}
        <span>{data.status} ({data.date})</span>
      </div>
    </div>
  );
};

const VitalsCard = ({ vitals }) => (
  <SummaryCard>
    <SectionHeader 
      title="Latest Vital Signs" 
      icon={HeartPulse} 
      actionText="View Flowsheet" 
      iconColor="text-pink-500"
    />
    <div className="grid grid-cols-2 gap-4">
      {vitals?.map((v, i) => (
        <VitalItem key={i} data={v} />
      ))}
    </div>
  </SummaryCard>
);

export default VitalsCard;
