import { useEffect, useState,  } from "react";
import maplibregl from "maplibre-gl";
import axios from "axios";
import type { AnyLayer, Coordinates } from "@/types/map.types";
import type { editorPoi, TagDict , PoiRow } from "@/types/Editor.type";

interface UseMapEditorProps {
  map: maplibregl.Map | null;
  editorEnabled: boolean;
}



export const useMapEditor = ({ map, editorEnabled }: UseMapEditorProps) => 
  {
    const [selPoi, setSelPoi] = useState<editorPoi | null>(null);

    const handlePoiClick = async (feature: maplibregl.MapGeoJSONFeature, lngLat: Coordinates) => {
      const rawProps = feature.properties || {};
      const osm_id = rawProps.osm_id;

      if (!osm_id) 
        return;

      const cleantTags = (raw: string | Record<string, any>): TagDict => 
      {
        const tags = typeof (raw === "string" ? JSON.parse(raw) : raw);
        return Object.fromEntries(
                                  Object.entries(tags).filter(([k]) => {
                                                                                return !k.startsWith("mapbox") && 
                                                                                !k.startsWith("osm_") && 
                                                                                !["version", "icon_class"].includes(k);
                                                                              })
                                ) as TagDict;
      };

      const parsedTags = cleantTags(rawProps.tags || rawProps);

      try 
      {
              const API_BASE = `${import.meta.env.VITE_EDITOR_API}:4004`
              const { data } = await axios.get<PoiRow>(`${API_BASE}/api/poi/${osm_id}`);
              setSelPoi({
                          id: Number(osm_id),
                          version: data.version,
                          lng: data.lng,
                          lat: data.lat,
                          tags: data.tags as  TagDict,
                        });
      } 
      catch (err) 
      {
        setSelPoi({
                    id: Number(osm_id),
                    version: Number(rawProps.version ?? 1),
                    lng: lngLat.lng,
                    lat: lngLat.lat,
                    tags: parsedTags,
                  }
                );
      }
    };

    const handleNewPoi = (lngLat: Coordinates) => {
      setSelPoi({ id: 0, lng: lngLat.lng, lat: lngLat.lat, tags: {}, version: 0 });
    };

    const attachEditorInteractions = () => {
      if (!map) 
        return;
      const style = map.getStyle();
      const poiSourceName = style.sources["pois"] ||Object.keys(style.sources).find((n) => (style.sources[n]).type === "vector");
      
      // const poiSourceName = ["pois", "poi","points"].find((n)=>style.sources[n]) ||
      //   Object.keys(style.sources).find((n) => (style.sources[n] as maplibregl.SourceSpecification).type === "vector");

      if (!poiSourceName) 
        return;

      const poiLayers = style.layers.filter((l: AnyLayer) => l.source === poiSourceName).map((l) => l.id);

      map.on("click", async (e) => {
                                      if (!window.location.search.includes("editor=1")) return;

                                      if (e.originalEvent.ctrlKey) 
                                      {
                                        handleNewPoi(e.lngLat);
                                        return;
                                      }

                                      const features = map.queryRenderedFeatures(e.point, { layers: poiLayers });
                                      if (features.length > 0) 
                                      {
                                        await handlePoiClick(features[0], e.lngLat);
                                      }
                                    });

      poiLayers.forEach((id) => 
      {
        map.on("mouseenter", id, () => {
                                          if (window.location.search.includes("editor=1")) {
                                            map.getCanvas().style.cursor = "pointer";
                                          }
                                        });
        map.on("mouseleave", id, () => {
                                          map.getCanvas().style.cursor = "";
                                        });
      });
    };

    useEffect(() => {
                      if (!editorEnabled) 
                      {
                        setSelPoi(null);
                        if (map) 
                        {
                          map.getCanvas().style.cursor = "";
                        }
                      }
                    }, [editorEnabled, map]);

    return { selPoi, setSelPoi,  attachEditorInteractions };
};