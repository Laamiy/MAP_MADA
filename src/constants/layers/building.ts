import { buildings_zoom } from "../zoom"

export const building = [

  {
    id: "buildings-line",
    type: "line",
    "source-layer": "buildings",
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "rgba(170, 185, 201, 0.7)",
      "line-width": 1,
      "line-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        0,
        0,
        buildings_zoom.min,
        1,
        buildings_zoom.min + 0.01,
        1,
      ],
    },
  },
  // {
  //   id: "buildings-3d",
  //   type: "fill-extrusion",
  //   source: "buildings3d",
  //   "source-layer": "buildings3d",
  //   minzoom: 16,
  //   paint: {
  //     "fill-extrusion-color": "#d0d0d0",
  //     "fill-extrusion-opacity": 0.85,
  //     "fill-extrusion-base": 0,
  //     "fill-extrusion-height": [
  //       "coalesce",
  //       ["to-number", ["get", "height"]],        // real height (m)
  //       ["*", ["to-number", ["get", "levels"]], 3.5], // 3.5 m per level
  //       10                                        // default metres
  //     ]
  //   }
  // }
  {
    id: "buildings-fill",
    type: "fill",
    source: "buildings",
    "source-layer": "buildings",
    paint: {
      "fill-color": "#7895B23B"
      ,
    },
  },
]
