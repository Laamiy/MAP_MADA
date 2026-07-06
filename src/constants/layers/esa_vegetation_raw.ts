import { esa_vegetation_raw_zoom } from '../zoom'


function smoothVegLayer(vegClass: string, color: string, opacity = 0.5) 
{
  return [
    {
      id: `extra-${vegClass}`,
      type: 'fill',
      'source-layer': 'esa_vegetation_raw',
      minzoom: esa_vegetation_raw_zoom.min,
      maxzoom: esa_vegetation_raw_zoom.max,
      filter: ['==', ['get', 'class'], vegClass],  // ← field is "class", values are strings
      paint: {
        'fill-color': color,
        "fill-opacity": ["interpolate", ["linear"], ["zoom"], esa_vegetation_raw_zoom.min, 
                                                              opacity, 
                                                              esa_vegetation_raw_zoom.min + 3, 
                                                              opacity - 0.3, 
                                                              esa_vegetation_raw_zoom.min + 7, 
                                                              opacity - 0.4, 
                                                              esa_vegetation_raw_zoom.max -1, 0],
        'fill-antialias': true,
      },
    },
  
  ];
}

export const esa_vegetation_raw = [
  ...smoothVegLayer('trees', '#5BE7A9', 1),
  ...smoothVegLayer('shrub', '#BFF2D5', 1),
  ...smoothVegLayer('grass', '#BFF2D5', 1),
  ...smoothVegLayer('barren', '#FFE5BF', 0.3),
  ...smoothVegLayer('crop', '#FFEDDE', 0.3),
  ...smoothVegLayer('snow', '#FFFFFF', 0.3),
  ...smoothVegLayer('urban', '#808080', 0.3),
]


  // {
    //   id: `extra-${vegClass}-edge`,
    //   type: 'line',
    //   'source-layer': 'esa_vegetation_raw',
    //   minzoom: esa_vegetation_raw_zoom.min,
    //   maxzoom: esa_vegetation_raw_zoom.max,
    //   filter: ['==', ['get', 'class'], vegClass],
    //   paint: {
    //     'line-color': color,
    //     'line-width': 1,
    //     'line-blur': 2,
    //     'line-opacity': 0.35
    //   }
    // }