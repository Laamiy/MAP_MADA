import { fokontany_labels_zoom } from "../zoom"

export const fokontany_labels = [
  {
    id: "fokontany_labels-symbol",
    type: "symbol",
    source: "fokontany_labels",
    "source-layer": "fokontany_labels",
    minzoom: fokontany_labels_zoom.min + 6,
    maxzoom: fokontany_labels_zoom.max,
    // filter: [
    //   "all",
    //   ["in", "admin_level", "8", "10"],
    //   ["has", "name"],
    //   // ["!=", "name", "Diana"],
    //   // ["!=", "name", "Sava"],
    //   // ["!=", "name", "Sofia"],
    // ],
    layout: {
      "text-field": ["get", "name"],
      "text-size": [
        "interpolate",
        ["linear"],
        ["zoom"],
        fokontany_labels_zoom.min + 2,
        8,
        fokontany_labels_zoom.max,
        10,
      ],
      "symbol-placement": "point",
      // "text-transform": "uppercase",
      "text-justify": "center",
      "text-font": ["Noto Sans Regular"],
    },
    paint: {
      "text-color": "rgba(201, 16, 198, 1)",
      "text-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        0,
        0,
        fokontany_labels_zoom.min + 2,
        1,
        fokontany_labels_zoom.min + 8 + 0.01,
        1,
        fokontany_labels_zoom.max,
        1,
      ],
      "text-halo-color": "rgba(233, 239, 245, 1)",
      "text-halo-width": 1.5,
    },
  },
]
