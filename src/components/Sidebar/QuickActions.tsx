import React from 'react';
import { Navigation, Layers } from 'lucide-react';
// import { buttonStyles, quickActionStyles } from '../../styles';

export const QuickActions: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {/* <button className={`${buttonStyles.quickAction} ${quickActionStyles.blue}`}>
        <Navigation className="w-6 h-6 text-blue-600 mb-2" />
        <span className="text-xs font-medium text-gray-700">Directions</span>
      </button> */}
      {/* <button className={`${buttonStyles.quickAction} ${quickActionStyles.green}`}>
        <Layers className="w-6 h-6 text-green-600 mb-2" />
        <span className="text-xs font-medium text-gray-700">Layers</span>
      </button> */}
    </div>
  );
};
