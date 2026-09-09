import { aerialways_zoom } from "../zoom"
import type { ThemeScheme } from "@/types/map.theme.types";
import type { CustomLayer } from "@/types/map.types";

export function getrAerialways(scheme: ThemeScheme): CustomLayer[] {
  const aerialways: CustomLayer[] = [
    {
      id: "aerialways-line",
      type: "line",
      "source-layer": "aerialways",
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": scheme.aerialways.line,
        "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          aerialways_zoom.min,
          1.5,
          aerialways_zoom.max,
          2.2,
        ],
        "line-dasharray": [1, 2],
      },
    },
  ];
  return aerialways;
}
