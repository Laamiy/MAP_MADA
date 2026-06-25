import { useEffect, useRef, type MutableRefObject } from "react";
import maplibregl from "maplibre-gl";
import type { OSRMCoordinate } from "../../../types/osrm.types";
import type { OSRMRoute } from "../../../types/osrm.types";
interface UseMapRoutingProps {
  map: MutableRefObject<maplibregl.Map | null>;
  routingOn: boolean | null;
  startPoint: OSRMCoordinate | null;
  endPoint: OSRMCoordinate | null;
  route: OSRMRoute | null;
  onStartChange?: (c: OSRMCoordinate) => void;
  onEndChange?: (c: OSRMCoordinate) => void;
}

function createMarkerElement(label: "A" | "B", color: string): HTMLElement {
  const el = document.createElement("div");
  el.style.cssText = `
    width:32px;height:32px;border-radius:50%;
    background:${color};border:3px solid white;
    box-shadow:0 2px 4px rgba(0,0,0,.3);
    display:flex;align-items:center;justify-content:center;
    color:white;font-weight:bold;font-size:16px;
  `;
  el.textContent = label;
  return el;
}

export const useMapRouting = ({
  map,
  routingOn,
  startPoint,
  endPoint,
  route,
  onStartChange,
  onEndChange,
}: UseMapRoutingProps) => {
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  // Handle route display
  useEffect(() => {
    if (!map.current || !routingOn) return;
    const mapInstance = map.current;

    if (mapInstance.getLayer("route")) 
      mapInstance.removeLayer("route");
    
    if (mapInstance.getLayer("route-casing"))
      mapInstance.removeLayer("route-casing");
    
    if (mapInstance.getSource("route"))
      mapInstance.removeSource("route");

    if (route) {
      mapInstance.addSource("route", {
        type: "geojson",
        lineMetrics: true, // Required for the gradient "drawing" effect
        data: { type: "Feature", properties: {}, geometry: route.geometry },
      });

      mapInstance.addLayer({
        id: "route-casing",
        type: "line",
        source: "route",
        layout: { "line-join": "round", "line-cap": "round" },
        paint: {
          "line-color": "#03A6A1",
          "line-width": 8,
          "line-opacity": 0.3,
        },
      });

      // The primary route layer with a gradient mask for the "fade-in"
      mapInstance.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: { "line-join": "round", "line-cap": "round" },
        paint: {
          "line-color": "#03A6A1",
          "line-width": 5,
          "line-gradient": [
            "interpolate",
            ["linear"],
            ["line-progress"],
            0, "#03A6A1",
            1, "rgba(3, 166, 161, 0)"
          ]
        },
      });

      mapInstance.addLayer({
        id: "route-animation",
        type: "line",
        source: "route",
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": "#ffffff",
          "line-width": 6,
          "line-opacity": 0.5,
          "line-dasharray": [0, 4] 
        }
      });

      let step = 0;
      let progress = 0;
      
      const animate = () => {
        if (!mapInstance || !mapInstance.getStyle()) return;
        
        try {
          // 1. Handle Flowing Dashes
          if (mapInstance.getLayer("route-animation")) {
            step = (step + 0.1) % 4;
            mapInstance.setPaintProperty("route-animation", "line-dasharray-offset", step);
          }

          // 2. Handle Fade-In / Drawing Effect
          if (mapInstance.getLayer("route")) {
            if (progress < 1) {
              progress += 0.01; // Drawing speed
              mapInstance.setPaintProperty("route", "line-gradient", [
                "interpolate",
                ["linear"],
                ["line-progress"],
                Math.max(0, progress - 0.1), "#03A6A1",
                progress, "rgba(3, 166, 161, 0)"
              ]);
            }
          }

          animationFrameRef.current = requestAnimationFrame(animate);
        } catch (e) {
          return;
        }
      };

      animate();

      const coordinates = route.geometry.coordinates;
      const bounds = coordinates.reduce(
        (b, c) => b.extend([c[0], c[1]]),
        new maplibregl.LngLatBounds(
          coordinates[0] as [number, number],
          coordinates[0] as [number, number]
        )
      );
      mapInstance.fitBounds(bounds, { padding: 80, duration: 1000 });
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      ["route-arrows", "route-animation", "route", "route-casing"].forEach(id => {
        if (mapInstance.getLayer(id)) mapInstance.removeLayer(id);
      });
      if (mapInstance.getSource("route")) mapInstance.removeSource("route");
    };
  }, [route, routingOn]);
  // Handle routing markers
  useEffect(() => {
    if (!map.current) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    if (!routingOn) return;

    const addMarker = (
      point: OSRMCoordinate | null,
      label: "A" | "B",
      color: string,
      title: string,
      onMove: ((c: OSRMCoordinate) => void) | undefined
    ) => {
      if (!point || Number.isNaN(point.lat) || Number.isNaN(point.lng)) return;

      const marker = new maplibregl.Marker({
        element: createMarkerElement(label, color),
        draggable: true,
      })
        .setLngLat([point.lng, point.lat])
        .setPopup(
          new maplibregl.Popup({ offset: 25 }).setHTML(`<strong>${title}</strong>`)
        )
        .addTo(map.current!);

      marker.on("dragend", () => {
        const { lng, lat } = marker.getLngLat();
        onMove?.({ lng, lat });
      });

      markersRef.current.push(marker);
    };

    addMarker(startPoint, "A", "#10b981", "Start Point", onStartChange);
    addMarker(endPoint, "B", "#ef4444", "End Point", onEndChange);
  }, [startPoint, endPoint, routingOn, onStartChange, onEndChange]);

  // Cleanup markers on unmount
  useEffect(() => 
  {
    return () => 
    {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
    };
  }, []);

  // return { markersRef };
};
