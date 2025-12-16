import React, { useState } from 'react';
import rapideIcon from '../../assets/images/rapide_icon.png';
import {
  Bookmark,
  History,
  Link2,
  MapPinPlus,
  MessageSquarePlus,
  Printer,
  ShieldUser,
  TrendingUp,
  X,
} from 'lucide-react';
// import { SavedPlacesList } from './SavedPlacesList';
// import { RecentPlacesList } from './RecentPlacesList';
import type { Place, SavedPlace } from '../../types/map.types';
import { layoutStyles, buttonStyles } from '../../styles';
import type { MenuItem } from '../../types/sidebar.types';

interface SidebarProps {
  isOpen: boolean;
  savedPlaces: SavedPlace[];
  recentPlaces: Place[];
  onClose: () => void;
  onPlaceClick: (place: Place) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  // savedPlaces,
  // recentPlaces,
  onClose,
  // onPlaceClick,
}) => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeItem, setActiveItem] = useState('posts');

  const menuItems: MenuItem[] = [
    { id: 'saved', label: 'Saved', icon: <Bookmark size={22} /> },
    { id: 'recents', label: 'Recents', icon: <History size={22} /> },
    {
      id: 'contributions',
      label: 'Your contributions',
      icon: <MessageSquarePlus size={22} />,
    },
    {
      id: 'locationSharing',
      label: 'Location Sharing',
      icon: <MapPinPlus size={22} />,
    },
    {
      id: 'timeline',
      label: 'Your timeline',
      icon: <TrendingUp size={22} />,
    },
    {
      id: 'privacyData',
      label: 'Your data in Maps',
      icon: <ShieldUser size={22} />,
    },
    { id: 'share', label: 'Share or embed map', icon: <Link2 size={22} /> },
    { id: 'print', label: 'Print', icon: <Printer size={22} /> },
  ];

  return (
    <aside className={layoutStyles.sidebar(isOpen)}>
      <div className={layoutStyles.sidebarContent}>
        <div className="!p-2  ">
          <div className="flex items-center justify-between !mb-2">
            <div className="flex items-center gap-3">
              <img
                src={rapideIcon}
                alt="Rapide Maps"
                className="cover w-10 h-10 rounded-xl"
              />
              <span className="text-2xl font-semibold text-[#00cc00]">
                Rapide Maps
              </span>
            </div>
            <button
              onClick={onClose}
              className={buttonStyles.icon}
              aria-label="Close menu"
            >
              <X className="w-8 h-8 text-gray-600 hover:bg-green-200 rounded-full " />
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 !p-4 overflow-y-auto">
          <ul className="!space-y-1">
            {menuItems.map((item) => {
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveItem(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      activeItem === item.id
                        ? ' text-gray-600'
                        : ' hover:bg-green-200 !p-3 cursor-pointer'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 ${
                        activeItem === item.id
                          ? 'text-gray-500'
                          : 'hover:bg-green-200 !pb-3'
                      }`}
                    >
                      {item.icon}
                    </span>

                    <span className="flex-1 !ml-4  text-left font-medium">
                      {item.label}
                    </span>
                    {/* {item.badge && (
                      <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )} */}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* <SavedPlacesList places={savedPlaces} onPlaceClick={onPlaceClick} />
        <RecentPlacesList places={recentPlaces} onPlaceClick={onPlaceClick} /> */}
      </div>
    </aside>
  );
};
