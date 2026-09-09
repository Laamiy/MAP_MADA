import { world_countries_110m_zoom } from "../zoom"
import type { CustomLayer } from "@/types/map.types"
import type { ThemeScheme } from "@/types/map.theme.types"

export function getWorldCountries110m(scheme: ThemeScheme): CustomLayer[] {
  const world_countries_110m = [
    {
      id: "world_countries_110m-fill",
      type: "fill",
      minzoom: world_countries_110m_zoom.min,
      maxzoom: world_countries_110m_zoom.max,
      "source-layer": "world_countries_110m",
      paint: {
        "fill-color": scheme.world_countries_110.fill,
        "fill-opacity": 1,
      },
    },


    {
      id: "world_countries_110m-line",
      type: "line",
      minzoom: world_countries_110m_zoom.min,
      maxzoom: world_countries_110m_zoom.max,
      "source-layer": "world_countries_110m",
      paint: {
        "line-color": scheme.world_countries_110.line,
        "line-width": 1,
      },
    },
  ];
  return world_countries_110m as CustomLayer[];
}
