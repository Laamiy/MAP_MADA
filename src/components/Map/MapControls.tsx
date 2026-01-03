// src/components/Map/MapControls.tsx
import React from 'react';
import { Layers, Navigation, Plus, Minus } from 'lucide-react';
import { buttonStyles } from '../../styles';

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
  // onLayersClick,
  onNavigationClick,
}) => {
  const Wrapper = 'bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden';

  const mapBtn =
    'w-11 h-11 grid place-content-center text-gray-700 ' +
    'hover:bg-gray-100 active:bg-gray-200 transition ' +
    'disabled:opacity-40 disabled:pointer-events-none';

  return (
    <div className="absolute top-4 right-4 flex flex-col gap-2">
      <div className={Wrapper}>
        <button
          onClick={onZoomIn}
          disabled={zoom >= maxZoom}
          className={`${buttonStyles.mapControl} ${mapBtn} rounded-t-2xl`}
          aria-label="Zoom in"
        >
          <Plus className="w-5 h-5" />
        </button>
        <div className="border-t border-gray-200" />
        <button
          onClick={onZoomOut}
          disabled={zoom <= minZoom}
          className={`${buttonStyles.mapControl} ${mapBtn} rounded-b-2xl`}
          aria-label="Zoom out"
        >
          <Minus className="w-5 h-5" />
        </button>
      </div>
      {/* <button
        onClick={onLayersClick}
        className={`${buttonStyles.mapControl} ${Wrapper} ${mapBtn}`}
        aria-label="Toggle layers"
      >
        <Layers className="w-5 h-5" />
      </button> */}

      <button
        onClick={onNavigationClick}
        className={`${buttonStyles.mapControl} ${Wrapper} ${mapBtn}`}
        aria-label="Center map"
      >
        <Navigation className="w-5 h-5" />
      </button>
    </div>
  );
};
