export const state_province = [
  {
    id: "state-province-lines",
    type: "line",
    source: "state_province_lines",
    "source-layer": "state_province_lines",
    paint: {
      "line-color": "rgba(236, 15, 15, 0.8)",
      "line-width": ["interpolate", ["linear"], ["zoom"], 5, 1, 8, 2, 10, 3],
      "line-dasharray": [3, 2],
    },
  },
]
