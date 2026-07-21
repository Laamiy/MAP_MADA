export interface Coordinates {
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
    layers: AnyLayer
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

export type AnyLayer = Record<string, any>;
