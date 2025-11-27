import type { OsrmCoordinate, OSRMResponse, RouteOptions } from '../types/osrm.types';

export class OSRMService {
  private baseUrl: string;

  constructor(baseUrl: string = 'http://127.0.0.1:5000') {
    this.baseUrl = baseUrl.trim();
  }

//   Get route between two or more points
  async getRoute(coordinates: OsrmCoordinate[], options: RouteOptions = {}): Promise<OSRMResponse> {
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

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`OSRM API error: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.code !== 'Ok') {
      throw new Error(`OSRM routing failed: ${data.code}`);
    }

    return data;
  }

//   Get nearest road point to a coordinate
  async nearest(coordinate: OsrmCoordinate): Promise<JSON> {
    const url = `${this.baseUrl}/nearest/v1/driving/${coordinate.lng},${coordinate.lat}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`OSRM API error: ${response.statusText}`); 
    }

    return response.json();
  }
}
