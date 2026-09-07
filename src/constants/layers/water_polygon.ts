import { water_polygons_zoom } from "../zoom"
import type {CustomLayer} from "@/types/map.types"
import { DARK_COLOR_SCHEME } from "./colors";
import {store} from  "@/store/store"
import { THEME_MAP } from "../theme.constant";

const currentTheme = store.getState().theme.currentTheme;
const scheme = THEME_MAP[currentTheme] || DARK_COLOR_SCHEME;
export const water_polygon : CustomLayer[] = [
  {
    id: "water-polygons-fill",
    type: "fill",
    "source-layer": "water_polygons",
    minzoom: water_polygons_zoom.min,
    maxzoom: water_polygons_zoom.max,
    paint: {
      "fill-color": scheme.waterway.fill,
    },
  },
]
