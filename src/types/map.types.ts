export interface Coordinates {
  lat: number;
  lng: number;
}

// convert to MapLibre format [lng, lat]
export const toMapLibreCoords = (coords: Coordinates): [number, number] => {
  return [coords.lng, coords.lat];
};

export interface Place {
  id: number;
  name: string;
  address: string;
  type?: string;
  rating?: number;
  reviews?: number;
}

export interface SavedPlace extends Place {
  icon: React.ComponentType<{ className?: string }>;
}

export interface MapConfig {
  baseUrl: string;
  spriteUrl: string;
  glyphUrl: string;
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
  }
export type AnyLayer = Record<string, any>;
