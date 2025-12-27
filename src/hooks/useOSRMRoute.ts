
import { useState, useRef, useCallback } from 'react';
import { OSRMService } from '../services/osrm.service';
import type { OSRMCoordinate, OSRMRoute, RouteOptions , OSRMRouteResult , OSRMResponse} from '../types/osrm.types';


export const useOSRMRoute = (baseUrl?: string): OSRMRouteResult => 
  {
    const [route, setRoute]     = useState<OSRMRoute | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState<string | null>(null);
    const serviceRef            = useRef(new OSRMService(baseUrl));

    const fetchRoute = useCallback(
      async (coordinates: OSRMCoordinate[], options?: RouteOptions) => 
      {
        if (coordinates.length < 2) 
        {
          setError('At least 2 coordinates required');
          return;
        }
        setLoading(true);
        setError(null);
        try 
        {
          const data : OSRMResponse = await serviceRef.current.getRoute(coordinates, options);
          setRoute(data.routes[0]);
        } 
        catch (err)
        {
          const message = err instanceof Error ? err.message : 'Failed to fetch route';
          setError(message);
          console.error('[ERROR] : Route fetch error:', err);
        }
        finally
        {
          setLoading(false);
        }
      },
      []
    );
    const clearRoute = useCallback(() => 
    {
      setRoute(null);
      setError(null);
    }, []);

    return { route, loading, error, fetchRoute, clearRoute };
};
