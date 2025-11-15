import React from 'react';
import { X, Star } from 'lucide-react';
import type { Place } from '../../types/map.types';
import { buttonStyles, cardStyles } from '../../styles';

interface PlaceCardProps {
  place: Place;
  onClose: () => void;
  onDirections?: (place: Place) => void;
  onSave?: (place: Place) => void;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({
  place,
  onClose,
  onDirections,
  onSave,
}) => {
  return (
    <div className={cardStyles.placeCard}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 pr-2">
          <h4 className="font-semibold text-gray-900 text-lg mb-1">{place.name}</h4>
          <p className="text-sm text-gray-600 leading-relaxed">{place.address}</p>
          {place.rating && (
            <div className="flex items-center mt-2.5">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="ml-1.5 text-sm font-semibold text-gray-900">
                {place.rating}
              </span>
              {place.reviews && (
                <span className="ml-1.5 text-sm text-gray-600">
                  ({place.reviews} reviews)
                </span>
              )}
            </div>
          )}
        </div>
        <button onClick={onClose} className={buttonStyles.icon} aria-label="Close">
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>
      <div className="flex flex-col gap-3 mt-4 justify-evenly">
        <button
          onClick={() => onDirections?.(place)}
          className={buttonStyles.primary}
        >
          Directions
        </button>
        <button onClick={() => onSave?.(place)} className={buttonStyles.secondary}>
          Save
        </button>
      </div>
    </div>
  );
};
