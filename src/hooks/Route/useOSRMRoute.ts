import { useState, useEffect, useRef, useCallback } from 'react';
import { OSRMService } from '@/services/osrm.service';
import type { 
              OSRMCoordinate, 
              OSRMRoute, 
              RouteOptions, 
              OSRMRouteResult, 
              OSRMResponse 
            } from '@/types/osrm.types';

export const useOSRMRoute = (baseUrl?: string): OSRMRouteResult => 
  {
    const [routingOn, setRoutingOn] = useState(false);
    const [startPoint, setStartPoint] = useState<OSRMCoordinate | null>(null);
    const [endPoint, setEndPoint] = useState<OSRMCoordinate | null>(null);
    const [route, setRoute] = useState<OSRMRoute | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const serviceRef = useRef(new OSRMService(baseUrl));

    const fetchRoute = useCallback(
      async (coordinates: OSRMCoordinate[], options?: RouteOptions) => {
          if (coordinates.length < 2) 
          {
            setError('At least 2 coordinates required');
            return;
          }
          setLoading(true);
          setError(null);
          try 
          {
            const data: OSRMResponse = await serviceRef.current.getRoute(coordinates, options);
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

    const clearRoute = useCallback(() => {
                                            setRoute(null);
                                            setError(null);
                                          }, []);

    const clearRoutePoints = useCallback(() => {
                                                  setStartPoint(null);
                                                  setEndPoint(null);
                                                }, []);

    // --- Handlers ---
    const handleChangeStart = useCallback((point: OSRMCoordinate | null) => {
                                                                              setStartPoint(point);
                                                                            }, []);

    const handleChangeEnd = useCallback((point: OSRMCoordinate | null) => {
                                                                            setEndPoint(point);
                                                                          }, []);

    const handleSwapPoints = useCallback(() => {
                                                  setStartPoint(endPoint);
                                                  setEndPoint(startPoint);
                                                }, [startPoint, endPoint]);

    const handleRouteToggle = useCallback(() => {
                                                  if (routingOn) 
                                                  {
                                                    setRoutingOn(false);
                                                    clearRoute();
                                                    clearRoutePoints();
                                                  } 
                                                  else 
                                                  {
                                                    setRoutingOn(true);
                                                  }
                                                }, [routingOn, clearRoute, clearRoutePoints]);

    const handleCloseRouting = useCallback(() => {
                                                    setRoutingOn(false);
                                                    clearRoute();
                                                    clearRoutePoints();
                                                  }, [clearRoute, clearRoutePoints]);

    const handleClearRoute = useCallback(() => {
                                                  clearRoute();
                                                  clearRoutePoints();
                                                }, [clearRoute, clearRoutePoints]);

    const handleGetRoute = useCallback(() => {
                                                if (startPoint && endPoint) 
                                                {
                                                  fetchRoute([startPoint, endPoint], 
                                                    {
                                                      steps: true,
                                                      geometries: 'geojson',
                                                      overview: 'full',
                                                    });
                                                }
                                              }, [startPoint, endPoint, fetchRoute]);

    // Auto-fetch route when points change in routing mode
    useEffect(() => {
                      if (routingOn && startPoint && endPoint) 
                      {
                        handleGetRoute();
                      }
                    }, [routingOn, startPoint, endPoint, handleGetRoute]);

    return {
      route,
      loading,
      error,
      startPoint,
      endPoint,
      routingOn,
      handleGetRoute,
      handleClearRoute,
      handleRouteToggle,
      handleCloseRouting,
      handleChangeStart,
      handleChangeEnd,
      handleSwapPoints 
    };
};