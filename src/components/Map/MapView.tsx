// src/components/Map/MapView.tsx
import React, { useRef } from 'react';
import { MapPin } from 'lucide-react';
import { MapControls } from './MapControls';
import { PlaceCard } from './PlaceCard';
import type { Coordinates, Place } from '../../types/map.types';
import { MAP_CONFIG } from '../../config/map.config';
import { layoutStyles } from '../../styles';

interface MapViewProps {
  center: Coordinates;
  zoom: number;
  selectedPlace: Place | null;
  onZoomChange: (zoom: number) => void;
  onPlaceClose: () => void;
}

export const MapView: React.FC<MapViewProps> = ({
  center,
  zoom,
  selectedPlace,
  onZoomChange,
  onPlaceClose,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => {
    onZoomChange(Math.min(MAP_CONFIG.maxZoom, zoom + 1));
  };

  const handleZoomOut = () => {
    onZoomChange(Math.max(MAP_CONFIG.minZoom, zoom - 1));
  };

  return (
    <main className={layoutStyles.mapContainer}>
      <div ref={mapRef} className={layoutStyles.mapView}>
        {/* Mock Map Visualization - Replace with actual MapLibre component */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-8 bg-white bg-opacity-90 rounded-lg shadow-lg max-w-md">
            <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Map View
            </h3>
            <p className="text-gray-600 mb-4">
              Centered at: {center.lat.toFixed(4)}°, {center.lng.toFixed(4)}°
            </p>
            <p className="text-sm text-gray-500">Zoom Level: {zoom}</p>
            <div className="mt-4 text-xs text-gray-400">
              Map Source: {MAP_CONFIG.baseUrl}
            </div>
          </div>
        </div>

        <MapControls
          zoom={zoom}
          minZoom={MAP_CONFIG.minZoom}
          maxZoom={MAP_CONFIG.maxZoom}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
        />

        {selectedPlace && (
          <PlaceCard place={selectedPlace} onClose={onPlaceClose} />
        )}
      </div>
    </main>
  );
};


