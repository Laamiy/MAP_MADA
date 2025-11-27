
export interface OsrmCoordinate {
  lng: number;
  lat: number;
}

export interface OSRMRoute {
  geometry: {
    coordinates: [number, number][];
    type: 'LineString';
  };
  distance: number;
  duration: number;
  legs: Array<{
    steps: Array<{
      name: string;
      distance: number;
      duration: number;
      maneuver?: {
        type: string;
        modifier?: string;
        location: [number, number];
      };
    }>;
  }>;
}

export interface OSRMResponse {
  code: string;
  routes: OSRMRoute[];
  waypoints: Array<{
    location: [number, number];
    name: string;
    distance?: number;
  }>;
}

export interface RouteOptions {
  steps?: boolean;
  geometries?: 'geojson' | 'polyline';
  overview?: 'full' | 'simplified' | 'false';
  annotations?: boolean;
}
