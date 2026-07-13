import { useEffect, useState, useMemo, useCallback } from 'react';
import { searchPelias, flyToFeature } from '@/utils/search.utils';
import type { GeoFeature } from '@/types/pelias.types';



interface UseSearchParams {
  query: string;
  map: maplibregl.Map | null;
  limit?: number;
  peliasUrl?: string;
  boundaryCountry?: string;
}

export function useSearch({
  query,
  map,
  limit = 10,
  peliasUrl = '/v1/autocomplete',
  boundaryCountry = 'MDG',
}: UseSearchParams) 

{
  const [features, setFeatures] = useState<GeoFeature[]>([]);
  const [loading, setLoading] = useState(false);

  const debouncedQuery = useMemo(() => query.trim(), [query]);

  useEffect(() => {
    if (!debouncedQuery) 
    {
      setFeatures([]);
      return;
    }

    const controller = new AbortController();

    const timeoutId = setTimeout(async () => {
                                                setLoading(true);
                                                try {
                                                      const results = await searchPelias(debouncedQuery, {
                                                        limit,
                                                        peliasUrl,
                                                        boundaryCountry,
                                                        signal: controller.signal,
                                                      });
                                                      setFeatures(results);
                                                    } 
                                                catch
                                                {
                                                  if (!controller.signal.aborted) 
                                                    {
                                                        setFeatures([]);
                                                    }
                                                } 
                                                finally 
                                                {
                                                  setLoading(false);
                                                }
                                              }, 500);

    return () => {
                    clearTimeout(timeoutId);
                    controller.abort();
                  };

  }, [debouncedQuery, limit, peliasUrl, boundaryCountry]);

  const handleFlyTo = useCallback( (index: number) => {
                                                        const feature = features[index];
                                                        
                                                        if(!map)
                                                          console.warn('[handleFlyTo] Map reference is not available');
                                                        if(!feature)
                                                          console.warn('[handleFlyTo] Feature is not available');
                                                      
                                                        flyToFeature(map, feature.geometry,20);
                                                        console.log(`actual geometry: ${JSON.stringify(feature.geometry)}`);
                                                      },
                                                      [features, map]
                                                    );

  return { features, loading, handleFlyTo };
}