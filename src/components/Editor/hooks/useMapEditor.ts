import { useEffect, useState, type MutableRefObject } from "react";
import maplibregl from "maplibre-gl";
import axios from "axios";
import type { Coordinates } from "../../../types/map.types";
import type { editorPoi, TagDict } from "../Editor.type";

interface UseMapEditorProps {
  map: MutableRefObject<maplibregl.Map | null>;
  editorEnabled: boolean;
}

interface PoiRow {
  osm_id: string;
  name: string | null;
  amenity: string | null;
  tourism: string | null;
  shop: string | null;
  man_made: string | null;
  leisure: string | null;
  natural: string | null;
  tags: PoiTags;
  version: number;
  lng: number;
  lat: number;
  public_transport: string | null;
}

export interface PoiTags {
  name?: string;
  amenity?: string;
  shop?: string;
  tourism?: string;
  man_made?: string;
  leisure?: string;
  natural?: string;
  public_transport?: string;
  [key: string]: string | undefined;
}

export const useMapEditor = ({ map, editorEnabled }: UseMapEditorProps) => {
  const [selPoi, setSelPoi] = useState<editorPoi | null>(null);

  const handlePoiClick = async (feature: maplibregl.MapGeoJSONFeature, lngLat: Coordinates) => {
    const rawProps = feature.properties || {};
    const osm_id = rawProps.osm_id;

    if (!osm_id) 
      return;

    const cleantTags = (raw: string | Record<string, any>): TagDict => 
    {
      const tags = typeof raw === "string" ? JSON.parse(raw) : raw;
      return Object.fromEntries(
        Object.entries(tags || {}).filter(([k]) => {
          return !k.startsWith("mapbox") && !k.startsWith("osm_") && !["version", "icon_class"].includes(k);
        })
      ) as TagDict;
    };

    const parsedTags = cleantTags(rawProps.tags || rawProps);

    try {
      const API_BASE = `${import.meta.env.VITE_EDITOR_API}:4004` || "http://localhost:4004";
      const { data } = await axios.get<PoiRow>(`${API_BASE}/api/poi/${osm_id}`);
      setSelPoi({
        id: Number(osm_id),
        version: data.version,
        lng: data.lng,
        lat: data.lat,
        tags: data.tags as unknown as TagDict,
      });
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

    const poiSourceName = ["pois", "poi", "points"].find((n) => style.sources[n]) ||
      Object.keys(style.sources).find((n) => (style.sources[n] as any).type === "vector");

    if (!poiSourceName) return;

    const poiLayers = style.layers
      .filter((l: any) => l.source === poiSourceName)
      .map((l) => l.id);

    mapInstance.on("click", async (e) => {
      if (!window.location.search.includes("editor=1")) return;

      if (e.originalEvent.ctrlKey) 
      {
        handleNewPoi(e.lngLat);
        return;
      }

      const features = mapInstance.queryRenderedFeatures(e.point, { layers: poiLayers });
      if (features.length > 0) 
      {
        await handlePoiClick(features[0], e.lngLat);
      }
    });

    poiLayers.forEach((id) => 
    {
      mapInstance.on("mouseenter", id, () => {
        if (window.location.search.includes("editor=1")) {
          mapInstance.getCanvas().style.cursor = "pointer";
        }
      });
      mapInstance.on("mouseleave", id, () => {
        mapInstance.getCanvas().style.cursor = "";
      });
    });
  };

  useEffect(() => {
    if (!editorEnabled) 
    {
      setSelPoi(null);
      if (map.current) 
      {
        map.current.getCanvas().style.cursor = "";
      }
    }
  }, [editorEnabled, map]);

  return { selPoi, setSelPoi, handlePoiClick, handleNewPoi, attachEditorInteractions };
};