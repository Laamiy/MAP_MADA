import { roads_local_name_zoom } from "../zoom"
import type { CustomLayer } from "@/types/map.types"
import { DARK_COLOR_SCHEME } from "./colors";
import {store} from  "@/store/store"
import { THEME_MAP } from "../theme.constant";

const currentTheme = store.getState().theme.currentTheme;
const scheme = THEME_MAP[currentTheme] || DARK_COLOR_SCHEME;
export const roads_local_name : CustomLayer[]= [
  {
    id: "roads-name-symbol",
    type: "symbol",
    "source-layer": "roads_local_name",
    filter: ["has", "name"],
    layout: {
              "text-field": ["get", "name"],
              "text-size": [
                "interpolate",
                ["linear"],
                ["zoom"],
                roads_local_name_zoom.min,
                11,
                roads_local_name_zoom.max,
                17,
              ],
              "symbol-placement": "line",
              "symbol-spacing": 200,
              "text-font": ["Noto Sans Bold"],
              "text-rotation-alignment": "map",
              "text-pitch-alignment": "viewport",
              "text-keep-upright": true,
              "text-allow-overlap": false,
              "text-ignore-placement": false,
            },
    paint: {
              "text-color": scheme.roads_local_name["text-color"],
              "text-halo-color": scheme.roads_local_name['text-halo-color'],
              "text-halo-width": 1.5,
            },
  },
]
