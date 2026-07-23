import type { AnyLayer } from "@/types/map.types"
import { 
        tanaCoords,antsirananaCoords,
        fianarantsoaCoords ,mahajangaCoords,
        morondavaCoords,toamasinaCoords,
        tolagnaroCoords 
      } from "../city.coords";

const zoom = { min: 5, max: 14 }
const INC = 3;


export const createGeoJSON = (coords: [number, number], name: string, isCapital = false) => ({
  type: "geojson" as const,
  data: {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: coords },
        properties: { name, isCapital },
      },
    ],
  },
})

export const citiesGeoJSON = {
  tana: createGeoJSON(tanaCoords, "Antananarivo", true),
  toamasina: createGeoJSON(toamasinaCoords, "Toamasina"),
  mahajanga: createGeoJSON(mahajangaCoords, "Mahajanga"),
  antsiranana: createGeoJSON(antsirananaCoords, "Antsiranana"),
  tolangnaro: createGeoJSON(tolagnaroCoords, "Tolagnaro"),
  morondava: createGeoJSON(morondavaCoords, "Morondava"),
  fianarantsoa: createGeoJSON(fianarantsoaCoords, "Fianarantsoa"),
}

const createCityLayers = (sourceId: string, name: string, isCapital = false): AnyLayer[] => [
  {
    id: `${sourceId}-outer`,
    type: "circle",
    source: sourceId,
    minzoom: zoom.min,
    maxzoom: zoom.max,
    paint: {
      "circle-radius": isCapital ? 12 : 5,
      "circle-color": "#0080ff",
      "circle-opacity": 0.25,
      "circle-stroke-width": 0,
    },
  },
  {
    id: `${sourceId}-inner`,
    type: "circle",
    source: sourceId,
    minzoom: zoom.min,
    maxzoom: zoom.max,
    paint: {
      "circle-radius": isCapital ? 5 : 2,
      "circle-color": "#ffffff",
      "circle-stroke-color": "#0080ff",
      "circle-stroke-width": isCapital ? 2 : 1,
    },
  },
  {
    id: `${sourceId}-label`,
    type: "symbol",
    source: sourceId,
    minzoom: zoom.min + 1,
    maxzoom: zoom.max,
    layout: {
      "text-field": name,
      "text-font": ["Noto Sans Regular"],
      "text-size": isCapital
        ? [
            "interpolate",
            ["linear"],
            ["zoom"],
            0,
            0,
            zoom.min,
            15,
            zoom.min + INC,
            16,
            zoom.max - 1,
            20,
          ]
        : 15,
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

export const citiesLayers: AnyLayer[] = [
  ...createCityLayers("antananarivo", "Antananarivo", true),
  ...createCityLayers("toamasina", "Toamasina"),
  ...createCityLayers("mahajanga", "Mahajanga"),
  ...createCityLayers("antsiranana", "Antsiranana"),
  ...createCityLayers("tolagnaro", "Tolagnaro"),
  ...createCityLayers("morondava", "Morondava"),
  ...createCityLayers("fianarantsoa", "Fianarantsoa"),
]