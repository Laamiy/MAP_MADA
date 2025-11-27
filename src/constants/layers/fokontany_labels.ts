import { fokontany_labels_zoom } from "../zoom"

export const fokontany_labels = [
  {
    id: "fokontany_labels-symbol",
    type: "symbol",
    source: "fokontany_labels",
    "source-layer": "fokontany_labels",
    minzoom: fokontany_labels_zoom.min,
    maxzoom: fokontany_labels_zoom.max,
    layout: {
      "text-field": ["get", "name"],
      "text-size": [
        "interpolate",
        ["linear"],
        ["zoom"],
        fokontany_labels_zoom.min,
        15,
        fokontany_labels_zoom.max,
        18,
      ],
      "symbol-placement": "point",
      "text-transform": "uppercase",
      "text-justify": "center",
      "text-font": ["Noto Sans Regular"],
    },
    paint: {
      "text-color": "#000000",
      "text-halo-color": "rgba(255, 250, 250, 0.8)",  // Dark, semi-transparent
      "text-halo-width": 2.5,
      "text-halo-blur": 1,
      "text-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        0,
        1,
        fokontany_labels_zoom.min,
        1,
        fokontany_labels_zoom.min + 0.01,
        1,
      ],
    },
  },
]
// filter: [
//   "all",
//   ["in", "admin_level", "8", "10"],
//   ["has", "name"],
//   // ["!=", "name", "Diana"],
//   // ["!=", "name", "Sava"],
//   // ["!=", "name", "Sofia"],
// ],
