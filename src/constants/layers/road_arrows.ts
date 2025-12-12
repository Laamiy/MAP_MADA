import { road_arrows_zoom } from "../zoom"

export const road_arrows = [
  {
    id: "road-arrows-symbol",
    type: "symbol",
    source: "road_arrows", // must match tegola layer name
    "source-layer": "road_arrows",
    minzoom: road_arrows_zoom.min,
    layout: {
      "symbol-placement": "line",
      "symbol-spacing": 300, 
      "icon-image": "way", // your arrow icon id
      "icon-size": 1.5,
      "icon-keep-upright": false, // flip if upside-down
      "icon-allow-overlap": false,
      "icon-rotation-alignment": "map", // align to line tangent
    },
    paint: {
      "icon-opacity": 0.7,
    },
  },
]
