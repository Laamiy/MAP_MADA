import { boundaries_coarse_name_zoom } from "../zoom";

export const boundaries_coarse_name = [
  {
    id: "boundaries-coarse-name-district",
    type: "symbol",
    source: "boundaries_coarse_name",
    "source-layer": "boundaries_coarse_name",
    filter: ["all", ["==", "admin_level", "6"], ["has", "name"]],
    minzoom: boundaries_coarse_name_zoom.min,
    maxzoom: boundaries_coarse_name_zoom.max + 3,
    layout: {
      "text-field": ["get", "name"],
      "text-size": [
        "interpolate",
        ["linear"],
        ["zoom"],
        boundaries_coarse_name_zoom.min,
        12,
        boundaries_coarse_name_zoom.max - 4,
        15,
      ],
      "symbol-placement": "point",
      "text-justify": "center",
      "text-font": ["Noto Sans Regular"],
    },
    paint: {
      "text-color": "#8ba5c1",
      "text-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        0,
        0,
        boundaries_coarse_name_zoom.min,
        0.5,
        boundaries_coarse_name_zoom.min + 0.01,
        1,
        boundaries_coarse_name_zoom.max,
        0.5,
      ],
      "text-halo-color": "rgba(233, 239, 245, 1)",
      "text-halo-width": 1.5,
    },
  },
];
