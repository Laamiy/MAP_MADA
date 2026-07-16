import searchClient from '@/api/search';
import type { GeoFeature, PeliasGeometry } from '@/types/pelias.types';

interface PeliasResponse {
  type: 'FeatureCollection';
  features: GeoFeature[];
}

export async function searchPelias(query: string, options: {
                                                              limit?: number;
                                                              peliasUrl?: string;
                                                              boundaryCountry?: string;
                                                              signal?: AbortSignal;
                                                            } 
): Promise<GeoFeature[]> {
  const { limit = 10, peliasUrl = '/v1/autocomplete', boundaryCountry = 'MDG', signal } = options;

  if (!query) return [];

  const { data } = await searchClient.get<PeliasResponse>(peliasUrl, {
                                                                        params: {
                                                                                  text: query,
                                                                                  size: limit,
                                                                                  'boundary.country': boundaryCountry,
                                                                                },
                                                                        signal,
                                                                              });
  return data.features;
}

export function flyToFeature( map: maplibregl.Map | null | undefined, peliasGeometry : PeliasGeometry,zoom?: number): void 
{
  if (!map || !peliasGeometry) 
  {
    console.warn('[flyToFeature] Missing map or feature');
    return;
  }

  map.flyTo({
              center: peliasGeometry.coordinates as [number, number],
              zoom: zoom || 17,
              duration: 1500,
              essential: true,
             }
            );
}