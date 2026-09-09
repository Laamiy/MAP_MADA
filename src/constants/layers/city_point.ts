import type { CustomLayer} from "@/types/map.types"
import type { ThemeScheme } from '@/types/map.theme.types'
import { INC , city_points_zoom } from "../zoom";
import {
        tanaCoords,antsirananaCoords,
        fianarantsoaCoords ,mahajangaCoords,
        morondavaCoords,toamasinaCoords,
        tolagnaroCoords
      } from "../city.coords";


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

const createCityLayers = (sourceId: string, name: string,scheme : ThemeScheme, isCapital = false ): CustomLayer[] => [
  {
    id: `${sourceId}-outer`,
    type: "circle",
    source: sourceId,
    minzoom: city_points_zoom.min,
    maxzoom: city_points_zoom.max,
    paint: {
      "circle-radius": isCapital ? 12 : 5,
      "circle-color": scheme.cityPoints["outer-circle-color"],
      "circle-opacity": 0.25,
      "circle-stroke-width": 0,
    },
  },
  {
    id: `${sourceId}-inner`,
    type: "circle",
    source: sourceId,
    minzoom: city_points_zoom.min,
    maxzoom: city_points_zoom.max,
    paint: {
      "circle-radius": isCapital ? 5 : 2,
      "circle-color": scheme.cityPoints["inner-circle-color"],
      "circle-stroke-color": scheme.cityPoints['outer-circle-stroke-color'],
      "circle-stroke-width": isCapital ? 3 : 1,
    },
  },
  {
    id: `${sourceId}-label`,
    type: "symbol",
    source: sourceId,
    minzoom: city_points_zoom.min + 1,
    maxzoom: city_points_zoom.max,
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
            city_points_zoom.min,
            15,
            city_points_zoom.min + INC,
            16,
            city_points_zoom.max - 1,
            20,
          ]
        : 15,
      "text-transform": "uppercase",
      "text-anchor": "center",
      "text-variable-anchor-offset": ["center", [0, -1.2]],
    },
    paint: {
      "text-color": scheme['text-color'],
      "text-halo-color": scheme['text-halo-color'],
      "text-halo-width": 1,
    },
  },
]

export function getCityPoints(scheme: ThemeScheme): CustomLayer[] {
  const citiesLayers: CustomLayer[] = [
    ...createCityLayers("antananarivo", "Antananarivo",scheme,  true),
    ...createCityLayers("toamasina", "Toamasina" , scheme),
    ...createCityLayers("mahajanga", "Mahajanga", scheme),
    ...createCityLayers("antsiranana", "Antsiranana",scheme),
    ...createCityLayers("tolagnaro", "Tolagnaro",scheme ),
    ...createCityLayers("morondava", "Morondava", scheme),
    ...createCityLayers("fianarantsoa", "Fianarantsoa",scheme),
  ];
  return citiesLayers;
}
