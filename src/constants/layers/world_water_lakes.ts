import type {CustomLayer} from "@/types/map.types"
import type { ThemeScheme } from "@/types/map.theme.types"

export function getWorldWaterLakes(scheme: ThemeScheme): CustomLayer[] {
  const world_water_lakes: CustomLayer[] = [
    {
      "id": "world_water_lakes-fill",
      "type": "fill",
      "minzoom": 0,
      "maxzoom": 12,
      "source-layer": "water_lakes",
      "paint": {
        "fill-color": scheme.waterway.fill,  // later on should have it's own color ?
      }
    },
  ];
  return world_water_lakes;
}
