// import { land_cover_coarse_zoom } from "@/constants/zoom"
import type { CustomLayer } from "@/types/map.types"
import type { ExpressionSpecification } from "maplibre-gl"
import { THEME_MAP } from "@/constants/theme.constant";
import { DARK_COLOR_SCHEME } from "./colors";

import {store} from '@/store/store'

const currentTheme = store.getState().theme.currentTheme;
const scheme = THEME_MAP[currentTheme] || DARK_COLOR_SCHEME


const vegClasses: Record<string, { color: string; opacity: number }> = {
  forest: { color: scheme.land_cover_coarse.forest, opacity: 1 },
  shrub: { color: scheme.land_cover_coarse.shrub, opacity: 1 },
  grass: { color: scheme.land_cover_coarse.grass, opacity: 1 },
  barren: { color: scheme.land_cover_coarse.barren, opacity: 0.3 },
  crop: { color: scheme.land_cover_coarse.crop, opacity: 0.3 },
};

// const { min: zMin, max: zMax } = land_cover_coarse_zoom
// const zA = Math.min(zMin + 1, zMax)
// const zB = Math.min(zMin + 3, zMax)

function buildColorMatch(): ExpressionSpecification {
  const pairs = Object.entries(vegClasses).flatMap(([subtype, { color }]) => [subtype, color])
  return ["match", ["get", "subtype"], ...pairs, scheme.land_cover_coarse.default] as unknown as ExpressionSpecification
}
// function buildOpacityMatch(): ExpressionSpecification {
//   const matchAt = (fn: (o: number) => number) => {
//     const pairs = Object.entries(vegClasses).flatMap(([subtype, { opacity }]) => [
//       subtype,
//       fn(opacity),
//     ])
//     return ["match", ["get", "subtype"], ...pairs, 0]
//   }

//   return [
//     "interpolate", ["linear"], ["zoom"],
//     zMin, matchAt((o) => o),
//     zA, matchAt((o) => Math.max(o - 0.3, 0)),
//     zB, matchAt((o) => Math.max(o - 0.1, 0)),
//     zMax, matchAt(() => 0.4),
//   ] as unknown as ExpressionSpecification
// }

export const land_cover_coarse: CustomLayer[] = [
  {
    id: "land_cover_coarse",
    type: "fill",
    "source-layer": "land_cover",
    // minzoom: zMin,
    // maxzoom: zMax,
    filter: ["match", ["get", "subtype"], Object.keys(vegClasses), true, false] as unknown as ExpressionSpecification,
    paint: {
      "fill-color": buildColorMatch(),
      "fill-opacity": 0.5 ,//buildOpacityMatch(),
      "fill-antialias": false,
    },
  },
]
