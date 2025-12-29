import { useEffect, useState, useMemo} from 'react';
import searchClient from '../api/search'; 

export interface GeoFeature {
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
  };
  properties: {
    id: string;
    gid: string;
    layer: string;
    source: string;
    name: string;
    country?: string;
    region?: string;
    county?: string;
    locality?: string;
    label: string;
    addendum?: Record<string, unknown>;
  };
}

interface PeliasResponse {
  type: 'FeatureCollection';
  features: GeoFeature[];
}

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
  // debounce query (500 ms) 
  const debounced = useMemo(() => {
    if (!query.trim()) return '';
    return query.trim();
  }, [query]);

  useEffect(() => {
    if (!debounced) {
      setFeatures([]);
      return;
    }
    const controller = new AbortController();

    async function fetchResults() {
      setLoading(true);
      try {
        const { data } = await searchClient.get<PeliasResponse>(peliasUrl, {
          params: {
            text: debounced,
            size: limit,
            'boundary.country': boundaryCountry,
          },
          signal: controller.signal,
        });
        setFeatures(data.features);
      } catch (e) {
        if (!controller.signal.aborted) setFeatures([]);
      } finally {
        setLoading(false);
      }
    }

    const t = setTimeout(() => fetchResults(), 500);
    return () => {
      clearTimeout(t);
      controller.abort();
    };
  }, [debounced, limit, peliasUrl, boundaryCountry]);

  const handleFlyTo = (index: number) => {
    const feature = features[index];
    if (!feature) 
      return;
    // Look for the map instance in the ref OR on the global window object
    const activeMap = mapRef?.current || (window as any).map;

    if (activeMap) 
      {
        activeMap.flyTo({
          center: [
            feature.geometry.coordinates[0], 
            feature.geometry.coordinates[1]
          ],
          zoom: 18,
          duration: 1500, // Slightly longer for a smoother feel
          essential: true,
      });
    } 
    else 
      {
        console.error("Map instance not found! Make sure (window as any).map = map.current is in useMapLibre");
      }
  };

  return { features, loading ,handleFlyTo};
}