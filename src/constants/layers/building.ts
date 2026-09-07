import type {CustomLayer} from "@/types/map.types"
import { DARK_COLOR_SCHEME } from "./colors";
import {store} from  "@/store/store"
import { THEME_MAP } from "../theme.constant";

const currentTheme = store.getState().theme.currentTheme;
const scheme = THEME_MAP[currentTheme] || DARK_COLOR_SCHEME

export const buildings : CustomLayer[] = [

  {
    id: "buildings-fill",
    type: "fill", // fill-extrusion for 3d buildings
    source: "buildings",
    "source-layer": "buildings",
    paint: {
      "fill-color": scheme.building.fill,
      // "fill-outline-color": "#475569",
    },
  },
]
