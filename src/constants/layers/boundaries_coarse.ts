import { boundaries_coarse_zoom, INC } from "../zoom";
import type {CustomLayer} from "@/types/map.types"
import { DARK_COLOR_SCHEME } from "./colors";
import {store} from  "@/store/store"
import { THEME_MAP } from "../theme.constant";

const currentTheme = store.getState().theme.currentTheme;
const scheme = THEME_MAP[currentTheme] || DARK_COLOR_SCHEME

export const admin_boundaries  : CustomLayer[]= [
  {
    id: "boundaries-coarse-line-district",
    type: "line",
    "source-layer": "admin_lines",
    filter: ["all", ["==", "scheme", "4"], ["has", "name"]],
    paint: {
      "line-color": scheme.boundaries_coarse.line,
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
      "line-dasharray": [0.2, 7],
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
      "text-color": scheme['text-color'],
      "text-halo-color": scheme['text-halo-color'],
      "text-halo-width": 1.5,
      "text-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        boundaries_coarse_zoom.min,
        1,
        boundaries_coarse_zoom.min + INC,
        1,
        boundaries_coarse_zoom.max,
        0.5,
      ],
    },
  },
];
