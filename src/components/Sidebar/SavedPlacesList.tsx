// src/components/Sidebar/SavedPlacesList.tsx
import React from 'react';
import { Star, ChevronRight } from 'lucide-react';
import type { SavedPlace } from '../../types/map.types';

interface SavedPlacesListProps {
  places: SavedPlace[];
  onPlaceClick?: (place: SavedPlace) => void;
}

export const SavedPlacesList: React.FC<SavedPlacesListProps> = ({
  places,
  onPlaceClick,
}) => {
  return (
    <div className="border-b flex flex-col gap-2 ">
      <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
        <Star className="w-4 h-4 ml-2 bg-b text-yellow-500" />
        Saved Places
      </h3>
      <div className="space-y-10">
        {places.map((place) => {
          const IconComponent = place.icon;
          return (
            <button
              key={place.id}
              onClick={() => onPlaceClick?.(place)}
              className="w-full flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
            >
              <IconComponent className="w-5 h-5 text-gray-600 mr-3" />
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-800">
                  {place.name}
                </div>
                <div className="text-xs text-gray-500">{place.address}</div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          );
        })}
      </div>
    </div>
  );
};


