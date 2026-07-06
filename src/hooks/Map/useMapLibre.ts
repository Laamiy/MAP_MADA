import { useEffect, useRef, useState } from "react";

import maplibregl from "maplibre-gl";
import type { StyleSpecification   } from "maplibre-gl";

import type { Coordinates } from "@/types/map.types";
import { MAP_CONFIG } from "@/config/map.config";
import mapStyle from "@/constants/maps.style";

interface UseMapLibreProps {
                            center: Coordinates;
                            zoom: number;
                            onZoomChange: (zoom: number) => void;
                            onMapClick?: (coords: Coordinates) => void;
                            onMapLoad?: () => void;
                          }

export const useMapLibre = ({
                                center,
                                zoom,
                                onZoomChange,
                                onMapLoad,
                              }: UseMapLibreProps
                            ) => 
  {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [mapStatus, setMapStatus] = useState<string>("Initializing...");

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current) 
      {
        setMapStatus("Container not found");
        return;
      }

    if (map.current) 
    {
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
                                                maxPitch: 80,
                                                pitch: 70,
                                                canvasContextAttributes: { antialias: true },
                                              });

            (window as any).map = map.current; // search ??
            
            map.current.on("style.load", () => {
                                                  map.current!.setProjection({
                                                    type: "globe",
                                                  });
                                                });
            map.current.on("load", () => {
                                            setMapStatus("Map loaded");
                                            const style = map.current!.getStyle();

                                            console.log("MAP LOADED");
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
      if (map.current && Math.abs(map.current.getZoom() - zoom) > 0.1) 
        {
          map.current.setZoom(zoom);
        }
  }, [zoom]);

                
                        return {
                          mapContainer,
                          map,
                          mapStatus,
                        };

};