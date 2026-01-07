import type { Coordinates , Place } from "../../types/map.types";
import type { OSRMCoordinate , OSRMRoute } from "../../types/osrm.types";
export interface MapLibreWrapperProps 
{
  center: Coordinates;
  zoom: number;
  selectedPlace: Place | null;
  routingOn?: boolean|null;
  startPoint?: OSRMCoordinate | null;
  endPoint?: OSRMCoordinate | null;
  route?: OSRMRoute | null;
  onZoomChange: (zoom: number) => void;
  onPlaceClose: () => void;
  onMapClick?: (coord: OSRMCoordinate) => void;
  onStartChange?: (c: OSRMCoordinate) => void;
  onEndChange?: (c: OSRMCoordinate) => void;
}