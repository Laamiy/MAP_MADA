import { INC, minor_roads_zoom } from "../zoom"

export const minor_roads = [
  {
    id: "minor-roads-line",
    type: "line",
    source: "minor_roads",
    "source-layer": "minor_roads",
    paint: {
      "line-color": "#F5F0E5",
      "line-width": [
        "interpolate",
        ["linear"],
        ["zoom"],
        minor_roads_zoom.min,
        1,
        minor_roads_zoom.min + INC,
        5,
        minor_roads_zoom.max,
        7,
      ],
    },
  },
  // {
  //   "id": "minor-roads-outline",
  //   "type": "line",
  //   "source": "minor_roads",
  //   "source-layer": "minor_roads",
  //   "paint": {
  //     "line-color": "rgba(126, 120, 124, 1)",
  //     "line-width": [
  //       "interpolate",
  //       ["linear"],
  //       ["zoom"],
  //       14,
  //       0.8,
  //       18,
  //       1.5,
  //       20,
  //       2.5
  //     ]
  //   }
  // }
]
