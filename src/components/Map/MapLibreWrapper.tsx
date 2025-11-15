import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import { MapControls } from "./MapControls";
import { PlaceCard } from "./PlaceCard";
import type { Coordinates, Place } from "../../types/map.types";
import { MAP_CONFIG } from "../../config/map.config";
import { layoutStyles } from "../../styles";
import mapStyle from "../../constants/maps.style";
import "maplibre-gl/dist/maplibre-gl.css";

interface MapLibreWrapperProps {
  center: Coordinates;
  zoom: number;
  selectedPlace: Place | null;
  onZoomChange: (zoom: number) => void;
  onPlaceClose: () => void;
}

export const MapLibreWrapper: React.FC<MapLibreWrapperProps> = ({
  center,
  zoom,
  selectedPlace,
  onZoomChange,
  onPlaceClose,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [mapStatus, setMapStatus] = useState<string>("Initializing...");

  useEffect(() => {
    if (!mapContainer.current) {
      setMapStatus("Container not found");
      return;
    }

    if (map.current) {
      setMapStatus("Map already initialized");
      return;
    }

    console.log("Map container dimensions:", {
      width: mapContainer.current.offsetWidth,
      height: mapContainer.current.offsetHeight,
    });

    console.log("Initializing map with:", {
      center: [center.lng, center.lat],
      zoom,
      style: mapStyle,
    });
    console.log("Full style object:", JSON.stringify(mapStyle, null, 2));
    setMapStatus("Creating map instance...");

    try {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: mapStyle as any,
        center: [center.lng, center.lat],
        zoom: zoom,
        minZoom: MAP_CONFIG.minZoom,
        maxZoom: MAP_CONFIG.maxZoom,
      });

      map.current.on("load", () => {
        console.log(" Map loaded successfully");
        setMapStatus("Map loaded");
      });

      map.current.on("error", (e) => {
        console.error("Map error:", e);
        setMapStatus(`Error: ${e.error?.message || "Unknown error"}`);
      });
      map.current.on("style.error", (e) => console.error("Style error", e));
      map.current.on("zoom", () => {
        if (map.current) {
          onZoomChange(Math.round(map.current.getZoom()));
        }
      });

      setMapStatus("Map created, waiting for load...");
    } catch (error) {
      console.error(" Error creating map:", error);
      setMapStatus(`Init error: ${error}`);
    }

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  useEffect(() => {
    if (map.current) {
      map.current.setCenter([center.lng, center.lat]);
    }
  }, [center.lng, center.lat]);

  useEffect(() => {
    if (map.current && Math.abs(map.current.getZoom() - zoom) > 0.1) {
      map.current.setZoom(zoom);
    }
  }, [zoom]);

  const handleZoomIn = () => map.current?.zoomIn();
  const handleZoomOut = () => map.current?.zoomOut();
  const handleLayersClick = () => console.log("Layers clicked");
  const handleNavigationClick = () => {
    if (map.current) {
      map.current.flyTo({
        center: [center.lng, center.lat],
        zoom: zoom,
        duration: 1000,
      });
    }
  };

  return (
    <main className={layoutStyles.mapContainer}>
      {/* Debug overlay */}
      <div className="absolute top-20 left-4 bg-white p-4 rounded-lg shadow-lg z-50 max-w-xs">
        <h3 className="font-bold text-sm mb-2">Map Debug Info:</h3>
        <p className="text-xs mb-1">Status: {mapStatus}</p>
        <p className="text-xs mb-1">IP: {MAP_CONFIG.baseUrl}</p>
        <p className="text-xs mb-1">Status: {mapStatus}</p>
        <p className="text-xs mb-1">
          Center: {center.lat.toFixed(4)}, {center.lng.toFixed(4)}
        </p>
        <p className="text-xs mb-1">Zoom: {zoom}</p>
        <p className="text-xs mb-1">
          Container: {mapContainer.current ? "Found" : "Not found"}
        </p>
        <p className="text-xs">
          Map instance: {map.current ? "Created" : "Null"}
        </p>
      </div>

      <div
        ref={mapContainer}
        className="absolute inset-0 w-full h-full bg-gray-200"
        style={{ minHeight: "100%", minWidth: "100%" }}
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

      {selectedPlace && (
        <PlaceCard place={selectedPlace} onClose={onPlaceClose} />
      )}
    </main>
  );
};
