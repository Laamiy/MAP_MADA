import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import type { StyleSpecification   } from "maplibre-gl";
import type { Coordinates } from "@/types/map.types";
import { MAP_CONFIG } from "@/config/map.config";
import mapStyle from "@/constants/maps.style";
import type { layerModeType } from "@/types/map.types"

interface UseMapLibreProps {
                            center: Coordinates;
                            zoom: number;
                            onZoomChange: (zoom: number) => void;
                            onMapClick?: (coords: Coordinates) => void;
                            onMapLoad?: () => void;
                            mode : layerModeType,
                          }

export const useMapLibre = ({
                                center,
                                zoom,
                                mode ,
                                onZoomChange,
                                onMapLoad,
                              }: UseMapLibreProps
                            ) =>
  {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maplibregl.Map | null>(null);
  useEffect(() => {
    if (!mapContainer.current)
        return;

    if (map.current)
      return;


    try {
            map.current = new maplibregl.Map({
                                                container: mapContainer.current,
                                                style: mapStyle  as StyleSpecification,
                                                center: [center.lng, center.lat],
                                                zoom,
                                                refreshExpiredTiles : true ,
                                                minZoom: MAP_CONFIG.minZoom,
                                                maxZoom: MAP_CONFIG.maxZoom,
                                                maxPitch: 80,
                                                pitch: MAP_CONFIG.pitch,
                                                canvasContextAttributes: { antialias: true },
                                              });
            map.current.setRenderWorldCopies(false); // remove infinit world copy

            map.current.on("style.load", () => {
                                                        map.current!.setProjection({
                                                          type: "globe",
                                                        });
                                                      });
            map.current.on("load", () => {
                                            const style = map.current!.getStyle();
                                            console.log("MAP LOADED");
                                            console.log("Sources:", Object.keys(style.sources));
                                            console.log("Layers:", style.layers.map((l) => l.id));
                                            onMapLoad?.();
                                          });

            map.current.on("error", (event: ErrorEvent) => {
                                                              console.error("[ERROR] : Map error:", event);
                                                            });

            map.current.on("zoomend", () => {
                if (map.current) {
                    onZoomChange(map.current.getZoom());
                }
            });

        }
        catch (error)
        {
          console.error("[ERROR] : Error creating map:", error);
        }
        return () =>
                    {
                      map.current?.remove();
                      map.current = null;
                    };
  }, []);
  useEffect(() => {
      const mapInstance = map.current;
      if (!mapInstance || !mapInstance.isStyleLoaded()) return;

      // Define vector overlay layer IDs that sit above the satellite layer
      // (Roads, Labels, Administrative Lines, POIs)
      const overlayLayerIds = [
        "roads-line",
        "roads-labels",
        "admin-lines",
        "places-labels",
        "pois-symbol",
      ];

      if (mode === "standard") {
        // Hide satellite, show vector overlays
        if (mapInstance.getLayer("satellite-layer")) {
          mapInstance.setLayoutProperty("satellite-layer", "visibility", "none");
        }
        overlayLayerIds.forEach((id) => {
          if (mapInstance.getLayer(id)) {
            mapInstance.setLayoutProperty(id, "visibility", "visible");
          }
        });
      } else if (mode === "hybrid") {
        // Show satellite, keep vector overlays visible on top
        if (mapInstance.getLayer("satellite-layer")) {
          mapInstance.setLayoutProperty("satellite-layer", "visibility", "visible");
        }
        overlayLayerIds.forEach((id) => {
          if (mapInstance.getLayer(id)) {
            mapInstance.setLayoutProperty(id, "visibility", "visible");
          }
        });
      } else if (mode === "satellite") {
        // Show satellite, hide vector overlays
        if (mapInstance.getLayer("satellite-layer")) {
          mapInstance.setLayoutProperty("satellite-layer", "visibility", "visible");
        }
        overlayLayerIds.forEach((id) => {
          if (mapInstance.getLayer(id)) {
            mapInstance.setLayoutProperty(id, "visibility", "none");
          }
        });
      }
    }, [mode]);
  useEffect(() =>
    {
      if (map.current && !map.current.isMoving())
        map.current.setCenter([center.lng, center.lat]);
    }, [center.lng, center.lat]);

  useEffect(() =>
    {
      if (map.current && !map.current.isMoving() && Math.abs(map.current.getZoom() - zoom) > 0.1)
        {
          map.current.setZoom(zoom);
        }
  }, [zoom]);

  return { mapContainer, map};
};
