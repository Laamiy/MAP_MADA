import { useEffect, useState, type MutableRefObject } from "react";
import maplibregl from "maplibre-gl";
import axios from "axios";
import type { Coordinates } from "../../types/map.types";
import type { PointOfInterestInterface } from "../../interface/point.of.interest.interface";

interface UseMapEditorProps {
  map: MutableRefObject<maplibregl.Map | null>;
  editorEnabled: boolean;
}

export const useMapEditor = ({ map, editorEnabled }: UseMapEditorProps) => {
  const [selPoi, setSelPoi] = useState<any>(null);

  const handlePoiClick = async (
    feature: maplibregl.MapGeoJSONFeature,
    lngLat: Coordinates
  ) => {
    const props: PointOfInterestInterface = {
      osm_id: String(feature.properties?.osm_id ?? ""),
      name: String(feature.properties?.name ?? ""),
      version: Number(feature.properties?.version ?? 1),
      lat: lngLat.lat,
      lng: lngLat.lng,
      amenity: feature.properties?.amenity,
      shop: feature.properties?.shop,
      tourism: feature.properties?.tourism,
      man_made: feature.properties?.man_made,
      leisure: feature.properties?.leisure,
      natural: feature.properties?.natural,
      tags: feature.properties?.tags,
    };

    console.log("[INFO] : POI clicked:", props);
    const osm_id = props.osm_id;
    if (!osm_id) {
      console.error("[ERROR] : No ID in feature:", props);
      return;
    }

    let parsedTags: Record<string, string> = {};

    if (props.tags) {
      const raw =
        typeof props.tags === "string" ? JSON.parse(props.tags) : props.tags;

      Object.entries(raw).forEach(([k, v]) => {
        const isJunk =
          k.startsWith("mapbox") ||
          k.startsWith("osm_") ||
          k === "version" ||
          k === "icon_class";
        if (!isJunk) {
          parsedTags[k] = String(v);
        }
      });
    }

    if (Object.keys(parsedTags).length === 0) {
      ["name", "amenity", "shop", "tourism", "man_made", "leisure", "natural"].forEach(
        (key) => {
          const val = (props as any)[key];
          if (val) parsedTags[key] = String(val);
        }
      );
    }

    console.log(`[DEBUG] Tags sanitized. Count: ${Object.keys(parsedTags).length}`);
    if (Object.keys(parsedTags).length > 50) {
      console.warn("[WARN] High tag count detected after sanitization:", parsedTags);
    }

    try {
      const API_BASE = import.meta.env.VITE_EDITOR_API || "http://localhost:4004";
      const { data } = await axios.get(`${API_BASE}/api/poi/${osm_id}`);

      setSelPoi({
        id: Number(osm_id),
        version: data.version,
        lng: data.lng,
        lat: data.lat,
        tags: data.tags,
      });
    } catch (err) {
      console.warn("Using feature properties fallback:", err);
      setSelPoi({
        id: Number(osm_id),
        version: props.version || 1,
        lng: lngLat.lng,
        lat: lngLat.lat,
        tags: parsedTags,
      });
    }
  };

  const handleNewPoi = (lngLat: Coordinates) => {
    console.log("Creating new POI at:", lngLat);
    setSelPoi({
      id: 0,
      lng: lngLat.lng,
      lat: lngLat.lat,
      tags: {},
      version: 0,
    });
  };

  const attachEditorInteractions = () => {
    if (!map.current) return;
    const mapInstance = map.current;
    const style = mapInstance.getStyle();

    const possibleSourceNames = [
      "pois",
      "poi",
      "points",
      "osm_points",
      "planet_osm_point",
    ];
    let poiSourceName: string | null = null;

    for (const name of possibleSourceNames) {
      if (style.sources[name]) {
        poiSourceName = name;
        console.log("[INFO] : Found POI source:", name);
        break;
      }
    }

    if (!poiSourceName) {
      console.warn(
        "POI source not found. Available sources:",
        Object.keys(style.sources)
      );
      const vectorSources = Object.entries(style.sources)
        .filter(([_, source]: [string, any]) => source.type === "vector")
        .map(([name]) => name);
      if (vectorSources.length > 0) {
        poiSourceName = vectorSources[0];
        console.log("Using fallback source:", poiSourceName);
      }
    }

    const poiLayers = poiSourceName
      ? style.layers
          .filter((l): l is any => "source" in l && l.source === poiSourceName)
          .map((l) => l.id)
      : [];
    console.log("[INFO] : POI layers found:", poiLayers);

    if (poiLayers.length === 0) {
      console.warn(
        "[WARNING] : No POI layers found, using generic click handler"
      );
      mapInstance.on("click", async (e: maplibregl.MapMouseEvent) => {
        if (!editorEnabled) return;

        const features = mapInstance.queryRenderedFeatures(e.point);
        const poiFeature = features.find(
          (f: maplibregl.MapGeoJSONFeature) =>
            f.properties &&
            (f.properties.osm_id ||
              f.properties.amenity ||
              f.properties.shop)
        );

        if (e.originalEvent.altKey) {
          handleNewPoi(e.lngLat);
        } else if (poiFeature) {
          await handlePoiClick(poiFeature, e.lngLat);
        }
      });
      return;
    }

    poiLayers.forEach((layerId) => {
      mapInstance.on("click", layerId, async (e) => {
        if (!e.features?.length || !editorEnabled) return;

        if (e.originalEvent.altKey) {
          return;
        }

        await handlePoiClick(e.features[0], e.lngLat);
      });

      if (editorEnabled) {
        mapInstance.on("mouseenter", layerId, () => {
          mapInstance.getCanvas().style.cursor = "pointer";
        });
        mapInstance.on("mouseleave", layerId, () => {
          mapInstance.getCanvas().style.cursor = "";
        });
      }
    });

    mapInstance.on("click", (e: maplibregl.MapMouseEvent) => {
      if (e.originalEvent.altKey && editorEnabled) {
        handleNewPoi(e.lngLat);
      }
    });
  };

  useEffect(() => {
    if (!editorEnabled) setSelPoi(null);
  }, [editorEnabled]);

  return {
    selPoi,
    setSelPoi,
    handlePoiClick,
    handleNewPoi,
    attachEditorInteractions,
  };
};