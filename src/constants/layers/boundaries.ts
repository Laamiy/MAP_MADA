import type { ThemeScheme } from "@/types/map.theme.types"
import type { CustomLayer } from "@/types/map.types"


export function getBoundaries(scheme: ThemeScheme): CustomLayer[] {
  const boundaries = [

    {
      id: "boundaries-fill",
      type: "fill",
      "source-layer": "boundaries",
      paint: {
        "fill-color": scheme.boundaries.fill,
        "fill-opacity": 1,
      },
    },
  ];
  return boundaries as CustomLayer[];
}
