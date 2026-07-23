import { Header } from "./components/Header/Header";
import { MapLibreWrapper } from "@/components/Map/MapLibreWrapper";
import { RoutingPanel } from "@/components/Routing/RoutingPanel";
import { useMapState } from "@/hooks/Map/useMapState";
import { useOSRMRoute } from "@/hooks/Route/useOSRMRoute";
import { layoutStyles } from "./styles";
import { mapContext } from "./context/mapContext";
import { useMapLibre } from "./hooks/Map/useMapLibre";
import { EditorProvider } from "./context/editorContext";

const App = () => {

  const {searchQuery,mapCenter,zoom,setSearchQuery,setZoom,toggleSidebar,} = useMapState();
  const { mapContainer, map} = useMapLibre({ center : mapCenter, zoom: zoom, onZoomChange:  setZoom });
  const { route, loading, error, handleGetRoute , handleClearRoute,handleRouteToggle , handleCloseRouting ,handleChangeStart, handleChangeEnd, startPoint  , endPoint, routingOn} = useOSRMRoute();

  return (
    <div className={layoutStyles.container}>
      <mapContext.Provider value={map.current} > 
      <EditorProvider>
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onMenuToggle={toggleSidebar}
        onRouteToggle={handleRouteToggle}
        isRoutingMode={routingOn}
      />
      <div className={layoutStyles.mainContent}>
        <MapLibreWrapper
          center={mapCenter}
          zoom={zoom}
          mapContainer={mapContainer}
          routingOn={routingOn}
          startPoint={startPoint}
          endPoint={endPoint}
          route={route}
          onStartChange={handleChangeStart}
          onEndChange={handleChangeEnd}
        />
      </div>
      </EditorProvider>

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
      </mapContext.Provider>
    </div>
  );
};

export default App;