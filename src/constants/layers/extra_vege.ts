import { esa_vegetation_raw_zoom } from '../zoom'

const colors = {
  forest: '#13FFC0',
  shrubland: '#BFF2D5',
  grassland: '#BFF2D5',
  mangroves: '#40ffb3ff'
};

function smoothVegLayer(veg: string, color: string, opacity = 0.4) {
  return [
    {
      id: `extra-${veg}`,
      type: 'fill',
      source: 'esa_vegetation_raw',
      'source-layer': 'esa_vegetation_raw',
      minzoom: esa_vegetation_raw_zoom.min,
      maxzoom: esa_vegetation_raw_zoom.max,
      filter: ['==', 'veg_type', veg],
      paint: {
        'fill-color': color,
        'fill-opacity': opacity,
        'fill-antialias': true
      }
    },
    {
      id: `extra-${veg}-edge`,
      type: 'line',
      source: 'esa_vegetation_raw',
      'source-layer': 'esa_vegetation_raw',
      filter: ['==', 'veg_type', veg],
      paint: {
        'line-color': color,
        'line-width': 1,
        'line-blur': 2,
        'line-opacity': 0.35
      }
    }
    // {
    //   id: `extra-${veg}-outline`,
    //   type: 'line',
    //   source: 'esa_vegetation_raw',
    //   'source-layer': 'esa_vegetation_raw',
    //   minzoom: esa_vegetation_raw_zoom.min,
    //   maxzoom: esa_vegetation_raw_zoom.max,
    //   filter: ['==', 'veg_type', veg],
    //   paint: {
    //     'line-color': color,
    //     'line-width': ['interpolate', ['linear'], ['zoom'],
    //       esa_vegetation_raw_zoom.min, 0.4,
    //       esa_vegetation_raw_zoom.max, 0.8
    //     ],
    //     'line-opacity': 0.3,
    //     'line-blur': 0.8               // ← soft edge
    //   }
    // }
  ];
}

export const extraVegetation = [
  ...smoothVegLayer('forest', colors.forest, 0.45),
  ...smoothVegLayer('shrubland', colors.shrubland, 0.4),
  ...smoothVegLayer('grassland', colors.grassland, 0.35),
  // ...smoothVegLayer('mangroves', colors.mangroves, 0.5)
];
