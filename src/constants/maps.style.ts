import * as layers_imp from "@/constants/layers";
import { citiesGeoJSON, citiesLayers } from "@/constants/layers/city_point";
import type { style, CustomLayer} from "@/types/map.types"
import { pois_zoom,road_arrows_zoom,} from "./zoom";
import { src, martinSrc } from "@/utils/map.utils";
import { MAP_CONFIG } from "@/config/map.config";
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
                    land_cover: martinSrc("land_cover", 10, 15),
                    land_cover_coarse: martinSrc("land_cover_coarse_85", 10, 12),
                    road_arrows: src("road_arrows",road_arrows_zoom.min,road_arrows_zoom.max),
                    admin_boundaries : martinSrc("admin_boundaries", 4, 12),
                    water_lakes : martinSrc("water_lakes", 0, 12),
                    places: martinSrc("places", 4, 17),
                    pois: src("pois",pois_zoom.min,pois_zoom.max,[]),
                    regions: martinSrc("boundaries_coarse_name", 5, 15),
                    esa_vegetation_raw: martinSrc("daylight_veg", 0, 8),

                    antananarivo: citiesGeoJSON.tana,
                    toamasina: citiesGeoJSON.toamasina,
                    mahajanga: citiesGeoJSON.mahajanga,
                    antsiranana: citiesGeoJSON.antsiranana,
                    tolagnaro: citiesGeoJSON.tolangnaro,
                    morondava : citiesGeoJSON.morondava,
                    fianarantsoa : citiesGeoJSON.fianarantsoa,
                  };
const withSource = (layers: CustomLayer[], src: string): CustomLayer[] => layers.map((l) => ({ ...l, source: src }));

const layers: CustomLayer[] = [
                            ...layers_imp.background,
                            ...withSource(layers_imp.world_countries_50m, "world_countries_50m"),
                            ...withSource(layers_imp.esa_vegetation_raw, "esa_vegetation_raw"),
                           ...withSource(layers_imp.land_cover, "land_cover"),
                           ...withSource(layers_imp.land_cover_coarse, "land_cover"),
                            ...withSource(layers_imp.water_polygon, "water_polygons"),
                            ...withSource(layers_imp.waterways, "waterways"),
                            ...withSource(layers_imp.roads, "roads"),
                            ...withSource(layers_imp.roads_low, "roads_low"),
                            ...withSource(layers_imp.road_arrows, "road_arrows"),
                            ...withSource(layers_imp.roads_low_name, "roads_low_name"),
                            ...withSource(layers_imp.buildings, "buildings"),
                            ...withSource(layers_imp.places, "places"),
                            ...withSource(layers_imp.world_water_lakes, "water_lakes"),
                            ...withSource(layers_imp.world_countries_name, "world_countries_name"),
                            ...withSource(layers_imp.water_polygons_labels, "water_polygons_labels"),
                            ...withSource(layers_imp.regions, "boundaries_coarse_name"),
                            ...withSource(layers_imp.boundaries_coarse_name, "boundaries_coarse_name"),
                            ...withSource(layers_imp.admin_boundaries, "admin_boundaries"),
                            ...withSource(layers_imp.roads_local_name, "roads_local_name"),
                            ...withSource(layers_imp.pois, "pois"),
                            ...withSource(layers_imp.waterways_name, "waterways_name"),
                            ...citiesLayers,
];


const mapStyle: style = {
                            version: 8,
                            sprite: MAP_CONFIG.spriteUrl,
                            glyphs: `${MAP_CONFIG.glyphUrl}/{fontstack}/{range}`,
                            sources,
                            layers,
                          };

export default mapStyle;
