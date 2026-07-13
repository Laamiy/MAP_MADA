  export interface GeoFeature 
  {
    type: 'Feature';
    geometry: {
      type: 'Point';
      coordinates: [number, number]; // [lng, lat]
    };
    properties: {
      id: string;
      gid: string;
      layer: string;
      source: string;
      name: string;
      country?: string;
      region?: string;
      county?: string;
      locality?: string;
      label: string;
      addendum?: Record<string, unknown>;
    };
  }
  export type PeliasGeometry = 
  {
    type : string , 
    coordinates : [number ,number]
  }