import { waterways_zoom } from "../zoom"
import type {CustomLayer} from "@/types/map.types"
export const waterways  : CustomLayer[]= [
  {
    id: "waterways-line",
    type: "line",
    minzoom: waterways_zoom.min,
    maxzoom: waterways_zoom.max,
    "source-layer": "waterways",
    layout: {
      "line-sort-key": ["get", "gid"],
    },
    paint: {
      "line-color": "#53CBF3",//"rgba(115, 206, 216, 1)",
      "line-width": [
                      "interpolate",
                      ["linear"],
                      ["zoom"],
                      0,
                      0,
                      waterways_zoom.min,
                      0.5,
                      waterways_zoom.min + 0.01,
                      3,
                    ],
    },
  },
]
