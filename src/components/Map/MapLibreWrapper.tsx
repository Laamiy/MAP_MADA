import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { MapControls } from "./MapControls";
import { PlaceCard } from "./PlaceCard";
import { MAP_CONFIG } from "../../config/map.config";
import { layoutStyles } from "../../styles";
import Editor from "../Editor/Editor";
import "../Editor/Editor.css";
import type { MapLibreWrapperProps } from "./MapLibreWrapper.interface";
import { useMapLibre } from "./hooks/useMapLibre";
import { useMapEditor } from "./hooks/useMapEditor";
import { useMapRouting } from "./hooks/useMapRouting";
import { useMapPhotos } from "../../hooks/useMapPhoto";
import { PhotoViewer } from "../Photo/PhotoViewer.";

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
) => {
  const [debugMode, setDebugMode] = useState(false);
  const [popupContainer, setPopupContainer] = useState<HTMLDivElement | null>(null);
  const popupRef = useRef<maplibregl.Popup | null>(null);
  const editorEnabled = window.location.search.includes("editor=1");

  const {
    mapContainer,
    map,
    mapStatus,
    handleZoomIn,
    handleZoomOut,
    handleNavigationClick,
    bustTiles,
  } = useMapLibre(
    {
      center,
      zoom,
      routingMode,
      onZoomChange,
      onMapClick,
      onMapLoad: () => {
        attachPhotoInteractions();
        if (editorEnabled) {
          attachEditorInteractions();
        }
      },
    }
  );

  const { selectedPhoto, setSelectedPhoto, attachPhotoInteractions } = useMapPhotos(map);
  const { selPoi, setSelPoi, attachEditorInteractions } = useMapEditor({ map, editorEnabled });

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

  useEffect(() => {
    if (!map.current || !selectedPhoto) {
      popupRef.current?.remove();
      return;
    }

    const container = document.createElement("div");
    const popup = new maplibregl.Popup({
      offset: 25,
      closeButton: false,
      maxWidth: "none",
    })
      .setLngLat(selectedPhoto.lngLat)
      .setDOMContent(container)
      .addTo(map.current);

    popup.on("close", () => setSelectedPhoto(null));
    popupRef.current = popup;
    setPopupContainer(container);

    return () => {
      popup.remove();
    };
  }, [selectedPhoto, map]);

  return (
    <main className={layoutStyles.mapContainer}>
      {debugMode && (
        <div className="absolute top-20 left-4 bg-white !p-4 rounded-lg shadow-lg z-50 max-w-xs">
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
        className="
                !absolute !top-2.5 !left-2.5 !z-[1000]
                !px-3 !py-1.5 !text-[12px] !font-medium
                !bg-white !text-gray-700 !border !border-gray-300 !rounded
                !transition-all !duration-200 !ease-in-out
                hover:!bg-gray-50 hover:!border-gray-400 hover:!shadow-sm
                active:!scale-95 active:!ring-4 active:!ring-gray-100
                !flex !items-center !gap-2
                !cursor-pointer
              "
      >
        <div className={`!w-2 !h-2 !rounded-full ${debugMode ? "!bg-red-500 !animate-pulse" : "!bg-gray-400"}`} />
        DEBUG: {debugMode ? "Hide" : "Show"} Debug
      </button>

      <div
        ref={mapContainer}
        className="absolute inset-0 w-full h-full bg-gray-200"
      />

      {selectedPhoto && popupContainer && createPortal(
        <PhotoViewer
          data={selectedPhoto}
          onClose={() => {
            popupRef.current?.remove();
            setSelectedPhoto(null);
          }}
        />,
        popupContainer
      )}

      <MapControls
        zoom={zoom}
        minZoom={MAP_CONFIG.minZoom}
        maxZoom={MAP_CONFIG.maxZoom}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
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