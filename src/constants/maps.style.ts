import * as layers_imp from "@/constants/layers";

import { pois_zoom,road_arrows_zoom,} from "./zoom";
import { src, martinSrc ,withSource} from "@/utils/map.utils";
import { citiesGeoJSON, getCityPoints } from "@/constants/layers/city_point";

import { THEME_MAP } from "./theme.constant";
import { MAP_CONFIG } from "@/config/map.config";

import type {MapTheme} from '@/types/map.theme.types'
import type { ThemeScheme } from "@/types/map.theme.types";
import type { style, CustomLayer} from "@/types/map.types"

const sources = {

                    world_countries_50m: martinSrc("world_land_polygons", 0, 12),
                    world_countries_name: martinSrc("world_countries_name", 2, 6),
                    boundaries_coarse_name: martinSrc("boundaries_coarse_name", 5, 15),
                    water_polygons: martinSrc("water_polygons", 7, 16),
                    water_polygons_labels: martinSrc("water_polygons_labels", 14, 17),
                    waterways: martinSrc("waterways", 11, 17),
                    waterways_name: martinSrc("waterways_name", 11, 16),
                    roads_low: martinSrc("roads_low", 3, 18),
                    roads: martinSrc("roads", 12, 17),
                    roads_local_name: martinSrc("roads_local_name", 14, 17),
                    roads_low_name: martinSrc("roads_low_name", 5, 15),
                    buildings: martinSrc("buildings", 16, 17),
                    land_cover_light : martinSrc("land_cover_light",6 ,15),

                    road_arrows: src("road_arrows",road_arrows_zoom.min,road_arrows_zoom.max),
                    admin_boundaries : martinSrc("admin_boundaries", 4, 12),
                    water_lakes : martinSrc("water_lakes", 0, 12),
                    places: martinSrc("places", 4, 17),
                    pois: src("pois",pois_zoom.min,pois_zoom.max,[]),
                    regions: martinSrc("boundaries_coarse_name", 5, 15),
                    esa_vegetation_raw: martinSrc("daylight_veg", 0, 8),
                    admin_polygons: martinSrc("admin_polygons", 6, 14),
                    antananarivo: citiesGeoJSON.tana,
                    toamasina: citiesGeoJSON.toamasina,
                    mahajanga: citiesGeoJSON.mahajanga,
                    antsiranana: citiesGeoJSON.antsiranana,
                    tolagnaro: citiesGeoJSON.tolangnaro,
                    morondava : citiesGeoJSON.morondava,
                    fianarantsoa: citiesGeoJSON.fianarantsoa,
                    satelliteSource: {
                                        type: "raster",
                                        tiles: ["https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",],
                                        tileSize: 256,
                                        maxzoom: 19,
                                        attribution:
                                          "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
                                      },

                  };

const styleCache = new Map<MapTheme, style>();

export const createMapStyle = (themeKey: MapTheme): style => {

  const cachedStyle = styleCache.get(themeKey);
  if (cachedStyle)
    return cachedStyle;

  const scheme: ThemeScheme = THEME_MAP[themeKey] || THEME_MAP.dark;
  const layers: CustomLayer[] = [

    ...layers_imp.getBackground(scheme),
    ...withSource(layers_imp.getWorldCountries50m(scheme), "world_countries_50m"),
    ...withSource(layers_imp.getEsaVegetation(scheme), "esa_vegetation_raw"),
    ...withSource(layers_imp.getLandcoverCoarse(scheme), "land_cover_light"),
    ...withSource(layers_imp.getWaterPolygons(scheme), "water_polygons"),
    ...withSource(layers_imp.getWaterways(scheme), "waterways"),
    ...withSource(layers_imp.getWorldWaterLakes(scheme), "water_lakes"),
    ...withSource(layers_imp.satellite_view , "satelliteSource"),// Satellite view
    ...withSource(layers_imp.getRoads(scheme), "roads"),
    ...withSource(layers_imp.getRoadsLow(scheme), "roads_low"),
    ...withSource(layers_imp.getRoadsLowName(scheme), "roads_low_name"),
    ...withSource(layers_imp.getBuilding(scheme), "buildings"),
    ...withSource(layers_imp.getPlace(scheme), "places"),
    ...withSource(layers_imp.getWorldCountriesName(scheme), "world_countries_name"),
    ...withSource(layers_imp.getWaterPolygonsLabels(scheme), "water_polygons_labels"),
    ...withSource(layers_imp.getRegions(scheme), "boundaries_coarse_name"),
    ...withSource(layers_imp.getBoundariesCoarseName(scheme), "boundaries_coarse_name"),
    ...withSource(layers_imp.getBoundariesCoarse(scheme), "admin_boundaries"),
    ...withSource(layers_imp.getRoadsLocalName(scheme), "roads_local_name"),
    ...withSource(layers_imp.getPoi(scheme), "pois"),
    ...withSource(layers_imp.getWaterWaysName(scheme), "waterways_name"),
    ...withSource(layers_imp.getAdminPolygons(scheme), "admin_polygons"),
    ...withSource(layers_imp.getRoadArrows(scheme), "road_arrows"),
    ...getCityPoints(scheme),

  ];
  const newStyle = {
      version: 8,
      sprite: MAP_CONFIG.spriteUrl,
      glyphs: `${MAP_CONFIG.glyphUrl}/{fontstack}/{range}`,
      sources,
      layers,
    };

  styleCache.set(themeKey, newStyle);
  return newStyle;
}

const mapStyle: style = createMapStyle('dark')
// {
//                             version: 8,
//                             sprite: MAP_CONFIG.spriteUrl,
//                             glyphs: `${MAP_CONFIG.glyphUrl}/{fontstack}/{range}`,
//                             sources,
//                             layers,
//                           };

export default mapStyle;
