import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

import { MapControls } from "./MapControls";
import { PlaceCard } from "./PlaceCard";
import { MAP_CONFIG } from "@/config/map.config";
import { layoutStyles } from "@/styles";

import Editor from "../Editor/Editor";
import "../Editor/Editor.css";

import { useMapLibre } from "@/hooks/Map/useMapLibre";
import { useMapEditor } from "@/hooks/Editor/useMapEditor";
import { useMapRouting } from "@/hooks/Route/useMapRouting";
import { useMapPhotos } from "@/hooks/useMapPhoto";
import { bustTiles , handleZoomIn , handleZoomOut , handleNavigationClick } from "@/utils/map.utils";
import { PhotoViewer } from "@/components/Photo/PhotoViewer.";

import type { MapLibreWrapperProps } from "@/interfaces/MapLibreWrapper.interface";

export const MapLibreWrapper: React.FC<MapLibreWrapperProps> = (
  {
    center,
    zoom,
    selectedPlace,
    routingOn = false,
    startPoint = null,
    endPoint = null,
    route = null,
    onZoomChange,
    onPlaceClose,
    onStartChange,
    onEndChange,
  }
) => {
  const [debugMode, setDebugMode] = useState(false);
  const [popupContainer, setPopupContainer] = useState<HTMLDivElement | null>(null);
  const popupRef = useRef<maplibregl.Popup | null>(null);
  const editorEnabled = window.location.search.includes("editor=1");

  const { mapContainer, map, mapStatus } = useMapLibre({ center, zoom, onZoomChange,
                                                                                    onMapLoad: () => 
                                                                                      {
                                                                                        attachPhotoInteractions();
                                                                                        attachEditorInteractions();
                                                                                      },
                                                                                  });

  const { selectedPhoto, setSelectedPhoto, attachPhotoInteractions }    = useMapPhotos(map);
  const { selPoi, setSelPoi, attachEditorInteractions }                 = useMapEditor({ map, editorEnabled });

    useMapRouting(
      {
        map,
        routingOn,
        startPoint,
        endPoint,
        route,
        onStartChange,
        onEndChange,
      }
    );

    useEffect(() => {
      if (!map.current || !selectedPhoto) 
        {
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
    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-50 flex flex-col items-start gap-2">
   <button
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
      </button>

        {debugMode && (
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-xs">
            <h3 className="font-bold text-sm mb-2">Map Debug Info:</h3>
            <p className="text-xs mb-1">Status: {mapStatus}</p>
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
        onZoomIn={()=>handleZoomIn}
        onZoomOut={()=>handleZoomOut}
        onNavigationClick={()=>{
                                  if (map.current)
                                    handleNavigationClick(map.current , center =center ,zoom = zoom)
                                }
                          }
          />

      {selectedPlace && !routingOn && (
        <PlaceCard place={selectedPlace} onClose={onPlaceClose} />
      )}

      {editorEnabled && selPoi && (
        <Editor
          poi={selPoi}
          onClose={() => setSelPoi(null)}
          onDone={() => {
            setSelPoi(null);
            if (map.current)
              bustTiles(map.current);
          }}
        />
      )}
    </main>
  );
};