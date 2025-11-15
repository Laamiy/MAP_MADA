import { pois_zoom } from "../zoom";

export const poiName = {
  min: pois_zoom.min + 6,
  max: pois_zoom.max,
};

export const poi = [
  /* -------------  DEBUG ICON LAYER  ------------- */
  {
    id: "poi-icons-symbol",
    type: "symbol",
    source: "pois",
    "source-layer": "pois",
    minzoom: pois_zoom.min + 4,
    filter: ["has", "icon_class"],
    layout: {
      "icon-image": ["get", "icon_class"],
      "icon-size": 1.1,
      "icon-offset": [0, -20], // move it away from the red text
    },
  },

  {
    id: "pois-health-symbol",
    type: "symbol",
    source: "pois",
    "source-layer": "pois",
    minzoom: pois_zoom.min,
    filter: ["==", ["get", "icon_class"], "health"],
    layout: {
      "icon-image": "health",
      "icon-size": 1,
      "icon-anchor": "bottom",
      "symbol-placement": "point",
      "icon-allow-overlap": false,
    },
  },

  /* -------------   NAME LABEL LAYER (unchanged) ------------- */
  {
    id: "pois-name-symbol",
    type: "symbol",
    source: "pois",
    "source-layer": "pois",
    minzoom: pois_zoom.min + 6,
    filter: ["has", "name"],
    layout: {
      "text-field": ["get", "name"],
      // "text-size": [
      //   "interpolate",
      //   ["linear"],
      //   ["zoom"],
      //   0.0,
      //   pois_zoom.min + 6,
      //   6,
      //   pois_zoom.max,
      //   12,
      // ],
      "text-size": [
        "interpolate",
        ["linear"],
        ["zoom"],
        0,
        0,
        poiName.min,
        6,
        poiName.max,
        12,
      ],
      "symbol-placement": "point",
      "text-justify": "center",
      "text-anchor": "left",
      "text-font": ["Noto Sans Regular"],
      "symbol-spacing": 100,
      // "text-max-angle": 100,
      "text-allow-overlap": true,
      "text-ignore-placement": true,
    },
    paint: {
      // "text-color": "rgba(11,17,26,0.68)",
      "text-color": "#ffffff",
      "text-halo-color": "#8ba5c1",
      "text-halo-width": 1.5,
      "text-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        0,
        0,
        pois_zoom.min + 6,
        0.5,
        pois_zoom.min + 6.01,
        1,
        pois_zoom.max,
        0.5,
      ],
    },
  },
];
