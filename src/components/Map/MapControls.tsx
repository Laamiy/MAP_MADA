import React from 'react';
import { Navigation, Plus, Minus } from 'lucide-react';

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
  onNavigationClick,
}) => {
  const mapBtnClass = 
    "w-12 h-12 flex items-center justify-center text-foreground/80 bg-background/70 backdrop-blur-md transition-all \
    duration-200 outline-none hover:bg-muted hover:text-foreground active:scale-95 disabled:opacity-30 disabled:pointer-events-none";

  return (
    <div className="absolute bottom-6 right-6 flex flex-col gap-3 z-100 pointer-events-auto overflow-visible">
      {/* Zoom Control Group */}
      <div className="flex flex-col bg-background/70 border border-border rounded-2xl shadow-xl overflow-hidden backdrop-blur-md">
        <button
          onClick={onZoomIn}
          disabled={zoom >= maxZoom}
          className={`${mapBtnClass} border-none`}
          aria-label="Zoom in"
        >
          <Plus className="w-5 h-5" />
        </button>
        
        <div className="h-px w-full bg-border" />
        
        <button
          onClick={onZoomOut}
          disabled={zoom <= minZoom}
          className={`${mapBtnClass} border-none`}
          aria-label="Zoom out"
        >
          <Minus className="w-5 h-5" />
        </button>
      </div>

      {/* Recenter Navigation Button */}
      <button
        onClick={onNavigationClick}
        className={`${mapBtnClass} border border-border rounded-2xl shadow-xl`}
        aria-label="Center map"
      >
        <Navigation className="w-5 h-5 fill-current text-foreground/70" />
      </button>
    </div>
  );
};