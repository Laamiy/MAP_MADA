import type {CustomLayer} from "@/types/map.types"
import { DARK_COLOR_SCHEME } from "./colors";
import {store} from  "@/store/store"
import { THEME_MAP } from "../theme.constant";

const currentTheme = store.getState().theme.currentTheme;
const scheme = THEME_MAP[currentTheme] || DARK_COLOR_SCHEME;

export const world_water_lakes  : CustomLayer[]= [
  {
    "id": "world_water_lakes-fill",
    "type": "fill",
    "minzoom": 0,
    "maxzoom": 12,
    "source-layer": "water_lakes",
    "paint": {
      "fill-color": scheme.waterway.fill,  // later on should have it's own color ?
    }
  },
]
