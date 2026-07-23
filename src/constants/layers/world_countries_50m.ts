import { world_countries_50m_zoom } from "../zoom";
export const world_countries_50m = [
  {
    id: "world_countries_50m-fill",
    type: "fill",
    minzoom: world_countries_50m_zoom.min,
    maxzoom: world_countries_50m_zoom.max,
    "source-layer": "world_countries_50m",
    paint: {
      "fill-color": "#F9FCFD",
      "fill-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        world_countries_50m_zoom.min,
        0,
        world_countries_50m_zoom.min + 0.5,
        1,
        world_countries_50m_zoom.max - 0.5,
        1,
        world_countries_50m_zoom.max,
        0,
      ],
    },
  },
];
