
import React, { useRef, useEffect, useState } from 'react';
import { RouteMap } from '../RouteMap/RouteMap';
import type { RouteMapRef } from '../RouteMap/RouteMap';
import { RouteInfo } from '../RouteInfo/RouteInfo';
import { CoordinateInput } from '../CoordinateInput/CoordinateInput';
import { useOSRMRoute } from '../../../hooks/useOSRMRoute';
import type { OsrmCoordinate } from '../../../types/osrm.types';

export const RouteViewer: React.FC = () => {
  const mapRef = useRef<RouteMapRef>(null);
  const { route, loading, error, fetchRoute, clearRoute } = useOSRMRoute();

  const [startPoint, setStartPoint] = useState<OsrmCoordinate>({
    lng: 47.5214,
    lat: -18.9137,
  });

  const [endPoint, setEndPoint] = useState<OsrmCoordinate>({
    lng: 47.5267,
    lat: -18.9088,
  });

  useEffect(() => {
    if (route && mapRef.current) {
      mapRef.current.removeMarkers();
      mapRef.current.addRoute(route);

      mapRef.current.addMarker(startPoint, {
        color: '#10b981',
        label: 'A',
        popup: '<strong>Start Point</strong>',
      });

      mapRef.current.addMarker(endPoint, {
        color: '#ef4444',
        label: 'B',
        popup: '<strong>End Point</strong>',
      });

      mapRef.current.fitBounds([startPoint, endPoint], 80);
    }
  }, [route, startPoint, endPoint]);

  const handleGetRoute = async () => {
    await fetchRoute([startPoint, endPoint], {
      steps: true,
      geometries: 'geojson',
      overview: 'full',
    });
  };

  const handleClear = () => {
    clearRoute();
    mapRef.current?.removeRoute();
    mapRef.current?.removeMarkers();
  };

  return (
    <div className="relative w-full h-screen">
      <RouteMap ref={mapRef} center={startPoint} zoom={13} />

      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-sm max-h-[calc(100vh-2rem)] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          OSRM Route Planner
        </h2>

        <div className="space-y-4 mb-4">
          <CoordinateInput
            label="Start Point"
            coordinate={startPoint}
            onChange={setStartPoint}
            markerColor="#10b981"
          />

          <CoordinateInput
            label="End Point"
            coordinate={endPoint}
            onChange={setEndPoint}
            markerColor="#ef4444"
          />
        </div>

        <div className="flex gap-2 mb-4">
          <button
            onClick={handleGetRoute}
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            {loading ? 'Loading...' : 'Get Route'}
          </button>

          <button
            onClick={handleClear}
            disabled={loading || !route}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-700 font-semibold rounded-lg transition-colors duration-200"
          >
            Clear
          </button>
        </div>

        {route && <RouteInfo distance={route.distance} duration={route.duration} />}

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">
              <strong>Error:</strong> {error}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
