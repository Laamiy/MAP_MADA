// import { INC, roads_low_name_zoom } from "../zoom"

export const roads_name = [
  {
    id: "roads-name-symbol",
    type: "symbol",
    "source-layer": "roads_name",
    filter: ["has", "name"],
    layout: {
              "text-field": ["get", "name"],
              "text-size": [
                "interpolate",
                ["linear"],
                ["zoom"],
                11,
                11,
                17,
                17,
              ],
              "symbol-placement": "line",
              "symbol-spacing": 200,
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
]
