import { road_arrows_zoom } from "../zoom"
import type {CustomLayer} from "@/types/map.types"
import type { ThemeScheme } from "@/types/map.theme.types"

export function getRoadArrows(scheme: ThemeScheme): CustomLayer[] {
  const road_arrows: CustomLayer[] = [
    {
      id: "road-arrows-symbol",
      type: "symbol",
      "source-layer": "road_arrows",
      minzoom: road_arrows_zoom.min,
      layout: {
        "symbol-placement": "line",
        "symbol-spacing": 300,
        "icon-image": "arrow", // arrow icon id
        "icon-size": 0.6,
        "icon-keep-upright": false, // flip if upside-down
        "icon-allow-overlap": false,
        "icon-rotation-alignment": "map", // align to line tangent
      },
      paint: {
        "icon-opacity": 0.6,
      },
    },
  ];
  return road_arrows;
}
