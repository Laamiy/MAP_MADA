import { waterways_zoom } from "../zoom"
import type {CustomLayer} from "@/types/map.types"
import type { ThemeScheme } from "@/types/map.theme.types"

export function getWaterways(scheme: ThemeScheme): CustomLayer[] {
  const waterways: CustomLayer[] = [
    {
      id: "waterways-line",
      type: "line",
      minzoom: waterways_zoom.min,
      maxzoom: waterways_zoom.max,
      "source-layer": "waterways",
      layout: {
        "line-sort-key": ["get", "gid"],
      },
      paint: {
        "line-color": scheme.waterway.line,
        "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          waterways_zoom.min,
          0.5,
          waterways_zoom.min + 1,
          0.7,
          waterways_zoom.max,
          1,
        ],
      },
    },
  ];
  return waterways;
}
