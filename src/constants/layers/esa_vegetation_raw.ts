import { esa_vegetation_raw_zoom } from '../zoom'
import type { CustomLayer } from '@/types/map.types'
import type { ExpressionSpecification } from 'maplibre-gl'
import { DARK_COLOR_SCHEME } from './colors';

import {store} from  "@/store/store"
import { THEME_MAP } from "../theme.constant";

const currentTheme = store.getState().theme.currentTheme;
const scheme = THEME_MAP[currentTheme] || DARK_COLOR_SCHEME

const vegClasses: Record<string, { color: string; opacity: number }> = {
  trees: { color: scheme.esa_vegetation_raw.trees, opacity: 1 },
  shrub: { color: scheme.esa_vegetation_raw.shrub, opacity: 1 },
  grass: { color: scheme.esa_vegetation_raw.grass ,  opacity: 1 },
  barren: { color: scheme.esa_vegetation_raw.barren, opacity: 0.4 },
  crop: { color: scheme.esa_vegetation_raw.crop, opacity: 0.4 },
  snow: { color:  scheme.esa_vegetation_raw.snow, opacity: 0.4 },
}

const { min: zMin, max: zMax } = esa_vegetation_raw_zoom
const zA = Math.min(zMin + 1, zMax)
const zB = Math.min(zMin + 3, zMax)

function buildColorMatch(): ExpressionSpecification {
  const pairs = Object.entries(vegClasses).flatMap(([vegClass, { color }]) => [vegClass, color])
  return ['match', ['get', 'class'], ...pairs, scheme.esa_vegetation_raw.default] as unknown as ExpressionSpecification
}

function buildOpacityMatch(): ExpressionSpecification {
  const matchAt = (fn: (o: number) => number) => {
    const pairs = Object.entries(vegClasses).flatMap(([vegClass, { opacity }]) => [
      vegClass,
      fn(opacity),
    ])
    return ['match', ['get', 'class'], ...pairs, 0]
  }

  return [
    'interpolate', ['linear'], ['zoom'],
    zMin, matchAt((o) => o),
    zA, matchAt((o) => Math.max(o - 0.3, 0)),
    zB, matchAt((o) => Math.max(o - 0.1, 0)),
    zMax, matchAt(() => 0.4),
  ] as unknown as ExpressionSpecification
}

export const esa_vegetation_raw: CustomLayer[] = [
  {
    id: 'esa_vegetation_raw',
    type: 'fill',
    'source-layer': 'esa_vegetation_raw',
    minzoom: zMin,
    maxzoom: zMax,
    filter: ['match', ['get', 'class'], Object.keys(vegClasses), true, false] as unknown as ExpressionSpecification,
    paint: {
      'fill-color': buildColorMatch(),
      'fill-opacity': buildOpacityMatch(),
      'fill-antialias': true,
    },
  },
]
