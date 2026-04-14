import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatsCard = ({ title, value, icon, iconBg, iconColor, trend, trendText, trendUp, detail }) => {
  const IconComponent = icon;
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-gray-500 font-medium text-sm">{title}</h3>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBg}`}>
          {IconComponent && <IconComponent size={18} className={iconColor} />}
        </div>
      </div>
      
      <div className="mt-auto">
        <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
        
        {trend && (
          <div className="flex items-center gap-1.5 text-xs font-medium">
            <span className={`flex items-center ${trendUp ? 'text-gray-400' : 'text-gray-400'}`}>
              <span className={`flex items-center ${trendUp ? 'text-gray-400' : 'text-emerald-400'}`}>
                {trendUp ? <ArrowUpRight size={14} className="text-gray-300 mr-0.5" /> : <ArrowDownRight size={14} className="text-emerald-400 mr-0.5" />}
                {trend}
              </span>
            </span>
            <span className="text-gray-500 font-normal">{trendText}</span>
          </div>
        )}

        {detail && (
          <div className="text-sm text-gray-500">
            {detail}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
