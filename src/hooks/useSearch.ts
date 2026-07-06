import { useEffect, useState, useMemo, useCallback } from 'react';
import { searchPelias, flyToFeature } from '@/utils/search.utils';
import type { GeoFeature } from '@/types/pelias.types';



interface UseSearchParams {
  query: string;
  mapRef?: React.MutableRefObject<maplibregl.Map | null>;
  limit?: number;
  peliasUrl?: string;
  boundaryCountry?: string;
}

export function useSearch({
  query,
  mapRef,
  limit = 10,
  peliasUrl = '/v1/autocomplete',
  boundaryCountry = 'MDG',
}: UseSearchParams) {
  const [features, setFeatures] = useState<GeoFeature[]>([]);
  const [loading, setLoading] = useState(false);

  const debouncedQuery = useMemo(() => query.trim(), [query]);

  useEffect(() => {
    if (!debouncedQuery) {
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
      } catch {
        if (!controller.signal.aborted) {
          setFeatures([]);
        }
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [debouncedQuery, limit, peliasUrl, boundaryCountry]);

  const handleFlyTo = useCallback(
    (index: number) => {
      const feature = features[index];
      const map = mapRef?.current || (window as any).map;
      flyToFeature(map, feature);
    },
    [features, mapRef]
  );

  return { features, loading, handleFlyTo };
}