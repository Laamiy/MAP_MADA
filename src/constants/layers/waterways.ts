import { waterways_zoom } from "../zoom"

export const waterways = [
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
      "line-color": "rgba(115, 206, 216, 1)",
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
