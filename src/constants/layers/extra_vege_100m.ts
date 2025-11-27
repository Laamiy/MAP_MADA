import type { AnyLayer } from '../../types/map.types';
import { esa_vegetation_100m_zoom } from '../zoom';

const colors = {
  forest: '#00f236ff',
  shrubland: '#a6ff9bff',
  grassland: '#F5F0E5FF',
  mangroves: '#40ffb3ff'
};

function vegLayers100m(
  veg: string,
  color: string,
  opacity = 0.4,
  maxZ?: number
): AnyLayer[] {
  const maxZoom = maxZ ?? esa_vegetation_100m_zoom.max;

  return [
    {
      id: `extra-${veg}-100m`,
      type: 'fill',
      source: 'esa_vegetation_100m',
      'source-layer': 'esa_vegetation_100m',
      minzoom: esa_vegetation_100m_zoom.min,
      maxzoom: maxZoom,
      filter: ['==', 'veg_type', veg],
      paint: {
        'fill-color': color,
        'fill-opacity': opacity,
        'fill-antialias': true
      }
    },

    /*
    {
      id: `extra-${veg}-100m-outline`,
      type: 'line',
      source: 'esa_vegetation_100m',
      'source-layer': 'esa_vegetation_100m',
      minzoom: esa_vegetation_100m_zoom.min,
      maxzoom: esa_vegetation_100m_zoom.max,
      filter: ['==', 'veg_type', veg],
      paint: {
        'line-color': color,
        'line-width': 0.5,
        'line-opacity': 0.3,
        'line-blur': 1
      }
    }
    */
  ];
}

export const extraVegLayers100m: AnyLayer[] = [
  ...vegLayers100m('forest', colors.forest, 0.45),
  ...vegLayers100m('shrubland', colors.shrubland, 0.4, esa_vegetation_100m_zoom.max - 4),
  ...vegLayers100m('grassland', colors.grassland, 0.35),
  ...vegLayers100m('mangroves', colors.mangroves, 0.5)
];
