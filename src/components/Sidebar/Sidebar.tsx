import React from 'react';
import { X } from 'lucide-react';
import { QuickActions } from './QuickActions';
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
        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Menu</h2>
            <button
              onClick={onClose}
              className={buttonStyles.icon}
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <QuickActions />
        </div>

        <SavedPlacesList places={savedPlaces} onPlaceClick={onPlaceClick} />
        <RecentPlacesList places={recentPlaces} onPlaceClick={onPlaceClick} />
      </div>
    </aside>
  );
};
