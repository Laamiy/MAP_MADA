import { world_countries_50m_zoom } from "../zoom";
import type { CustomLayer } from "@/types/map.types";
import type { ThemeScheme } from "@/types/map.theme.types";

export function getWorldCountries50m(scheme: ThemeScheme): CustomLayer[] {
  const world_countries_50m: CustomLayer[] = [
    {
      id: "world_countries_50m-fill",
      type: "fill",
      minzoom: world_countries_50m_zoom.min,
      maxzoom: world_countries_50m_zoom.max,
      "source-layer": "world_countries_50m",
      paint: {
        "fill-color": scheme.world_countries_50.fill,
        "fill-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          world_countries_50m_zoom.min,
          0,
          world_countries_50m_zoom.min + 0.5,
          1,
          world_countries_50m_zoom.max - 0.5,
          1,
          world_countries_50m_zoom.max,
          0,
        ],
      },
    },
  ];
  return world_countries_50m;
}
