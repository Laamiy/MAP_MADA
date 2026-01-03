import { useEffect, useState, type MutableRefObject } from "react";
import maplibregl from "maplibre-gl";
import axios from "axios";
import type { Coordinates } from "../../../types/map.types";
// import type { PointOfInterestInterface } from "../../../interface/point.of.interest.interface";

interface UseMapEditorProps {
  map: MutableRefObject<maplibregl.Map | null>;
  editorEnabled: boolean;
}

export const useMapEditor = ({ map, editorEnabled }: UseMapEditorProps) => {
  const [selPoi, setSelPoi] = useState<any>(null);

  const handlePoiClick = async (feature: maplibregl.MapGeoJSONFeature, lngLat: Coordinates) => {
    const rawProps = feature.properties || {};
    const osm_id = rawProps.osm_id;

    if (!osm_id) {
      console.error("[ERROR] : No ID in feature:", rawProps);
      return;
    }

    // Single pass tag sanitization
    const sanitizeTags = (raw: any) => {
      const tags = typeof raw === "string" ? JSON.parse(raw) : raw;
      return Object.fromEntries(
        Object.entries(tags || {}).filter(([k]) => 
          !k.startsWith("mapbox") && !k.startsWith("osm_") && !["version", "icon_class"].includes(k)
        )
      ) as Record<string, string>;
    };

    let parsedTags = sanitizeTags(rawProps.tags || rawProps);

    try {
      const API_BASE = `${import.meta.env.VITE_EDITOR_API}:4004` || "http://localhost:4004";
      const { data } = await axios.get(`${API_BASE}/api/poi/${osm_id}`);
      setSelPoi({ id: Number(osm_id), version: data.version, lng: data.lng, lat: data.lat, tags: data.tags });
    } catch (err) {
      setSelPoi({
        id: Number(osm_id),
        version: Number(rawProps.version ?? 1),
        lng: lngLat.lng,
        lat: lngLat.lat,
        tags: parsedTags,
      });
    }
  };

  const handleNewPoi = (lngLat: Coordinates) => {
    setSelPoi({ id: 0, lng: lngLat.lng, lat: lngLat.lat, tags: {}, version: 0 });
  };

  const attachEditorInteractions = () => {
    if (!map.current) return;
    const mapInstance = map.current;
    const style = mapInstance.getStyle();

    // Simplified source finding
    const poiSourceName = ["pois", "poi", "points"].find(n => style.sources[n]) || 
                         Object.keys(style.sources).find(n => (style.sources[n] as any).type === "vector");

    const poiLayers = style.layers
      .filter((l: any) => l.source === poiSourceName)
      .map((l) => l.id);

    // One global click handler to manage everything (Cleaner than looping layers)
    mapInstance.on("click", async (e) => {
      if (!editorEnabled) return;

      // Handle New POI (Ctrl + Click)
      if (e.originalEvent.ctrlKey) {
        handleNewPoi(e.lngLat);
        return;
      }

      // Handle Existing POI Click
      const features = mapInstance.queryRenderedFeatures(e.point, { layers: poiLayers });
      if (features.length > 0) {
        await handlePoiClick(features[0], e.lngLat);
      }
    });

    // Hover cursors
    if (editorEnabled && poiLayers.length > 0) {
      poiLayers.forEach(id => {
        mapInstance.on("mouseenter", id, () => { mapInstance.getCanvas().style.cursor = "pointer" });
        mapInstance.on("mouseleave", id, () => { mapInstance.getCanvas().style.cursor = "" });
      });
    }
  };

  useEffect(() => {
    if (!editorEnabled) setSelPoi(null);
  }, [editorEnabled]);

  return { selPoi, setSelPoi, handlePoiClick, handleNewPoi, attachEditorInteractions };
};