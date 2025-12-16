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
    <div className=" flex flex-col gap-4 ">
      <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
        <Clock className="w-6 h-6 !mr-2 text-blue-500" />
        <label className="text-xl font-semibold ">Recent</label>
      </h3>
      <div className="!space-y-3">
        {places.map((place) => (
          <button
            key={place.id}
            onClick={() => onPlaceClick(place)}
            className="w-full flex items-start !gap-1 !p-2 hover:bg-blue-200 active:bg-gray-100 rounded-xl transition-all text-left justify-center"
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
