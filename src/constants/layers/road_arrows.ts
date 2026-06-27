import { road_arrows_zoom } from "../zoom"

export const road_arrows = [
  {
    id: "road-arrows-symbol",
    type: "symbol",
    source: "road_arrows", 
    "source-layer": "road_arrows",
    minzoom: road_arrows_zoom.min,
    layout: {
      "symbol-placement": "line",
      "symbol-spacing": 300, 
      "icon-image": "way", // arrow icon id
      "icon-size": 0.8,
      "icon-keep-upright": false, // flip if upside-down
      "icon-allow-overlap": false,
      "icon-rotation-alignment": "map", // align to line tangent
    },
    paint: {
      "icon-opacity": 0.6,
    },
  },
]
