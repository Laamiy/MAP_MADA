import { railways_zoom } from "../zoom"
import type { ThemeScheme } from "@/types/map.theme.types"
import type { CustomLayer } from "@/types/map.types"

export function getRailways(scheme: ThemeScheme): CustomLayer[] {
  const railways = [
    {
      id: "railways-line",
      type: "line",
      "source-layer": "railways",
      layout: {
        "line-cap": "square",
        "line-join": "miter",
      },
      paint: {
        "line-color": scheme.railways.line,
        "line-width": 1,
        "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          railways_zoom.min,
          0,
          railways_zoom.min + 0.01,
          1,
          railways_zoom.max,
          0.5,
        ],
        "line-dasharray": [1, 5],
      },
    },
  ];
  return railways as CustomLayer[];
}
