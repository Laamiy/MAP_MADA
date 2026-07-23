import { INC, places_zoom } from "../zoom"
export const places = [
  {
    id: "places-name-symbol",
    type: "symbol",
    "source-layer": "places",
    minzoom: places_zoom.min,
    maxzoom: places_zoom.max,
    filter: ["has", "name"],
    layout: {
      "icon-image": "tree",
      "icon-size": 1,
      "icon-anchor": "top",
      "icon-allow-overlap": false,
      "text-field": ["upcase", ["get", "name"]],
      "text-justify": "center",
      "text-font": ["Noto Sans Bold"],
      "text-size": [
        "interpolate",
        ["linear"],
        ["zoom"],
        0,
        0,
        places_zoom.min,
        13,
        places_zoom.min + INC,
        17,
      ],
      "symbol-placement": "point",
      "text-offset": [0, -1],
      "symbol-spacing": 500,
      "text-allow-overlap": false,
    },
    paint: {
      "text-color": "#8ba5c1",
      "text-halo-color": "#ffffff",
      "text-halo-width": 1.7,
      "text-opacity": 1,

    },
  },
]