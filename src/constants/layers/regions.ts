import { boundaries_coarse_name_zoom } from "../zoom"
import type {CustomLayer} from "@/types/map.types"
import { DARK_COLOR_SCHEME } from "./colors";

import {store} from  "@/store/store"
import { THEME_MAP } from "../theme.constant";

const currentTheme = store.getState().theme.currentTheme;
const scheme = THEME_MAP[currentTheme] || DARK_COLOR_SCHEME;

export const regions  : CustomLayer[]= [

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

      "text-color": scheme["text-color"],
      "text-halo-color": scheme["text-halo-color"],
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
