// constants/layers/admin_highlight.ts
import type { CustomLayer } from "@/types/map.types";
import { DARK_COLOR_SCHEME } from "./colors";
import {store} from '@/store/store'
import { THEME_MAP } from "../theme.constant";
// These layers start INVISIBLE (filter matches nothing)
// On click, the filter updates to ["==", ["get", "osm_id"], clickedId]

const currentTheme = store.getState().theme.currentTheme;
const scheme = THEME_MAP[currentTheme] || DARK_COLOR_SCHEME

export const admin_polygons: CustomLayer[] = [
  {
    id: "admin-highlight-fill",
    type: "fill",
    "source-layer": "admin_polygons",
    minzoom: 6,
    maxzoom: 14,
    filter: ["==", ["get", "osm_id"],-1], // EMPTY = hidden
    paint: {
      "fill-color": [
        "match",
        ["get", "admin_level"],
        "3", scheme.admin_polygons.level3,
        "4", scheme.admin_polygons.level4,
        "5", scheme.admin_polygons.level5,
        "6", scheme.admin_polygons.level6,
        "7", scheme.admin_polygons.level7,
        "8",scheme.admin_polygons.level8,
        scheme.admin_polygons.others
      ],
      "fill-opacity": [
        "interpolate", ["linear"], ["zoom"],
        6, 0,
        8, 0.15,
        10, 0.25,
        12, 0.3
      ],
      "fill-outline-color": [
        "match",
        ["get", "admin_level"],
               "3", scheme.admin_polygons.level3,
               "4", scheme.admin_polygons.level4,
               "5", scheme.admin_polygons.level5,
               "6", scheme.admin_polygons.level6,
               "7", scheme.admin_polygons.level7,
               "8",scheme.admin_polygons.level8,
                scheme.admin_polygons.others
      ]
    }
  },
  {
    id: "admin-highlight-line",
    type: "line",
    "source-layer": "admin_polygons",
    minzoom: 6,
    maxzoom: 14,
    filter: ["==", ["get", "osm_id"], -1],
    paint: {
      "line-color": [
        "match",
        ["get", "admin_level"],
        "3", scheme.admin_polygons.level3,
        "4", scheme.admin_polygons.level4,
        "5", scheme.admin_polygons.level5,
        "6", scheme.admin_polygons.level6,
        "7", scheme.admin_polygons.level7,
        "8",scheme.admin_polygons.level8,
        scheme.admin_polygons.others
      ],
      "line-width": [
        "interpolate", ["linear"], ["zoom"],
        6, 0.5,
        8, 1,
        10, 2,
        12, 3
      ],
      "line-opacity": [
        "interpolate", ["linear"], ["zoom"],
        6, 0,
        8, 0.5,
        10, 0.8,
        12, 1
      ]
    }
  }
];
