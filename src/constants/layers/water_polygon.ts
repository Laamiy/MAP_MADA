import { water_polygons_zoom } from "../zoom"
import type {CustomLayer} from "@/types/map.types"
export const water_polygon : CustomLayer[] = [
  {
    id: "water-polygons-fill",
    type: "fill",
    "source-layer": "water_polygons",
    minzoom: water_polygons_zoom.min,
    maxzoom: water_polygons_zoom.max,
    paint: {
      "fill-color": "#53CBF3"//"rgba(115, 206, 216, 1)",
    },
  },
]
