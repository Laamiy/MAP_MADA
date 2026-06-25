import type { OSRMCoordinate, OSRMResponse, RouteOptions } from '../types/osrm.types';
import axios from 'axios'
const LOCAL_IP = import.meta.env.VITE_LOCAL_IP;
const PORT = import.meta.env.VITE_ORSM_PORT ; 

export class OSRMService 
{
  private baseUrl: string;

  constructor(baseUrl: string = `${LOCAL_IP}:${PORT}`) 
  {
    this.baseUrl = baseUrl.trim();
  }
  async getRoute(coordinates: OSRMCoordinate[], options: RouteOptions = {}): Promise<OSRMResponse> 
  {
    const {
                      steps = true,
                      geometries = 'geojson',
                      overview = 'full',
                      annotations = false,
          } = options;

    const coords = coordinates
                              .map((coord) => `${coord.lng},${coord.lat}`)
                              .join(';');

    const params = new URLSearchParams({
                                          steps: steps.toString(),
                                          geometries,
                                          overview,
                                          annotations: annotations.toString(),
                                        });

    const url = `${this.baseUrl}/route/v1/driving/${coords}?${params}`;
    const {data} = await axios.get<OSRMResponse>(url);

    
    if (data.code !== 'Ok') 
    {
      throw new Error(`[ERROR] : OSRM routing failed: ${data.code}`);
    }
    
    // if (!response.ok) {
    //   throw new Error(`[ERROR] : OSRM API error: ${response.statusText}`);
    // }

    // const data: OSRMResponse = await response.json();

    // if (data.code !== 'Ok') {
    //   throw new Error(`[ERROR] : OSRM routing failed: ${data.code}`);
    // }

    return data;
  }

  //   Get nearest road point to a coordinate
  async nearest(coordinate: OSRMCoordinate): Promise<JSON> 
  {
    const url       = `${this.baseUrl}/nearest/v1/driving/${coordinate.lng},${coordinate.lat}`;
    const response  = await fetch(url);

    if (!response.ok) 
    {
      throw new Error(`OSRM API error: ${response.statusText}`);
    }

    return response.json();
  }
}
