import searchClient from '@/api/search';
import type { GeoFeature } from '@/types/pelias.types';

interface PeliasResponse {
  type: 'FeatureCollection';
  features: GeoFeature[];
}

export async function searchPelias(
  query: string,
  options: {
    limit?: number;
    peliasUrl?: string;
    boundaryCountry?: string;
    signal?: AbortSignal;
  } = {}
): Promise<GeoFeature[]> {
  const { limit = 10, peliasUrl = '/v1/autocomplete', boundaryCountry = 'MDG', signal } = options;

  const trimmed = query.trim();
  if (!trimmed) return [];

  const { data } = await searchClient.get<PeliasResponse>(peliasUrl, {
    params: {
      text: trimmed,
      size: limit,
      'boundary.country': boundaryCountry,
    },
    signal,
  });

  return data.features;
}

export function flyToFeature(
  map: maplibregl.Map | null | undefined,
  feature: GeoFeature,
  zoom?: number
): void {
  if (!map || !feature) {
    console.warn('[flyToFeature] Missing map or feature');
    return;
  }

  map.flyTo({
    center: feature.geometry.coordinates as [number, number],
    zoom,
    duration: 1500,
    essential: true,
  });
}