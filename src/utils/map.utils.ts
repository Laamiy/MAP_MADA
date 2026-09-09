import maplibregl from "maplibre-gl";
import type {FeatureProperties , ClickEvent} from "@/types/map.types";
import { MAP_CONFIG } from "../config/map.config";
import type {CustomLayer} from "@/types/map.types"

type customSource = maplibregl.SourceSpecification & { tiles: string[]; };

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
// Interaction utils :
const ADMIN_HIGHLIGHT_LAYERS = ["admin-highlight-fill", "admin-highlight-line"];
const HIDE_FILTER: maplibregl.FilterSpecification = ["==", ["get", "osm_id"], ""];

export const clearAdminHighlight = (map: maplibregl.Map) => {
  ADMIN_HIGHLIGHT_LAYERS.forEach(id => {
    if (map.getLayer(id)) map.setFilter(id, HIDE_FILTER);
  });
};

export const showAdminHighlight = (map: maplibregl.Map, osmId: number | string) => {
  const id = typeof osmId === "string" ? parseInt(osmId, 10) : osmId;
  const filter: maplibregl.FilterSpecification = ["==", ["get", "osm_id"], id];
  ADMIN_HIGHLIGHT_LAYERS.forEach(id => {
    if (map.getLayer(id)) map.setFilter(id, filter);
  });
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
export const resolveLayerIds = ( map : maplibregl.Map , explicitIds?: string[], sourceLayers?: string[]): string[] => {
  const ids = new Set<string>(explicitIds || []);

  if (!sourceLayers || sourceLayers.length === 0)
    return Array.from(ids);

  const style = map.getStyle();
  if (!style || !style.layers)
    return Array.from(ids);

  style.layers.forEach((layer: maplibregl.LayerSpecification) =>
  {
    const src = "source" in layer && typeof layer.source === "string" ? layer.source : undefined;
    const srcLayer = "source-layer" in layer && typeof layer["source-layer"] === "string" ? layer["source-layer"] : undefined;

    if ((srcLayer && sourceLayers.includes(srcLayer)) || (src && sourceLayers.includes(src)))
    {
      ids.add(layer.id);
    }
  });
  // console.log(`array is : ${Array.from(ids)}`);
  return Array.from(ids);
};

export const handleAreaClick = ( map: maplibregl.Map, e: ClickEvent, onSelectArea?: (areaProperties: FeatureProperties) => void) => {
  if (!e.features || e.features.length === 0)
    return;

  const feature = e.features[0];
  const props: FeatureProperties = feature.properties || {};
  const osmId = Number(props.osm_id);

  if (osmId)
  {
    clearAdminHighlight(map);
    showAdminHighlight(map,osmId);
  }

  const targetCoordinates: [number, number] = feature.geometry.type === "Point"
    ? (feature.geometry.coordinates.slice() as [number, number])
    : [e.lngLat.lng, e.lngLat.lat];

  const currentZoom = map.getZoom();
  const adminLevel = Number(props.admin_level);

  let targetZoom = currentZoom + 2.5;
  if (adminLevel === 6) targetZoom = Math.max(currentZoom + 2, 11);
  if (adminLevel === 4) targetZoom = Math.max(currentZoom + 2, 9);

  map.flyTo({
    center: targetCoordinates,
    zoom: Math.min(targetZoom, map.getMaxZoom()),
    speed: 1.2,
    curve: 1.4,
    essential: true,
  });

  onSelectArea?.(props);
};

// TILE SOURCES  UTILS .
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
export const withSource = (layers: CustomLayer[], src: string): CustomLayer[] => {
  return layers.map((l) => ({ ...l, source: src   }));
}
