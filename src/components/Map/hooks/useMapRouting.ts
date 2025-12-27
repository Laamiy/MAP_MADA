import { useEffect, useRef, type MutableRefObject } from "react";
import maplibregl from "maplibre-gl";
import type { OSRMCoordinate } from "../../../types/osrm.types";

interface UseMapRoutingProps {
  map: MutableRefObject<maplibregl.Map | null>;
  routingMode: boolean;
  startPoint: OSRMCoordinate | null;
  endPoint: OSRMCoordinate | null;
  route: any | null;
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
  routingMode,
  startPoint,
  endPoint,
  route,
  onStartChange,
  onEndChange,
}: UseMapRoutingProps) => {
  const markersRef = useRef<maplibregl.Marker[]>([]);

  // Handle route display
  useEffect(() => {
    if (!map.current || !routingMode) return;
    const mapInstance = map.current;

    if (mapInstance.getLayer("route")) mapInstance.removeLayer("route");
    if (mapInstance.getLayer("route-casing"))
      mapInstance.removeLayer("route-casing");
    if (mapInstance.getSource("route")) mapInstance.removeSource("route");

    if (route) {
      mapInstance.addSource("route", {
        type: "geojson",
        data: { type: "Feature", properties: {}, geometry: route.geometry },
      });

      mapInstance.addLayer({
        id: "route-casing",
        type: "line",
        source: "route",
        layout: { "line-join": "round", "line-cap": "round" },
        paint: {
          "line-color": "#1e40af",
          "line-width": 8,
          "line-opacity": 0.6,
        },
      });

      mapInstance.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: { "line-join": "round", "line-cap": "round" },
        paint: { "line-color": "#3b82f6", "line-width": 5 },
      });

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
      if (mapInstance.getLayer("route")) mapInstance.removeLayer("route");
      if (mapInstance.getLayer("route-casing"))
        mapInstance.removeLayer("route-casing");
      if (mapInstance.getSource("route")) mapInstance.removeSource("route");
    };
  }, [route, routingMode]);

  // Handle routing markers
  useEffect(() => {
    if (!map.current) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    if (!routingMode) return;

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
  }, [startPoint, endPoint, routingMode, onStartChange, onEndChange]);

  // Cleanup markers on unmount
  useEffect(() => {
    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
    };
  }, []);

  return { markersRef };
};