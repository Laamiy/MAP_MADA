import { boundaries_coarse_zoom, INC } from "../zoom";

export const boundaries_coarse = [
  {
    id: "boundaries-coarse-line-district",
    type: "line",
    source: "boundaries_coarse",
    "source-layer": "boundaries_coarse",
    filter: ["all", ["==", "admin_level", "4"], ["has", "name"]],
    paint: {
      "line-color": "rgba(0, 0, 0 ,0.7)",
      "line-width": [
        "interpolate",
        ["linear"],
        ["zoom"],
        0,
        0,
        boundaries_coarse_zoom.min,
        0.5,
        boundaries_coarse_zoom.min + INC,
        1,
        boundaries_coarse_zoom.max,
        0.5,
      ],
      "line-dasharray": [1, 8],
    },
  },
];
