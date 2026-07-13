import { INC, roads_low_name_zoom } from "../zoom"

export const roads_low_name = [
  {
    id: "roads-low-name-symbol",
    type: "symbol",
    "source-layer": "roads_low_name",
    minzoom: roads_low_name_zoom.min + 11,
    maxzoom: roads_low_name_zoom.max,
    filter: ["has", "name"],
    layout: {
              "text-field": ["get", "name"],
              "text-size": [
                "interpolate",
                ["linear"],
                ["zoom"],
                roads_low_name_zoom.min + 8,
                11,
                roads_low_name_zoom.max,
                19,
              ],
              "symbol-placement": "line",
              "symbol-spacing": 400,
              "text-font": ["Noto Sans Bold"],
              "text-rotation-alignment": "map",
              "text-pitch-alignment": "viewport",
              "text-keep-upright": true,
              "text-allow-overlap": false,
              "text-ignore-placement": false,
            },
    paint: {
              "text-color": "#ffffff",
              "text-halo-color": "#8ba5c1",
              "text-halo-width": 1.5,
            },
  },

  {
  id: "roads-low-ref-symbol",
  type: "symbol",
  "source-layer": "roads_low_name",
  minzoom: roads_low_name_zoom.min +2,
  maxzoom: roads_low_name_zoom.max,
  filter: ["has", "ref"],
  layout: {
    "text-field": ["get", "ref"],
    "text-size": [
      "interpolate",
      ["linear"],
      ["zoom"],
      roads_low_name_zoom.min,
      11,
      roads_low_name_zoom.min + INC,
      12,
      roads_low_name_zoom.max,
      13
    ],
    "text-font": ["Noto Sans Bold"],
    "symbol-placement": "line",
    "symbol-spacing": 700,
    "text-rotation-alignment": "viewport",
    "text-pitch-alignment": "viewport",
    "text-keep-upright": true,
    "text-allow-overlap": false,
    "text-ignore-placement": false,

    "icon-image": "rectangle",
    "icon-size": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    roads_low_name_zoom.min,
                    11 * 0.055,      // 0.605
                    roads_low_name_zoom.min + INC,
                    14 * 0.055,      // 0.77
                    roads_low_name_zoom.max,
                    15 * 0.055       // 0.825
                  ],
    "icon-text-fit": "both",
    "icon-text-fit-padding": [4, 4, 4, 4],
    "icon-rotation-alignment": "viewport",
    "icon-keep-upright": true
  },
  paint: {
            "text-color": "#ffffff",
            "text-halo-width": 0
          }
}
]
