import { aerialways_zoom } from "../zoom"
import { DARK_COLOR_SCHEME } from "./colors";
import { THEME_MAP } from "../theme.constant";
import {store} from "@/store/store"

const currentTheme = store.getState().theme.currentTheme;
const scheme = THEME_MAP[currentTheme] || DARK_COLOR_SCHEME

export const aerialways = [
  {
    id: "aerialways-line",
    type: "line",
    "source-layer": "aerialways",
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": scheme.aerialways.line ,
      "line-width": [
        "interpolate",
        ["linear"],
        ["zoom"],
        0,
        0,
        aerialways_zoom.min,
        1.5,
        aerialways_zoom.max,
        2.2,
      ],
      "line-dasharray": [1, 2],
    },
  },
]
