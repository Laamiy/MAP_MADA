import { useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import apiClient from "@/api/main";
import { getCleanTags } from "@/utils/editor.utils";
import type { AnyLayer, Coordinates } from "@/types/map.types";
import type { editorPoi, TagDict, PoiRow } from "@/types/Editor.type";

interface UseMapEditorProps {
  map: maplibregl.Map | null;
  editorEnabled: boolean;
}

export const useMapEditor = ({ map, editorEnabled }: UseMapEditorProps) => {
  const [selPoi, setSelPoi] = useState<editorPoi | null>(null);

  const handlePoiClick = async (feature: maplibregl.MapGeoJSONFeature, lngLat: Coordinates) => {
    const rawProps = feature.properties || {};
    const osm_id = rawProps.osm_id;

    if (!osm_id) return;

    try 
    {
      const { data } = await apiClient.get<PoiRow>(`/api/poi/${osm_id}`);
      setSelPoi({
        id: Number(osm_id),
        version: data.version,
        lng: data.lng,
        lat: data.lat,
        tags: data.tags as TagDict,
      });
    } 
    catch 
    {
      setSelPoi({
        id: Number(osm_id),
        version: Number(rawProps.version ?? 1),
        lng: lngLat.lng,
        lat: lngLat.lat,
        tags: getCleanTags(rawProps.tags || rawProps),
      });
    }
  };

  const handleNewPoi = (lngLat: Coordinates) => {
    setSelPoi({ id: 0, lng: lngLat.lng, lat: lngLat.lat, tags: {}, version: 0 }); ///!! why set ID to 0 could collide .  same for tags , why {}
    // also where is the click that should just select the current poi data ? 
  };

  useEffect(() => {
    console.log("[DEBUG] useMapEditor effect triggered. Editor enabled:", editorEnabled);
    if (!map || !editorEnabled) 
    {
      setSelPoi(null);
      if (map) 
        map.getCanvas().style.cursor = "";
      return;
    }

    const style = map.getStyle();
    if (!style) 
      return;

    console.log(`[INFO] : Simple click on styles ${JSON.stringify(style.sources["pois"])} ` );

    const poiSourceName = style.sources["pois"] ? "pois": Object.keys(style.sources).find(
      (n) => (style.sources[n] as maplibregl.SourceSpecification)?.type === "vector"
    );

    if (!poiSourceName) return;

    const poiLayers = style.layers
                                  .filter((l: AnyLayer) => l.source === poiSourceName)
                                  .map((l) => l.id);

    const handleClick = async (e: maplibregl.MapMouseEvent) => {
      if (e.originalEvent.ctrlKey) 
      {
        handleNewPoi(e.lngLat);
        return;
      }
      console.log(`[INFO] : Simple click on point ${JSON.stringify(poiSourceName)} ` ); 
      console.log(`[INFO] : Simple click on point ${JSON.stringify(poiLayers)} ` ); 
      console.log(`[INFO] : Simple click on point ${JSON.stringify(Object.entries(e.point))}` ); 

      const features = map.queryRenderedFeatures(e.point, { layers: poiLayers });

        console.log(JSON.stringify(features))
        console.log(features.length)
      if (features.length > 0) 
      {
        await handlePoiClick(features[0], e.lngLat);
      }
    };

    const handleMouseEnter = () => {
      map.getCanvas().style.cursor = "pointer";
    };

    const handleMouseLeave = () => {
      map.getCanvas().style.cursor = "";
    };

    map.on("click", handleClick);
    poiLayers.forEach((id) => {
      map.on("mouseenter", id, handleMouseEnter);
      map.on("mouseleave", id, handleMouseLeave);
    });

    return () => {
      map.off("click", handleClick);
      poiLayers.forEach((id) => {
        map.off("mouseenter", id, handleMouseEnter);
        map.off("mouseleave", id, handleMouseLeave);
      });
    };
  }, [map, editorEnabled]);

  return { selPoi, setSelPoi };
};