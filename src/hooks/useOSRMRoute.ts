
import { useState,useEffect, useRef, useCallback } from 'react';
import { OSRMService } from '../services/osrm.service';
import type { OSRMCoordinate, OSRMRoute, RouteOptions , OSRMRouteResult , OSRMResponse} from '../types/osrm.types';

interface Routehookparams 
{
  startPoint : OSRMCoordinate | null
  endPoint : OSRMCoordinate | null
  routingMode  :boolean  | null
  clearRoutePoints  : () => void
  disableRoutingMode  : () => void 
  enableRoutingMode  : ()=>void
}
export const useOSRMRoute = ({startPoint , endPoint , routingMode , clearRoutePoints , enableRoutingMode , disableRoutingMode} : Routehookparams, baseUrl?: string ):
 OSRMRouteResult => 
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
    // ---------------------------------- not sure ------------------------------------ 
      useEffect(() => {
        if (startPoint && endPoint && routingMode) {
          fetchRoute([startPoint, endPoint], {
            steps: true,
            geometries: 'geojson',
            overview: 'full',
          });
        }
      }, [startPoint, endPoint, routingMode, fetchRoute]);
    
      const handleGetRoute = () => 
        {
          if (startPoint && endPoint)
             {
              fetchRoute([startPoint, endPoint], 
                {
                  steps: true,
                  geometries: 'geojson',
                  overview: 'full',
                 }
                );
              }
      };
      const handleClearRoute = () => {
        clearRoute();
        clearRoutePoints();
      };
    
      const handleCloseRouting = () => {
        disableRoutingMode();
        clearRoute();
        clearRoutePoints();
      };
    
      const handleRouteToggle = () => {
        if (routingMode) {
          handleCloseRouting();
        } else {
          enableRoutingMode();
        }
      };
    //--------------------------------------------------------------------------------
    return { route, loading, error, handleGetRoute , handleClearRoute,handleRouteToggle , handleCloseRouting};
};
