import React from 'react';
import { Navigation, Plus, Minus, Layers } from 'lucide-react';
import { useAppSelector } from '@/store/store';

interface MapControlsProps {
  zoom: number;
  minZoom: number;
  maxZoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onLayersClick?: () => void;
  onNavigationClick?: () => void;
}

export const MapControls: React.FC<MapControlsProps> = ({
  zoom,
  minZoom,
  maxZoom,
  onZoomIn,
  onZoomOut,
  onLayersClick,
  onNavigationClick,
}) => {
  const currentTheme = useAppSelector((state) => state.theme.currentTheme);
  const isDarkMap = currentTheme === 'dark';

  // Dynamic glassmorphic theme styles
  const themeStyles = {
    capsule: isDarkMap
      ? 'bg-white/75 border-gray-200/80 text-gray-800 shadow-xl backdrop-blur-xl'
      : 'bg-slate-900/80 border-slate-800/80 text-slate-200 shadow-xl backdrop-blur-xl',
    hover: isDarkMap ? 'hover:bg-black/5' : 'hover:bg-white/10',
    divider: isDarkMap ? 'bg-gray-300/60' : 'bg-slate-700/60',
    iconFill: isDarkMap ? 'text-gray-700' : 'text-slate-200',
  };

  const mapBtnClass = `w-12 h-12 flex items-center justify-center transition-all duration-200 outline-none
    ${themeStyles.hover} active:scale-95 disabled:opacity-30 disabled:pointer-events-none`;

  return (
    <div className="absolute bottom-6 right-6 flex flex-col gap-3 z-100 pointer-events-auto overflow-visible">
      {/* Layers Toggle */}
      <button
        onClick={onLayersClick}
        className={`${mapBtnClass} border rounded-2xl ${themeStyles.capsule}`}
        aria-label="Toggle map layers"
      >
        <Layers className={`w-5 h-5 fill-current ${themeStyles.iconFill}`} />
      </button>

      {/* Zoom In / Zoom Out Group */}
      <div className={`flex flex-col border rounded-2xl overflow-hidden ${themeStyles.capsule}`}>
        <button
          onClick={onZoomIn}
          disabled={zoom >= maxZoom}
          className={`${mapBtnClass}`}
          aria-label="Zoom in"
        >
          <Plus className="w-5 h-5" />
        </button>

        <div className={`h-px w-full ${themeStyles.divider}`} />

        <button
          onClick={onZoomOut}
          disabled={zoom <= minZoom}
          className={`${mapBtnClass}`}
          aria-label="Zoom out"
        >
          <Minus className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation / Recenter Button */}
      <button
        onClick={onNavigationClick}
        className={`${mapBtnClass} border rounded-2xl ${themeStyles.capsule}`}
        aria-label="Center map"
      >
        <Navigation className={`w-5 h-5 fill-current ${themeStyles.iconFill}`} />
      </button>
    </div>
  );
};
