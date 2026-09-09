import { water_polygons_zoom } from "../zoom"
import type {CustomLayer} from "@/types/map.types"
import type { ThemeScheme } from "@/types/map.theme.types"

export function getWaterPolygons(scheme: ThemeScheme): CustomLayer[] {

  const water_polygon: CustomLayer[] = [
    {
      id: "water-polygons-fill",
      type: "fill",
      "source-layer": "water_polygons",
      minzoom: water_polygons_zoom.min,
      maxzoom: water_polygons_zoom.max,
      paint: {
        "fill-color": scheme.waterway.fill,
      },
    },
  ];
  return water_polygon;
}
