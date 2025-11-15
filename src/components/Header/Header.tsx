import React from 'react';
import { Menu, MapPin, Settings, User } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { buttonStyles, layoutStyles } from '../../styles';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onMenuToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onMenuToggle,
}) => {
  return (
    <header className={`${layoutStyles.header} bg-white shadow-sm`}>
      <div className={`${layoutStyles.headerContent} flex items-center justify-between px-6 py-3`}>
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button onClick={onMenuToggle} className={buttonStyles.icon} aria-label="Menu">
            <Menu className="w-6 h-6 text-gray-700" />
          </button>

          <div className="flex items-center gap-3">
            <MapPin className="w-8 h-8 text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-800 hidden sm:block">
              Maps
            </h1>
          </div>
        </div>

        {/* Middle: Search */}
        <div className="flex-1 mx-6 max-w-2xl">
          <SearchBar value={searchQuery} onChange={onSearchChange} />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-5">
          <button
            className={`${buttonStyles.icon} hidden md:flex`}
            aria-label="Settings"
          >
            <Settings className="w-6 h-6 text-gray-700" />
          </button>

          <button
            className={buttonStyles.icon}
            aria-label="User profile"
          >
            <User className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </header>
  );
};
