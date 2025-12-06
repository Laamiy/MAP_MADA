import { INC, places_zoom } from "../zoom";
export const place = [
  {
    id: "places-name-symbol",
    type: "symbol",
    source: "places",
    "source-layer": "places",
    minzoom: places_zoom.min,
    maxzoom: places_zoom.max,
    filter: ["has", "name"],
    layout: {
      "text-field": ["upcase", ["get", "name"]],
      "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],
      "text-size": [
        "interpolate",
        ["linear"],
        ["zoom"],
        0,
        0,
        places_zoom.min,
        11,
        places_zoom.min + INC,
        14,
      ],
      "symbol-spacing": 500,
      "text-allow-overlap": false,
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
        places_zoom.min,
        1,
        places_zoom.min + 0.01,
        1,
      ],
    },
  },
];
