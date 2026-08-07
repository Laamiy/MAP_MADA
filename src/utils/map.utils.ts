import maplibregl from "maplibre-gl";
import type {FeatureProperties} from "@/types/map.types";
import { MAP_CONFIG } from "../config/map.config";


type customSource = maplibregl.SourceSpecification & { tiles: string[];};
export const handleZoomIn = (map: maplibregl.Map |null ) => map?.zoomIn();
export const handleZoomOut = (map: maplibregl.Map|null) => map?.zoomOut();
export const handleNavigationClick = ( map: maplibregl.Map, center: { lng: number; lat: number }, zoom: number) =>
    {
        map.flyTo({
                    center: [center.lng, center.lat],
                    zoom,
                    duration: 1000,
                });
    };
export const bustTiles = (map: maplibregl.Map) => {
  if (!map) return;
  try {
            const style = map.getStyle();
            if (!style?.sources) return;

            Object.keys(style.sources).forEach((sourceName) => {
                const source = style.sources[sourceName] as customSource;

                if (source?.tiles && Array.isArray(source.tiles))
                {
                    source.tiles = source.tiles.map((url: string) => {
                                                                            const baseUrl = url.split("?")[0];
                                                                            return `${baseUrl}?v=${Date.now()}`;
                                                                    });
                }
            });

            map.setStyle(style, { diff: false });
            map.triggerRepaint();
            console.log("[INFO] : Map hard-refreshed.");
        }
    catch (err)
    {
            console.error("[ERROR] : Tile bust error:", err);
    }
};

export function getStringProp(props: FeatureProperties, key: string): string | undefined {
  const val = props[key];
  return typeof val === "string" ? val : undefined;
}

export function formatCategory(props: FeatureProperties): string {
  const primaryTag =
    getStringProp(props, "amenity") ||
    getStringProp(props, "shop") ||
    getStringProp(props, "tourism") ||
    getStringProp(props, "natural") ||
    getStringProp(props, "leisure") ||
    getStringProp(props, "public_transport") ||
    getStringProp(props, "aeroway");

  if (!primaryTag) return "Unnamed Location";

  return primaryTag
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char: string) => char.toUpperCase());
}
export function src( srcName: string, min: number, max: number, keepFields: string[] = [])
{
  return {
    type: "vector",
    tiles: [`${MAP_CONFIG.baseUrl}/${srcName}/{z}/{x}/{y}.pbf`],
    minzoom: min,
    maxzoom: max,
    layers: [{ id: srcName, fields: keepFields }],
  };
}
export function martinSrc( srcName : string , min : number , max : number )
{
  return {
    type : "vector",
    tiles: [`${MAP_CONFIG.martinUrl}/${srcName}/{z}/{x}/{y}`],
    minzoom: min,
    maxzoom: max,
  }
}
