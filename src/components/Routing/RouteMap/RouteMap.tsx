import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { OsrmCoordinate, OSRMRoute } from '../../../types/osrm.types';

export interface RouteMapProps {
  center?: OsrmCoordinate;
  zoom?: number;
  className?: string;
  onMapLoad?: (map: maplibregl.Map) => void;
}

export interface RouteMapRef {
  getMap: () => maplibregl.Map | null;
  addRoute: (route: OSRMRoute) => void;
  removeRoute: () => void;
  addMarker: (coordinate: OsrmCoordinate, options?: MarkerOptions) => maplibregl.Marker;
  removeMarkers: () => void;
  fitBounds: (coordinates: OsrmCoordinate[], padding?: number) => void;
}

export interface MarkerOptions {
  color?: string;
  label?: string;
  popup?: string;
}

export const RouteMap = forwardRef<RouteMapRef, RouteMapProps>(
  ({ center, zoom = 13, className = '', onMapLoad }, ref) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<maplibregl.Map | null>(null);
    const markers = useRef<maplibregl.Marker[]>([]);

    // Initialize map
    useEffect(() => {
      if (!mapContainer.current || map.current) return;

      const defaultCenter = center || { lng: 47.5214, lat: -18.9137 };

      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: {
          version: 8,
          sources: {
            'osm-tiles': {
              type: 'raster',
              tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
              tileSize: 256,
              attribution: '© OpenStreetMap contributors',
            },
          },
          layers: [
            {
              id: 'osm-tiles',
              type: 'raster',
              source: 'osm-tiles',
              minzoom: 0,
              maxzoom: 19,
            },
          ],
        },
        center: [defaultCenter.lng, defaultCenter.lat],
        zoom,
      });

      map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

      map.current.on('load', () => {
        if (onMapLoad && map.current) {
          onMapLoad(map.current);
        }
      });

      return () => {
        map.current?.remove();
        map.current = null;
      };
    }, []);

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      getMap: () => map.current,

      addRoute: (route: OSRMRoute) => {
        if (!map.current) return;

        const mapInstance = map.current;

        // Remove existing route
        if (mapInstance.getLayer('route')) {
          mapInstance.removeLayer('route');
        }
        if (mapInstance.getLayer('route-casing')) {
          mapInstance.removeLayer('route-casing');
        }
        if (mapInstance.getSource('route')) {
          mapInstance.removeSource('route');
        }

        // Add route source
        mapInstance.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: route.geometry,
          },
        });

        // Add route casing (outline)
        mapInstance.addLayer({
          id: 'route-casing',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#1e40af',
            'line-width': 8,
            'line-opacity': 0.6,
          },
        });

        // Add route line
        mapInstance.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#3b82f6',
            'line-width': 5,
          },
        });
      },

      removeRoute: () => {
        if (!map.current) return;

        if (map.current.getLayer('route')) {
          map.current.removeLayer('route');
        }
        if (map.current.getLayer('route-casing')) {
          map.current.removeLayer('route-casing');
        }
        if (map.current.getSource('route')) {
          map.current.removeSource('route');
        }
      },

      addMarker: (coordinate: OsrmCoordinate, options: MarkerOptions = {}) => {
        if (!map.current) return null as any;

        const { color = '#3b82f6', label, popup } = options;

        const el = document.createElement('div');
        el.className = 'custom-marker';
        el.style.cssText = `
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: ${color};
          border: 3px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 14px;
        `;

        if (label) {
          el.textContent = label;
        }

        const marker = new maplibregl.Marker({ element: el })
          .setLngLat([coordinate.lng, coordinate.lat])
          .addTo(map.current);

        if (popup) {
          marker.setPopup(
            new maplibregl.Popup({ offset: 25 }).setHTML(popup)
          );
        }

        markers.current.push(marker);
        return marker;
      },

      removeMarkers: () => {
        markers.current.forEach((marker) => marker.remove());
        markers.current = [];
      },

      fitBounds: (coordinates: OsrmCoordinate[], padding = 50) => {
        if (!map.current || coordinates.length === 0) return;

        const bounds = coordinates.reduce(
          (bounds, coord) => bounds.extend([coord.lng, coord.lat]),
          new maplibregl.LngLatBounds(
            [coordinates[0].lng, coordinates[0].lat],
            [coordinates[0].lng, coordinates[0].lat]
          )
        );

        map.current.fitBounds(bounds, {
          padding,
          duration: 1000,
        });
      },
    }));

    return <div ref={mapContainer} className={`w-full h-full ${className}`} />;
  }
);

RouteMap.displayName = 'RouteMap';
