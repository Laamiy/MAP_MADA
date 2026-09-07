import { world_countries_50m_zoom } from "../zoom";
import type { CustomLayer } from "@/types/map.types";
import { DARK_COLOR_SCHEME } from "./colors";
import {store} from  "@/store/store"
import { THEME_MAP } from "../theme.constant";

const currentTheme = store.getState().theme.currentTheme;
const scheme = THEME_MAP[currentTheme] || DARK_COLOR_SCHEME;

export const world_countries_50m  : CustomLayer []= [
  {
    id: "world_countries_50m-fill",
    type: "fill",
    minzoom: world_countries_50m_zoom.min,
    maxzoom: world_countries_50m_zoom.max,
    "source-layer": "world_countries_50m",
    paint: {
      "fill-color": scheme.world_countries_50.fill,
      "fill-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        world_countries_50m_zoom.min,
        0,
        world_countries_50m_zoom.min + 0.5,
        1,
        world_countries_50m_zoom.max - 0.5,
        1,
        world_countries_50m_zoom.max,
        0,
      ],
    },
  },
];
