import { waterways_zoom } from "../zoom"
import type {CustomLayer} from "@/types/map.types"
import type { ThemeScheme } from "@/types/map.theme.types"

export function getWaterWaysName(scheme: ThemeScheme): CustomLayer[] {
  const waterways_name: CustomLayer[] =
    [
      {
        id: "waterways-name",
        type: "symbol",
        "source-layer": "waterways_name",
        minzoom: waterways_zoom.min,
        maxzoom: waterways_zoom.max,
        filter: ["has", "name"],
        layout: {
          "text-field": ["get", "name"],
          "text-font": ["Noto Sans Bold"],
          "symbol-placement": "line",
          'text-allow-overlap': false,
          "text-size": [
            "interpolate",
            ["linear"],
            ["zoom"],
            waterways_zoom.min, 10,
            // waterways_zoom.min+ INC, 10,
            waterways_zoom.max, 14
          ],
          "text-keep-upright": true,
          "symbol-spacing": 400
        },
        paint: {
          "text-color": scheme.waterways_name["text-color"],
          "text-halo-color": scheme.waterways_name['text-halo-color'],
          "text-halo-width": 1.5
        }
      }
    ];
  return waterways_name;
}
