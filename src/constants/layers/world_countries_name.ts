import { world_countries_name_zoom } from "@/constants/zoom"
export const world_countries_name = [
      {
            "id": "world_country_labels",
            "type": "symbol",
            "source-layer": "world_countries_name",
            "filter": ["has", "name"],
            "layout": {
                            "text-field": ["get", "name"],
                            "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],
                            "text-size": ["interpolate", 
                                                        ["linear"], 
                                                        ["zoom"], 
                                                            world_countries_name_zoom.min,  10,   
                                                            world_countries_name_zoom.min +2,  12,   
                                                            world_countries_name_zoom.min+3,  13,   
                                                            world_countries_name_zoom.max, 14    
                                                        ],
                            "symbol-spacing": 250,
                            "text-allow-overlap": false
                        },
            "paint": {
  "text-color": "#000000",
            "text-halo-color": "rgba(255, 250, 250, 0.8)",
            "text-halo-width": 2.5,
                    }
        }
]