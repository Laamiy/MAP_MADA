// App.tsx
import React from "react";
import { Header } from "./components/Header/Header";
import { MapLibreWrapper } from "@/components/Map/MapLibreWrapper";
import { RoutingPanel } from "@/components/Routing/RoutingPanel";
import { useMapState } from "@/hooks/Map/useMapState";
import { useOSRMRoute } from "@/hooks/Route/useOSRMRoute";
import { layoutStyles } from "./styles";
// import { Sidebar } from "./components/Sidebar/Sidebar";
// import { SAVED_PLACES, RECENT_PLACES } from "./constants/places.constants";
// import { useRouting } from "./components/Routing/hooks/useRouting";

const App: React.FC = () => {
  const {
    // sidebarOpen,
    searchQuery,
    mapCenter,
    zoom,
    selectedPlace,
    setSearchQuery,
    setZoom,
    // setSelectedPlace,
    setMapCenter, 
    toggleSidebar,
    // closeSidebar,
    closeSelectedPlace,
  } = useMapState();

  const { route, loading, error, handleGetRoute , handleClearRoute,handleRouteToggle , handleCloseRouting ,handleChangeStart, handleChangeEnd, startPoint  , endPoint, routingOn} = useOSRMRoute();

  // 1-liner: fly map to search result
const handleFlyTo = (lng: number, lat: number) => {
  setMapCenter({ lat, lng });
  setZoom(14); 
};

  return (
    <div className={layoutStyles.container}>
      <Header
        onFlyTo={handleFlyTo} 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onMenuToggle={toggleSidebar}
        onRouteToggle={handleRouteToggle}
        isRoutingMode={routingOn}
      />

      <div className={layoutStyles.mainContent}>
        {/* <Sidebar
          isOpen={sidebarOpen}
          savedPlaces={SAVED_PLACES}
          recentPlaces={RECENT_PLACES}
          onClose={closeSidebar}
          onPlaceClick={setSelectedPlace}
        /> */}

        <MapLibreWrapper
          center={mapCenter}
          zoom={zoom}
          selectedPlace={selectedPlace}
          routingOn={routingOn}
          startPoint={startPoint}
          endPoint={endPoint}
          route={route}
          onZoomChange={setZoom}
          onPlaceClose={closeSelectedPlace}
          onStartChange={handleChangeStart}
          onEndChange={handleChangeEnd}
        />

        <RoutingPanel
          isActive={routingOn}
          startPoint={startPoint}
          endPoint={endPoint}
          route={route}
          loading={loading}
          error={error}
          onStartPointChange={handleChangeStart}
          onEndPointChange={handleChangeEnd}
          onGetRoute={handleGetRoute}
          onClear={handleClearRoute}
          onClose={handleCloseRouting}
        />
      </div>
    </div>
  );
};

export default App;