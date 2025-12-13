import * as layers_imp from "../constants/layers";
import { antananarivoGeoJSON, antananarivoLayers } from "./layers/city_point";
import type { style, AnyLayer } from "../types/map.types"
import {
  aerialways_zoom,
  boundaries_coarse_district_zoom,
  boundaries_coarse_label_zoom,
  boundaries_coarse_name_zoom,
  boundaries_coarse_zoom,
  // boundaries_zoom,
  buildings_zoom,
  ferry_routes_zoom,
  fokontany_labels_zoom,
  fokontany_zoom,
  landuse_zoom,
  minor_roads_zoom,
  places_zoom,
  pois_zoom,
  railways_zoom,
  road_arrows_zoom,
  roads_low_name_zoom,
  roads_low_zoom,
  roads_zoom,
  water_polygons_zoom,
  waterways_zoom,
  world_countries_110m_zoom,
  world_countries_50m_zoom,
  world_ocean_110m_zoom,
  esa_vegetation_raw_zoom,
  esa_vegetation_100m_zoom,
  esa_vegetation_30m_zoom,
  water_polygons_labels_zoom,
} from "./zoom";

import { MAP_CONFIG } from "../config/map.config";

/* ----------  skip empty tiles  ---------- */
const MAD_BBOX = { w: 43.2, e: 50.5, s: -25.6, n: -12 };
function insideMadagascar(z: number, x: number, y: number): boolean {
  const n = 1 << z;
  const lon = (x / n) * 360 - 180;
  const lat =
    (Math.atan(Math.sinh(Math.PI * (1 - (2 * y) / n))) * 180) / Math.PI;
  return (
    lon >= MAD_BBOX.w &&
    lon <= MAD_BBOX.e &&
    lat >= MAD_BBOX.s &&
    lat <= MAD_BBOX.n
  );
}

function src(
  name: string,
  min: number,
  max: number,
  keepFields: string[] = [],
) {
  return {
    type: "vector" as const,
    tiles: [`${MAP_CONFIG.baseUrl}/${name}/{z}/{x}/{y}.pbf`],
    minzoom: min,
    maxzoom: max,
    layers: [{ id: name, fields: keepFields }], // drop everything else
    tileUrlFunction: (p: { z: number; x: number; y: number }) =>
      insideMadagascar(p.z, p.x, p.y)
        ? `${MAP_CONFIG.baseUrl}/${name}/${p.z}/${p.x}/${p.y}.pbf`
        : null,
  };
}

const sources = {
  world_ocean_110m: src(
    "world_ocean_110m",
    world_ocean_110m_zoom.min,
    world_ocean_110m_zoom.max,
  ),
  world_countries_110m: src(
    "world_countries_110m",
    world_countries_110m_zoom.min,
    world_countries_110m_zoom.max,
  ),
  world_countries_50m: src(
    "world_countries_50m",
    world_countries_50m_zoom.min,
    world_countries_50m_zoom.max,
  ),
  boundaries_coarse: src(
    "boundaries_coarse",
    boundaries_coarse_zoom.min,
    boundaries_coarse_zoom.max,
  ),
  boundaries_coarse_name: src(
    "boundaries_coarse_name",
    boundaries_coarse_name_zoom.min,
    boundaries_coarse_name_zoom.max,
    ["name", "admin_level"],
  ),
  boundaries_coarse_label: src(
    "boundaries_coarse_label",
    boundaries_coarse_label_zoom.min,
    boundaries_coarse_label_zoom.max,
    ["name", "admin_level"],
  ),
  // boundaries: src("boundaries", boundaries_zoom.min, boundaries_zoom.max),
  water_polygons: src("water_polygons", water_polygons_zoom.min, water_polygons_zoom.max, ["name"]),
  waterways: src("waterways", waterways_zoom.min, waterways_zoom.max, ["name"]),
  landuse: src("landuse", landuse_zoom.min, landuse_zoom.max, ["name"]),
  roads_low: src("roads_low", roads_low_zoom.min, roads_low_zoom.max, ["highway", "ref",]),
  roads: src("roads", roads_zoom.min, roads_zoom.max, ["highway"]),
  roads_low_name: src("roads_low_name", roads_low_name_zoom.min, roads_low_name_zoom.max, ["highway", "ref", "name"],),
  road_arrows: src("road_arrows", road_arrows_zoom.min, road_arrows_zoom.max),
  minor_roads: src("minor_roads", minor_roads_zoom.min, minor_roads_zoom.max, ["highway",]),
  railways: src("railways", railways_zoom.min, railways_zoom.max, ["railway"]),
  ferry_routes: src("ferry_routes", ferry_routes_zoom.min, ferry_routes_zoom.max, ["route"],),
  aerialways: src("aerialways", aerialways_zoom.min, aerialways_zoom.max, ["aerialway",]),
  buildings: src("buildings", buildings_zoom.min, buildings_zoom.max),
  places: src("places", places_zoom.min, places_zoom.max, ["name"]),
  pois: src("pois", pois_zoom.min, pois_zoom.max, []),
  regions: src("boudaries_coarse_name", boundaries_coarse_name_zoom.min, boundaries_coarse_name_zoom.max),
  fokontany: src("fokontany", fokontany_zoom.min, fokontany_zoom.max),
  fokontany_labels: src("fokontany_labels", fokontany_labels_zoom.min, fokontany_labels_zoom.max,),
  district: src("boundaries_coarse", boundaries_coarse_district_zoom.min, boundaries_coarse_district_zoom.max,),
  esa_vegetation_raw: src("esa_vegetation_raw", esa_vegetation_raw_zoom.min, esa_vegetation_raw_zoom.max),
  esa_vegetation_100m: src("esa_vegetation_100m", esa_vegetation_100m_zoom.min, esa_vegetation_100m_zoom.max),
  esa_vegetation_30m: src("esa_vegetation_30m", esa_vegetation_30m_zoom.min, esa_vegetation_30m_zoom.max),
  water_polygons_labels: src("water_polygons_labels", water_polygons_labels_zoom.min, water_polygons_labels_zoom.max),
  antananarivo: antananarivoGeoJSON,
};

const withSource = (layers: AnyLayer[], src: string): AnyLayer[] =>
  layers.map((l) => ({ ...l, source: src }));

const layers: AnyLayer[] = [
  ...layers_imp.background,
  // ...withSource(layers_imp.world_ocean_110m, "world_ocean_110m"),
  ...withSource(layers_imp.world_countries_110m, "world_countries_110m"),
  ...withSource(layers_imp.world_countries_50m, "world_countries_50m"),
  ...withSource(layers_imp.fokontany, "fokontany"),
  // ...withSource(layers_imp.boundaries, "boundaries"),
  ...withSource(layers_imp.railways, "railways"),
  ...withSource(layers_imp.ferry_routes, "ferry_routes"),
  ...withSource(layers_imp.landuse, "landuse"),
  // ...withSource(layers_imp.aerialways, "aerialways"),
  // ...withSource(layers_imp.boundaries_coarse_label, "boundaries_coarse_label"),
  // ...withSource(layers_imp.district, "boundaries_coarse"),
  // ...withSource(layers_imp.extraVegetation, "esa_vegetation_raw"),
  // ...withSource(layers_imp.extraVegLayers100m, "esa_vegetation_100m"),
  // ...withSource(layers_imp.extraVegLayers30m, "esa_vegetation_30m"),
  ...withSource(layers_imp.water_polygon, "water_polygons"),
  ...withSource(layers_imp.waterways, "waterways"),
  ...withSource(layers_imp.minor_roads, "minor_roads"),
  ...withSource(layers_imp.roads, "roads"),
  ...withSource(layers_imp.roads_low, "roads_low"),
  ...withSource(layers_imp.building, "buildings"),
  ...withSource(layers_imp.road_arrows, "road_arrows"),
  ...withSource(layers_imp.roads_low_name, "roads_low_name"),
  ...withSource(layers_imp.place, "places"),
  ...withSource(layers_imp.poi, "pois"),
  ...withSource(layers_imp.fokontany_labels, "fokontany_labels"),
  ...withSource(layers_imp.regions, "boundaries_coarse_name"),
  ...withSource(layers_imp.boundaries_coarse, "boundaries_coarse"),
  ...withSource(layers_imp.boundaries_coarse_name, "boundaries_coarse_name"),
  ...withSource(layers_imp.water_polygons_labels, "water_polygons_labels"),
  ...withSource(layers_imp.waterways_labels, "waterways"),
  ...withSource(layers_imp.landuse_labels, "landuse"),
  ...antananarivoLayers,

];


const mapStyle: style = {
  version: 8,
  sprite: MAP_CONFIG.spriteUrl,
  glyphs: `${MAP_CONFIG.glyphUrl}/{fontstack}/{range}.pbf`,
  sources,
  layers,
};

export default mapStyle;
