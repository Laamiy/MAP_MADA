import React, { useState, useEffect } from 'react';
import { Menu, MapPin, Settings, User, Route } from 'lucide-react';
import { SearchBarWithResults } from './SearchBar';
import { buttonStyles, layoutStyles } from '../../styles';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onMenuToggle: () => void;
  onRouteToggle?: () => void;
  isRoutingMode?: boolean |null;
  onFlyTo?: (lng: number, lat: number) => void; // <-- add this line
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onMenuToggle,
  onRouteToggle,
  isRoutingMode = false,
}) => {
  const [editorActive, setEditorActive] = useState(() =>window.location.search.includes('editor=1'));

  useEffect(() => 
{
    const handler = () => setEditorActive(window.location.search.includes('editor=1'));
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
}, []);

  const toggleEditor = () => 
  {
    const next = !editorActive;
    setEditorActive(next);
    const url = new URL(window.location.href);
    if (next) 
      url.searchParams.set('editor', '1');
    else 
      url.searchParams.delete('editor');

    window.history.replaceState({}, '', url.toString());
    window.dispatchEvent(new Event('editor-toggle'));
  };

  return (
    <header className={`${layoutStyles.header} !px-5 shadow-sm `}>
      <div
        className={`${layoutStyles.headerContent} flex items-center justify-between  px-6 py-3 `}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className={buttonStyles.icon}
            aria-label="Menu"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <div className="flex items-center gap-3">
            <MapPin className="w-8 h-8 text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-800 hidden sm:block">
              Maps
            </h1>
          </div>
        </div>

        <div className="flex-1 mx-6 max-w-2xl">
          <SearchBarWithResults value={searchQuery} onChange={onSearchChange} />
        </div>

        <div className="flex items-center gap-5">
          {onRouteToggle && (
            <button
              onClick={onRouteToggle}
              className={`${buttonStyles.icon} ${
                isRoutingMode ? 'bg-blue-100 text-blue-600' : ''
              }`}
              aria-label="Toggle routing mode"
              title={isRoutingMode ? 'Exit route planning' : 'Plan route'}
            >
              <Route className="w-6 h-6" />
            </button>
          )}

          <button
            onClick={toggleEditor}
            className={`${buttonStyles.icon} ${
              editorActive ? 'bg-green-100 text-green-600' : ''
            }`}
            aria-label="Toggle POI editor"
            title={editorActive ? 'Exit POI editor' : 'Enter POI editor'}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>

          <button
            className={`${buttonStyles.icon} hidden md:flex`}
            aria-label="Settings"
          >
            <Settings className="w-6 h-6 text-gray-700" />
          </button>

          <button className={buttonStyles.icon} aria-label="User profile">
            <User className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </header>
  );
};
