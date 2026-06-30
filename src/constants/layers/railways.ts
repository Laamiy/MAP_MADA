import { railways_zoom } from "../zoom"

export const railways = [
  {
      id: "railways-line",
      type: "line",
      "source-layer": "railways",
      layout: {
                "line-cap": "square",
                "line-join": "miter",
              },
      paint: {
              "line-color": "rgba(33, 40, 47, 1)",
              "line-width": 1,
              "line-opacity": [
                "interpolate",
                ["linear"],
                ["zoom"],
                0,
                0,
                railways_zoom.min,
                0,
                railways_zoom.min + 0.01,
                1,
                railways_zoom.max,
                0.5,
              ],
              "line-dasharray": [1, 5],
            },
  },
]
