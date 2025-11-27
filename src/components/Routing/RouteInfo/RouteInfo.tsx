import React from 'react';
import { formatDistance, formatDuration } from '../../../utils/formatters';

interface RouteInfoProps {
  distance: number;
  duration: number;
  className?: string;
}

export const RouteInfo: React.FC<RouteInfoProps> = ({
  distance,
  duration,
  className = '',
}) => {
  return (
    <div className={`p-4 bg-blue-50 rounded-lg border border-blue-200 ${className}`}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-600 mb-1">Distance</p>
          <p className="text-xl font-bold text-blue-700">
            {formatDistance(distance)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-600 mb-1">Duration</p>
          <p className="text-xl font-bold text-blue-700">
            {formatDuration(duration)}
          </p>
        </div>
      </div>
    </div>
  );
};

