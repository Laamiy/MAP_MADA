import React, { useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import { MapControls } from "./MapControls";
import { PlaceCard } from "./PlaceCard";
import { MAP_CONFIG } from "../../config/map.config";
import { layoutStyles } from "../../styles";
import Editor from "../Editor/Editor";
import "../Editor/Editor.css";
import type { MapLibreWrapperProps } from "./MapLibreWrapper.interface";
import { useMapLibre } from "./hooks/useMapLibre";
import { useMapEditor } from "./hooks/useMapEditor"
import { useMapRouting } from "./hooks/useMapRouting";

export const MapLibreWrapper: React.FC<MapLibreWrapperProps> = (
  {
    center,
    zoom,
    selectedPlace,
    routingMode = false,
    startPoint = null,
    endPoint = null,
    route = null,
    onZoomChange,
    onPlaceClose,
    onMapClick,
    onStartChange,
    onEndChange,
  }
  ) => 
    // Core map functionality
    {
      const [debugMode, setDebugMode] = useState(false);
      const editorEnabled = window.location.search.includes("editor=1");
      const {
        mapContainer,
        map,
        mapStatus,
        handleZoomIn,
        handleZoomOut,
        handleNavigationClick,
        bustTiles,
        flyToFeature,
      } = useMapLibre(
        {
          center,
          zoom,
          routingMode,
          onZoomChange,
          onMapClick,
          onMapLoad: () => 
            {
              if (editorEnabled) 
                {
                  attachEditorInteractions();
                }
            },
      }
    );
  // Editor functionality
  const { selPoi, setSelPoi, attachEditorInteractions } = useMapEditor({map,editorEnabled,});
  // Routing functionality
  useMapRouting(
    {
      map,
      routingMode,
      startPoint,
      endPoint,
      route,
      onStartChange,
      onEndChange,
    }
  );
  const handleLayersClick = () => console.log("Layers clicked");
  return (
    <main className={layoutStyles.mapContainer}>
      {debugMode && (
        <div className="absolute top-20 left-4 bg-white p-4 rounded-lg shadow-lg z-50 max-w-xs">
          <h3 className="font-bold text-sm mb-2">Map Debug Info:</h3>
          <p className="text-xs mb-1">Status: {mapStatus}</p>
          <p className="text-xs mb-1">Editor: {editorEnabled ? "ON" : "OFF"}</p>
          <p className="text-xs mb-1">
            Center: {center.lat.toFixed(4)}, {center.lng.toFixed(4)}
          </p>
          <p className="text-xs mb-1">Zoom: {zoom}</p>
        </div>
      )}

      <button
        onClick={() => setDebugMode(!debugMode)}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 1000,
          background: "white",
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "5px 10px",
          cursor: "pointer",
          fontSize: "12px",
        }}
      >
        DEBUG {debugMode ? "Hide" : "Show"} Debug
      </button>

      <div
        ref={mapContainer}
        className="absolute inset-0 w-full h-full bg-gray-200"
      />

      <MapControls
        zoom={zoom}
        minZoom={MAP_CONFIG.minZoom}
        maxZoom={MAP_CONFIG.maxZoom}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onLayersClick={handleLayersClick}
        onNavigationClick={handleNavigationClick}
      />

      {selectedPlace && !routingMode && (
        <PlaceCard place={selectedPlace} onClose={onPlaceClose} />
      )}

      {editorEnabled && selPoi && (
        <Editor
          poi={selPoi}
          onClose={() => setSelPoi(null)}
          onDone={() => {
            setSelPoi(null);
            bustTiles();
          }}
        />
      )}
    </main>
  );
};