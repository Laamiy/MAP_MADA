import { useState, useContext } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import { MapControls } from "./MapControls";
import { MAP_CONFIG } from "@/config/map.config";
import { layoutStyles } from "@/styles";
import Editor from "../Editor/Editor";
import "../Editor/Editor.css";
import { useMapRouting } from "@/hooks/Route/useMapRouting";
import { handleZoomIn, handleZoomOut, handleNavigationClick, bustTiles } from "@/utils/map.utils";
import type { MapLibreWrapperProps } from "@/interfaces/MapLibreWrapper.interface";
import { mapContext } from "@/context/mapContext";
import { useMapEditor } from "@/hooks/Editor/useMapEditor";
import { useEditorContext } from "@/context/editorContext";

export const MapLibreWrapper = ({
  center,
  zoom,
  mapContainer,
  routingOn = false,
  startPoint = null,
  endPoint = null,
  route = null,
  onStartChange,
  onEndChange,
  onLayersToggle,
}: MapLibreWrapperProps) => {
  const [debugMode, setDebugMode] = useState(false);

  const { editorEnabled } = useEditorContext();
  const mapInstance = useContext(mapContext);

  const { selPoi, setSelPoi } = useMapEditor({
    map: mapInstance,
    editorEnabled,
  });

  useMapRouting({
    map: mapInstance,
    routingOn,
    startPoint,
    endPoint,
    route,
    onStartChange,
    onEndChange,
  });

  return (
    <main className={layoutStyles.mapContainer}>
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-50 flex flex-col items-start gap-2">
        {/*<button
          onClick={() => setDebugMode(!debugMode)}
          className="
            px-3 py-1.5 text-[12px] font-medium
            bg-white text-gray-700 border border-gray-300 rounded
            transition-all duration-200 ease-in-out
            hover:bg-gray-50 hover:border-gray-400 hover:shadow-sm
            active:scale-95 active:ring-4 active:ring-gray-100
            flex items-center gap-2 cursor-pointer
          "
        >
          <div
            className={`w-2 h-2 rounded-full ${
              debugMode ? "bg-red-500 animate-pulse" : "bg-gray-400"
            }`}
          />
          DEBUG: {debugMode ? "Hide" : "Show"} Debug
        </button>*/}

        {debugMode && (
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-xs">
            <h3 className="font-bold text-sm mb-2">Map Debug Info:</h3>
            <p className="text-xs mb-1">Editor: {editorEnabled ? "ON" : "OFF"}</p>
            <p className="text-xs mb-1">
              Center: {center.lat.toFixed(4)}, {center.lng.toFixed(4)}
            </p>
            <p className="text-xs mb-1">Zoom: {zoom}</p>
          </div>
        )}
      </div>

      <div
        ref={mapContainer}
        className="absolute inset-0 w-full h-full bg-gray-200"
      />

      <MapControls
              zoom={zoom}
              minZoom={MAP_CONFIG.minZoom}
              maxZoom={MAP_CONFIG.maxZoom}
              onZoomIn={() => handleZoomIn(mapInstance)}
              onZoomOut={() => handleZoomOut(mapInstance)}
              onLayersClick={onLayersToggle}
              onNavigationClick={() => {
                if (mapInstance) handleNavigationClick(mapInstance, center, zoom);
              }}
            />

      {editorEnabled && selPoi && (
        <Editor
          poi={selPoi}
          onClose={() => setSelPoi(null)}
          onDone={() => {
            setSelPoi(null);
            if (mapInstance) bustTiles(mapInstance);
          }}
        />
      )}
    </main>
  );
};
