// App.tsx
import React, { useEffect } from "react";
import { Header } from "./components/Header/Header";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { MapLibreWrapper } from "./components/Map/MapLibreWrapper";
import { RoutingPanel } from "./components/Routing/RoutingPanel";
import { useMapState } from "./hooks/useMapState";
import { useOSRMRoute } from "./hooks/useOSRMRoute";
import { SAVED_PLACES, RECENT_PLACES } from "./constants/places.constants";
import { layoutStyles } from "./styles";
import type { OSRMCoordinate } from "./types/osrm.types";

const App: React.FC = () => {
  const {
    sidebarOpen,
    searchQuery,
    mapCenter,
    zoom,
    selectedPlace,
    routingMode,
    startPoint,
    endPoint,
    setSearchQuery,
    setZoom,
    setSelectedPlace,
    setStartPoint,
    setEndPoint,
    setMapCenter, // ← already here
    toggleSidebar,
    closeSidebar,
    closeSelectedPlace,
    enableRoutingMode,
    disableRoutingMode,
    clearRoute: clearRoutePoints,
  } = useMapState();

  const { route, loading, error, fetchRoute, clearRoute } = useOSRMRoute();

  useEffect(() => {
    if (startPoint && endPoint && routingMode) {
      fetchRoute([startPoint, endPoint], {
        steps: true,
        geometries: 'geojson',
        overview: 'full',
      });
    }
  }, [startPoint, endPoint, routingMode, fetchRoute]);

  const handleGetRoute = () => {
    if (startPoint && endPoint) {
      fetchRoute([startPoint, endPoint], {
        steps: true,
        geometries: 'geojson',
        overview: 'full',
      });
    }
  };

  const handleClearRoute = () => {
    clearRoute();
    clearRoutePoints();
  };

  const handleCloseRouting = () => {
    disableRoutingMode();
    clearRoute();
    clearRoutePoints();
  };

  const handleRouteToggle = () => {
    if (routingMode) {
      handleCloseRouting();
    } else {
      enableRoutingMode();
    }
  };

  // 1-liner: fly map to search result
const handleFlyTo = (lng: number, lat: number) => {
  setMapCenter({ lat, lng });
  setZoom(18); 
};

  return (
    <div className={layoutStyles.container}>
      <Header
        onFlyTo={handleFlyTo} 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onMenuToggle={toggleSidebar}
        onRouteToggle={handleRouteToggle}
        isRoutingMode={routingMode}
      />

      <div className={layoutStyles.mainContent}>
        <Sidebar
          isOpen={sidebarOpen}
          savedPlaces={SAVED_PLACES}
          recentPlaces={RECENT_PLACES}
          onClose={closeSidebar}
          onPlaceClick={setSelectedPlace}
        />

        <MapLibreWrapper
          center={mapCenter}
          zoom={zoom}
          selectedPlace={selectedPlace}
          routingMode={routingMode}
          startPoint={startPoint}
          endPoint={endPoint}
          route={route}
          onZoomChange={setZoom}
          onPlaceClose={closeSelectedPlace}
          onStartChange={setStartPoint}
          onEndChange={setEndPoint}
          onMapClick={(coord: OSRMCoordinate) => {
            if (routingMode) {
              if (!startPoint) {
                setStartPoint(coord);
              } else if (!endPoint) {
                setEndPoint(coord);
              } else {
                setStartPoint(coord);
                setEndPoint(null);
              }
            }
          }}
        />

        <RoutingPanel
          isActive={routingMode}
          startPoint={startPoint}
          endPoint={endPoint}
          route={route}
          loading={loading}
          error={error}
          onStartPointChange={setStartPoint}
          onEndPointChange={setEndPoint}
          onGetRoute={handleGetRoute}
          onClear={handleClearRoute}
          onClose={handleCloseRouting}
        />
      </div>
    </div>
  );
};

export default App;