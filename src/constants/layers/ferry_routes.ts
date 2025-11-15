import { ferry_routes_zoom, INC } from "../zoom"

export const ferry_routes = [
  {
    id: "ferry-routes-line",
    type: "line",
    source: "ferry_routes",
    "source-layer": "ferry_routes",
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "rgba(53, 50, 49, 1)",
      "line-width": [
        "interpolate",
        ["linear"],
        ["zoom"],
        0,
        0,
        ferry_routes_zoom.min,
        1.2,
        ferry_routes_zoom.min + INC - 1,
        2,
        ferry_routes_zoom.max,
        3,
      ],
      "line-dasharray": [2, 2],
    },
  },
]
