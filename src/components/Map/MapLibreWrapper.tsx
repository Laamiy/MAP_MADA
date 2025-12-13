import React, { useEffect, useRef, useState } from 'react';
import maplibregl, { type StyleSpecification } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MapControls } from './MapControls';
import { PlaceCard } from './PlaceCard';
import type { Coordinates, Place } from '../../types/map.types';
import type { OsrmCoordinate, OSRMRoute } from '../../types/osrm.types';
import { MAP_CONFIG } from '../../config/map.config';
import { layoutStyles } from '../../styles';
import mapStyle from '../../constants/maps.style';
import axios from 'axios';
import Editor from './Editor';
import './Editor.css';

function createMarkerElement(label: 'A' | 'B', color: string): HTMLElement {
  const el = document.createElement('div');
  el.style.cssText = `
    width:32px;height:32px;border-radius:50%;
    background:${color};border:3px solid white;
    box-shadow:0 2px 4px rgba(0,0,0,.3);
    display:flex;align-items:center;justify-content:center;
    color:white;font-weight:bold;font-size:16px;
  `;
  el.textContent = label;
  return el;
}

interface MapLibreWrapperProps {
  center: Coordinates;
  zoom: number;
  selectedPlace: Place | null;
  routingMode?: boolean;
  startPoint?: OsrmCoordinate | null;
  endPoint?: OsrmCoordinate | null;
  route?: OSRMRoute | null;
  onZoomChange: (zoom: number) => void;
  onPlaceClose: () => void;
  onMapClick?: (coord: OsrmCoordinate) => void;
  onStartChange?: (c: OsrmCoordinate) => void;
  onEndChange?: (c: OsrmCoordinate) => void;
}

export const MapLibreWrapper: React.FC<MapLibreWrapperProps> = ({
  center,
  zoom,
  selectedPlace,
  routingMode = false,
  startPoint = null,
  endPoint = null,
  route = null,
  onZoomChange,
  onPlaceClose,
  onMapClick,
  onStartChange,
  onEndChange,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [mapStatus, setMapStatus] = useState<string>('Initializing...');
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const editorEnabled = window.location.search.includes('editor=1');
  const [selPoi, setSelPoi] = useState<any>(null);

  useEffect(() => {
    if (!mapContainer.current) {
      setMapStatus('Container not found');
      return;
    }
    if (map.current) {
      setMapStatus('Map already initialized');
      return;
    }
    setMapStatus('Creating map instance...');
    try {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: mapStyle as StyleSpecification,
        center: [center.lng, center.lat],
        zoom,
        minZoom: MAP_CONFIG.minZoom,
        maxZoom: MAP_CONFIG.maxZoom,
      });

      map.current.on('load', () => {
        setMapStatus('Map loaded');
        attachEditorInteractions();
      });

      map.current.on('error', (e) => {
        console.error('Map error:', e);
        setMapStatus(`Error: ${e.error?.message || 'Unknown error'}`);
      });

      map.current.on('zoom', () => {
        if (map.current) onZoomChange(Math.round(map.current.getZoom()));
      });

      map.current.on('click', (e) => {
        if (routingMode && onMapClick) {
          onMapClick({ lng: e.lngLat.lng, lat: e.lngLat.lat });
        }
      });

      setMapStatus('Map created, waiting for load...');
    } catch (error) {
      console.error('Error creating map:', error);
      setMapStatus(`Init error: ${error}`);
    }
    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      map.current?.remove();
      map.current = null;
    };
  }, []);

  const attachEditorInteractions = () => {
    if (!map.current) return;
    const mapInstance = map.current;
    const poiIds = mapInstance
      .getStyle()
      .layers.filter(
        (
          l
        ): l is
          | maplibregl.SymbolLayerSpecification
          | maplibregl.LineLayerSpecification
          | maplibregl.FillLayerSpecification =>
          'source' in l && l.source === 'pois'
      )
      .map((l) => l.id);
    poiIds.forEach((id) => {
      mapInstance.on('click', id, async (e: any) => {
        if (!e.features?.length) return;
        const { osm_id, version, tags } = e.features[0].properties;
        if (!editorEnabled) return;

        try {
          const { data } = await axios.get(
            `${import.meta.env.VITE_EDITOR_API}/api/poi/${osm_id}`
          );
          setSelPoi(data);
        } catch (err) {
          console.error('Fetch POI failed:', err);
        }
      });
    });
    mapInstance.on('click', (e: any) => {
      if (!e.originalEvent.shiftKey) return;
      if (!editorEnabled) return;
      setSelPoi({
        id: 0,
        lng: e.lngLat.lng,
        lat: e.lngLat.lat,
        tags: {},
        version: 0,
      });
    });
  };

  useEffect(() => {
    if (map.current) map.current.setCenter([center.lng, center.lat]);
  }, [center.lng, center.lat]);

  useEffect(() => {
    if (map.current && Math.abs(map.current.getZoom() - zoom) > 0.1) {
      map.current.setZoom(zoom);
    }
  }, [zoom]);

  useEffect(() => {
    if (!map.current || !routingMode) return;
    const mapInstance = map.current;
    if (mapInstance.getLayer('route')) mapInstance.removeLayer('route');
    if (mapInstance.getLayer('route-casing'))
      mapInstance.removeLayer('route-casing');
    if (mapInstance.getSource('route')) mapInstance.removeSource('route');
    if (route) {
      mapInstance.addSource('route', {
        type: 'geojson',
        data: { type: 'Feature', properties: {}, geometry: route.geometry },
      });
      mapInstance.addLayer({
        id: 'route-casing',
        type: 'line',
        source: 'route',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': '#1e40af',
          'line-width': 8,
          'line-opacity': 0.6,
        },
      });
      mapInstance.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: { 'line-color': '#3b82f6', 'line-width': 5 },
      });
      const coordinates = route.geometry.coordinates;
      const bounds = coordinates.reduce(
        (b, c) => b.extend([c[0], c[1]]),
        new maplibregl.LngLatBounds(
          coordinates[0] as [number, number],
          coordinates[0] as [number, number]
        )
      );
      mapInstance.fitBounds(bounds, { padding: 80, duration: 1000 });
    }
    return () => {
      if (mapInstance.getLayer('route')) mapInstance.removeLayer('route');
      if (mapInstance.getLayer('route-casing'))
        mapInstance.removeLayer('route-casing');
      if (mapInstance.getSource('route')) mapInstance.removeSource('route');
    };
  }, [route, routingMode]);

  useEffect(() => {
    if (!map.current || !routingMode) return;
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];
    const addMarker = (
      point: OsrmCoordinate | null,
      label: 'A' | 'B',
      color: string,
      title: string,
      onMove: ((c: OsrmCoordinate) => void) | undefined
    ) => {
      if (!point || Number.isNaN(point.lat) || Number.isNaN(point.lng)) return;
      const marker = new maplibregl.Marker({
        element: createMarkerElement(label, color),
        draggable: true,
      })
        .setLngLat([point.lng, point.lat])
        .setPopup(
          new maplibregl.Popup({ offset: 25 }).setHTML(
            `<strong>${title}</strong>`
          )
        )
        .addTo(map.current!);
      marker.on('dragend', () => {
        const { lng, lat } = marker.getLngLat();
        onMove?.({ lng, lat });
      });
      markersRef.current.push(marker);
    };
    addMarker(startPoint, 'A', '#10b981', 'Start Point', onStartChange);
    addMarker(endPoint, 'B', '#ef4444', 'End Point', onEndChange);
  }, [startPoint, endPoint, routingMode, onStartChange, onEndChange]);

  useEffect(() => {
    if (!editorEnabled) setSelPoi(null); // hide form
  }, [editorEnabled]);

  const bustTiles = () => {
    if (!map.current) return;
    const src = map.current.getSource('poi') as maplibregl.VectorTileSource;
    src.tiles = src.tiles.map((t: string) =>
      t.replace(/\?.*|$/, '?v=' + Date.now())
    );
    map.current.style.sourceCaches.poi?.clearTiles();
    map.current.triggerRepaint();
  };

  const handleZoomIn = () => map.current?.zoomIn();
  const handleZoomOut = () => map.current?.zoomOut();
  const handleLayersClick = () => console.log('Layers clicked');
  const handleNavigationClick = () => {
    if (map.current)
      map.current.flyTo({
        center: [center.lng, center.lat],
        zoom,
        duration: 1000,
      });
  };

  return (
    <main className={layoutStyles.mapContainer}>
      <div className="absolute top-20 left-4 bg-white p-4 rounded-lg shadow-lg z-50 max-w-xs ">
        <h3 className="font-bold text-sm mb-2">Map Debug Info:</h3>
        <p className="text-xs mb-1">Status: {mapStatus}</p>
        <p className="text-xs mb-1">IP: {MAP_CONFIG.baseUrl}</p>
        <p className="text-xs mb-1">
          Center: {center.lat.toFixed(4)}, {center.lng.toFixed(4)}
        </p>
        <p className="text-xs mb-1">Zoom: {zoom}</p>
        <p className="text-xs mb-1">
          Routing: {routingMode ? 'Active' : 'Inactive'}
        </p>
        <p className="text-xs mb-1">
          Start:{' '}
          {startPoint
            ? `${startPoint.lat.toFixed(4)}, ${startPoint.lng.toFixed(4)}`
            : 'None'}
        </p>
        <p className="text-xs mb-1">
          End:{' '}
          {endPoint
            ? `${endPoint.lat.toFixed(4)}, ${endPoint.lng.toFixed(4)}`
            : 'None'}
        </p>
        <p className="text-xs">
          Route: {route ? `${(route.distance / 1000).toFixed(2)} km` : 'None'}
        </p>
      </div>
      <div
        ref={mapContainer}
        className="absolute inset-0 w-full h-full bg-gray-200"
        style={{ minHeight: '100%', minWidth: '100%' }}
      />
      <MapControls
        zoom={zoom}
        minZoom={MAP_CONFIG.minZoom}
        maxZoom={MAP_CONFIG.maxZoom}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onLayersClick={handleLayersClick}
        onNavigationClick={handleNavigationClick}
      />
      {selectedPlace && !routingMode && (
        <PlaceCard place={selectedPlace} onClose={onPlaceClose} />
      )}
      {editorEnabled && selPoi && (
        <Editor
          poi={selPoi}
          onClose={() => setSelPoi(null)}
          onDone={() => {
            setSelPoi(null);
            bustTiles();
          }}
        />
      )}
    </main>
  );
};
