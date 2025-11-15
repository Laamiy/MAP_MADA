import { boundaries_coarse_label_zoom } from "../zoom";

export const boundaries_coarse_label = [
  // {
  //   id: "boundaries-coarse-label-fokotany",
  //   type: "symbol",
  //   source: "boundaries_coarse_label",
  //   "source-layer": "boundaries_coarse_label",
  //   minzoom: boundaries_coarse_label_zoom.min + 2,
  //   maxzoom: boundaries_coarse_label_zoom.max,
  //   // filter: [
  //   //   "all",
  //   //   ["in", "admin_level", "8", "10"],
  //   //   ["has", "name"],
  //   //   // ["!=", "name", "Diana"],
  //   //   // ["!=", "name", "Sava"],
  //   //   // ["!=", "name", "Sofia"],
  //   // ],
  //   layout: {
  //     "text-field": ["get", "name"],
  //     "text-size": [
  //       "interpolate",
  //       ["linear"],
  //       ["zoom"],
  //       boundaries_coarse_label_zoom.min + 2,
  //       8,
  //       boundaries_coarse_label_zoom.max,
  //       10,
  //     ],
  //     "symbol-placement": "point",
  //     // "text-transform": "uppercase",
  //     "text-justify": "center",
  //     "text-font": ["Noto Sans Regular"],
  //   },
  //   paint: {
  //     "text-color": "rgba(201, 16, 16, 1)",
  //     "text-opacity": [
  //       "interpolate",
  //       ["linear"],
  //       ["zoom"],
  //       0,
  //       0,
  //       boundaries_coarse_label_zoom.min + 2,
  //       1,
  //       boundaries_coarse_label_zoom.min + 8 + 0.01,
  //       1,
  //       boundaries_coarse_label_zoom.max,
  //       1,
  //     ],
  //     "text-halo-color": "rgba(233, 239, 245, 1)",
  //     "text-halo-width": 1.5,
  //   },
  // },
];
