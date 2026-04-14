import React from 'react';

// eslint-disable-next-line no-unused-vars
const SectionHeader = ({ title, icon: IconComponent, actionText, onAction, iconColor = "text-teal-600", iconBg = "bg-teal-50" }) => {
  return (
    <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
      <div className="flex items-center gap-2">
        <div className={`p-1.5 rounded-md ${iconBg} ${iconColor}`}>
          <IconComponent size={18} />
        </div>
        <h3 className="font-semibold text-gray-800 text-base">{title}</h3>
      </div>
      {actionText && (
        <button 
          onClick={onAction}
          className="text-teal-600 text-sm font-medium hover:text-teal-700 transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default SectionHeader;
