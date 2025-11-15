import { buildings_zoom } from "../zoom"

export const building = [
  {
    id: "buildings-fill-extrusion",
    type: "fill-extrusion",
    source: "buildings",
    "source-layer": "buildings",
    paint: {
      // "fill-color": "#E8E9ED",
      "fill-extrusion-color": "#E8E9ED",
      // "fill-extrusion-height": ["get", "height"], // ou une valeur fixe, ex. 10
      "fill-extrusion-height": 3, // ou une valeur fixe, ex. 10
      "fill-extrusion-opacity": 0.9,
    },
  },
  {
    id: "buildings-line",
    type: "line",
    source: "buildings",
    "source-layer": "buildings",
    paint: {
      "line-color": "rgba(85, 82, 82, 0.06)",
      "line-width": 1,
      "line-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        0,
        0,
        buildings_zoom.min,
        0.5,
        buildings_zoom.min + 0.01,
        1,
      ],
    },
  },
]
