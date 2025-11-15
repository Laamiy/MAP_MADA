import { world_countries_110m_zoom } from "../zoom"

export const world_countries_110m = [
  {
    id: "world_countries_110m-fill",
    type: "fill",
    minzoom: world_countries_110m_zoom.min,
    maxzoom: world_countries_110m_zoom.max,
    source: "world_countries_110m",
    "source-layer": "world_countries_110m",
    paint: {
      // "fill-color": "rgba(206, 207, 206, 0.78)",
      "fill-color": "#F5F0E5",
      "fill-opacity": 1,
    },
  },

  // {
  //   "id": "world_countries_110m-name-labels",
  //   "type": "symbol",
  //   "source": "world_countries_110m",
  //   "source-layer": "world_countries_110m",
  //   "filter": ["has", "name"],
  //   "layout": {
  //     "text-field": ["get", "name"],
  //     "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],
  //     "text-size": ["interpolate", ["linear"], ["zoom"], 3, 2, 4, 9, 4.1, 0],
  //     "symbol-spacing": 250,
  //     "text-allow-overlap": true
  //   },
  //   "paint": {
  //     "text-color": "#000"
  //   }
  // }
  {
    id: "world_countries_110m-line",
    type: "line",
    minzoom: world_countries_110m_zoom.min,
    maxzoom: world_countries_110m_zoom.max,
    source: "world_countries_110m",
    "source-layer": "world_countries_110m",
    paint: {
      "line-color": "rgba(156, 162, 155, 0.4)",
      "line-width": 1,
    },
  },
]
