export const buildings3d = [{
  id: "buildings-3d",
  type: "fill-extrusion",
  source: "buildings3d",
  "source-layer": "buildings3d",
  minzoom: 16,
  paint: {
    "fill-extrusion-color": "#d0d0d0",
    "fill-extrusion-opacity": 0.85,
    "fill-extrusion-base": 0,
    "fill-extrusion-height": ["coalesce", ["to-number", ["get", "height"]], 10]
  }
}];
