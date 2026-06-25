//zoom.ts

export interface zoom_range {
  min: number
  max: number
}

export const INC: number = 3
// world ocean 110m
export const world_ocean_110m_zoom: zoom_range = { min: 0, max: 20 }
// world countries 110m
export const world_countries_110m_zoom: zoom_range = { min: 0, max: 5 }
// world countries 50m
export const world_countries_50m_zoom: zoom_range = { min: 4, max: 20 }
// boundaries coarse
export const boundaries_coarse_zoom: zoom_range = { min: 4, max: 20 }
// boundaries coarse name
export const boundaries_coarse_name_zoom: zoom_range = { min: 4, max: 15}
// boundaries
export const boundaries_zoom: zoom_range = { min: 9, max: 20 }
// boundaries coarse labels
export const boundaries_coarse_label_zoom: zoom_range = { min: 4, max: 20 }
// water polygons
export const water_polygons_zoom: zoom_range = { min: 7, max: 20 }
// waterways
export const waterways_zoom: zoom_range = { min: 15, max: 20 }
// landuse
export const landuse_zoom: zoom_range = { min: 10, max: 20 }
//Roads low
export const roads_low_zoom: zoom_range = { min: 5, max: 22 }
// Roads
export const roads_zoom: zoom_range = { min: 12, max: 20 }
// Roads low name
export const roads_low_name_zoom: zoom_range = { min: 5, max: 20 }
// Road arrows
export const road_arrows_zoom: zoom_range = { min: 16, max: 20 }
// Minor roads
export const minor_roads_zoom: zoom_range = { min: 16, max: 20 }
// Railways
export const railways_zoom: zoom_range = { min: 16, max: 20 }
// Ferry routes
export const ferry_routes_zoom: zoom_range = { min: 16, max: 20 }
// Aerialways
export const aerialways_zoom: zoom_range = { min: 18, max: 20 }
// Buildings
export const buildings_zoom: zoom_range = { min: 16, max: 20 }
// Places
export const places_zoom: zoom_range = { min: 14, max: 17 }
// POIs
export const pois_zoom: zoom_range = { min: 4.5, max: 20 }
//fokotany
export const fokontany_zoom: zoom_range = { min: 9, max: 22 }
//fokontany labels
export const fokontany_labels_zoom: zoom_range = { min: 17, max: 22 }
// boundaries coarse
export const boundaries_coarse_district_zoom: zoom_range = { min: 4, max: 8 }
export const esa_vegetation_raw_zoom: zoom_range = { min: 3, max: 11.5 }
export const esa_vegetation_100m_zoom: zoom_range = { min: 8, max: 9.5 }
export const esa_vegetation_30m_zoom: zoom_range = { min: 14, max: 20 }
export const water_polygons_labels_zoom: zoom_range = { min: 14, max: 20 }
