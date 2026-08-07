import { world_countries_name_zoom } from "@/constants/zoom"
import type {CustomLayer} from "@/types/map.types"
export const world_countries_name  : CustomLayer[]= [
  {
    "id": "world_country_dots",
    "type": "circle",
    "source-layer": "world_countries_name",
    "filter": ["has", "name"],
    "paint": {
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["zoom"],
        world_countries_name_zoom.min+1, 2,
        world_countries_name_zoom.min+2 , 3,
        world_countries_name_zoom.min+3,2,
        world_countries_name_zoom.max , 0
      ],
      "circle-color": "#FFFFFF",
      "circle-stroke-color": "#000000",
      "circle-stroke-width": 0.8,
      "circle-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        world_countries_name_zoom.min+2, 1,
        world_countries_name_zoom.max , 0
      ]
    }
  },
  {
    "id": "world_country_labels",
    "type": "symbol",
    "source-layer": "world_countries_name",
    "filter": ["has", "name"],
    "layout": {
      "text-field": ["get", "name"],
      "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],
      "text-size": [
        "interpolate",
        ["linear"],
        ["zoom"],
        world_countries_name_zoom.min, 11,
        world_countries_name_zoom.min + 2, 12,
        world_countries_name_zoom.min + 3, 13,
        world_countries_name_zoom.max , 0
      ],
      "symbol-spacing": 250,
      "text-allow-overlap": false,
      "text-anchor": "bottom",
      "text-offset": [0, -0.6]
    },
    "paint": {
      "text-color": "#000000",
      "text-halo-color": "rgba(255, 250, 250, 0.8)",
      "text-halo-width": 1.2
    }
  }
];
