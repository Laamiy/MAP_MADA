import { land_cover_zoom } from "@/constants/zoom"

const colors = {
  forest: "#a1eebb",
  scrub: "#C3F1D5",
  wetland: "#C3F1D5",
}
export const land_cover = [


    
   {
  id: "forest-wood-fill",
  type: "fill",
  source: "land_cover",
  "source-layer": "land_cover",
  minzoom: land_cover_zoom.min,
  maxzoom: land_cover_zoom.max,
  filter: ["==", ["get", "subtype"], "forest"],
  paint: {
    "fill-color": colors.forest,
    "fill-opacity": ["interpolate", ["linear"], ["zoom"], 
    land_cover_zoom.min, 0.3, 
    land_cover_zoom.min + 2, 0.7, 
    land_cover_zoom.min + 4, 0.9 , 
    land_cover_zoom.max, 0.1],
  },
},
{
  id: "shrub-grass-fill",
  type: "fill",
  source: "land_cover",
  "source-layer": "land_cover",
  minzoom: land_cover_zoom.min,
  maxzoom: land_cover_zoom.max,
  filter: ["any", ["==", ["get", "subtype"], "shrub"], ["==", ["get", "subtype"], "grass"]],
  paint: {
    "fill-color": colors.scrub, // give this its own lighter-green token
    "fill-opacity": ["interpolate", ["linear"], ["zoom"], 
    land_cover_zoom.min, 0.3, 
    land_cover_zoom.min + 2, 0.7, 
    land_cover_zoom.min + 4, 0.9 , 
    land_cover_zoom.max, 0.1],
  },
},
// {
//   id: "wetland-mangrove-fill",
//   type: "fill",
//   source: "land_cover",
//   "source-layer": "land_cover",
//   minzoom: 12,
//   maxzoom: 16,
//   filter: ["any", ["==", ["get", "subtype"], "wetland"], ["==", ["get", "subtype"], "mangrove"]],
//   paint: {
//     "fill-color": colors.wetland,
//     "fill-opacity": ["interpolate", ["linear"], ["zoom"], 12, 0.4, 14, 0.6, 16, 0.8],
//   },
// },
]
