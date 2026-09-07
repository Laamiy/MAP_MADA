import { ferry_routes_zoom, INC } from "../zoom"
import { DARK_COLOR_SCHEME } from "./colors";

import {store} from  "@/store/store"
import { THEME_MAP } from "../theme.constant";

const currentTheme = store.getState().theme.currentTheme;
const scheme = THEME_MAP[currentTheme] || DARK_COLOR_SCHEME
export const ferry_routes = [
  {
    id: "ferry-routes-line",
    type: "line",
    source: "ferry_routes",
    "source-layer": "ferry_routes",
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": scheme.ferry_routes.line ,
      "line-width": [
        "interpolate",
        ["linear"],
        ["zoom"],
        0,
        0,
        ferry_routes_zoom.min,
        1.2,
        ferry_routes_zoom.min + INC - 1,
        2,
        ferry_routes_zoom.max,
        3,
      ],
      "line-dasharray": [2, 2],
    },
  },
]
