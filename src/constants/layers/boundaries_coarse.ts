import { boundaries_coarse_zoom, INC } from "../zoom";

export const admin_boundaries = [
  {
    id: "boundaries-coarse-line-district",
    type: "line",
    "source-layer": "admin_lines",
    filter: ["all", ["==", "admin_level", "4"], ["has", "name"]],
    paint: {
      "line-color": "#000000",
      "line-width": [
        "interpolate",
        ["linear"],
        ["zoom"],
        0,
        0,
        boundaries_coarse_zoom.min,
        0.5,
        boundaries_coarse_zoom.min + INC,
        1,
        boundaries_coarse_zoom.max,
        0.5,
      ],
      "line-dasharray": [0.5, 4],
    },
  },
 {
    id: "boundaries-coarse-label-district",
    type: "symbol",
    "source-layer": "admin_lines",
    filter: ["all", ["==", "admin_level", "4"], ["has", "name"]],
    layout: {
      "symbol-placement": "line",
      "text-field": ["get", "name"],
      
      // [x, y] in em units. // y = 1.2 shifts the text perpendicular to the line on the RIGHT side.// (Negative y = -1.2 would shift to the LEFT side)
      "text-offset": [0, -1.2],
      
      "text-keep-upright": true,
      "text-max-angle": 45,
      "symbol-spacing": 350,
      "text-size": [
        "interpolate",
        ["linear"],
        ["zoom"],
        boundaries_coarse_zoom.min,
        10,
        boundaries_coarse_zoom.max,
        13,
      ],
    },
    paint: {
      "text-color": "#000000",
      "text-halo-color": "#ffffff",
      "text-halo-width": 1.5,
    },
  },
];