// // src/config/map.config.ts
import type { MapConfig } from "../types/map.types";
const LOCAL_IP = import.meta.env.VITE_LOCAL_IP;

export const MAP_CONFIG: MapConfig = {
  baseUrl: `${LOCAL_IP}:8086/maps/madagascar`,
  spriteUrl: `${LOCAL_IP}:8088/icons/osm-icons`,
  glyphUrl: "https://demotiles.maplibre.org/font",
  defaultCenter: { lat: -18.8792, lng: 47.5079 }, // Antananarivo
  defaultZoom: 4,
  minZoom: 1,
  maxZoom: 20,
};
