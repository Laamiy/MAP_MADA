import { world_countries_110m_zoom } from "../zoom"
import { DARK_COLOR_SCHEME } from "./colors";
import {store} from  "@/store/store"
import { THEME_MAP } from "../theme.constant";

const currentTheme = store.getState().theme.currentTheme;
const scheme = THEME_MAP[currentTheme] || DARK_COLOR_SCHEME;

export const world_countries_110m = [
  {
    id: "world_countries_110m-fill",
    type: "fill",
    minzoom: world_countries_110m_zoom.min,
    maxzoom: world_countries_110m_zoom.max,
    "source-layer": "world_countries_110m",
    paint: {
      "fill-color": scheme.world_countries_110.fill,
      "fill-opacity": 1,
    },
  },


  {
    id: "world_countries_110m-line",
    type: "line",
    minzoom: world_countries_110m_zoom.min,
    maxzoom: world_countries_110m_zoom.max,
    "source-layer": "world_countries_110m",
    paint: {
      "line-color": scheme.world_countries_110.line,
      "line-width": 1,
    },
  },
]
