// src/hooks/useMapState.ts
import { useState } from 'react';
import type { Coordinates, Place } from '../types/map.types';
import type { OsrmCoordinate } from '../types/osrm.types';
import { MAP_CONFIG } from '../config/map.config';

export const useMapState = () => {
  // Existing state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mapCenter, setMapCenter] = useState<Coordinates>(
    MAP_CONFIG.defaultCenter
  );
  const [zoom, setZoom] = useState(MAP_CONFIG.defaultZoom);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  // Routing state
  const [routingMode, setRoutingMode] = useState(false);
  const [startPoint, setStartPoint] = useState<OsrmCoordinate | null>(null);
  const [endPoint, setEndPoint] = useState<OsrmCoordinate | null>(null);

  // Existing functions
  const toggleSidebar = () => setSidebarOpen((prev: boolean) => !prev);
  const closeSidebar = () => setSidebarOpen(false);
  const closeSelectedPlace = () => setSelectedPlace(null);

  // Routing functions
  const enableRoutingMode = () => {
    setRoutingMode(true);
    setStartPoint(null);
    setEndPoint(null);
  };

  const disableRoutingMode = () => {
    setRoutingMode(false);
    setStartPoint(null);
    setEndPoint(null);
  };

  const clearRoute = () => {
    setStartPoint(null);
    setEndPoint(null);
  };

  return {
    // Existing returns
    sidebarOpen,
    searchQuery,
    mapCenter,
    zoom,
    selectedPlace,
    setSidebarOpen,
    setSearchQuery,
    setMapCenter,
    setZoom,
    setSelectedPlace,
    toggleSidebar,
    closeSidebar,
    closeSelectedPlace,

    // Routing returns
    routingMode,
    startPoint,
    endPoint,
    setStartPoint,
    setEndPoint,
    enableRoutingMode,
    disableRoutingMode,
    clearRoute,
  };
};
