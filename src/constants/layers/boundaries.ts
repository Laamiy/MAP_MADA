import { DARK_COLOR_SCHEME } from "./colors";
import {store} from  "@/store/store"
import { THEME_MAP } from "../theme.constant";

const currentTheme = store.getState().theme.currentTheme;
const scheme = THEME_MAP[currentTheme] || DARK_COLOR_SCHEME

export const boundaries = [

  {
    id: "boundaries-fill",
    type: "fill",
    "source-layer": "boundaries",
    paint: {
      "fill-color": scheme.boundaries.fill,
      "fill-opacity": 1,
    },
  },
]
