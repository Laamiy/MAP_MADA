import React from 'react';

export const Badge: React.FC<{ count?: number; color?: string }> = ({ 
  count, 
  color = 'bg-gray-100 text-gray-600' 
}) => {
  if (!count) return null;
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {count}
    </span>
  );
};

export const OnlineBadge = () => (
  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-50 text-green-700 text-xs font-medium">
    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
    Online
  </span>
);