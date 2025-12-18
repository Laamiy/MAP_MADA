import { roads_zoom } from "../zoom";
const INC = 2 ; 
/* ---------- width & colour helpers ------------------------------------ */
const roadWidth = [
  "interpolate", ["linear"], ["zoom"],
  roads_zoom.min, 0.8,
  roads_zoom.min + INC + 1,
  ["match", ["get", "class"],
    "motorway", 4,
    "major", 10,
    "minor", 2.2,
    "residential", 1.8,
    "service", 1.2,
    "path", 0.8,
    "track", 0.8,
    1.5],
  roads_zoom.min + INC + 3,
  ["match", ["get", "class"],
    "motorway", 16,
    "major", 23,
    "minor", 15,
    "residential", 17,
    "service", 5,
    "path", 3,
    "track", 3,
    6],
  roads_zoom.max ,
  ["match", ["get", "class"],
    "motorway", 29,
    "major", 35,
    "minor", 35,
    "residential", 27,
    "service", 12,
    "path", 8,
    "track", 8,
    15]
];

const roadColor = [
  "match", ["get", "class"],
  "motorway", "#E892A2",
  "major", "#BFCEDB",
  "minor", "#C6D0DB",
  "residential", "#C6D0DB",
  "service", "#f0f0f0",
  "path", "#BFCEDB",
  "track", "#C6D0DB",
  "#8ba5c19c" // other
];

/* ---------- white "stairs" dash layer --------------------------------- */
const pathStepsLayer = {
  id: "roads-path-steps",
  type: "line",
  source: "roads",
  "source-layer": "roads",
  filter: ["==", ["get", "class"], "path"],
  layout: {
    "line-cap": "butt",
    "line-join": "miter",
  },
  paint: {
    "line-color": "white",
    "line-width": [
      "interpolate", ["linear"], ["zoom"],
      roads_zoom.min, 0.8,
      roads_zoom.min + INC, 1.2,
      roads_zoom.min + INC + 1, 4,
      roads_zoom.max - 1, 10
    ],
    "line-dasharray": [1, 1], // square stairs
    "line-opacity": 1,
  },
};

/* ----------------------------------------------------------------------- */
export const roads = [
  /* 1.  grey casing for every class */
  {
    id: "roads-line",
    type: "line",
    source: "roads",
    "source-layer": "roads",
    filter: ["has", "class"],
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": roadColor,
      "line-width": roadWidth,
      "line-opacity": [
        "interpolate", ["linear"], ["zoom"],
        0, 0,
        roads_zoom.min, 0.5,
        roads_zoom.min + 0.01, 1,
      ],
    },
  },

  /* 2.  white stair dashes on top of paths */
  pathStepsLayer,
];
