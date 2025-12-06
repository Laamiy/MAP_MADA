import { landuse_zoom } from "../zoom";
const INC = 6 ;
export const landuse_labels = [
  {
  id: 'landuse-label',
  type: 'symbol',
  source: 'landuse',
  'source-layer': 'landuse',
  minzoom: landuse_zoom.min + INC, 
  maxzoom: landuse_zoom.max,
filter: [
  "all",
  ["has", "name"],
  ["!=", ["get", "natural"], "water"],
  ["!=", ["get", "landuse"], "reservoir"],
  ["!=", ["get", "landuse"], "basin"]
],

  layout: {
  'text-field': [
  'concat',
  ['upcase', ['slice', ['get', 'name'], 0, 1] ],
  ['downcase', ['slice', ['get', 'name'], 1]]
  ],
    'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular'],
    'text-size': [
      'interpolate',
      ['linear'],
      ['zoom'],
      landuse_zoom.min + INC, 10,
      landuse_zoom.min + INC + 2, 14
    ],
    'text-padding': 2,
    'symbol-placement': 'point',
    'text-allow-overlap': false,
    'text-anchor': 'center',
  },
  paint: {
    'text-color': '#444',
    'text-halo-color': 'rgba(255,255,255,0.8)',
    'text-halo-width': 1.5,
    'text-halo-blur': 0.5,
    'text-opacity': [
      'interpolate',
      ['linear'],
      ['zoom'],
      landuse_zoom.min + INC, 0.7,
      landuse_zoom.min + INC  + 2, 1
    ],
  },
}

]
