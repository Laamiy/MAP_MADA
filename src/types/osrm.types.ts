
export interface OSRMCoordinate 
{
  lng: number;
  lat: number;
}

export interface OSRMRoute 
{
  geometry: 
  {
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
export interface OSRMResponse 
{
  code: string;
  routes: OSRMRoute[];
  waypoints: Array<{
    location: [number, number];
    name: string;
    distance?: number;
  }>;
}

export interface RouteOptions 
{
  steps?: boolean;
  geometries?: 'geojson' | 'polyline';
  overview?: 'full' | 'simplified' | 'false';
  annotations?: boolean;
}
export interface OSRMRouteResult 
{
  route: OSRMRoute | null;
  loading: boolean;
  error: string | null;
  fetchRoute?: (coordinates: OSRMCoordinate[], options?: RouteOptions) => Promise<void>;
  clearRoute?: () => void;
  handleGetRoute:() => void  ; 
  handleClearRoute:()=> void ; 
  handleRouteToggle:()=>void ; 
  handleCloseRouting:()=>void; 
}
export interface RoutingPanelProps 
{
  isActive: boolean;
  startPoint: OSRMCoordinate | null;
  endPoint: OSRMCoordinate | null;
  route: OSRMRoute | null;
  loading: boolean;
  error: string | null;
  onStartPointChange: (coord: OSRMCoordinate) => void;
  onEndPointChange: (coord: OSRMCoordinate) => void;
  onGetRoute: () => void;
  onClear: () => void;
  onClose: () => void;
}
