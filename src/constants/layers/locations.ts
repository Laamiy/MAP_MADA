import { DARK_COLOR_SCHEME } from "./colors";

import {store} from  "@/store/store"
import { THEME_MAP } from "../theme.constant";

const currentTheme = store.getState().theme.currentTheme;
const scheme = THEME_MAP[currentTheme] || DARK_COLOR_SCHEME
const INC = 2 ;

export const locations = [
  {
    id: "locations-symbol",
    type: "symbol",
    "source-layer": "locations",
    minzoom: 4,
    maxzoom: 20,
    filter: ["has", "name"],
    layout: {
      "icon-image": "gp_889",
      "icon-size": 1,
    //   "icon-anchor": "top",
      "icon-allow-overlap": false,
      "text-field": ["upcase", ["get", "name"]],
      "text-justify": "center",
      "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],
      "text-size": [
        "interpolate",
        ["linear"],
        ["zoom"],
        0,
        0,
        4,
        11,
        20 + INC,
        12,
      ],
      "symbol-placement": "point",
        "text-anchor": "right",
        "text-offset": [-2, 0],
      "symbol-spacing": 500,
      "text-allow-overlap": false,
    },
    paint: {
      "text-color": scheme.locations["text-color"],
      "text-halo-color": scheme.locations["text-halo-color"], // Dark, semi-transparent
      "text-halo-width": 2.5,
      "text-halo-blur": 1,
      "text-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        0,
        1,
        4,
        1,
        4+ 0.01,
        1,
      ],
    },
  },
]
