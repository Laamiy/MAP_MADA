import { boundaries_coarse_name_zoom } from "../zoom"

export const regions = [

  {
    id: "boundaries-coarse-name-region",
    type: "symbol",
    "source-layer": "boundaries_coarse_name",
    filter: ["all", ["==", "admin_level", "4"], ["has", "name"]],
    minzoom: boundaries_coarse_name_zoom.min,
    maxzoom: boundaries_coarse_name_zoom.max - 3,
    layout: {
      "text-field": ["get", "name"],
      "text-size": [
        "interpolate",
        ["linear"],
        ["zoom"],
        boundaries_coarse_name_zoom.min,
        15,
        boundaries_coarse_name_zoom.max - 3,
        18,
      ],
      "symbol-placement": "point",
      "text-justify": "center",
      "text-anchor": "bottom",
      "text-offset": [0, -0.4],
      "text-font": ["Noto Sans Regular"],
    },
    paint: {

      "text-color": "#000000",
      "text-halo-color": "rgba(255, 250, 250, 0.8)", // Dark, semi-transparent
      "text-halo-width": 1.5,
      "text-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        0,
        1,
        boundaries_coarse_name_zoom.min,
        1,
        boundaries_coarse_name_zoom.min + 0.01,
        1,
        boundaries_coarse_name_zoom.max - 3,
        0.5,
      ],
    },
  },
]

      // "icon-image": "region",
      // "icon-size": [
      //   "interpolate",
      //   ["linear"],
      //   ["zoom"],
      //   boundaries_coarse_name_zoom.min + 2,
      //   0.8,
      // ],
      // "icon-anchor": "bottom",
      // "icon-allow-overlap": false,