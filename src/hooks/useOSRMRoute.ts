
import { useState, useRef, useCallback } from 'react';
import { OSRMService } from '../services/osrm.service';
import type { OsrmCoordinate, OSRMRoute, RouteOptions } from '../types/osrm.types';

export interface UseOSRMRouteResult {
  route: OSRMRoute | null;
  loading: boolean;
  error: string | null;
  fetchRoute: (coordinates: OsrmCoordinate[], options?: RouteOptions) => Promise<void>;
  clearRoute: () => void;
}

export const useOSRMRoute = (baseUrl?: string): UseOSRMRouteResult => {
  const [route, setRoute] = useState<OSRMRoute | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const serviceRef = useRef(new OSRMService(baseUrl));

  const fetchRoute = useCallback(
    async (coordinates: OsrmCoordinate[], options?: RouteOptions) => {
      if (coordinates.length < 2) {
        setError('At least 2 coordinates required');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await serviceRef.current.getRoute(coordinates, options);
        setRoute(data.routes[0]); // L : Get the most appropriate route.
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch route';
        setError(message);
        console.error('Route fetch error:', err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const clearRoute = useCallback(() => {
    setRoute(null);
    setError(null);
  }, []);

  return { route, loading, error, fetchRoute, clearRoute };
};
