import { DARK_COLOR_SCHEME} from "./colors";
import {store} from '@/store/store'
import { THEME_MAP } from "../theme.constant";

const currentTheme = store.getState().theme.currentTheme;
const scheme = THEME_MAP[currentTheme] || DARK_COLOR_SCHEME

import type { CustomLayer } from "@/types/map.types";
export const background : CustomLayer[] =  [
  {
    id: "background",
    type: "background",
    paint: { "background-color": scheme["background-color"]}
  },
]
