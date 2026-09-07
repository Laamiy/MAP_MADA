import { INC, roads_low_zoom } from "../zoom";
import type { CustomLayer } from "@/types/map.types"
import { DARK_COLOR_SCHEME } from "./colors";
import {store} from  "@/store/store"
import { THEME_MAP } from "../theme.constant";

const currentTheme = store.getState().theme.currentTheme;
const scheme = THEME_MAP[currentTheme] || DARK_COLOR_SCHEME;

export const roads_low  :  CustomLayer[]= [
  {
    id: "roads-low-primary",
    type: "line",
    "source-layer": "roads_low",
    minzoom: roads_low_zoom.min,
    maxzoom: roads_low_zoom.max,
    filter: ["in", ["get", "highway"], ["literal", ["motorway", "trunk", "primary"]]],
    layout: {
              "line-cap": "round",
              "line-join": "round",
            },

    paint: {
            "line-color": scheme.roads_low.line,
            "line-width": [
                            "interpolate",
                            ["linear"],
                            ["zoom"],
                            roads_low_zoom.min, 0.1,
                            roads_low_zoom.min + INC, 0.3,
                            roads_low_zoom.min + INC * 2, 0.7,
                            roads_low_zoom.min + INC * 3, 3.0,
                            roads_low_zoom.max - 3, 10.0,
                          ],
          },
  },
]
