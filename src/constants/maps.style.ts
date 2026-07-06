import * as layers_imp from "../constants/layers";
import { citiesGeoJSON, citiesLayers } from "./layers/city_point";
import type { style, AnyLayer } from "../types/map.types"
import {
          aerialways_zoom,
          boundaries_coarse_label_zoom,
          boundaries_coarse_name_zoom,
          boundaries_coarse_zoom,
          buildings_zoom,
          ferry_routes_zoom,
          fokontany_labels_zoom,
          minor_roads_zoom,
          places_zoom,
          pois_zoom,
          railways_zoom,
          road_arrows_zoom,
          roads_low_name_zoom,
          roads_low_zoom,
          roads_zoom,
          // waterways_zoom,
          world_ocean_110m_zoom,
          water_polygons_labels_zoom,
          world_countries_name_zoom

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

const sources = {
                    world_ocean_110m: src(
                      "world_ocean_110m",
                      world_ocean_110m_zoom.min,
                      world_ocean_110m_zoom.max
                    ),
                    world_countries_50m: {
                    type: "vector",
                    tiles: ["http://localhost:3000/world_land_polygons/{z}/{x}/{y}"],
                      minzoom: 0,
                      maxzoom: 12,
                    },
                    world_countries_name: src(
                      "world_countries_name",
                      world_countries_name_zoom.min,
                      world_countries_name_zoom.max
                    ),
           
                    boundaries_coarse: src(
                      "boundaries_coarse",
                      boundaries_coarse_zoom.min,
                      boundaries_coarse_zoom.max
                    ),
                    boundaries_coarse_name: src(
                      "boundaries_coarse_name",
                      boundaries_coarse_name_zoom.min,
                      boundaries_coarse_name_zoom.max,
                      ["name", "admin_level"]
                    ),
                    boundaries_coarse_label: src(
                      "boundaries_coarse_label",
                      boundaries_coarse_label_zoom.min,
                      boundaries_coarse_label_zoom.max,
                      ["name", "admin_level"]
                    ),
                    water_polygons: {
                    type: "vector",
                    tiles: ["http://localhost:3000/water_polygons/{z}/{x}/{y}"],
                      minzoom: 7,
                      maxzoom: 16,
                    },

                    water_polygons_labels: src(
                      "water_polygons_labels",
                      water_polygons_labels_zoom.min,
                      water_polygons_labels_zoom.max
                    ),
                    waterways: {
                      type: "vector",
                      tiles: ["http://localhost:3000/waterways/{z}/{x}/{y}"],
                        minzoom: 11,
                        maxzoom: 17,
                    },
                     landuse: {
                    type: "vector",
                    tiles: ["http://localhost:3000/landuse/{z}/{x}/{y}"],
                      minzoom: 10,
                      maxzoom: 17,
                    },
                    roads_low: {
                      type : "vector",
                      tiles: ["http://localhost:3000/roads_low/{z}/{x}/{y}"],
                      minzoom:3,
                      maxzoom:18
                    },
                    roads: {
                      type : "vector",
                      tiles: ["http://localhost:3000/roads/{z}/{x}/{y}"],
                      minzoom:12,
                      maxzoom:17
                    },
                    roads_low_name: src(
                      "roads_low_name",
                      roads_low_name_zoom.min,
                      roads_low_name_zoom.max,
                      ["highway", "ref", "name"]
                    ),
                    road_arrows: src(
                      "road_arrows",
                      road_arrows_zoom.min,
                      road_arrows_zoom.max
                    ),
                    minor_roads: src(
                      "minor_roads",
                      minor_roads_zoom.min,
                      minor_roads_zoom.max,
                      ["highway"]
                    ),
                    railways: src(
                      "railways",
                      railways_zoom.min,
                      railways_zoom.max,
                      ["railway"]
                    ),
                    ferry_routes: src(
                      "ferry_routes",
                      ferry_routes_zoom.min,
                      ferry_routes_zoom.max,
                      ["route"]
                    ),
                    aerialways: src(
                      "aerialways",
                      aerialways_zoom.min,
                      aerialways_zoom.max,
                      ["aerialway"]
                    ),
                    buildings: src(
                      "buildings",
                      buildings_zoom.min,
                      buildings_zoom.max
                    ),
                    buildings3d: src(
                      "buildings3d", 
                      16, 
                      20, 
                      ["height", "levels"]
                    ),
                    places: src(
                      "places",
                      places_zoom.min,
                      places_zoom.max,
                      ["name", "osm_id"]
                    ),
                    pois: src(
                      "pois",
                      pois_zoom.min,
                      pois_zoom.max,
                      [] // no attributes
                    ),
                    regions: src(
                      "boudaries_coarse_name",
                      boundaries_coarse_name_zoom.min,
                      boundaries_coarse_name_zoom.max
                    ),
                    fokontany_labels: src(
                      "fokontany_labels",
                      fokontany_labels_zoom.min,
                      fokontany_labels_zoom.max
                    ),
                    esa_vegetation_raw: {
                    type: "vector",
                    tiles: ["http://localhost:3000/daylight_veg/{z}/{x}/{y}"],
                      minzoom: 0,
                      maxzoom: 8,
                    },
                    locations: src(
                      "locations",
                      4,
                      20,
                      ["id", "name", "city", "amenity", "photo_filename"]
                    ),
                    antananarivo: citiesGeoJSON.tana,
                    toamasina: citiesGeoJSON.toamasina,
                    mahajanga: citiesGeoJSON.mahajanga,
                    antsiranana: citiesGeoJSON.antsiranana,
                    tolagnaro: citiesGeoJSON.tolangnaro
                  };
const withSource = (layers: AnyLayer[], src: string): AnyLayer[] => layers.map((l) => ({ ...l, source: src }));

const layers: AnyLayer[] = [
                            // ...layers_imp.sky, 
                            ...layers_imp.background,
                            ...withSource(layers_imp.world_countries_50m, "world_countries_50m"),
                            ...withSource(layers_imp.esa_vegetation_raw, "esa_vegetation_raw"),
                            // ...withSource(layers_imp.world_countries_name, "world_countries_name"),
                            // ...withSource(layers_imp.boundaries_coarse, "boundaries_coarse"),
                            // ...withSource(layers_imp.railways, "railways"),
                            // ...withSource(layers_imp.ferry_routes, "ferry_routes"),
                            ...withSource(layers_imp.landuse, "landuse"),
                            ...withSource(layers_imp.water_polygon, "water_polygons"),
                            // ...withSource(layers_imp.minor_roads, "minor_roads"),
                            ...withSource(layers_imp.roads, "roads"),
                            ...withSource(layers_imp.roads_low, "roads_low"),
                            // ...withSource(layers_imp.buildings, "buildings"),
                            // ...withSource(layers_imp.road_arrows, "road_arrows"),
                            // ...withSource(layers_imp.roads_low_name, "roads_low_name"),
                            // ...withSource(layers_imp.places, "places"),
                            // ...withSource(layers_imp.pois, "pois"),
                            // ...withSource(layers_imp.fokontany_labels, "fokontany_labels"),
                            ...withSource(layers_imp.waterways, "waterways"),
                            // ...withSource(layers_imp.regions, "boundaries_coarse_name"),
                            // ...withSource(layers_imp.boundaries_coarse_name, "boundaries_coarse_name"),
                            // ...withSource(layers_imp.water_polygons_labels, "water_polygons_labels"),
                            // ...withSource(layers_imp.waterways_labels, "waterways"),
                            // ...withSource(layers_imp.landuse_labels, "landuse"),
                            // ...withSource(layers_imp.buildings3d, "buildings3d"),
                            // ...withSource(layers_imp.locations, "locations"),
                            ...citiesLayers,
];


const mapStyle: style = {
                            version: 8,
                            sprite: MAP_CONFIG.spriteUrl,
                            glyphs: `${MAP_CONFIG.glyphUrl}/{fontstack}/{range}.pbf`,
                            sources,
                            layers,
                            
                          };

export default mapStyle;