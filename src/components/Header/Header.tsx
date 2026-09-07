import { useState, useRef, useEffect } from 'react';
import { Menu, Globe, Route, Sun } from 'lucide-react';
import { SearchBarWithResults } from "./SearchBar";
import { useEditorContext } from '@/context/editorContext';
import { THEME_OPTIONS } from '@/constants/theme.constant';
import type { MapTheme } from '@/types/map.theme.types';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setTheme } from '@/store/themeSlice';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onMenuToggle: () => void;
  onRouteToggle?: () => void;
  isRoutingMode?: boolean | null;
  onGlobeProjection?: () => void;
  onThemeToggle?: (theme: MapTheme) => void;
  currentTheme?: MapTheme;
}

export const Header = ({
  searchQuery,
  onSearchChange,
  onMenuToggle,
  onRouteToggle,
  isRoutingMode = false,
  onGlobeProjection,
  onThemeToggle,
}: HeaderProps) => {
  const { editorEnabled, toggleEditor } = useEditorContext();

  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector((state) => state.theme.currentTheme);

  const handleSelectTheme = (theme: MapTheme) => {
    dispatch(setTheme(theme));
    onThemeToggle?.(theme);
    setIsThemeOpen(false);
  };

  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsThemeOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const ActiveIcon = THEME_OPTIONS.find((t) => t.id === currentTheme)?.Icon || Sun;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none flex items-start justify-between p-6 overflow-visible">

      {/* Left Action Floating Capsule */}
      <div className="pointer-events-auto flex items-center gap-3 h-14 px-4 bg-white/50 border border-gray-200/60 rounded-2xl shadow-lg backdrop-blur-xl">
        <button
          onClick={onMenuToggle}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-transparent
                     transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2
                     focus-visible:ring-emerald-500"
          aria-label="Menu"
        >
          <Menu className="w-5 h-5 text-gray-700" />
        </button>

        <div className="flex items-center gap-2 pr-2">
          <h1 className="text-sm font-semibold text-gray-800 tracking-tight hidden sm:block">
            Maps
          </h1>
        </div>
      </div>

      {/* Center Search Container */}
      <div className="pointer-events-auto flex-1 max-w-2xl min-w-0 mx-6 relative overflow-visible shadow-lg rounded-2xl">
        <SearchBarWithResults
          value={searchQuery}
          onChange={onSearchChange}
        />
      </div>

      {/* Right Action Floating Capsule */}
      <div className="pointer-events-auto flex items-start gap-1.5 h-14 px-3 py-2 bg-white/50 border border-gray-200/60 rounded-2xl shadow-lg backdrop-blur-xl shrink-0">

        {/* Directions */}
        {onRouteToggle && (
          <button
            onClick={onRouteToggle}
            className={`group flex h-10 items-center justify-center rounded-xl transition-all font-medium text-xs
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 overflow-hidden ${
              isRoutingMode
                ? 'bg-emerald-600 text-white shadow-md px-3'
                : 'text-gray-700 hover:bg-black/5 px-3'
            }`}
            aria-label="Toggle routing mode"
            title={isRoutingMode ? 'Exit route planning' : 'Plan route'}
          >
            <Route className="w-4 h-4 shrink-0" />
            <span className={`max-w-0 opacity-0 overflow-hidden whitespace-nowrap transition-all duration-300 ease-out group-hover:max-w-30 group-hover:opacity-100 group-hover:ml-1.5 ${isRoutingMode ? 'text-white' : 'text-gray-700'}`}>
              Directions
            </span>
          </button>
        )}

        {/* Editor */}
        <button
          onClick={toggleEditor}
          className={`group flex h-10 items-center justify-center rounded-xl transition-all overflow-hidden
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
            editorEnabled
              ? 'bg-red-50 text-red-600 border border-red-200/60 hover:bg-red-100 px-3'
              : 'text-gray-700 hover:bg-black/5 px-3'
          }`}
          aria-label="Toggle POI editor"
          title={editorEnabled ? 'Exit POI editor' : 'Enter POI editor'}
        >
          <svg
            className="w-4 h-4 shrink-0"
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
          <span className={`max-w-0 opacity-0 overflow-hidden whitespace-nowrap transition-all duration-300 ease-out group-hover:max-w-30 group-hover:opacity-100 group-hover:ml-1.5 ${editorEnabled ? 'text-red-600' : 'text-gray-700'}`}>
            Editor
          </span>
        </button>

        <div className="h-5 w-px bg-gray-300/60 mx-1 my-2 hidden md:block" />

        <button
          className="hidden md:flex h-10 w-10 items-center justify-center rounded-xl text-gray-700 hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          aria-label="Toggle globe projection"
          title="Toggle projection"
          onClick={onGlobeProjection}
        >
          <Globe className="w-4 h-4" />
        </button>

        {/* Morphing Capsule Dropdown */}
        <div className="relative w-10" ref={dropdownRef}>
          <button
            onClick={() => setIsThemeOpen((prev) => !prev)}
            className={`flex h-10 w-10 items-center justify-center rounded-xl text-gray-700 transition-colors
                        hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
              isThemeOpen ? 'bg-black/5' : ''
            }`}
            aria-label="Select Theme"
            title="Theme Schemes"
          >
            <ActiveIcon className="w-4 h-4" />
          </button>

          <div
            className={`absolute top-full left-0 right-0 mt-2 w-10 p-1 bg-white/90 border border-gray-200/70
                        rounded-2xl shadow-xl backdrop-blur-xl flex flex-col items-center gap-1.5
                        transition-all duration-300 ease-out origin-top ${
              isThemeOpen
                ? 'opacity-100 scale-y-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 scale-y-95 -translate-y-3 pointer-events-none'
            }`}
          >
            {THEME_OPTIONS.map(({ id, label, Icon, colorClass }) => {
              const isSelected = currentTheme === id;
              return (
                <button
                  key={id}
                  onClick={() => handleSelectTheme(id as MapTheme)}
                  title={label}
                  aria-label={label}
                  className={`relative flex h-8 w-8 items-center justify-center rounded-xl transition-all duration-200 ${
                    isSelected
                      ? 'bg-black/10 shadow-inner'
                      : colorClass
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {isSelected && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
