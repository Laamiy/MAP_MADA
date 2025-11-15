import React from 'react';
import { Clock, MapPin } from 'lucide-react';
import type { Place } from '../../types/map.types';

interface RecentPlacesListProps {
  places: Place[];
  onPlaceClick: (place: Place) => void;
}

export const RecentPlacesList: React.FC<RecentPlacesListProps> = ({
  places,
  onPlaceClick,
}) => {
  return (
    <div className=" flex flex-col gap-3 ">
      <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
        <Clock className="w-4 h-4 mr-2 text-gray-500" />
        Recent
      </h3>
      <div className="space-y-2">
        {places.map((place) => (
          <button
            key={place.id}
            onClick={() => onPlaceClick(place)}
            className="w-full flex items-start gap-3 p-3 hover:bg-gray-50 active:bg-gray-100 rounded-xl transition-all text-left"
          >
            <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-800 truncate">
                {place.name}
              </div>
              <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                {place.address}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
