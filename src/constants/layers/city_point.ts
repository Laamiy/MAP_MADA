import type { AnyLayer } from "../../types/map.types";
const zoom = { min: 3, max: 11 };
export const antananarivoGeoJSON = {
  type: 'geojson' as const,
  data: {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [47.5214, -18.8967] } // Lake Anosy      properties: {}
    }]
  }
};

export const antananarivoLayers: AnyLayer[] = [
  {
    id: 'antananarivo-outer',
    type: 'circle',
    source: 'antananarivo',        // must match source key in style
    minzoom: zoom.min,
    maxzoom: zoom.max,
    paint: {
      'circle-radius': 12,
      'circle-color': '#0080ff',
      'circle-opacity': 0.25,
      'circle-stroke-width': 0
    }
  },
  {
    id: 'antananarivo-inner',
    type: 'circle',
    source: 'antananarivo',
    minzoom: zoom.min,
    maxzoom: zoom.max,
    paint: {
      'circle-radius': 5,
      'circle-color': '#ffffff',
      'circle-stroke-color': '#0080ff',
      'circle-stroke-width': 2
    }
  }
];
