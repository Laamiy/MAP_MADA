//city_point.ts

import type { AnyLayer } from "../../types/map.types"
const zoom = { min: 3, max: 11 }

// Coordonnées
const tanaCoords: [number, number] = [47.5214, -18.8967]
const madaCoords: [number, number] = [45.8, -21.0]

// Fonction pour Antananarivo
export const createGeoJSON = (coords: [number, number]) => ({
  type: "geojson" as const,
  data: {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: coords },
        properties: {},
      },
    ],
  },
})

// Sources GeoJSON
export const antananarivoGeoJSON = createGeoJSON(tanaCoords)
export const madagascarGeoJSON = createGeoJSON(madaCoords)

// Layers pour Antananarivo
export const antananarivoLayers: AnyLayer[] = [
  {
    id: "antananarivo-outer",
    type: "circle",
    source: "antananarivo",
    minzoom: zoom.min,
    maxzoom: zoom.max,
    paint: {
      "circle-radius": 12,
      "circle-color": "#0080ff",
      "circle-opacity": 0.25,
      "circle-stroke-width": 0,
    },
  },
  {
    id: "antananarivo-inner",
    type: "circle",
    source: "antananarivo",
    minzoom: zoom.min,
    maxzoom: zoom.max,
    paint: {
      "circle-radius": 5,
      "circle-color": "#ffffff",
      "circle-stroke-color": "#0080ff",
      "circle-stroke-width": 2,
    },
  },
  {
    id: "antananarivo-label",
    type: "symbol",
    source: "antananarivo",
    minzoom: zoom.min + 2.5,
    maxzoom: zoom.max,
    layout: {
      "text-field": "Antananarivo",
      "text-font": ["Noto Sans Regular"],
      "text-size": 18,
      "text-transform": "uppercase",
      "text-anchor": "center",
      "text-variable-anchor-offset": ["center", [0, -1.2]],
    },
    paint: {
      "text-color": "rgba(2, 42, 48, 1)",
      "text-halo-color": "rgba(255, 250, 250, 0.8)",
      "text-halo-width": 2.5,
    },
  },
]

// Layers pour Madagascar
export const madagascarLayers: AnyLayer[] = [
  {
    id: "madagascar-label",
    type: "symbol",
    source: "madagascar",
    minzoom: 1, //zoom.min,
    maxzoom: 5,
    layout: {
      "text-field": "Madagascar",
      "text-font": ["Noto Sans Regular"],
      "text-size": 18,
      "text-transform": "uppercase",
    },
    paint: {
      "text-color": "rgba(223, 28, 28, 1)",
      "text-halo-color": "rgba(255, 250, 250, 0.8)",
      "text-halo-width": 2.5,
    },
  },
]