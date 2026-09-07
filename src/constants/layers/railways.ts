import { railways_zoom } from "../zoom"
import { DARK_COLOR_SCHEME } from "./colors";

import {store} from  "@/store/store"
import { THEME_MAP } from "../theme.constant";

const currentTheme = store.getState().theme.currentTheme;
const scheme = THEME_MAP[currentTheme] || DARK_COLOR_SCHEME;

export const railways = [
  {
      id: "railways-line",
      type: "line",
      "source-layer": "railways",
      layout: {
                "line-cap": "square",
                "line-join": "miter",
              },
      paint: {
              "line-color": scheme.railways.line,
              "line-width": 1,
              "line-opacity": [
                "interpolate",
                ["linear"],
                ["zoom"],
                0,
                0,
                railways_zoom.min,
                0,
                railways_zoom.min + 0.01,
                1,
                railways_zoom.max,
                0.5,
              ],
              "line-dasharray": [1, 5],
            },
  },
]
