// import { buildings_zoom } from "../zoom"

export const buildings = [

  // {
  //   id: "buildings-line",
  //   type: "line",
  //   "source-layer": "buildings",
  //   layout: {
  //     "line-cap": "round",
  //     "line-join": "round",
  //   },
  //   paint: {
  //     "line-color": "rgba(170, 185, 201, 0.7)",
  //     "line-width": 1,
  //     "line-opacity": [
  //       "interpolate",
  //       ["linear"],
  //       ["zoom"],
  //       0,
  //       0,
  //       buildings_zoom.min,
  //       1,
  //       buildings_zoom.min + 0.01,
  //       1,
  //     ],
  //   },
  // },
  {
    id: "buildings-fill",
    type: "fill", // fill-extrusion for 3d buildings 
    source: "buildings",
    "source-layer": "buildings",
    paint: {
      "fill-color": "#7895B23B"
      ,
    },
  },
]
