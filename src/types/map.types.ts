import maplibregl from 'maplibre-gl'
export type Coordinates = {
  lat: number;
  lng: number;
  }
export const toMapLibreCoords = (coords: Coordinates): [number, number] => {
  return [coords.lng, coords.lat];
};

export interface MapConfig {
  baseUrl: string;
  spriteUrl: string;
  glyphUrl: string;
  martinUrl?: string ;
  defaultCenter: Coordinates;
  defaultZoom: number;
  minZoom: number;
  maxZoom: number;
}
export type style =
  {
    version: number;
    sprite: string;
    glyphs: string;
    sources: object;
    layers: CustomLayer | CustomLayer[] | maplibregl.LayerSpecification
    projection?: { type: "globe" | "mercator" };
     sky?: {
    "sky-color"?: string;
    "horizon-color"?: string;
    "fog-color"?: string;
    "sky-horizon-blend"?: number;
    "horizon-fog-blend"?: number;
    "fog-ground-blend"?: number;
    "atmosphere-blend"?: number | unknown[];
  };
  light?: {
    anchor: "map" | "viewport";
    position: [number, number, number];
  };
  }

// Layer :
export type  CustomLayer  = {
  id: string;
  type : "symbol"|"line"|"fill" |"circle"
  source?: string;
  "source-layer"?: string;
  minzoom?: number;
  maxzoom?: number;
  filter?: maplibregl.FilterSpecification;
  layout?: { [key: string]: unknown }
  paint?: { [key: string]: unknown }
}
// Events :
export type ClickEvent = maplibregl.MapMouseEvent & {
  features?: maplibregl.MapGeoJSONFeature[];
};
// Feature :
export type FeatureProperties = Record<string, unknown>;
