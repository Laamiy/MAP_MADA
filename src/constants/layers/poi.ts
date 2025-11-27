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
    minzoom: pois_zoom.min + 6,
    maxzoom: pois_zoom.max,
    filter: ["has", "icon_class"],
    layout: {
      "icon-image": ["get", "icon_class"],
      "icon-size": 1.2,
      "icon-offset": [0, -20],
    },
  },
  {
    id: "pois-transport-symbol",
    type: "symbol",
    source: "pois",
    "source-layer": "pois",
    // Use the same minzoom as health so they appear together
    minzoom: pois_zoom.min,
    // Filter specifically for icons categorized as 'transport' in your SQL
    filter: ["==", ["get", "icon_class"], "transport"],
    layout: {
      // Make sure you have an image named 'transport' (or 'bus', 'taxi') in your sprite sheet
      "icon-image": "transport",
      "icon-size": 1.1,
      "icon-anchor": "bottom",
      "symbol-placement": "point",
      "icon-allow-overlap": false,
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
      "icon-size": 1.1,
      "icon-anchor": "bottom",
      "symbol-placement": "point",
      "icon-allow-overlap": false,
    },
  },

  {
    id: "pois-fuel-symbol",
    type: "symbol",
    source: "pois",
    "source-layer": "pois",
    // Use the same minzoom as health so they appear together
    minzoom: pois_zoom.min + 3,
    // Filter specifically for icons categorized as 'transport' in your SQL
    filter: ["==", ["get", "icon_class"], "fuel"],
    layout: {
      // Make sure you have an image named 'transport' (or 'bus', 'taxi') in your sprite sheet
      "icon-image": "fuel",
      "icon-size": 1.1,
      "icon-anchor": "bottom",
      "symbol-placement": "point",
      "icon-allow-overlap": false,
    },
  },


  /* -------------   NAME LABEL LAYER (unchanged) ------------- */
  // {
  //   id: "pois-name-symbol",
  //   type: "symbol",
  //   source: "pois",
  //   "source-layer": "pois",
  //   minzoom: pois_zoom.min + 6,
  //   filter: ["has", "name"],
  //   layout: {
  //     "text-field": ["get", "name"],

  //     "text-size": [
  //       "interpolate",
  //       ["linear"],
  //       ["zoom"],
  //       0,
  //       0,
  //       poiName.min,
  //       12,
  //       poiName.max,
  //       16,
  //     ],
  //     "symbol-placement": "point",
  //     // "text-junstify": "center",
  //     // "text-achor": "left",
  //     "text-font": ["Noto Sans Bold"],
  //     "symbol-spacing": 100,
  //     // "text-max-angle": 100,
  //     "text-allow-overlap": false,
  //     "text-ignore-placement": false,
  //   },
  //   paint: {
  //     // "text-color": "rgba(11,17,26,0.68)",
  //     "text-color": "#ffffff",
  //     "text-halo-color": "#8ba5c1",
  //     "text-halo-width": 1.5,
  //     "text-opacity": [
  //       "interpolate",
  //       ["linear"],
  //       ["zoom"],
  //       0,
  //       0,
  //       pois_zoom.min + 6,
  //       0.5,
  //       pois_zoom.min + 6.01,
  //       1,
  //       pois_zoom.max,
  //       1,
  //     ],
  //   },
  // },
];
