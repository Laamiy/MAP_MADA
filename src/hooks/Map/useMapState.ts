import { useState } from 'react';
import type { Coordinates } from '@/types/map.types';
import { MAP_CONFIG } from '@/config/map.config';

export const useMapState = () => 
  {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [mapCenter, setMapCenter]     = useState<Coordinates>(MAP_CONFIG.defaultCenter);
    const [zoom, setZoom]               = useState(MAP_CONFIG.defaultZoom);
    // const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

    const toggleSidebar      = () => setSidebarOpen((prev: boolean) => !prev);
    const closeSidebar       = () => setSidebarOpen(false);
    // const closeSelectedPlace = () => setSelectedPlace(null);


    return {
              sidebarOpen,
              searchQuery,
              mapCenter,
              zoom,
              // selectedPlace,
              setSidebarOpen,
              setSearchQuery,
              setMapCenter,
              setZoom,
              // setSelectedPlace,
              toggleSidebar,
              closeSidebar,
              // closeSelectedPlace,
            };
  };
