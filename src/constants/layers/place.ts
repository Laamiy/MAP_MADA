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
        0.5,
        places_zoom.min + INC,
        14,
      ],
      "symbol-spacing": 250,
      "text-allow-overlap": true,
    },
    paint: {
      "text-color": "#ffffff",
      "text-halo-color": "#8ba5c1",
      "text-halo-width": 1.5,
      "text-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        0,
        0,
        places_zoom.min,
        0.5,
        places_zoom.min + 0.01,
        1,
      ],
    },
  },
];
