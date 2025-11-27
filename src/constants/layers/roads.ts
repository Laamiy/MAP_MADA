import { INC, roads_zoom } from "../zoom"

export const roads = [
  {
    id: "roads-line",
    type: "line",
    source: "roads",
    "source-layer": "roads",
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "rgba(170, 185, 201, 1)",
      "line-width": [
        "interpolate",
        ["linear"],
        ["zoom"],
        roads_zoom.min, 0.3,
        roads_zoom.min + INC, 3,
        roads_zoom.min + INC * 2, 15,
        roads_zoom.max, 27,
      ],
      "line-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        0, 0,
        roads_zoom.min, 0.5,
        roads_zoom.min + 0.01, 1,
      ],
    },
  },
];

