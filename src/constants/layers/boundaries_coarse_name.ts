import { boundaries_coarse_name_zoom } from "../zoom"
import type {CustomLayer} from "@/types/map.types"
import type { ThemeScheme } from "@/types/map.theme.types"

export function getBoundariesCoarseName(scheme: ThemeScheme): CustomLayer[] {
  const boundaries_coarse_name: CustomLayer[] = [

    {
      "id": "boundaries_coarse_name_circles",
      "type": "circle",
      "source-layer": "boundaries_coarse_name",
      "filter": ["all", ["==", "admin_level", "6"], ["has", "name"]],
      "paint": {
        "circle-radius":
          [
            "interpolate",
            ["linear"],
            ["zoom"],
            boundaries_coarse_name_zoom.min + 2, 2,
            boundaries_coarse_name_zoom.min + 4, 3,
            boundaries_coarse_name_zoom.min + 5, 2,
            boundaries_coarse_name_zoom.max, 0
          ],
        "circle-color": scheme.boundaries_coarse_name["circle-color"],
        "circle-stroke-color": scheme.boundaries_coarse_name["circle-stroke-color"],
        "circle-stroke-width": 0.6,
        "circle-opacity":
          [
            "interpolate",
            ["linear"],
            ["zoom"],
            boundaries_coarse_name_zoom.min + 2, 1,
            boundaries_coarse_name_zoom.max, 0
          ]
      }
    },

    {
      id: "boundaries-coarse-name-district",
      type: "symbol",
      "source-layer": "boundaries_coarse_name",
      filter: ["all", ["==", "admin_level", "6"], ["has", "name"]],
      minzoom: boundaries_coarse_name_zoom.min,
      maxzoom: boundaries_coarse_name_zoom.max,
      layout: {
        "text-anchor": "bottom",
        "text-offset": [0, -0.6],
        "icon-allow-overlap": false,
        "text-allow-overlap": false,
        "text-field": ["get", "name"],
        "text-size":
          [
            "interpolate",
            ["linear"],
            ["zoom"],
            boundaries_coarse_name_zoom.min,
            7,
            boundaries_coarse_name_zoom.min + 2,
            12,
            boundaries_coarse_name_zoom.max,
            14,
          ],
        "symbol-placement": "point",
        "text-justify": "center",
        // "text-offset": [0, -2.3],
        "text-font": ["Noto Sans Regular"],
      },
      paint: {
        "text-color": scheme['text-color'],
        "text-halo-color": scheme['text-halo-color'],
        "text-halo-width": 1.5,
        "text-opacity":
          [
            "interpolate",
            ["linear"],
            ["zoom"],
            0,
            0,
            boundaries_coarse_name_zoom.min + 2,
            1,
            boundaries_coarse_name_zoom.min + 2 + 0.01,
            1,
            boundaries_coarse_name_zoom.max,
            1,
          ],
      },
    },
  ];
  return boundaries_coarse_name;
}
