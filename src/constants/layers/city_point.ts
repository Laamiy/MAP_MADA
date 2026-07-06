import type { AnyLayer } from "../../types/map.types"
const zoom = { min: 4, max: 14 }
const INC = 3;
// Coordonnées
const tanaCoords: [number, number] = [47.5214, -18.8967]
const madaCoords: [number, number] = [45.8, -21.0]
const toamasina: [number, number] = [49.4023, -18.1492]
const mahajanga: [number, number] = [46.3167, -15.7167]
const antsiranana: [number, number] = [49.2921, -12.3065]
const tolagnaro: [number, number] = [46.9833, -25.0323]

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
const antananarivoGeoJSON = createGeoJSON(tanaCoords)
const madagascarGeoJSON = createGeoJSON(madaCoords)
const toamasinaGeoJSON = createGeoJSON(toamasina)
const mahajangaGeoJSON = createGeoJSON(mahajanga)
const antsirananaGeoJSON = createGeoJSON(antsiranana)
const tolagnaroGeoJSON = createGeoJSON(tolagnaro)

export const citiesGeoJSON = {
  tana: antananarivoGeoJSON,
  mada: madagascarGeoJSON,
  toamasina: toamasinaGeoJSON,
  mahajanga: mahajangaGeoJSON,
  antsiranana: antsirananaGeoJSON,
  tolangnaro: tolagnaroGeoJSON
}

// Layers pour Antananarivo
const antananarivoLayers: AnyLayer[] = [
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
    minzoom: zoom.min + 1,
    maxzoom: zoom.max,
    layout: {
      "text-field": "Antananarivo",
      "text-font": ["Noto Sans Regular"],
      "text-size": [
        "interpolate",
        ["linear"],
        ["zoom"],
        0,
        0,
        zoom.min,
        20,
        zoom.min + INC,
        19,
        zoom.max - 1,
        30
      ],
      "text-transform": "uppercase",
      "text-anchor": "center",
      "text-variable-anchor-offset": ["center", [0, -1.2]],
    },
    paint: {
      "text-color": "rgba(2, 42, 48, 1)",
      "text-halo-color": "rgba(255, 250, 250, 0.8)",
      "text-halo-width": 1,
    },
  },
]

// // Layers pour Madagascar
// const madagascarLayers: AnyLayer[] = [
//   {
//     id: "madagascar-label",
//     type: "symbol",
//     source: "antananarivo",
//     minzoom: 1, //zoom.min,
//     maxzoom: 5,
//     layout: {
//       "text-field": "Madagascar",
//       "text-font": ["Noto Sans Regular"],
//       "text-size": ["interpolate", ["linear"], ["zoom"], 0, 0, 3, 10, 5, 16],
//       "text-transform": "uppercase",
//     },
//     paint: {
//       "text-color": "#0000AF",
//       "text-halo-color": "rgba(255, 250, 250, 0.8)",
//       "text-halo-width": 1,
//     },
//   },
// ]

// Layers pour Toamasina
const toamasinaLayers: AnyLayer[] = [
  {
    id: "toamasina-outer",
    type: "circle",
    source: "toamasina",
    minzoom: zoom.min,
    maxzoom: zoom.max,
    paint: {
      "circle-radius": 8,
      "circle-color": "#0080ff",
      "circle-opacity": 0.25,
      "circle-stroke-width": 0,
    },
  },
  {
    id: "toamasina-inner",
    type: "circle",
    source: "toamasina",
    minzoom: zoom.min,
    maxzoom: zoom.max,
    paint: {
      "circle-radius": 3,
      "circle-color": "#ffffff",
      "circle-stroke-color": "#0080ff",
      "circle-stroke-width": 2,
    },
  },
  {
    id: "toamasina-label",
    type: "symbol",
    source: "toamasina",
    minzoom: zoom.min + 1,
    maxzoom: zoom.max,
    layout: {
      "text-field": "Toamasina",
      "text-font": ["Noto Sans Regular"],
      "text-size": 15,
      "text-transform": "uppercase",
      "text-anchor": "center",
      "text-variable-anchor-offset": ["center", [0, -1.2]],
    },
    paint: {
      "text-color": "rgba(2, 42, 48, 1)",
      "text-halo-color": "rgba(255, 250, 250, 0.8)",
      "text-halo-width": 1,
    },
  },
]
// Layers pour mahajanga
const mahajangaLayers: AnyLayer[] = [
  {
    id: "mahajanga-outer",
    type: "circle",
    source: "mahajanga",
    minzoom: zoom.min,
    maxzoom: zoom.max,
    paint: {
      "circle-radius": 8,
      "circle-color": "#0080ff",
      "circle-opacity": 0.25,
      "circle-stroke-width": 0,
    },
  },
  {
    id: "mahajanga-inner",
    type: "circle",
    source: "mahajanga",
    minzoom: zoom.min,
    maxzoom: zoom.max,
    paint: {
      "circle-radius": 3,
      "circle-color": "#ffffff",
      "circle-stroke-color": "#0080ff",
      "circle-stroke-width": 2,
    },
  },
  {
    id: "mahajanga-label",
    type: "symbol",
    source: "mahajanga",
    minzoom: zoom.min + 1,
    maxzoom: zoom.max,
    layout: {
      "text-field": "Mahajanga",
      "text-font": ["Noto Sans Regular"],
      "text-size": 15,
      "text-transform": "uppercase",
      "text-anchor": "center",
      "text-variable-anchor-offset": ["center", [0, -1.2]],
    },
    paint: {
      "text-color": "rgba(2, 42, 48, 1)",
      "text-halo-color": "rgba(255, 250, 250, 0.8)",
      "text-halo-width": 1,
    },
  },
]
// Layers pour antsiranana
const antsirananaLayers: AnyLayer[] = [
  {
    id: "antsiranana-outer",
    type: "circle",
    source: "antsiranana",
    minzoom: zoom.min,
    maxzoom: zoom.max,
    paint: {
      "circle-radius": 8,
      "circle-color": "#0080ff",
      "circle-opacity": 0.25,
      "circle-stroke-width": 0,
    },
  },
  {
    id: "antsiranana-inner",
    type: "circle",
    source: "antsiranana",
    minzoom: zoom.min,
    maxzoom: zoom.max,
    paint: {
      "circle-radius": 3,
      "circle-color": "#ffffff",
      "circle-stroke-color": "#0080ff",
      "circle-stroke-width": 2,
    },
  },
  {
    id: "antsiranana-label",
    type: "symbol",
    source: "antsiranana",
    minzoom: zoom.min + 1,
    maxzoom: zoom.max,
    layout: {
      "text-field": "Antsiranana",
      "text-font": ["Noto Sans Regular"],
      "text-size": 15,
      "text-transform": "uppercase",
      "text-anchor": "center",
      "text-variable-anchor-offset": ["center", [0, -1.2]],
    },
    paint: {
      "text-color": "rgba(2, 42, 48, 1)",
      "text-halo-color": "rgba(255, 250, 250, 0.8)",
      "text-halo-width": 1,
    },
  },
]

// Layers pour tolagnaro
const tolagnaroLayers: AnyLayer[] = [
  {
    id: "tolagnaro-outer",
    type: "circle",
    source: "tolagnaro",
    minzoom: zoom.min,
    maxzoom: zoom.max,
    paint: {
      "circle-radius": 8,
      "circle-color": "#0080ff",
      "circle-opacity": 0.25,
      "circle-stroke-width": 0,
    },
  },
  {
    id: "tolagnaro-inner",
    type: "circle",
    source: "tolagnaro",
    minzoom: zoom.min,
    maxzoom: zoom.max,
    paint: {
      "circle-radius": 3,
      "circle-color": "#ffffff",
      "circle-stroke-color": "#0080ff",
      "circle-stroke-width": 2,
    },
  },
  {
    id: "tolagnaro-label",
    type: "symbol",
    source: "tolagnaro",
    minzoom: zoom.min + 1,
    maxzoom: zoom.max,
    layout: {
      "text-field": "Tolagnaro",
      "text-font": ["Noto Sans Regular"],
      "text-size": 15,
      "text-transform": "uppercase",
      "text-anchor": "center",
      "text-variable-anchor-offset": ["center", [0, -1.2]],
    },
    paint: {
      "text-color": "rgba(2, 42, 48, 1)",
      "text-halo-color": "rgba(255, 250, 250, 0.8)",
      "text-halo-width": 1,
    },
  }
]
export const citiesLayers = [...antananarivoLayers,
// ...madagascarLayers,
...toamasinaLayers,
...mahajangaLayers,
...antsirananaLayers,
...tolagnaroLayers
]
