import { Header } from "./components/Header/Header";
import { MapLibreWrapper } from "@/components/Map/MapLibreWrapper";
import { RoutingPanel } from "@/components/Routing/RoutingPanel";
import { useMapState } from "@/hooks/Map/useMapState";
import { useOSRMRoute } from "@/hooks/Route/useOSRMRoute";
import { layoutStyles } from "@/styles";
import { mapContext } from "@/context/mapContext";
import { useMapLibre } from "@/hooks/Map/useMapLibre";
import { EditorProvider } from "@/context/editorContext";
import { useState } from "react"
import { useMapInteractivity } from "@/hooks/Map/useMapInteractivity";
import type {layerModeType}from "@/types/map.types"
const App = () => {
  const [layerMode , setLayerMode] = useState<layerModeType>("standard")
  const {searchQuery,mapCenter,zoom,setSearchQuery,setZoom,toggleSidebar,} = useMapState();
  const { mapContainer, map} = useMapLibre({ center : mapCenter, zoom: zoom, onZoomChange:  setZoom , mode:layerMode });
  const { route, loading, error, handleGetRoute , handleClearRoute,handleRouteToggle , handleCloseRouting ,handleChangeStart, handleChangeEnd, startPoint  , endPoint, routingOn} = useOSRMRoute();
  const [projection, setProjection] = useState(true)

  useMapInteractivity({
      map : map.current,
      config: { poiSourceLayers: ["pois"], areaSourceLayers: ["boundaries_coarse_name", "places"],},
      onSelectPoi: (props) => {console.log("POI selected:", props.name, props);}
    });
  const handleGlobeToggle = () => {
    setProjection((prev) => {
      const nextState = !prev;
      if (map.current) {
        map.current.setProjection({ type: nextState ? "globe" : "mercator" });
      }
      return nextState;
    });

  };
  const handleLayersToggle = () => {setLayerMode((prev) => (prev === "standard" ? "satellite" : "standard")); };
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
        projection={projection}
        onGlobeProjection= {handleGlobeToggle}
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
          onLayersToggle={handleLayersToggle}
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
