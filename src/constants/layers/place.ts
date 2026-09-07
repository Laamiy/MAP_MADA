import { INC, places_zoom } from "../zoom"
import type {CustomLayer} from "@/types/map.types"
import { DARK_COLOR_SCHEME } from "./colors";

import {store} from  "@/store/store"
import { THEME_MAP } from "../theme.constant";

const currentTheme = store.getState().theme.currentTheme;
const scheme = THEME_MAP[currentTheme] || DARK_COLOR_SCHEME

export const places : CustomLayer[] = [
  {
    id: "places-name-symbol",
    type: "symbol",
    "source-layer": "places",
    minzoom: places_zoom.min,
    maxzoom: places_zoom.max,
    filter: ["has", "name"],
    layout: {
      "icon-image": "tree",
      "icon-size": 1,
      "icon-anchor": "top",
      "icon-allow-overlap": false,
      "text-field": ["upcase", ["get", "name"]],
      "text-justify": "center",
      "text-font": ["Noto Sans Bold"],
      "text-size": [
        "interpolate",
        ["linear"],
        ["zoom"],
        0,
        0,
        places_zoom.min,
        13,
        places_zoom.min + INC,
        17,
      ],
      "symbol-placement": "point",
      "text-offset": [0, -1],
      "symbol-spacing": 500,
      "text-allow-overlap": false,
    },
    paint: {
      "text-color": scheme.places["text-color"],
      "text-halo-color": scheme.places["text-halo-color"],
      "text-halo-width": 1.7,
      "text-opacity": 1,

    },
  },
]
