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
  const [debugMode, setDebugMode] = useState(false);

  // Initialize map
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
        
        // Debug: log available sources and layers
        if (map.current) {
          const style = map.current.getStyle();
          console.log('=== MAP LOADED ===');
          console.log('Sources:', Object.keys(style.sources));
          console.log('Layers:', style.layers.map(l => l.id));
        }
        
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

  // Attach editor interactions
  const attachEditorInteractions = () => {
    if (!map.current) return;
    const mapInstance = map.current;
    
    const style = mapInstance.getStyle();
    
    // Try to find POI source
    const possibleSourceNames = ['pois', 'poi', 'points', 'osm_points', 'planet_osm_point'];
    let poiSourceName: string | null = null;
    
    for (const name of possibleSourceNames) {
      if (style.sources[name]) {
        poiSourceName = name;
        console.log('✅ Found POI source:', name);
        break;
      }
    }
    
    if (!poiSourceName) {
      console.warn('⚠️ POI source not found. Available sources:', Object.keys(style.sources));
      const vectorSources = Object.entries(style.sources)
        .filter(([_, source]: [string, any]) => source.type === 'vector')
        .map(([name]) => name);
      
      if (vectorSources.length > 0) {
        poiSourceName = vectorSources[0];
        console.log('Using fallback source:', poiSourceName);
      }
    }
    
    // Find POI layers
    const poiLayers = poiSourceName 
      ? style.layers
          .filter((l): l is any => 'source' in l && l.source === poiSourceName)
          .map(l => l.id)
      : [];

    console.log('POI layers found:', poiLayers);

    if (poiLayers.length === 0) {
      console.warn('⚠️ No POI layers found, using generic click handler');
      
      // Fallback: handle all clicks
      mapInstance.on('click', async (e: any) => {
        if (!editorEnabled) return;
        
        const features = mapInstance.queryRenderedFeatures(e.point);
        const poiFeature = features.find(f => 
          f.properties && (
            f.properties.osm_id || 
            f.properties.amenity ||
            f.properties.shop
          )
        );
        
        if (poiFeature && !e.originalEvent.shiftKey) {
          await handlePoiClick(poiFeature, e.lngLat);
        } else if (e.originalEvent.shiftKey) {
          handleNewPoi(e.lngLat);
        }
      });
      
      return;
    }

    // Attach to specific POI layers
    poiLayers.forEach(layerId => {
      mapInstance.on('click', layerId, async (e: any) => {
        if (!e.features?.length || !editorEnabled) return;
        await handlePoiClick(e.features[0], e.lngLat);
      });
      
      if (editorEnabled) {
        mapInstance.on('mouseenter', layerId, () => {
          mapInstance.getCanvas().style.cursor = 'pointer';
        });
        mapInstance.on('mouseleave', layerId, () => {
          mapInstance.getCanvas().style.cursor = '';
        });
      }
    });

    // Shift+click for new POI
    mapInstance.on('click', (e: any) => {
      if (e.originalEvent.shiftKey && editorEnabled) {
        handleNewPoi(e.lngLat);
      }
    });
  };

  const handlePoiClick = async (feature: any, lngLat: any) => {
    const props = feature.properties;
    console.log('POI clicked:', props);

    const osm_id = props.osm_id || props.id || props.osmId;
    
    if (!osm_id) {
      console.error('❌ No ID in feature:', props);
      alert(`No ID found. Properties: ${Object.keys(props).join(', ')}`);
      return;
    }

    let parsedTags: any = {};
    
    if (props.tags) {
      if (typeof props.tags === 'string') {
        try {
          parsedTags = JSON.parse(props.tags);
        } catch (err) {
          console.error('Failed to parse tags');
        }
      } else {
        parsedTags = props.tags;
      }
    }

    if (Object.keys(parsedTags).length === 0) {
      ['name', 'amenity', 'shop', 'tourism', 'man_made', 'leisure', 'natural'].forEach(key => {
        if (props[key]) parsedTags[key] = String(props[key]);
      });
    }

    try {
      const API_BASE = import.meta.env.VITE_EDITOR_API || 'http://localhost:4004';
      const { data } = await axios.get(`${API_BASE}/api/poi/${osm_id}`);
      
      setSelPoi({
        id: Number(osm_id),
        version: data.version,
        lng: data.lng,
        lat: data.lat,
        tags: data.tags
      });
    } catch (err) {
      console.warn('Using feature properties:', err);
      setSelPoi({
        id: Number(osm_id),
        version: props.version || 1,
        lng: lngLat.lng,
        lat: lngLat.lat,
        tags: parsedTags
      });
    }
  };

  const handleNewPoi = (lngLat: any) => {
    console.log('Creating new POI at:', lngLat);
    setSelPoi({ 
      id: 0, 
      lng: lngLat.lng, 
      lat: lngLat.lat, 
      tags: {}, 
      version: 0 
    });
  };

  const bustTiles = () => {
    if (!map.current) return;
    
    try {
      const style = map.current.getStyle();
      Object.keys(style.sources).forEach(sourceName => {
        const src = map.current!.getSource(sourceName) as any;
        if (src?.tiles) {
          src.tiles = src.tiles.map((t: string) => 
            `${t.split('?')[0]}?v=${Date.now()}`
          );
          const cache = (map.current as any).style?.sourceCaches?.[sourceName];
          cache?.clearTiles();
        }
      });
      map.current.triggerRepaint();
      console.log('✅ Tiles refreshed');
    } catch (err) {
      console.error('Tile bust error:', err);
    }
  };

  // Update center
  useEffect(() => {
    if (map.current) map.current.setCenter([center.lng, center.lat]);
  }, [center.lng, center.lat]);

  // Update zoom
  useEffect(() => {
    if (map.current && Math.abs(map.current.getZoom() - zoom) > 0.1) {
      map.current.setZoom(zoom);
    }
  }, [zoom]);

  // Handle route display
  useEffect(() => {
    if (!map.current || !routingMode) return;
    const mapInstance = map.current;
    
    if (mapInstance.getLayer('route')) mapInstance.removeLayer('route');
    if (mapInstance.getLayer('route-casing')) mapInstance.removeLayer('route-casing');
    if (mapInstance.getSource('route')) mapInstance.removeSource('route');
    
    if (route) {
      mapInstance.addSource('route', { 
        type: 'geojson', 
        data: { type: 'Feature', properties: {}, geometry: route.geometry } 
      });
      mapInstance.addLayer({ 
        id: 'route-casing', 
        type: 'line', 
        source: 'route', 
        layout: { 'line-join': 'round', 'line-cap': 'round' }, 
        paint: { 'line-color': '#1e40af', 'line-width': 8, 'line-opacity': 0.6 } 
      });
      mapInstance.addLayer({ 
        id: 'route', 
        type: 'line', 
        source: 'route', 
        layout: { 'line-join': 'round', 'line-cap': 'round' }, 
        paint: { 'line-color': '#3b82f6', 'line-width': 5 } 
      });
      
      const coordinates = route.geometry.coordinates;
      const bounds = coordinates.reduce(
        (b, c) => b.extend([c[0], c[1]]), 
        new maplibregl.LngLatBounds(coordinates[0] as [number, number], coordinates[0] as [number, number])
      );
      mapInstance.fitBounds(bounds, { padding: 80, duration: 1000 });
    }
    
    return () => {
      if (mapInstance.getLayer('route')) mapInstance.removeLayer('route');
      if (mapInstance.getLayer('route-casing')) mapInstance.removeLayer('route-casing');
      if (mapInstance.getSource('route')) mapInstance.removeSource('route');
    };
  }, [route, routingMode]);

  // Handle routing markers
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
        draggable: true 
      })
        .setLngLat([point.lng, point.lat])
        .setPopup(new maplibregl.Popup({ offset: 25 }).setHTML(`<strong>${title}</strong>`))
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
    if (!editorEnabled) setSelPoi(null);
  }, [editorEnabled]);

  const handleZoomIn = () => map.current?.zoomIn();
  const handleZoomOut = () => map.current?.zoomOut();
  const handleLayersClick = () => console.log('Layers clicked');
  const handleNavigationClick = () => {
    if (map.current) {
      map.current.flyTo({ center: [center.lng, center.lat], zoom, duration: 1000 });
    }
  };

  return (
    <main className={layoutStyles.mapContainer}>
      {/* Debug info */}
      {debugMode && (
        <div className="absolute top-20 left-4 bg-white p-4 rounded-lg shadow-lg z-50 max-w-xs">
          <h3 className="font-bold text-sm mb-2">Map Debug Info:</h3>
          <p className="text-xs mb-1">Status: {mapStatus}</p>
          <p className="text-xs mb-1">Editor: {editorEnabled ? '✅' : '❌'}</p>
          <p className="text-xs mb-1">Center: {center.lat.toFixed(4)}, {center.lng.toFixed(4)}</p>
          <p className="text-xs mb-1">Zoom: {zoom}</p>
        </div>
      )}

      {/* Toggle debug button */}
      <button
        onClick={() => setDebugMode(!debugMode)}
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          zIndex: 1000,
          background: 'white',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '5px 10px',
          cursor: 'pointer',
          fontSize: '12px'
        }}
      >
        🐛 {debugMode ? 'Hide' : 'Show'} Debug
      </button>

      <div ref={mapContainer} className="absolute inset-0 w-full h-full bg-gray-200" />
      
      <MapControls 
        zoom={zoom} 
        minZoom={MAP_CONFIG.minZoom} 
        maxZoom={MAP_CONFIG.maxZoom} 
        onZoomIn={handleZoomIn} 
        onZoomOut={handleZoomOut} 
        onLayersClick={handleLayersClick} 
        onNavigationClick={handleNavigationClick} 
      />
      
      {selectedPlace && !routingMode && <PlaceCard place={selectedPlace} onClose={onPlaceClose} />}
      
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