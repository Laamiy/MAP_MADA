import { aerialways_zoom } from "../zoom"

export const aerialways = [
  {
    id: "aerialways-line",
    type: "line",
    source: "aerialways",
    "source-layer": "aerialways",
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "rgba(26, 206, 10, 1)",
      "line-width": [
        "interpolate",
        ["linear"],
        ["zoom"],
        0,
        0,
        aerialways_zoom.min,
        1.5,
        aerialways_zoom.max,
        2.2,
      ],
      "line-dasharray": [1, 2],
    },
  },
]
