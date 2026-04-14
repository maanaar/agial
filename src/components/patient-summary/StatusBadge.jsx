import React from 'react';

const StatusBadge = ({ children, type = 'default' }) => {
  const styles = {
    chronic: 'bg-gray-100 text-gray-600',
    resolved: 'bg-gray-100 text-gray-400',
    active: 'bg-green-50 text-green-700',
    pending: 'bg-orange-50 text-orange-700',
    final: 'bg-green-50 text-green-700',
    drug: 'bg-red-50 text-red-700',
    environment: 'bg-yellow-50 text-yellow-700'
  };
  
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${styles[type] || styles.chronic}`}>
      {children}
    </span>
  );
};

export default StatusBadge;
