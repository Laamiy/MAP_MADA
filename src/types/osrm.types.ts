
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
export interface OSRMRouteResult {
  route: OSRMRoute | null;
  loading: boolean;
  error: string | null;
  startPoint: OSRMCoordinate | null;
  endPoint: OSRMCoordinate | null;
  routingOn: boolean; // Changed from boolean | null
  
  // Update these two lines:
  handleChangeStart: (point: OSRMCoordinate | null) => void;
  handleChangeEnd: (point: OSRMCoordinate | null) => void;
  
  handleGetRoute: () => void;
  handleClearRoute: () => void;
  handleRouteToggle: () => void;
  handleCloseRouting: () => void;
  handleSwapPoints?: () => void; // Optional: if you want to use the swap feature
  fetchRoute?: (coordinates: OSRMCoordinate[], options?: RouteOptions) => Promise<void>;
  clearRoute?: () => void;
}
export interface RoutingPanelProps 
{
  isActive: boolean|null;
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
