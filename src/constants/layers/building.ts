import { buildings_zoom } from "../zoom"

export const building = [

  // 3D extrusion  : 

  // {
  //   id: "buildings-fill-extrusion",
  //   type: "fill-extrusion",
  //   source: "buildings",
  //   "source-layer": "buildings",
  //   paint: {
  //     // "fill-color": "#E8E9ED",
  //     "fill-extrusion-color": "#E8E9ED",
  //     // "fill-extrusion-height": ["get", "height"], // ou une valeur fixe, ex. 10
  //     "fill-extrusion-height": 3, // ou une valeur fixe, ex. 10
  //     "fill-extrusion-opacity": 0.9,
  //   },
  // },
  {
    id: "buildings-line",
    type: "line",
    source: "buildings",
    "source-layer": "buildings",
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "rgba(170, 185, 201, 0.7)",
      "line-width": 3,
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
  {
    id: "buildings-fill",
    type: "fill",
    source: "buildings",
    "source-layer": "buildings",
    paint: {
      "fill-color": "rgba(232,233,237,1)"
      ,
    },
  },
]
