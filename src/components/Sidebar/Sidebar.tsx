import React from 'react';
import { MapPin, X } from 'lucide-react';
import { SavedPlacesList } from './SavedPlacesList';
import { RecentPlacesList } from './RecentPlacesList';
import type { Place, SavedPlace } from '../../types/map.types';
import { layoutStyles, buttonStyles } from '../../styles';

interface SidebarProps {
  isOpen: boolean;
  savedPlaces: SavedPlace[];
  recentPlaces: Place[];
  onClose: () => void;
  onPlaceClick: (place: Place) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  savedPlaces,
  recentPlaces,
  onClose,
  onPlaceClick,
}) => {
  return (
    <aside className={layoutStyles.sidebar(isOpen)}>
      <div className={layoutStyles.sidebarContent}>
        <div className="!p-1 border-b ">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-semibold text-[#00cc00]">
                Rapide Maps
              </span>
            </div>
            <button
              onClick={onClose}
              className={buttonStyles.icon}
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <SavedPlacesList places={savedPlaces} onPlaceClick={onPlaceClick} />
        <RecentPlacesList places={recentPlaces} onPlaceClick={onPlaceClick} />
      </div>
    </aside>
  );
};
