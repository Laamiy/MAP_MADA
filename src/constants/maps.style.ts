import * as layers_imp from "../constants/layers";
import { citiesGeoJSON, citiesLayers } from "./layers/city_point";
import type { style, AnyLayer } from "../types/map.types"
import {
         pois_zoom,
         road_arrows_zoom,
        } from "./zoom";

import { MAP_CONFIG } from "../config/map.config";

function src( name: string, min: number, max: number, keepFields: string[] = []) 
{
  return {
    type: "vector",
    tiles: [`${MAP_CONFIG.baseUrl}/${name}/{z}/{x}/{y}.pbf`],
    minzoom: min,
    maxzoom: max,
    layers: [{ id: name, fields: keepFields }],
  };
}
function martinSrc( srcName : string , min : number , max : number ) 
{
  return {
    type : "vector", 
    tiles: [`${MAP_CONFIG.martinUrl}/${srcName}/{z}/{x}/{y}`],
    minzoom: min,
    maxzoom: max,
  }
}
const sources = {
                   world_countries_50m: martinSrc("world_land_polygons", 0, 12),
                    world_countries_name: martinSrc("world_countries_name", 2, 6),
                    boundaries_coarse_name: martinSrc("boundaries_coarse_name", 5, 15),
                    water_polygons: martinSrc("water_polygons", 7, 16),
                    water_polygons_labels: martinSrc("water_polygons_labels", 14, 17),
                    waterways: martinSrc("waterways", 11, 17),
                    roads_low: martinSrc("roads_low", 3, 18),
                    roads: martinSrc("roads", 12, 17),
                    roads_low_name: martinSrc("roads_low_name", 5, 15),
                    buildings: martinSrc("buildings", 16, 17),
                    land_cover: martinSrc("land_cover", 10, 15),
                    land_cover_coarse: martinSrc("land_cover_coarse", 10, 11),
                    road_arrows: src("road_arrows",road_arrows_zoom.min,road_arrows_zoom.max),
                    admin_boundaries : martinSrc("admin_boundaries", 4, 12),
                    // railways: src(
                    //   "railways",
                    //   railways_zoom.min,
                    //   railways_zoom.max,
                    //   ["railway"]
                    // ), // ferry_routes: src(
                    //   "ferry_routes",
                    //   ferry_routes_zoom.min,
                    //   ferry_routes_zoom.max,
                    //   ["route"]
                    // ),
                    // aerialways: src(
                    //   "aerialways",
                    //   aerialways_zoom.min,
                    //   aerialways_zoom.max,
                    //   ["aerialway"]
                    // ),
                    places: martinSrc("places", 4, 17),
                    pois: src("pois",pois_zoom.min,pois_zoom.max,[]),
                    regions: martinSrc("boundaries_coarse_name", 5, 15),
                    // fokontany_labels: src(
                    //   "fokontany_labels",
                    //   fokontany_labels_zoom.min,
                    //   fokontany_labels_zoom.max
                    // ),
                    esa_vegetation_raw: martinSrc("daylight_veg", 0, 8),
                    // locations: src(
                    //   "locations",
                    //   4,
                    //   20,
                    //   ["id", "name", "city", "amenity", "photo_filename"]
                    // ),
                    antananarivo: citiesGeoJSON.tana,
                    toamasina: citiesGeoJSON.toamasina,
                    mahajanga: citiesGeoJSON.mahajanga,
                    antsiranana: citiesGeoJSON.antsiranana,
                    tolagnaro: citiesGeoJSON.tolangnaro
                  };
const withSource = (layers: AnyLayer[], src: string): AnyLayer[] => layers.map((l) => ({ ...l, source: src }));

const layers: AnyLayer[] = [
                            ...layers_imp.background,
                            ...withSource(layers_imp.world_countries_50m, "world_countries_50m"),
                            ...withSource(layers_imp.esa_vegetation_raw, "esa_vegetation_raw"),
                            ...withSource(layers_imp.world_countries_name, "world_countries_name"),
                            // ...withSource(layers_imp.railways, "railways"),
                            // ...withSource(layers_imp.ferry_routes, "ferry_routes"),
                           ...withSource(layers_imp.land_cover, "land_cover"),
                           ...withSource(layers_imp.land_cover_coarse, "land_cover_coarse"),
                            ...withSource(layers_imp.water_polygon, "water_polygons"),
                            ...withSource(layers_imp.waterways, "waterways"),
                            ...withSource(layers_imp.roads, "roads"),
                            ...withSource(layers_imp.roads_low, "roads_low"),
                            ...withSource(layers_imp.road_arrows, "road_arrows"),
                            ...withSource(layers_imp.roads_low_name, "roads_low_name"),
                            ...withSource(layers_imp.buildings, "buildings"),
                            // ...withSource(layers_imp.fokontany_labels, "fokontany_labels"),
                            ...withSource(layers_imp.places, "places"),
                            ...withSource(layers_imp.pois, "pois"),
                            ...withSource(layers_imp.water_polygons_labels, "water_polygons_labels"),
                            ...withSource(layers_imp.regions, "boundaries_coarse_name"),
                            ...withSource(layers_imp.boundaries_coarse_name, "boundaries_coarse_name"),
                            ...withSource(layers_imp.admin_boundaries, "admin_boundaries"),
                            // ...withSource(layers_imp.waterways_labels, "waterways"),
                            // ...withSource(layers_imp.locations, "locations"),
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