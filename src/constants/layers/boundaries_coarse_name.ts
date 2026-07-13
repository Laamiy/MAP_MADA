import { boundaries_coarse_name_zoom } from "../zoom"

export const boundaries_coarse_name = [

  {
    "id": "boundaries_coarse_name_circles",
    "type": "circle",
    "source-layer": "boundaries_coarse_name",
    "filter": ["all", ["==", "admin_level", "6"], ["has", "name"]],
    "paint": {
      "circle-radius": 4, 
      //  [
      //   "interpolate",
      //   ["linear"],
      //   ["zoom"],
      //   boundaries_coarse_name_zoom.min+1, 2,
      //   boundaries_coarse_name_zoom.min+3 , 3,
      //   boundaries_coarse_name_zoom.min+4,2,
      //   boundaries_coarse_name_zoom.max , 0
      // ],
      "circle-color": "#FFFFFF",
      "circle-stroke-color": "#000000",
      "circle-stroke-width": 0.8,
      "circle-opacity": 1 
      // [
      //   "interpolate",
      //   ["linear"],
      //   ["zoom"],
      //   boundaries_coarse_name_zoom.min+2, 1,
      //   boundaries_coarse_name_zoom.max , 0
      // ]
    }
  },                   { id: "boundaries-coarse-name-district",
    type: "symbol",
    "source-layer": "boundaries_coarse_name",
    filter: ["all", ["==", "admin_level", "6"], ["has", "name"]],
    minzoom: boundaries_coarse_name_zoom.min,
    maxzoom: boundaries_coarse_name_zoom.max,
    layout: {
              // "icon-image": "region",
              // "icon-size": 0.8,
              // "icon-anchor": "center",
              "text-anchor": "bottom",
              "text-offset": [0, -0.6],
              "icon-allow-overlap": false,
              "text-field": ["get", "name"],
              "text-size": 11 , 
              // [
              //   "interpolate",
              //   ["linear"],
              //   ["zoom"],
              //   boundaries_coarse_name_zoom.min + 2,
              //   14,
              //   boundaries_coarse_name_zoom.max,
              //   16,
              // ],
              "symbol-placement": "point",
              "text-justify": "center",
              // "text-offset": [0, -2.3],
              "text-font": ["Noto Sans Regular"],
            },
    paint: {
            "text-color": "#000000",
            "text-halo-color": "rgba(255, 250, 250, 0.8)",
            "text-halo-width": 2.5,
            "text-opacity": 1,
            // [
            //   "interpolate",
            //   ["linear"],
            //   ["zoom"],
            //   0,
            //   0,
            //   boundaries_coarse_name_zoom.min + 2,
            //   1,
            //   boundaries_coarse_name_zoom.min + 2+ 0.01,
            //   1,
            //   boundaries_coarse_name_zoom.max,
            //   1,
            // ],
          },
  },
]
