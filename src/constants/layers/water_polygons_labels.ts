
import { water_polygons_labels_zoom } from "../zoom"

 export const water_polygons_labels = [
    {
    id: "water-name",
    type: "symbol",
    "source-layer": "water_polygons_labels", 
    minzoom: water_polygons_labels_zoom.min ,
    filter: ["has", "name"],
    layout: {
      "text-field": ["get", "name"],
      "text-size": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    0, 0,
                    water_polygons_labels_zoom.min , 16,
                    water_polygons_labels_zoom.max, 19,
                  ],
      "symbol-placement": "point",
      "text-font": ["Noto Sans Bold"],
      "symbol-spacing": 100,
      "text-allow-overlap": false,
      "text-ignore-placement": false,
    },
    paint: {
      "text-color": "rgba(5, 20, 158, 1)",
      "text-halo-color": "rgba(255, 250, 250, 0.8)",
      "text-halo-width": 2.5,
      "text-opacity": [
                        "interpolate",
                        ["linear"],
                        ["zoom"],
                        0, 0,
                        water_polygons_labels_zoom.min + 3, 0.5,
                        water_polygons_labels_zoom.min + 3.01, 1,
                        water_polygons_labels_zoom.max, 1,
                      ],
    },
  },
]