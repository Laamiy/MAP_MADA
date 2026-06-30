import { world_countries_110m_zoom } from "../zoom"

export const world_countries_110m = [
  {
    id: "world_countries_110m-fill",
    type: "fill",
    minzoom: world_countries_110m_zoom.min,
    maxzoom: world_countries_110m_zoom.max,
    "source-layer": "world_countries_110m",
    paint: {
      "fill-color": "#FEFEFE",
      "fill-opacity": 1,
    },
  },


  {
    id: "world_countries_110m-line",
    type: "line",
    minzoom: world_countries_110m_zoom.min,
    maxzoom: world_countries_110m_zoom.max,
    "source-layer": "world_countries_110m",
    paint: {
      "line-color": "rgba(156, 162, 155, 0.4)",
      "line-width": 1,
    },
  },
]
