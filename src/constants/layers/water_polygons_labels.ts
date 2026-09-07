
import { water_polygons_labels_zoom } from "../zoom"
import type {CustomLayer} from "@/types/map.types"
import { DARK_COLOR_SCHEME } from "./colors";
import {store} from  "@/store/store"
import { THEME_MAP } from "../theme.constant";

const currentTheme = store.getState().theme.currentTheme;
const scheme = THEME_MAP[currentTheme] || DARK_COLOR_SCHEME

 export const water_polygons_labels  : CustomLayer[]= [
    {
    id: "water-name",
    type: "symbol",
    "source-layer": "water_polygons_labels",
    minzoom: water_polygons_labels_zoom.min ,
    filter: ["has", "name"],
    layout: {
      "text-field": ["get", "name"],
      "text-size": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    0, 0,
                    water_polygons_labels_zoom.min , 16,
                    water_polygons_labels_zoom.max, 19,
                  ],
      "symbol-placement": "point",
      "text-font": ["Noto Sans Bold"],
      "symbol-spacing": 100,
      "text-allow-overlap": false,
      "text-ignore-placement": false,
    },
    paint: {
      "text-color": scheme.waterways_name["text-color"],
      "text-halo-color": scheme.waterways_name['text-halo-color'],
      "text-halo-width": 2.5,
      "text-opacity": [
                        "interpolate",
                        ["linear"],
                        ["zoom"],
                        0, 0,
                        water_polygons_labels_zoom.min , 0.5,
                        water_polygons_labels_zoom.min + 3, 0.8,
                        water_polygons_labels_zoom.max, 1,
                      ],
    },
  },
]
