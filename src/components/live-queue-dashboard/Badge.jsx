import React from 'react';
import { Phone, MessageCircle, UserWalking } from 'lucide-react';

const Badge = ({ type, children }) => {
  const styles = {
    warning: "bg-yellow-100 text-yellow-700",
    info: "bg-blue-100 text-blue-700",
    success: "bg-green-100 text-green-700",
    purple: "bg-fuchsia-100 text-fuchsia-700", // pre-op
  };

  return (
    <span className={`px-2.5 py-1 text-xs font-bold rounded flex items-center w-fit ${styles[type] || "bg-gray-100 text-gray-700"}`}>
      {children}
    </span>
  );
};

export const SourceBadge = ({ source }) => {
  if (source === 'Call Center') {
    return (
      <span className="px-2 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded flex items-center gap-1 w-fit">
        <Phone size={12} />
        {source}
      </span>
    );
  }
  if (source === 'WhatsApp') {
    return (
      <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded flex items-center gap-1 w-fit">
        <MessageCircle size={12} />
        {source}
      </span>
    );
  }
  if (source === 'Walk-In') {
    return (
      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded flex items-center gap-1 w-fit">
        <UserWalking size={12} />
        {source}
      </span>
    );
  }
  return <span className="text-xs font-medium text-gray-500">{source}</span>;
};

export default Badge;
