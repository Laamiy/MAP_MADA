import type {CustomLayer} from "@/types/map.types"
import type { ThemeScheme } from "@/types/map.theme.types"

export function getBuilding(scheme: ThemeScheme): CustomLayer[] {
  const buildings: CustomLayer[] = [

    {
      id: "buildings-fill",
      type: "fill", // fill-extrusion for 3d buildings
      source: "buildings",
      "source-layer": "buildings",
      paint: {
        "fill-color": scheme.building.fill,
      },
    },
  ];
  return buildings;
}
