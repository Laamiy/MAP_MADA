import { water_polygons_zoom } from "../zoom"

export const water_polygon = [
  {
    id: "water-polygons-fill",
    type: "fill",
    source: "water_polygons",
    minzoom: water_polygons_zoom.min,
    maxzoom: water_polygons_zoom.max,
    "source-layer": "water_polygons",
    paint: {
      "fill-color": "rgba(115, 206, 216, 1)",
    },
  },
]
