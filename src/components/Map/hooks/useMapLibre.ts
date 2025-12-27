import { useEffect, useRef, useState } from "react";
import maplibregl, { type StyleSpecification } from "maplibre-gl";
import type { Coordinates } from "../../../types/map.types";
import { MAP_CONFIG } from "../../../config/map.config";
import mapStyle from "../../../constants/maps.style";

interface UseMapLibreProps {
  center: Coordinates;
  zoom: number;
  routingMode: boolean;
  onZoomChange: (zoom: number) => void;
  onMapClick?: (coords: Coordinates) => void;
  onMapLoad?: () => void;
}

export const useMapLibre = ({
  center,
  zoom,
  routingMode,
  onZoomChange,
  onMapClick,
  onMapLoad,
}: UseMapLibreProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [mapStatus, setMapStatus] = useState<string>("Initializing...");

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current) {
      setMapStatus("Container not found");
      return;
    }
    if (map.current) {
      setMapStatus("Map already initialized");
      return;
    }
    setMapStatus("Creating map instance...");

    try {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: mapStyle as StyleSpecification,
        center: [center.lng, center.lat],
        zoom,
        minZoom: MAP_CONFIG.minZoom,
        maxZoom: MAP_CONFIG.maxZoom,
      });

      map.current.on("load", () => {
        setMapStatus("Map loaded");
        const style = map.current!.getStyle();
        console.log("=== MAP LOADED ===");
        console.log("Sources:", Object.keys(style.sources));
        console.log("Layers:", style.layers.map((l) => l.id));
        onMapLoad?.();
      });

      map.current.on("error", (event: ErrorEvent) => {
        console.error("[ERROR] : Map error:", event);
        setMapStatus(`Error: ${event.error?.message || "Unknown error"}`);
      });

      map.current.on("zoom", () => {
        if (map.current) onZoomChange(Math.round(map.current.getZoom()));
      });

      map.current.on("click", (event: maplibregl.MapMouseEvent) => {
        if (routingMode && onMapClick) {
          onMapClick({ lng: event.lngLat.lng, lat: event.lngLat.lat });
        }
      });

      setMapStatus("Map created, waiting for load...");
    } catch (error) {
      console.error("[ERROR] : Error creating map:", error);
      setMapStatus(`Init error: ${error}`);
    }

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // Update center
  useEffect(() => {
    if (map.current) map.current.setCenter([center.lng, center.lat]);
  }, [center.lng, center.lat]);

  // Update zoom
  useEffect(() => {
    if (map.current && Math.abs(map.current.getZoom() - zoom) > 0.1) {
      map.current.setZoom(zoom);
    }
  }, [zoom]);

  const handleZoomIn = () => map.current?.zoomIn();
  const handleZoomOut = () => map.current?.zoomOut();
  const handleNavigationClick = () => {
    if (map.current) {
      map.current.flyTo({
        center: [center.lng, center.lat],
        zoom,
        duration: 1000,
      });
    }
  };

  const bustTiles = () => {
    if (!map.current) return;
    try {
      const style = map.current.getStyle();
      Object.keys(style.sources).forEach((sourceName) => {
        const src = map.current!.getSource(sourceName) as any;
        if (src?.tiles) {
          src.tiles = src.tiles.map(
            (t: string) => `${t.split("?")[0]}?v=${Date.now()}`
          );
          const cache = (map.current as any).style?.sourceCaches?.[sourceName];
          cache?.clearTiles();
        }
      });
      map.current.triggerRepaint();
      console.log("[INFO] : Tiles refreshed");
    } catch (err) {
      console.error("[ERROR] : Tile bust error:", err);
    }
  };

  return {
    mapContainer,
    map,
    mapStatus,
    handleZoomIn,
    handleZoomOut,
    handleNavigationClick,
    bustTiles,
  };
};