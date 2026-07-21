import { land_cover_coarse_zoom } from "@/constants/zoom"

const colors = {
  forest: "#5BE7A9",
  scrub: "#BFF2D5",
  wetland: "#C3F1D5",
}
export const land_cover_coarse = [


    
   {
  id: "forest-wood-fill-coarse",
  type: "fill",
  "source-layer": "land_cover",
  minzoom: land_cover_coarse_zoom.min,
  maxzoom: land_cover_coarse_zoom.max,
  filter: ["==", ["get", "subtype"], "forest"],
  paint: {
    "fill-color": colors.forest,
    "fill-opacity":  
    
    ["interpolate", ["linear"], ["zoom"], 
    land_cover_coarse_zoom.min, 0.5, 
    land_cover_coarse_zoom.min + 1, 0.7, 
    land_cover_coarse_zoom.max, 0.8],
  },
},
{
  id: "shrub-grass-fill-coarse",
  type: "fill",
  "source-layer": "land_cover",
  minzoom: land_cover_coarse_zoom.min,
  maxzoom: land_cover_coarse_zoom.max,
  filter: ["any", ["==", ["get", "subtype"], "shrub"], ["==", ["get", "subtype"], "grass"]],
  paint: {
    "fill-color": colors.scrub, // give this its own lighter-green token
    "fill-opacity":  
     ["interpolate", ["linear"], ["zoom"], 
    land_cover_coarse_zoom.min, 0.5, 
    land_cover_coarse_zoom.min + 1, 0.7, 
    land_cover_coarse_zoom.max, 0.8],
  },
},
]
