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
  // onMapClick,
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
        refreshExpiredTiles : true ,
        minZoom: MAP_CONFIG.minZoom,
        maxZoom: MAP_CONFIG.maxZoom,
      });

      (window as any).map = map.current; // search ??
      
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
        setMapStatus(`[ERROR]: ${event.error?.message || "Unknown error"}`);
      });

      map.current.on("zoom", () => {
        if (map.current) 
          onZoomChange(Math.round(map.current.getZoom()));
      });
// !!  Potentially removed in future commits
      // map.current.on("click", (event: maplibregl.MapMouseEvent) => {
      //   if (routingMode && onMapClick) 
      //     {
      //       onMapClick({ lng: event.lngLat.lng, lat: event.lngLat.lat });
      //     }
      // });
      setMapStatus("Map created, waiting for load...");
    } 
    catch (error) 
    {
      console.error("[ERROR] : Error creating map:", error);
      setMapStatus(`Init error: ${error}`);
    }

    return () => 
      {
        map.current?.remove();
        map.current = null;
      };
  }, []);

  // Update center
  useEffect(() => 
    {
      if (map.current) 
        map.current.setCenter([center.lng, center.lat]);
    }, [center.lng, center.lat]);

  // Update zoom
  useEffect(() => 
    {
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
      // 1. Get the current style object
      const style = map.current.getStyle();

      if (!style || !style.sources) 
        return;

      // 2. Update the tile URLs in the style object itself
      Object.keys(style.sources).forEach(
        (sourceName) => {
                          const source = style.sources[sourceName] as any;
                          
                          // Only target vector or raster sources that use tiles
                          if (source && source.tiles && Array.isArray(source.tiles)) {
                            source.tiles = source.tiles.map((url: string) => {
                              // Remove any existing version query and attach a fresh timestamp
                              const baseUrl = url.split("?")[0];
                              return `${baseUrl}?v=${Date.now()}`;
                            });
                          }
                        });

      // 3. NUCLEAR OPTION: Re-apply the modified style.
      // diff: false is CRITICAL. It tells MapLibre to tear down the old 
      // render state and build a new one, preventing the "black screen."
      map.current.setStyle(style, { diff: false });

      // 4. Force an immediate frame draw
      map.current.triggerRepaint();
      
      console.log("[INFO] : Map hard-refreshed. New tile versions applied.");
    } catch (err) {
      console.error("[ERROR] : Tile bust error:", err);
    }
  };
  const flyToFeature = (coords: [number, number], zoom = 16) => 
    {
      if (!map.current) 
        return;
      map.current.flyTo({ center: coords, zoom, duration: 1200 });
    };
return {
  mapContainer,
  map,
  mapStatus,
  handleZoomIn,
  handleZoomOut,
  handleNavigationClick,
  bustTiles,
  flyToFeature,
};

};