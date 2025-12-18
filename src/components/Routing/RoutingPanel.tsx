import React from 'react';
import { X } from 'lucide-react';
import { CoordinateInput } from './CoordinateInput/CoordinateInput';
import { RouteInfo } from './RouteInfo/RouteInfo';
import type { OsrmCoordinate, OSRMRoute } from '../../types/osrm.types';
import start from '../../assets/images/rocket.png';
import end from '../../assets/images/end.png';

interface RoutingPanelProps {
  isActive: boolean;
  startPoint: OsrmCoordinate | null;
  endPoint: OsrmCoordinate | null;
  route: OSRMRoute | null;
  loading: boolean;
  error: string | null;
  onStartPointChange: (coord: OsrmCoordinate) => void;
  onEndPointChange: (coord: OsrmCoordinate) => void;
  onGetRoute: () => void;
  onClear: () => void;
  onClose: () => void;
}

export const RoutingPanel: React.FC<RoutingPanelProps> = ({
  isActive,
  startPoint,
  endPoint,
  route,
  loading,
  error,
  onStartPointChange,
  onEndPointChange,
  onGetRoute,
  onClear,
  onClose,
}) => {
  if (!isActive) return null;

  // Provide default coordinates to prevent NaN
  const safeStartPoint: OsrmCoordinate = startPoint || {
    lat: -18.9137,
    lng: 47.5214,
  };
  const safeEndPoint: OsrmCoordinate = endPoint || {
    lat: -18.9088,
    lng: 47.5267,
  };

  return (
    <div className="absolute top-[24vh] right-[1vw] bg-white !rounded-xl shadow-lg w-80 max-h-[calc(100vh-6rem)] overflow-y-auto z-20 !p-6">
      {/* Header */}
      <div className="flex items-center justify-between !mb-2 ">
        <h3 className="text-xl font-bold">Route Planning</h3>
        <button
          onClick={onClose}
          className="hover:bg-blue-200 !p-1 rounded-full transition-colors"
          aria-label="Close"
        >
          <X className="w-7 h-7" />
        </button>
      </div>

      <div className=" !space-y-3">
        {/* Start Point */}
        <CoordinateInput
          label="Start Point"
          coordinate={safeStartPoint}
          onChange={onStartPointChange}
          markerColor="#10b981"
          pathIcon={start}
        />

        {/* End Point */}
        <CoordinateInput
          label="Destination"
          coordinate={safeEndPoint}
          onChange={onEndPointChange}
          markerColor="#ef4444"
          pathIcon={end}
        />

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={onGetRoute}
            disabled={loading || !startPoint || !endPoint}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-2.5 px-4 rounded-lg transition-colors"
          >
            {loading ? 'Loading...' : 'Get Route'}
          </button>
          <button
            onClick={onClear}
            disabled={loading}
            className="!px-4 !py-2.5 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700 font-semibold rounded-lg transition-colors"
          >
            Clear
          </button>
        </div>

        {/* Route Info */}
        {route && (
          <RouteInfo distance={route.distance} duration={route.duration} />
        )}

        {/* Error Display */}
        {error && (
          <div className="!p-1 bg-red-50 border  border-red-200 rounded-lg">
            <p className=" text-sm text-red-700">
              <strong className="!mr-2">Error:</strong> {error}
            </p>
          </div>
        )}

        {/* Helper Text */}
        <div className="p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
          Click on the map to set points or enter coordinates manually
        </div>
      </div>
    </div>
  );
};

//fjleioizhegzq
