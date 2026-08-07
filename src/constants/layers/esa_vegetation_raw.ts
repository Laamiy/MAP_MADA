import { esa_vegetation_raw_zoom } from '../zoom'
import type { CustomLayer } from '@/types/map.types';

function smoothVegLayer(vegClass: string, color: string, opacity = 0.5) : CustomLayer[]
{
  return [
    {
      id: `extra-${vegClass}`,
      type: 'fill',
      'source-layer': 'esa_vegetation_raw',
      minzoom: esa_vegetation_raw_zoom.min,
      maxzoom: esa_vegetation_raw_zoom.max,
      filter: ['==', ['get', 'class'], vegClass],
      paint: {
        'fill-color': color,
        "fill-opacity": ["interpolate", ["linear"], ["zoom"], esa_vegetation_raw_zoom.min,
                                                              opacity,
                                                              esa_vegetation_raw_zoom.min + 3,
                                                              opacity - 0.3,
                                                              esa_vegetation_raw_zoom.min + 8,
                                                              opacity - 0.1,
                                                              esa_vegetation_raw_zoom.max , 0.4],
        'fill-antialias': true,
      },
    },

  ];
}

export const esa_vegetation_raw  = [
  ...smoothVegLayer('trees', '#5BE7A9', 1),
  ...smoothVegLayer('shrub', '#BFF2D5', 1),
  ...smoothVegLayer('grass', '#BFF2D5', 1),
  ...smoothVegLayer('barren', '#FFE5BF', 0.3),
  ...smoothVegLayer('crop', '#FFEDDE', 0.3),
  ...smoothVegLayer('snow', '#FFFFFF', 0.3),
  ...smoothVegLayer('urban', '#808080', 0.3),
]
